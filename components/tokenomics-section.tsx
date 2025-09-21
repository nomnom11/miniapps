import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Shield, Clock, TrendingUp } from "lucide-react"

export function TokenomicsSection() {
  const tokenStats = [
    {
      icon: Coins,
      label: "Ticker",
      value: "AMPL",
      description: "Official token symbol",
    },
    {
      icon: TrendingUp,
      label: "Total Supply",
      value: "1B",
      description: "Maximum token supply",
    },
    {
      icon: Shield,
      label: "Reward Pool",
      value: "30%",
      description: "Allocated for user rewards",
    },
    {
      icon: Clock,
      label: "Claiming",
      value: "Real-time",
      description: "Instant token claiming",
    },
  ]

  return (
    <section className="py-24 bg-card/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Tokenomics</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Understanding the AMPL token economy and reward distribution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground text-pretty">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Token Distribution</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30%</div>
                  <div className="font-medium mb-1">User Rewards</div>
                  <div className="text-sm text-muted-foreground">For listening and engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">25%</div>
                  <div className="font-medium mb-1">Artist Payouts</div>
                  <div className="text-sm text-muted-foreground">Revenue sharing with creators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">45%</div>
                  <div className="font-medium mb-1">Development & Operations</div>
                  <div className="text-sm text-muted-foreground">Platform development and growth</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
