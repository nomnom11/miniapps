"use client"

export interface WalletInfo {
  name: string
  icon: string
  connector: string
}

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    connector: "metamask",
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    connector: "walletconnect",
  },
  {
    name: "Coinbase Wallet",
    icon: "🔵",
    connector: "coinbase",
  },
]

export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  connector: string | null
}

export class WalletService {
  private static instance: WalletService
  private ethereum: any

  constructor() {
    if (typeof window !== "undefined") {
      this.ethereum = (window as any).ethereum
    }
  }

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService()
    }
    return WalletService.instance
  }

  async connectMetaMask(): Promise<WalletState> {
    if (!this.ethereum) {
      throw new Error("MetaMask is not installed")
    }

    try {
      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
      })

      const chainId = await this.ethereum.request({
        method: "eth_chainId",
      })

      const balance = await this.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      return {
        isConnected: true,
        address: accounts[0],
        balance: this.formatBalance(balance),
        chainId: Number.parseInt(chainId, 16),
        connector: "metamask",
      }
    } catch (error) {
      console.error("MetaMask connection error:", error)
      throw error
    }
  }

  async connectWalletConnect(): Promise<WalletState> {
    // Placeholder for WalletConnect integration
    // In a real implementation, you would use @walletconnect/web3-provider
    throw new Error("WalletConnect integration coming soon")
  }

  async connectCoinbase(): Promise<WalletState> {
    // Placeholder for Coinbase Wallet integration
    // In a real implementation, you would use @coinbase/wallet-sdk
    throw new Error("Coinbase Wallet integration coming soon")
  }

  async disconnect(): Promise<void> {
    // Clear any stored wallet data
    if (typeof window !== "undefined") {
      localStorage.removeItem("wallet_connection")
    }
  }

  private formatBalance(balance: string): string {
    // Convert wei to ETH and format
    const balanceInEth = Number.parseInt(balance, 16) / Math.pow(10, 18)
    return balanceInEth.toFixed(4)
  }

  async switchToMainnet(): Promise<void> {
    if (!this.ethereum) return

    try {
      await this.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }], // Mainnet
      })
    } catch (error) {
      console.error("Failed to switch network:", error)
      throw error
    }
  }

  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (this.ethereum) {
      this.ethereum.on("accountsChanged", callback)
    }
  }

  onChainChanged(callback: (chainId: string) => void): void {
    if (this.ethereum) {
      this.ethereum.on("chainChanged", callback)
    }
  }
}
