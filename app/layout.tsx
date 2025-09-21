import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { WalletProvider } from "@/contexts/wallet-context"
import { RewardsProvider } from "@/contexts/rewards-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "AMPLIFY - Earn AMPL while you listen to music",
  description:
    "Amplify your listening. Stream music and get rewarded with AMPL tokens. Connect your wallet and start earning today.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <WalletProvider>
          <RewardsProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </RewardsProvider>
        </WalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
