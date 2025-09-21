import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Coins, Play } from "lucide-react"

export function ArtistStats() {
  const stats = [
    {
      title: "Total Plays",
      value: "12,847",
      change: "+12.5%",
      icon: Play,
      color: "text-primary",
    },
    {
      title: "Active Listeners",
      value: "2,341",
      change: "+8.2%",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "AMPL Earned",
      value: "1,247.83",
      change: "+15.3%",
      icon: Coins,
      color: "text-accent",
    },
    {
      title: "Revenue Share",
      value: "$892.45",
      change: "+9.7%",
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Artist Dashboard</h1>
        <p className="text-muted-foreground">Manage your music, track earnings, and engage with your audience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
