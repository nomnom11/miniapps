import { RewardsDashboard } from "@/components/rewards/rewards-dashboard"
import { Header } from "@/components/header"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <RewardsDashboard />
      </main>
    </div>
  )
}
