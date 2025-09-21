import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AMPLIFY - Listen to Music, Earn AMPL Tokens",
  description:
    "Every play counts. Start earning AMPL tokens by listening to music on the decentralized music platform.",
  openGraph: {
    title: "AMPLIFY - Listen to Music, Earn AMPL Tokens",
    description: "Every play counts. Start earning AMPL tokens by listening to music.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image`,
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "🎵 Start Listening",
    "fc:frame:button:2": "💰 View Rewards",
    "fc:frame:button:3": "🏆 Leaderboard",
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/action`,
  },
}

export default function FramePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">AMPLIFY Frame</h1>
        <p className="text-xl text-muted-foreground">Listen to Music, Earn AMPL Tokens</p>
        <p className="text-muted-foreground">This page is optimized for Farcaster Frames</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Open Full App
        </a>
      </div>
    </div>
  )
}
