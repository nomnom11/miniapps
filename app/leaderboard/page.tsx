import { Header } from "@/components/header"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"
import { SocialFeed } from "@/components/social/social-feed"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Leaderboards</h1>
            <p className="text-muted-foreground">
              See who's leading the AMPLIFY community in listening, earning, and supporting artists
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LeaderboardTabs />
            </div>
            <div>
              <SocialFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
