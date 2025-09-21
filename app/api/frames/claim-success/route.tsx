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
        <title>AMPLIFY - Claim Success</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/image?type=claim-success" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🎵 Keep Listening" />
        <meta property="fc:frame:button:2" content="🏆 View Leaderboard" />
        <meta property="fc:frame:button:3" content="🏠 Home" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/claim-success/action" />
      </head>
      <body>
        <h1>🎉 Claim Successful!</h1>
        <p>Your AMPL tokens have been claimed successfully!</p>
        <p>Keep listening to earn more rewards.</p>
      </body>
    </html>
  `

  return new NextResponse(frameHtml, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}
