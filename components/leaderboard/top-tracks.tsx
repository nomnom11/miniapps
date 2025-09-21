"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Heart, Share2, TrendingUp } from "lucide-react"

export function TopTracks() {
  const tracks = [
    {
      rank: 1,
      title: "Electronic Dreams",
      artist: "AMPLIFY Artist",
      coverUrl: "/electronic-music-album-cover-neon.png",
      plays: 15847,
      likes: 2341,
      tokensDistributed: 1247.32,
      genre: "Electronic",
      trending: true,
    },
    {
      rank: 2,
      title: "Neon Nights",
      artist: "SynthWave Pro",
      coverUrl: "/neon-music-album.jpg",
      plays: 12456,
      likes: 1876,
      tokensDistributed: 987.65,
      genre: "Synthwave",
      trending: false,
    },
    {
      rank: 3,
      title: "Digital Waves",
      artist: "Future Beats",
      coverUrl: "/digital-waves-album.jpg",
      plays: 9834,
      likes: 1543,
      tokensDistributed: 756.43,
      genre: "Ambient",
      trending: true,
    },
    {
      rank: 4,
      title: "Cyber Pulse",
      artist: "Tech Sounds",
      coverUrl: "/placeholder.svg?height=60&width=60",
      plays: 8765,
      likes: 1234,
      tokensDistributed: 654.32,
      genre: "Techno",
      trending: false,
    },
    {
      rank: 5,
      title: "Virtual Reality",
      artist: "Digital Dreams",
      coverUrl: "/placeholder.svg?height=60&width=60",
      plays: 7654,
      likes: 987,
      tokensDistributed: 543.21,
      genre: "Electronic",
      trending: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Trending Tracks</span>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tracks.map((track) => (
            <div key={track.rank} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-center w-8">
                <span className="text-lg font-bold text-muted-foreground">#{track.rank}</span>
              </div>

              <img
                src={track.coverUrl || "/placeholder.svg"}
                alt={track.title}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{track.title}</h3>
                  {track.trending && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span>{track.plays.toLocaleString()} plays</span>
                  <span>{track.likes.toLocaleString()} likes</span>
                  <Badge variant="outline" className="text-xs">
                    {track.genre}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <div className="text-sm font-bold text-primary">{track.tokensDistributed.toFixed(0)} AMPL</div>
                  <div className="text-xs text-muted-foreground">distributed</div>
                </div>

                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Discover more trending tracks and earn AMPL while you listen!
          </p>
          <Button size="sm">Explore Music</Button>
        </div>
      </CardContent>
    </Card>
  )
}
