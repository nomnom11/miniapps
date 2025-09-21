import { Music, Twitter, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">AMPLIFY</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              The future of music streaming with Web3 rewards. Earn AMPL tokens while enjoying your favorite tracks.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Platform</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                How it works
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                For Artists
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Leaderboard
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Browse Music
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Whitepaper
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Careers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on AMPLIFY features and token rewards.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://x.com/Amplifyearn" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://farcaster.xyz/amplifyearn" target="_blank" rel="noopener noreferrer">
                  <Image src="/farcaster-logo.jpg" alt="Farcaster" width={16} height={16} className="rounded-sm" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AMPLIFY. All rights reserved. Built with ❤️ for music lovers.</p>
        </div>
      </div>
    </footer>
  )
}
