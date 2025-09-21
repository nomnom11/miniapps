import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Gift, Crown } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time rewards tracking",
      description: "Watch your AMPL tokens grow as you listen to your favorite tracks",
    },
    {
      icon: Users,
      title: "Artist payouts & split royalty",
      description: "Support your favorite artists with transparent revenue sharing",
    },
    {
      icon: Gift,
      title: "NFT drops & exclusive content",
      description: "Access exclusive content and limited NFT drops for active listeners",
    },
    {
      icon: Crown,
      title: "Leaderboards & social sharing",
      description: "Compete with friends and share your music achievements",
    },
  ]

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Features that amplify your experience</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover the powerful features that make AMPLIFY the ultimate music streaming platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-balance">{feature.title}</h3>

                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
