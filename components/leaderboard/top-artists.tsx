"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Music, Share2, UserPlus } from "lucide-react"

export function TopArtists() {
  const artists = [
    {
      rank: 1,
      name: "AMPLIFY Artist",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 15847,
      tracks: 12,
      totalEarnings: 3247.32,
      genre: "Electronic",
      verified: true,
    },
    {
      rank: 2,
      name: "SynthWave Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 12456,
      tracks: 8,
      totalEarnings: 2987.65,
      genre: "Synthwave",
      verified: true,
    },
    {
      rank: 3,
      name: "Future Beats",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 9834,
      tracks: 15,
      totalEarnings: 2756.43,
      genre: "Ambient",
      verified: false,
    },
    {
      rank: 4,
      name: "Tech Sounds",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 8765,
      tracks: 6,
      totalEarnings: 2154.32,
      genre: "Techno",
      verified: true,
    },
    {
      rank: 5,
      name: "Digital Dreams",
      avatar: "/placeholder.svg?height=40&width=40",
      followers: 7654,
      tracks: 10,
      totalEarnings: 1943.21,
      genre: "Electronic",
      verified: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Top Artists</span>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {artists.map((artist) => (
            <div key={artist.rank} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-center w-8">
                <span className="text-lg font-bold text-muted-foreground">#{artist.rank}</span>
              </div>

              <Avatar className="h-12 w-12">
                <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
                <AvatarFallback>{artist.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{artist.name}</h3>
                  {artist.verified && <Badge variant="secondary">Verified</Badge>}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {artist.followers.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Music className="h-3 w-3" />
                    {artist.tracks} tracks
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {artist.genre}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <div className="text-sm font-bold text-primary">{artist.totalEarnings.toFixed(0)} AMPL</div>
                  <div className="text-xs text-muted-foreground">earned</div>
                </div>

                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Support your favorite artists by listening to their tracks!
          </p>
          <Button size="sm">Discover Artists</Button>
        </div>
      </CardContent>
    </Card>
  )
}
