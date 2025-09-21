"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Clock, Award, ExternalLink } from "lucide-react"
import { useRewards } from "@/contexts/rewards-context"
import { useWallet } from "@/contexts/wallet-context"

export function RewardsDashboard() {
  const { totalEarned, pendingRewards, claimableRewards, rewardHistory, claimRewards, isClaiming, error } = useRewards()
  const { isConnected } = useWallet()

  const recentClaims = rewardHistory.slice(-5).reverse()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Rewards Dashboard</h2>
        <p className="text-muted-foreground">Track your AMPL earnings and claim rewards</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalEarned.toFixed(3)} AMPL</div>
            <p className="text-xs text-muted-foreground">All-time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{pendingRewards.toFixed(3)} AMPL</div>
            <p className="text-xs text-muted-foreground">Current session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claimable</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{claimableRewards.toFixed(3)} AMPL</div>
            <p className="text-xs text-muted-foreground">Ready to claim</p>
          </CardContent>
        </Card>
      </div>

      {/* Claim Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Claim Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Connect your wallet to claim rewards</p>
              <Button disabled>Connect Wallet Required</Button>
            </div>
          ) : claimableRewards === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No rewards available to claim</p>
              <p className="text-sm text-muted-foreground">
                Listen to music for at least 30 seconds to earn AMPL tokens
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">Available to Claim</div>
                  <div className="text-2xl font-bold text-primary">{claimableRewards.toFixed(3)} AMPL</div>
                </div>
                <Button onClick={claimRewards} disabled={isClaiming} size="lg">
                  {isClaiming ? "Claiming..." : "Claim Rewards"}
                </Button>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                <p>• Minimum claim amount: 0.01 AMPL</p>
                <p>• Gas fees will be deducted from your wallet</p>
                <p>• Claims are processed on-chain for transparency</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reward Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Earning Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Goal (10 AMPL)</span>
              <span>{Math.min(totalEarned % 10, 10).toFixed(1)}/10 AMPL</span>
            </div>
            <Progress value={(totalEarned % 10) * 10} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{rewardHistory.length}</div>
              <div className="text-xs text-muted-foreground">Sessions Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {rewardHistory.reduce((acc, session) => acc + session.totalListenTime, 0).toFixed(0)}s
              </div>
              <div className="text-xs text-muted-foreground">Total Listen Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {recentClaims.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentClaims.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <div className="font-medium">{session.earnedTokens.toFixed(3)} AMPL</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.startTime).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Claimed</Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
