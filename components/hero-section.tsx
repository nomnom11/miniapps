"use client"

import { Button } from "@/components/ui/button"
import { Play, Coins, Headphones } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with sound wave animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path
              d="M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
              fill="url(#wave-gradient)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" className="text-primary" />
                <stop offset="50%" stopColor="currentColor" className="text-secondary" />
                <stop offset="100%" stopColor="currentColor" className="text-primary" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Floating icons */}
          <div className="absolute -top-20 -left-20 opacity-20">
            <Headphones className="h-24 w-24 text-primary animate-bounce" />
          </div>
          <div className="absolute -top-10 -right-20 opacity-20">
            <Coins className="h-20 w-20 text-secondary animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Get rewarded while you <span className="text-primary">listen</span> —{" "}
            <span className="text-secondary">Earn AMPL</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Put your playlists to work. Stream music, collect AMPL tokens.
          </p>

          <p className="text-lg text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
            Listen to music, earn AMPL — every play counts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 flex items-center gap-2">
              <Play className="h-5 w-5" />
              Start Listening & Earning
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              How it works
            </Button>
          </div>

          {/* Token animation preview */}
          <div className="mt-16 relative">
            <div className="inline-flex items-center gap-2 bg-card border rounded-full px-6 py-3">
              <div className="flex items-center gap-1">
                <Coins className="h-5 w-5 text-secondary animate-spin" />
                <span className="text-sm font-medium">Live rewards:</span>
              </div>
              <span className="text-lg font-bold text-primary">+0.25 AMPL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
