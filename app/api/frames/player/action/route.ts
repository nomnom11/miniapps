import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { buttonIndex, fid } = body

    switch (buttonIndex) {
      case 1: // Pause/Play
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`)

      case 2: // Next Track
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`)

      case 3: // Claim Rewards
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/rewards?fid=${fid}`,
        )

      case 4: // Home
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames`)

      default:
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/frames/player`)
    }
  } catch (error) {
    console.error("Player action error:", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
