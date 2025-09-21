"use client"

export interface RewardSession {
  trackId: string
  startTime: number
  totalListenTime: number
  earnedTokens: number
  isValid: boolean
  lastHeartbeat: number
}

export interface RewardCalculation {
  baseRate: number // AMPL per second
  multipliers: {
    newUser: number
    loyalListener: number
    artistSupporter: number
  }
  minimumListenDuration: number // seconds
  maxRewardPerTrack: number
  antiSpamCooldown: number // seconds between tracks
}

export class RewardsEngine {
  private static instance: RewardsEngine
  private sessions: Map<string, RewardSession> = new Map()
  private config: RewardCalculation = {
    baseRate: 0.001, // 0.001 AMPL per second
    multipliers: {
      newUser: 1.5,
      loyalListener: 1.2,
      artistSupporter: 1.3,
    },
    minimumListenDuration: 30, // 30 seconds minimum
    maxRewardPerTrack: 5.0, // Max 5 AMPL per track
    antiSpamCooldown: 10, // 10 seconds between tracks
  }

  static getInstance(): RewardsEngine {
    if (!RewardsEngine.instance) {
      RewardsEngine.instance = new RewardsEngine()
    }
    return RewardsEngine.instance
  }

  startListeningSession(trackId: string, userId?: string): string {
    const sessionId = `${trackId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const session: RewardSession = {
      trackId,
      startTime: Date.now(),
      totalListenTime: 0,
      earnedTokens: 0,
      isValid: true,
      lastHeartbeat: Date.now(),
    }

    this.sessions.set(sessionId, session)
    return sessionId
  }

  updateListeningProgress(sessionId: string, currentTime: number): number {
    const session = this.sessions.get(sessionId)
    if (!session || !session.isValid) return 0

    const now = Date.now()
    const timeSinceLastHeartbeat = (now - session.lastHeartbeat) / 1000

    // Anti-fraud: Check if heartbeat is reasonable (not too fast, not too slow)
    if (timeSinceLastHeartbeat < 0.5 || timeSinceLastHeartbeat > 5) {
      console.warn("Suspicious listening pattern detected")
      return session.earnedTokens
    }

    session.totalListenTime += timeSinceLastHeartbeat
    session.lastHeartbeat = now

    // Calculate rewards only after minimum duration
    if (session.totalListenTime >= this.config.minimumListenDuration) {
      const newTokens = this.calculateRewards(session.totalListenTime, session.trackId)
      session.earnedTokens = Math.min(newTokens, this.config.maxRewardPerTrack)
    }

    this.sessions.set(sessionId, session)
    return session.earnedTokens
  }

  private calculateRewards(listenTime: number, trackId: string): number {
    const baseReward = listenTime * this.config.baseRate

    // Apply multipliers based on user behavior
    // This would integrate with user profile data in a real implementation
    const multiplier = this.getUserMultiplier()

    return baseReward * multiplier
  }

  private getUserMultiplier(): number {
    // Placeholder for user-specific multipliers
    // In a real implementation, this would check user history, loyalty, etc.
    return 1.0
  }

  endListeningSession(sessionId: string): RewardSession | null {
    const session = this.sessions.get(sessionId)
    if (!session) return null

    // Final validation
    if (session.totalListenTime < this.config.minimumListenDuration) {
      session.isValid = false
      session.earnedTokens = 0
    }

    this.sessions.delete(sessionId)
    return session
  }

  getSessionRewards(sessionId: string): number {
    const session = this.sessions.get(sessionId)
    return session?.earnedTokens || 0
  }

  // Anti-fraud detection
  detectSuspiciousActivity(userId: string): boolean {
    // Check for rapid track switching, bot-like behavior, etc.
    // This would integrate with a more sophisticated fraud detection system
    return false
  }
}
