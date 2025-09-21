"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { WalletService, type WalletState } from "@/lib/wallet"

interface WalletContextType extends WalletState {
  connect: (connector: string) => Promise<void>
  disconnect: () => Promise<void>
  isConnecting: boolean
  error: string | null
}

const initialState: WalletState = {
  isConnected: false,
  address: null,
  balance: null,
  chainId: null,
  connector: null,
}

type WalletAction =
  | { type: "CONNECT_START" }
  | { type: "CONNECT_SUCCESS"; payload: WalletState }
  | { type: "CONNECT_ERROR"; payload: string }
  | { type: "DISCONNECT" }
  | { type: "UPDATE_BALANCE"; payload: string }

function walletReducer(state: WalletState & { isConnecting: boolean; error: string | null }, action: WalletAction) {
  switch (action.type) {
    case "CONNECT_START":
      return { ...state, isConnecting: true, error: null }
    case "CONNECT_SUCCESS":
      return { ...action.payload, isConnecting: false, error: null }
    case "CONNECT_ERROR":
      return { ...state, isConnecting: false, error: action.payload }
    case "DISCONNECT":
      return { ...initialState, isConnecting: false, error: null }
    case "UPDATE_BALANCE":
      return { ...state, balance: action.payload }
    default:
      return state
  }
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, {
    ...initialState,
    isConnecting: false,
    error: null,
  })

  const walletService = WalletService.getInstance()

  const connect = async (connector: string) => {
    dispatch({ type: "CONNECT_START" })

    try {
      let walletState: WalletState

      switch (connector) {
        case "metamask":
          walletState = await walletService.connectMetaMask()
          break
        case "walletconnect":
          walletState = await walletService.connectWalletConnect()
          break
        case "coinbase":
          walletState = await walletService.connectCoinbase()
          break
        default:
          throw new Error(`Unsupported connector: ${connector}`)
      }

      dispatch({ type: "CONNECT_SUCCESS", payload: walletState })

      // Store connection info
      if (typeof window !== "undefined") {
        localStorage.setItem("wallet_connection", JSON.stringify({ connector, address: walletState.address }))
      }
    } catch (error) {
      dispatch({ type: "CONNECT_ERROR", payload: (error as Error).message })
    }
  }

  const disconnect = async () => {
    await walletService.disconnect()
    dispatch({ type: "DISCONNECT" })
  }

  // Auto-reconnect on page load
  useEffect(() => {
    const reconnect = async () => {
      if (typeof window === "undefined") return

      const stored = localStorage.getItem("wallet_connection")
      if (stored) {
        try {
          const { connector } = JSON.parse(stored)
          await connect(connector)
        } catch (error) {
          console.error("Auto-reconnect failed:", error)
          localStorage.removeItem("wallet_connection")
        }
      }
    }

    reconnect()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (state.isConnected) {
      walletService.onAccountsChanged((accounts) => {
        if (accounts.length === 0) {
          disconnect()
        }
      })

      walletService.onChainChanged(() => {
        // Refresh connection on chain change
        window.location.reload()
      })
    }
  }, [state.isConnected])

  const value: WalletContextType = {
    ...state,
    connect,
    disconnect,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
