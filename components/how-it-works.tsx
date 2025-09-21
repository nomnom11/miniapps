import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Play, Coins } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: "Connect wallet & create profile",
      description: "Support for Metamask, WalletConnect, and Coinbase Wallet",
      step: "01",
    },
    {
      icon: Play,
      title: "Play music on AMPLIFY player",
      description: "Stream from our catalog or connect your Spotify/YouTube",
      step: "02",
    },
    {
      icon: Coins,
      title: "Earn AMPL tokens",
      description: "Tokens are credited to your account and can be claimed on-chain",
      step: "03",
    },
  ]

  return (
    <section id="rewards" className="py-24 bg-card/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How it works</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Three simple steps to start earning AMPL tokens while enjoying your favorite music
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">{step.step}</div>

                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-balance">{step.title}</h3>

                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
