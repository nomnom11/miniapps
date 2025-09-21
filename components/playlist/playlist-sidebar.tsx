"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, Music, Heart, MoreHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  duration: number
  audioUrl: string
}

interface PlaylistSidebarProps {
  isOpen: boolean
  onClose: () => void
  tracks: Track[]
  currentTrack: Track | null
  isPlaying: boolean
  onTrackSelect: (track: Track) => void
  onTogglePlay: () => void
}

export function PlaylistSidebar({
  isOpen,
  onClose,
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onTogglePlay,
}: PlaylistSidebarProps) {
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set())

  const toggleLike = (trackId: string) => {
    const newLiked = new Set(likedTracks)
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId)
    } else {
      newLiked.add(trackId)
    }
    setLikedTracks(newLiked)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto">
      {/* Mobile overlay */}
      <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <Card className="absolute right-0 top-0 h-full w-80 lg:w-96 bg-background border-l shadow-xl lg:shadow-none lg:relative lg:h-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Current Playlist</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-80px)] lg:h-96">
          <div className="p-2">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors",
                  currentTrack?.id === track.id && "bg-accent",
                )}
                onClick={() => onTrackSelect(track)}
              >
                {/* Track Number / Play Button */}
                <div className="w-8 h-8 flex items-center justify-center">
                  {currentTrack?.id === track.id ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        onTogglePlay()
                      }}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  ) : (
                    <span className="text-sm text-muted-foreground font-mono">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Cover Art */}
                <div className="relative">
                  <img
                    src={track.coverUrl || "/placeholder.svg?height=40&width=40"}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  {currentTrack?.id === track.id && isPlaying && (
                    <div className="absolute inset-0 bg-primary/20 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={cn("font-medium text-sm truncate", currentTrack?.id === track.id && "text-primary")}>
                    {track.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>

                {/* Duration */}
                <span className="text-xs text-muted-foreground font-mono">{formatTime(track.duration)}</span>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(track.id)
                    }}
                  >
                    <Heart className={cn("h-4 w-4", likedTracks.has(track.id) && "fill-primary text-primary")} />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Playlist Stats */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{tracks.length} tracks</span>
            <span>{formatTime(tracks.reduce((total, track) => total + track.duration, 0))} total</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
