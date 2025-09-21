"use client"

import { WalletButton } from "./wallet-button"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/amplify-logo.png" alt="AMPLIFY Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-2xl font-bold text-primary">AMPLIFY</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/#home" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <Link href="/rewards" className="text-sm font-medium hover:text-primary transition-colors">
            Rewards
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <a href="#community" className="text-sm font-medium hover:text-primary transition-colors">
            Community
          </a>
          <Link href="/artist">
            <Button variant="outline" size="sm">
              For Artists
            </Button>
          </Link>
        </nav>

        <WalletButton />
      </div>
    </header>
  )
}
