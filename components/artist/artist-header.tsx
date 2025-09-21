"use client"

import { Button } from "@/components/ui/button"
import { Music, ArrowLeft, Settings } from "lucide-react"
import { WalletButton } from "@/components/wallet-button"
import Link from "next/link"

export function ArtistHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">AMPLIFY</span>
            <span className="text-sm bg-secondary/20 text-secondary px-2 py-1 rounded-full">Artist</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <WalletButton />
        </div>
      </div>
    </header>
  )
}
