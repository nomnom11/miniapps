"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Coins, Clock, Share2 } from "lucide-react"

export function TopListeners() {
  const listeners = [
    {
      rank: 1,
      username: "MusicLover2024",
      avatar: "/placeholder.svg?height=40&width=40",
      tokensEarned: 2847.32,
      hoursListened: 156,
      favoriteGenre: "Electronic",
      isCurrentUser: false,
    },
    {
      rank: 2,
      username: "BeatHunter",
      avatar: "/placeholder.svg?height=40&width=40",
      tokensEarned: 2234.18,
      hoursListened: 142,
      favoriteGenre: "Hip-Hop",
      isCurrentUser: false,
    },
    {
      rank: 3,
      username: "SoundWave",
      avatar: "/placeholder.svg?height=40&width=40",
      tokensEarned: 1987.65,
      hoursListened: 128,
      favoriteGenre: "Ambient",
      isCurrentUser: false,
    },
    {
      rank: 4,
      username: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      tokensEarned: 1247.83,
      hoursListened: 89,
      favoriteGenre: "Electronic",
      isCurrentUser: true,
    },
    {
      rank: 5,
      username: "RhythmMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      tokensEarned: 1156.42,
      hoursListened: 76,
      favoriteGenre: "Jazz",
      isCurrentUser: false,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Top Listeners This Month</span>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listeners.map((listener) => (
            <div
              key={listener.rank}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                listener.isCurrentUser ? "bg-primary/5 border-primary/20" : "bg-card"
              }`}
            >
              <div className="flex items-center justify-center w-8">{getRankIcon(listener.rank)}</div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={listener.avatar || "/placeholder.svg"} alt={listener.username} />
                <AvatarFallback>{listener.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{listener.username}</h3>
                  {listener.isCurrentUser && <Badge variant="secondary">You</Badge>}
                  {listener.rank <= 3 && <Badge variant="outline">Top 3</Badge>}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {listener.tokensEarned.toFixed(2)} AMPL
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {listener.hoursListened}h
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {listener.favoriteGenre}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-primary">{listener.tokensEarned.toFixed(0)}</div>
                <div className="text-xs text-muted-foreground">AMPL earned</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Want to climb the leaderboard? Listen more to earn AMPL tokens!
          </p>
          <Button size="sm">Start Listening</Button>
        </div>
      </CardContent>
    </Card>
  )
}
