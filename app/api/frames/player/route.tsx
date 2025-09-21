import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AMPLIFY Player - Now Playing</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image?type=player" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="⏸️ Pause" />
        <meta property="fc:frame:button:2" content="⏭️ Next" />
        <meta property="fc:frame:button:3" content="💰 Claim" />
        <meta property="fc:frame:button:4" content="🏠 Home" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player/action" />
      </head>
      <body>
        <h1>AMPLIFY Player</h1>
        <p>Now playing: Whispers Of Distant Stars</p>
        <p>Earning: 0.001 AMPL per second</p>
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
      case 1: // Pause/Play
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`,
        })

      case 2: // Next Track
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`,
        })

      case 3: // Claim Rewards
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards?fid=${fid}`,
        })

      case 4: // Home
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`,
        })

      default:
        return NextResponse.json({
          type: "frame",
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`,
        })
    }
  } catch (error) {
    console.error("Player action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
