"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { RewardsEngine, type RewardSession } from "@/lib/rewards"
import { useWallet } from "./wallet-context"

interface RewardsState {
  totalEarned: number
  pendingRewards: number
  claimableRewards: number
  currentSession: string | null
  rewardHistory: RewardSession[]
  isEarning: boolean
}

interface RewardsContextType extends RewardsState {
  startEarning: (trackId: string) => void
  stopEarning: () => void
  claimRewards: () => Promise<void>
  updateProgress: (currentTime: number) => void
  isClaiming: boolean
  error: string | null
}

const initialState: RewardsState = {
  totalEarned: 0,
  pendingRewards: 0,
  claimableRewards: 0,
  currentSession: null,
  rewardHistory: [],
  isEarning: false,
}

type RewardsAction =
  | { type: "START_EARNING"; payload: { sessionId: string } }
  | { type: "STOP_EARNING"; payload: { session: RewardSession | null } }
  | { type: "UPDATE_REWARDS"; payload: { amount: number } }
  | { type: "CLAIM_START" }
  | { type: "CLAIM_SUCCESS"; payload: { amount: number } }
  | { type: "CLAIM_ERROR"; payload: string }
  | { type: "LOAD_HISTORY"; payload: RewardSession[] }

function rewardsReducer(state: RewardsState & { isClaiming: boolean; error: string | null }, action: RewardsAction) {
  switch (action.type) {
    case "START_EARNING":
      return {
        ...state,
        currentSession: action.payload.sessionId,
        isEarning: true,
        error: null,
      }
    case "STOP_EARNING":
      const session = action.payload.session
      return {
        ...state,
        currentSession: null,
        isEarning: false,
        pendingRewards: state.pendingRewards + (session?.earnedTokens || 0),
        claimableRewards: state.claimableRewards + (session?.earnedTokens || 0),
        rewardHistory: session ? [...state.rewardHistory, session] : state.rewardHistory,
      }
    case "UPDATE_REWARDS":
      return {
        ...state,
        pendingRewards: action.payload.amount,
      }
    case "CLAIM_START":
      return {
        ...state,
        isClaiming: true,
        error: null,
      }
    case "CLAIM_SUCCESS":
      return {
        ...state,
        isClaiming: false,
        totalEarned: state.totalEarned + action.payload.amount,
        claimableRewards: 0,
        pendingRewards: 0,
      }
    case "CLAIM_ERROR":
      return {
        ...state,
        isClaiming: false,
        error: action.payload,
      }
    case "LOAD_HISTORY":
      return {
        ...state,
        rewardHistory: action.payload,
      }
    default:
      return state
  }
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined)

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(rewardsReducer, {
    ...initialState,
    isClaiming: false,
    error: null,
  })

  const { isConnected, address } = useWallet()
  const rewardsEngine = RewardsEngine.getInstance()

  const startEarning = (trackId: string) => {
    if (!isConnected) {
      dispatch({ type: "CLAIM_ERROR", payload: "Please connect your wallet first" })
      return
    }

    const sessionId = rewardsEngine.startListeningSession(trackId, address || undefined)
    dispatch({ type: "START_EARNING", payload: { sessionId } })
  }

  const stopEarning = () => {
    if (state.currentSession) {
      const session = rewardsEngine.endListeningSession(state.currentSession)
      dispatch({ type: "STOP_EARNING", payload: { session } })
    }
  }

  const updateProgress = (currentTime: number) => {
    if (state.currentSession) {
      const rewards = rewardsEngine.updateListeningProgress(state.currentSession, currentTime)
      dispatch({ type: "UPDATE_REWARDS", payload: { amount: rewards } })
    }
  }

  const claimRewards = async () => {
    if (!isConnected || state.claimableRewards === 0) return

    dispatch({ type: "CLAIM_START" })

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would:
      // 1. Create a merkle proof for the user's rewards
      // 2. Submit transaction to claim contract
      // 3. Wait for confirmation
      // 4. Update user's token balance

      dispatch({ type: "CLAIM_SUCCESS", payload: { amount: state.claimableRewards } })

      // Store claim history
      if (typeof window !== "undefined") {
        const history = JSON.parse(localStorage.getItem("reward_claims") || "[]")
        history.push({
          amount: state.claimableRewards,
          timestamp: Date.now(),
          txHash: "0x" + Math.random().toString(16).substr(2, 64), // Mock tx hash
        })
        localStorage.setItem("reward_claims", JSON.stringify(history))
      }
    } catch (error) {
      dispatch({ type: "CLAIM_ERROR", payload: "Failed to claim rewards. Please try again." })
    }
  }

  // Load reward history on mount
  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const stored = localStorage.getItem(`rewards_${address}`)
      if (stored) {
        try {
          const history = JSON.parse(stored)
          dispatch({ type: "LOAD_HISTORY", payload: history })
        } catch (error) {
          console.error("Failed to load reward history:", error)
        }
      }
    }
  }, [address])

  // Save reward history when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && address && state.rewardHistory.length > 0) {
      localStorage.setItem(`rewards_${address}`, JSON.stringify(state.rewardHistory))
    }
  }, [address, state.rewardHistory])

  const value: RewardsContextType = {
    ...state,
    startEarning,
    stopEarning,
    claimRewards,
    updateProgress,
  }

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>
}

export function useRewards() {
  const context = useContext(RewardsContext)
  if (context === undefined) {
    throw new Error("useRewards must be used within a RewardsProvider")
  }
  return context
}
