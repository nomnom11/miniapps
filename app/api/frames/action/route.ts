import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { buttonIndex, fid, castId } = body

    // Handle main frame actions
    switch (buttonIndex) {
      case 1: // Start Listening
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`)

      case 2: // View Rewards
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards?fid=${fid}`,
        )

      case 3: // Leaderboard
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/leaderboard`,
        )

      default:
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`)
    }
  } catch (error) {
    console.error("Frame action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
