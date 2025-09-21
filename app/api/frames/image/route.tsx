import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type") || "main"

  // Generate dynamic frame image based on type
  const svg = generateFrameImage(type)

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

function generateFrameImage(type: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  switch (type) {
    case "player":
      return `
        <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <rect width="1200" height="630" fill="url(#bg)"/>
          
          <!-- Logo Area -->
          <circle cx="200" cy="200" r="80" fill="none" stroke="url(#accent)" stroke-width="4"/>
          <circle cx="200" cy="200" r="60" fill="none" stroke="#ffffff" stroke-width="2"/>
          <text x="200" y="210" text-anchor="middle" fill="url(#accent)" font-family="Arial, sans-serif" font-size="32" font-weight="bold">AMPL</text>
          
          <!-- Main Content -->
          <text x="400" y="180" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="bold">🎵 Now Playing</text>
          <text x="400" y="230" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="24">Whispers Of Distant Stars</text>
          <text x="400" y="270" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="20">Earning: 0.001 AMPL/sec</text>
          
          <!-- Progress Bar -->
          <rect x="400" y="320" width="600" height="8" rx="4" fill="#374151"/>
          <rect x="400" y="320" width="200" height="8" rx="4" fill="url(#accent)"/>
          
          <!-- Stats -->
          <text x="400" y="380" fill="#ffffff" font-family="Arial, sans-serif" font-size="20">💰 Total Earned: 12.45 AMPL</text>
          <text x="400" y="420" fill="#ffffff" font-family="Arial, sans-serif" font-size="20">🏆 Rank: #42 this week</text>
          
          <!-- Call to Action -->
          <rect x="400" y="480" width="300" height="60" rx="30" fill="url(#accent)"/>
          <text x="550" y="520" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="bold">Listen & Earn</text>
        </svg>
      `

    case "rewards":
      return `
        <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <rect width="1200" height="630" fill="url(#bg)"/>
          
          <!-- Logo -->
          <circle cx="150" cy="100" r="40" fill="none" stroke="url(#accent)" stroke-width="3"/>
          <text x="150" y="108" text-anchor="middle" fill="url(#accent)" font-family="Arial, sans-serif" font-size="16" font-weight="bold">AMPL</text>
          
          <!-- Main Content -->
          <text x="600" y="120" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="56" font-weight="bold">💰 Your Rewards</text>
          
          <!-- Reward Stats -->
          <rect x="200" y="200" width="800" height="300" rx="20" fill="#1f2937" stroke="url(#accent)" stroke-width="2"/>
          
          <text x="600" y="260" text-anchor="middle" fill="url(#accent)" font-family="Arial, sans-serif" font-size="48" font-weight="bold">124.67 AMPL</text>
          <text x="600" y="300" text-anchor="middle" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="24">Total Earned</text>
          
          <text x="400" y="360" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">🎵 Songs Played: 1,247</text>
          <text x="800" y="360" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">⏱️ Hours Listened: 52.3</text>
          
          <text x="400" y="400" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">🏆 Current Rank: #42</text>
          <text x="800" y="400" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24">🔥 Streak: 7 days</text>
          
          <!-- Claim Button -->
          <rect x="450" y="440" width="300" height="50" rx="25" fill="url(#accent)"/>
          <text x="600" y="472" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="bold">Claim Rewards</text>
        </svg>
      `

    default:
      return `
        <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <rect width="1200" height="630" fill="url(#bg)"/>
          
          <!-- Logo -->
          <circle cx="600" cy="200" r="80" fill="none" stroke="url(#accent)" stroke-width="6"/>
          <circle cx="600" cy="200" r="60" fill="none" stroke="#ffffff" stroke-width="3"/>
          <text x="600" y="215" text-anchor="middle" fill="url(#accent)" font-family="Arial, sans-serif" font-size="36" font-weight="bold">AMPLIFY</text>
          
          <!-- Main Text -->
          <text x="600" y="320" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="48" font-weight="bold">Listen to Music, Earn AMPL</text>
          <text x="600" y="370" text-anchor="middle" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="28">Every play counts — Start earning tokens now</text>
          
          <!-- Features -->
          <text x="300" y="450" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="20">🎵 Stream Music</text>
          <text x="600" y="450" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="20">💰 Earn Tokens</text>
          <text x="900" y="450" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="20">🏆 Compete</text>
          
          <!-- Call to Action -->
          <rect x="450" y="500" width="300" height="60" rx="30" fill="url(#accent)"/>
          <text x="600" y="540" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="bold">Start Earning</text>
        </svg>
      `
  }
}
