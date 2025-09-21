"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Trophy, Music, Coins } from "lucide-react"

export function SocialFeed() {
  const activities = [
    {
      id: 1,
      type: "achievement",
      user: "MusicLover2024",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Reached #1 on the listeners leaderboard!",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      badge: "Top Listener",
    },
    {
      id: 2,
      type: "track",
      user: "BeatHunter",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Just discovered 'Electronic Dreams' - earning so many AMPL tokens!",
      timestamp: "4 hours ago",
      likes: 18,
      comments: 3,
      trackTitle: "Electronic Dreams",
    },
    {
      id: 3,
      type: "milestone",
      user: "SoundWave",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Earned 1000 AMPL tokens! 🎉",
      timestamp: "6 hours ago",
      likes: 32,
      comments: 8,
      milestone: "1000 AMPL",
    },
    {
      id: 4,
      type: "artist_support",
      user: "RhythmMaster",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Supporting AMPLIFY Artist by listening to their entire album",
      timestamp: "8 hours ago",
      likes: 15,
      comments: 2,
      artistName: "AMPLIFY Artist",
    },
    {
      id: 5,
      type: "achievement",
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Completed 50 hours of listening time!",
      timestamp: "1 day ago",
      likes: 12,
      comments: 4,
      badge: "Dedicated Listener",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case "track":
        return <Music className="h-4 w-4 text-primary" />
      case "milestone":
        return <Coins className="h-4 w-4 text-secondary" />
      case "artist_support":
        return <Heart className="h-4 w-4 text-red-500" />
      default:
        return <Music className="h-4 w-4 text-primary" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 p-3 rounded-lg border bg-card/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>{activity.user.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{activity.user}</span>
                  {getActivityIcon(activity.type)}
                  {activity.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.badge}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-2">{activity.content}</p>

                {activity.trackTitle && <div className="text-xs text-primary mb-2">♪ {activity.trackTitle}</div>}

                {activity.milestone && <div className="text-xs text-secondary mb-2">🎯 {activity.milestone}</div>}

                {activity.artistName && <div className="text-xs text-accent mb-2">🎤 {activity.artistName}</div>}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{activity.timestamp}</span>
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="h-3 w-3" />
                    {activity.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle className="h-3 w-3" />
                    {activity.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-secondary transition-colors">
                    <Share2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            Load More Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
