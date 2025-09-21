"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Calendar, DollarSign } from "lucide-react"

export function EarningsChart() {
  // Mock data for the chart
  const earningsData = [
    { month: "Jan", ampl: 120, usd: 85 },
    { month: "Feb", ampl: 180, usd: 125 },
    { month: "Mar", ampl: 240, usd: 170 },
    { month: "Apr", ampl: 320, usd: 225 },
    { month: "May", ampl: 280, usd: 195 },
    { month: "Jun", ampl: 380, usd: 265 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Earnings Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1,247.83</div>
            <div className="text-sm text-muted-foreground">Total AMPL Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">$892.45</div>
            <div className="text-sm text-muted-foreground">USD Equivalent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">+15.3%</div>
            <div className="text-sm text-muted-foreground">Growth This Month</div>
          </div>
        </div>

        {/* Simple bar chart representation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Monthly Earnings
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>AMPL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>USD</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {earningsData.map((data, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{data.month}</span>
                  <span className="text-muted-foreground">
                    {data.ampl} AMPL • ${data.usd}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(data.ampl / 400) * 100}%` }}></div>
                  <div className="bg-secondary h-2 rounded-full" style={{ width: `${(data.usd / 300) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-medium">Payout Information</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Earnings are calculated based on listening time and your royalty split. Payouts occur monthly on the 1st.
            Minimum payout: 100 AMPL.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
