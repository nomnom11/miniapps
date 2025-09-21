"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ImageIcon, Coins } from "lucide-react"

export function NFTMinting() {
  const [isMinting, setIsMinting] = useState(false)

  const handleMint = async () => {
    setIsMinting(true)
    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsMinting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Mint Exclusive NFT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nft-name">NFT Name</Label>
          <Input id="nft-name" placeholder="Limited Edition Album Art" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nft-description">Description</Label>
          <Textarea id="nft-description" placeholder="Exclusive artwork for top listeners..." rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="supply">Total Supply</Label>
            <Input id="supply" placeholder="100" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (AMPL)</Label>
            <Input id="price" placeholder="50" type="number" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Unlock Criteria</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Top 100 Listeners</Badge>
            <Badge variant="outline">50+ Hours Listened</Badge>
            <Badge variant="outline">Early Supporter</Badge>
          </div>
        </div>

        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">Upload NFT artwork</p>
          <Button variant="outline" size="sm">
            Choose Image
          </Button>
          <p className="text-xs text-muted-foreground mt-2">JPG, PNG, GIF up to 10MB</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">Minting Cost</span>
          </div>
          <p className="text-xs text-muted-foreground">Gas fees: ~0.01 ETH • Platform fee: 2.5% of sales</p>
        </div>

        <Button onClick={handleMint} disabled={isMinting} className="w-full">
          {isMinting ? "Minting NFT..." : "Mint NFT Collection"}
        </Button>
      </CardContent>
    </Card>
  )
}
