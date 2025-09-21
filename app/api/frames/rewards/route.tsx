import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const fid = searchParams.get("fid")

  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AMPLIFY Rewards</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image?type=rewards" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="💰 Claim Now" />
        <meta property="fc:frame:button:2" content="🎵 Keep Listening" />
        <meta property="fc:frame:button:3" content="🏆 Leaderboard" />
        <meta property="fc:frame:button:4" content="🏠 Home" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards/action" />
      </head>
      <body>
        <h1>Your AMPLIFY Rewards</h1>
        <p>Total Earned: 124.67 AMPL</p>
        <p>Ready to claim your tokens!</p>
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

    switch (buttonIndex) {
      case 1: // Claim Now
        // Here you would integrate with your smart contract to claim tokens
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/claim-success?fid=${fid}`,
        })

      case 2: // Keep Listening
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`,
        })

      case 3: // Leaderboard
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard`,
        })

      case 4: // Home
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`,
        })

      default:
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards`,
        })
    }
  } catch (error) {
    console.error("Rewards action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
