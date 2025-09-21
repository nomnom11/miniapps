import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { buttonIndex, fid } = body

    switch (buttonIndex) {
      case 1: // Claim Now
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/claim-success?fid=${fid}`,
        )

      case 2: // Keep Listening
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`)

      case 3: // Leaderboard
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard`,
        )

      case 4: // Home
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`)

      default:
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards`,
        )
    }
  } catch (error) {
    console.error("Rewards action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
