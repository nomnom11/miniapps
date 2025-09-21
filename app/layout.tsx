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
  manifest: "/manifest.json",
  themeColor: "#ef4444",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AMPLIFY",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AMPLIFY" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[PWA] SW registered: ', registration);
                    }, function(err) {
                      console.log('[PWA] SW registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
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
