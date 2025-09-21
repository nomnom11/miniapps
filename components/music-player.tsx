"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { Play, Pause, SkipBack, SkipForward, Volume2, Coins, Heart, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRewards } from "@/contexts/rewards-context"
import { useWallet } from "@/contexts/wallet-context"
import { PlaylistSidebar, type Track } from "./playlist/playlist-sidebar"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isLiked, setIsLiked] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const progressInterval = useRef<NodeJS.Timeout>()

  const { isConnected } = useWallet()
  const { startEarning, stopEarning, updateProgress, pendingRewards, claimableRewards, claimRewards, isClaiming } =
    useRewards()

  const playlist: Track[] = [
    {
      id: "track-1",
      title: "Electronic Dreams",
      artist: "AMPLIFY Artist",
      coverUrl: "/electronic-music-album-cover-neon.png",
      duration: 240,
      audioUrl: "/audio/electronic-dreams.mp3",
    },
    {
      id: "track-2",
      title: "Whispers Of Distant Stars",
      artist: "StockTune",
      coverUrl: "/space-stars-cosmic.jpg",
      duration: 180,
      audioUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/StockTune-Whispers%20Of%20Distant%20Stars_1758406666-h5Kgk9osOXEwu2503ezwbJlmzcxldy.mp3",
    },
  ]

  const currentTrack = playlist[currentTrackIndex]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.volume = volume / 100
    }
  }, [currentTrack.audioUrl, volume])

  // Progress tracking with rewards integration
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          const newTime = Math.floor(audioRef.current.currentTime)
          setCurrentTime(newTime)
          updateProgress(newTime)

          // Auto-advance to next track when current ends
          if (newTime >= currentTrack.duration) {
            handleNextTrack()
          }
        }
      }, 1000)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying, currentTrack.duration, updateProgress])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.play()
      if (isConnected) {
        startEarning(currentTrack.id)
      }
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      stopEarning()
      setIsPlaying(false)
    }
  }

  const handlePreviousTrack = () => {
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1
    setCurrentTrackIndex(newIndex)
    setCurrentTime(0)
    if (isPlaying) {
      stopEarning()
      setTimeout(() => {
        if (isConnected) {
          startEarning(playlist[newIndex].id)
        }
      }, 100)
    }
  }

  const handleNextTrack = () => {
    const newIndex = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0
    setCurrentTrackIndex(newIndex)
    setCurrentTime(0)
    if (isPlaying) {
      stopEarning()
      setTimeout(() => {
        if (isConnected) {
          startEarning(playlist[newIndex].id)
        }
      }, 100)
    }
  }

  const handleTrackSelect = (track: Track) => {
    const trackIndex = playlist.findIndex((t) => t.id === track.id)
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex)
      setCurrentTime(0)
      if (isPlaying) {
        stopEarning()
        setTimeout(() => {
          if (isConnected) {
            startEarning(track.id)
          }
        }, 100)
      }
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleClaimRewards = async () => {
    await claimRewards()
  }

  if (!isVisible) return null

  return (
    <>
      <audio ref={audioRef} />

      <PlaylistSidebar
        isOpen={showPlaylist}
        onClose={() => setShowPlaylist(false)}
        tracks={playlist}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTrackSelect={handleTrackSelect}
        onTogglePlay={togglePlay}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-t">
        <Card className="rounded-none border-0 shadow-lg">
          <div className="flex items-center gap-4 p-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative">
                <img
                  src={currentTrack.coverUrl || "/placeholder.svg"}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm truncate">{currentTrack.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>

              <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)} className="shrink-0">
                <Heart className={cn("h-4 w-4", isLiked && "fill-primary text-primary")} />
              </Button>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handlePreviousTrack}>
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button onClick={togglePlay} size="sm" className="w-8 h-8 rounded-full">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </Button>

                <Button variant="ghost" size="sm" onClick={handleNextTrack}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
                <Slider
                  value={[currentTime]}
                  max={currentTrack.duration}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-10">{formatTime(currentTrack.duration)}</span>
              </div>
            </div>

            {/* Rewards & Volume */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              {/* Live Rewards */}
              {isConnected && (
                <div className="flex items-center gap-2 bg-card border rounded-full px-3 py-1.5">
                  <Coins className="h-4 w-4 text-secondary animate-pulse" />
                  <div className="text-sm">
                    <span className="text-xs text-muted-foreground">Earned:</span>
                    <span className="font-bold text-primary ml-1">{pendingRewards.toFixed(3)} AMPL</span>
                  </div>
                </div>
              )}

              {claimableRewards > 0.01 && (
                <Button
                  onClick={handleClaimRewards}
                  disabled={isClaiming}
                  size="sm"
                  variant="outline"
                  className="bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Coins className="h-4 w-4 mr-1" />
                  {isClaiming ? "Claiming..." : `Claim ${claimableRewards.toFixed(3)}`}
                </Button>
              )}

              {/* Volume Control */}
              <div className="hidden md:flex items-center gap-2 min-w-0">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-20" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={cn(showPlaylist && "bg-accent")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile-friendly bottom section */}
          <div className="md:hidden px-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-16" />
              </div>

              {claimableRewards > 0.01 && (
                <Button
                  onClick={handleClaimRewards}
                  disabled={isClaiming}
                  size="sm"
                  variant="outline"
                  className="bg-secondary/10 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
                  <Coins className="h-4 w-4 mr-1" />
                  {isClaiming ? "Claiming..." : `Claim ${claimableRewards.toFixed(3)}`}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
