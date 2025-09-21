import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AMPLIFY Leaderboard</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image?type=leaderboard" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🎵 Start Listening" />
        <meta property="fc:frame:button:2" content="💰 My Rewards" />
        <meta property="fc:frame:button:3" content="🏠 Home" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard/action" />
      </head>
      <body>
        <h1>AMPLIFY Leaderboard</h1>
        <p>Top listeners this week</p>
        <p>Compete for the highest rewards!</p>
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
      case 1: // Start Listening
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`,
        })

      case 2: // My Rewards
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards?fid=${fid}`,
        })

      case 3: // Home
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`,
        })

      default:
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard`,
        })
    }
  } catch (error) {
    console.error("Leaderboard action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
