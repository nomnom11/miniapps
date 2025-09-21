import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { buttonIndex, fid } = body

    switch (buttonIndex) {
      case 1: // Start Listening
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`)

      case 2: // My Rewards
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards?fid=${fid}`,
        )

      case 3: // Home
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`)

      default:
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard`,
        )
    }
  } catch (error) {
    console.error("Leaderboard action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
