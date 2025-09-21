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
          <circle cx="200" cy="200" r="80" fill="none" stroke="url(#accent)" strokeWidth="4"/>
          <circle cx="200" cy="200" r="60" fill="none" stroke="#ffffff" strokeWidth="2"/>
          <text x="200" y="210" textAnchor="middle" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold">AMPL</text>
          
          <!-- Main Content -->
          <text x="400" y="180" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold">🎵 Now Playing</text>
          <text x="400" y="230" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="24">Whispers Of Distant Stars</text>
          <text x="400" y="270" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="20">Earning: 0.001 AMPL/sec</text>
          
          <!-- Progress Bar -->
          <rect x="400" y="320" width="600" height="8" rx="4" fill="#374151"/>
          <rect x="400" y="320" width="200" height="8" rx="4" fill="url(#accent)"/>
          
          <!-- Stats -->
          <text x="400" y="380" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="20">💰 Total Earned: 12.45 AMPL</text>
          <text x="400" y="420" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="20">🏆 Rank: #42 this week</text>
          
          <!-- Call to Action -->
          <rect x="400" y="480" width="300" height="60" rx="30" fill="url(#accent)"/>
          <text x="550" y="520" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">Listen & Earn</text>
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
          <circle cx="150" cy="100" r="40" fill="none" stroke="url(#accent)" strokeWidth="3"/>
          <text x="150" y="108" textAnchor="middle" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold">AMPL</text>
          
          <!-- Main Content -->
          <text x="600" y="120" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="56" fontWeight="bold">💰 Your Rewards</text>
          
          <!-- Reward Stats -->
          <rect x="200" y="200" width="800" height="300" rx="20" fill="#1f2937" stroke="url(#accent)" strokeWidth="2"/>
          
          <text x="600" y="260" textAnchor="middle" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold">124.67 AMPL</text>
          <text x="600" y="300" textAnchor="middle" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="24">Total Earned</text>
          
          <text x="400" y="360" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">🎵 Songs Played: 1,247</text>
          <text x="800" y="360" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">⏱️ Hours Listened: 52.3</text>
          
          <text x="400" y="400" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">🏆 Current Rank: #42</text>
          <text x="800" y="400" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">🔥 Streak: 7 days</text>
          
          <!-- Claim Button -->
          <rect x="450" y="440" width="300" height="50" rx="25" fill="url(#accent)"/>
          <text x="600" y="472" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">Claim Rewards</text>
        </svg>
      `

    case "claim-success":
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
            <linearGradient id="success" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <rect width="1200" height="630" fill="url(#bg)"/>
          
          <!-- Success Icon -->
          <circle cx="600" cy="200" r="80" fill="url(#success)" opacity="0.2"/>
          <circle cx="600" cy="200" r="60" fill="none" stroke="url(#success)" strokeWidth="4"/>
          <text x="600" y="220" textAnchor="middle" fill="url(#success)" fontFamily="Arial, sans-serif" fontSize="48">✓</text>
          
          <!-- Main Content -->
          <text x="600" y="320" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold">🎉 Claim Successful!</text>
          <text x="600" y="370" textAnchor="middle" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="28">124.67 AMPL tokens claimed</text>
          
          <!-- Stats -->
          <text x="600" y="450" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">Keep listening to earn more rewards!</text>
          
          <!-- Continue Button -->
          <rect x="450" y="500" width="300" height="60" rx="30" fill="url(#accent)"/>
          <text x="600" y="540" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">Continue Earning</text>
        </svg>
      `

    case "leaderboard":
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
          <circle cx="150" cy="100" r="40" fill="none" stroke="url(#accent)" strokeWidth="3"/>
          <text x="150" y="108" textAnchor="middle" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold">AMPL</text>
          
          <!-- Title -->
          <text x="600" y="120" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="56" fontWeight="bold">🏆 Leaderboard</text>
          
          <!-- Leaderboard -->
          <rect x="200" y="180" width="800" height="350" rx="20" fill="#1f2937" stroke="url(#accent)" strokeWidth="2"/>
          
          <!-- Top 3 -->
          <text x="250" y="230" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">🥇 CryptoMelody</text>
          <text x="850" y="230" textAnchor="end" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">2,847 AMPL</text>
          
          <text x="250" y="270" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">🥈 BeatMaster</text>
          <text x="850" y="270" textAnchor="end" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">2,156 AMPL</text>
          
          <text x="250" y="310" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">🥉 SoundWave</text>
          <text x="850" y="310" textAnchor="end" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24">1,923 AMPL</text>
          
          <!-- Your Position -->
          <rect x="220" y="350" width="760" height="40" rx="20" fill="url(#accent)" opacity="0.2"/>
          <text x="250" y="375" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">#42 You</text>
          <text x="850" y="375" textAnchor="end" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="20">124 AMPL</text>
          
          <!-- Call to Action -->
          <text x="600" y="450" textAnchor="middle" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="20">Listen more to climb the ranks!</text>
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
          <circle cx="600" cy="200" r="80" fill="none" stroke="url(#accent)" strokeWidth="6"/>
          <circle cx="600" cy="200" r="60" fill="none" stroke="#ffffff" strokeWidth="3"/>
          <text x="600" y="215" textAnchor="middle" fill="url(#accent)" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold">AMPLIFY</text>
          
          <!-- Main Text -->
          <text x="600" y="320" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold">Listen to Music, Earn AMPL</text>
          <text x="600" y="370" textAnchor="middle" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="28">Every play counts — Start earning tokens now</text>
          
          <!-- Features -->
          <text x="300" y="450" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="20">🎵 Stream Music</text>
          <text x="600" y="450" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="20">💰 Earn Tokens</text>
          <text x="900" y="450" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="20">🏆 Compete</text>
          
          <!-- Call to Action -->
          <rect x="450" y="500" width="300" height="60" rx="30" fill="url(#accent)"/>
          <text x="600" y="540" textAnchor="middle" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">Start Earning</text>
        </svg>
      `
  }
}
