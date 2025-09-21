import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AMPLIFY - Earn AMPL Tokens</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🎵 Start Listening" />
        <meta property="fc:frame:button:2" content="💰 View Rewards" />
        <meta property="fc:frame:button:3" content="🏆 Leaderboard" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/action" />
        
        <!-- Open Graph -->
        <meta property="og:title" content="AMPLIFY - Listen to Music, Earn AMPL Tokens" />
        <meta property="og:description" content="Every play counts. Start earning AMPL tokens by listening to music on the decentralized music platform." />
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image" />
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AMPLIFY - Listen to Music, Earn AMPL Tokens" />
        <meta name="twitter:description" content="Every play counts. Start earning AMPL tokens by listening to music." />
        <meta name="twitter:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image" />
      </head>
      <body>
        <h1>AMPLIFY - Listen to Music, Earn AMPL Tokens</h1>
        <p>Every play counts. Connect your wallet and start earning AMPL tokens by listening to music.</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}">Open AMPLIFY Platform</a>
      </body>
    </html>
  `

  return new NextResponse(frameHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { buttonIndex, fid } = body

    // Handle different button actions
    switch (buttonIndex) {
      case 1: // Start Listening
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`,
        })

      case 2: // View Rewards
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards?fid=${fid}`,
        })

      case 3: // Leaderboard
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard`,
        })

      default:
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`,
        })
    }
  } catch (error) {
    console.error("Frame action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
