"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MoreHorizontal, TrendingUp, Users, Coins } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TrackManagement() {
  const tracks = [
    {
      id: 1,
      title: "Electronic Dreams",
      status: "Published",
      plays: 3247,
      listeners: 892,
      earned: 45.67,
      coverUrl: "/electronic-music-album-cover-neon.png",
    },
    {
      id: 2,
      title: "Neon Nights",
      status: "Published",
      plays: 1856,
      listeners: 543,
      earned: 28.34,
      coverUrl: "/neon-music-album.jpg",
    },
    {
      id: 3,
      title: "Digital Waves",
      status: "Processing",
      plays: 0,
      listeners: 0,
      earned: 0,
      coverUrl: "/digital-waves-album.jpg",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tracks.map((track) => (
            <div key={track.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={track.coverUrl || "/placeholder.svg"}
                alt={track.title}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{track.title}</h3>
                  <Badge variant={track.status === "Published" ? "default" : "secondary"}>{track.status}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    {track.plays.toLocaleString()} plays
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {track.listeners.toLocaleString()} listeners
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    {track.earned} AMPL
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Track</DropdownMenuItem>
                    <DropdownMenuItem>Update Artwork</DropdownMenuItem>
                    <DropdownMenuItem>Adjust Royalty Split</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove Track</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
