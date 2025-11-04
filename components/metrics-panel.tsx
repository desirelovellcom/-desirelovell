"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react"

export function MetricsPanel() {
  const metrics = [
    {
      label: "Net Present Value",
      value: "$127,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Payback Period",
      value: "8.2 months",
      change: "-2.1 months",
      trend: "up",
      icon: Clock,
    },
    {
      label: "ROI",
      value: "254%",
      change: "+18%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Risk Score",
      value: "3.2/10",
      change: "-0.8",
      trend: "up",
      icon: TrendingDown,
    },
  ]

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Key Metrics</h3>

      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div
              key={index}
              className="bg-secondary/30 rounded-lg p-4 border border-border/50 hover:bg-secondary/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {metric.label}
                </span>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-foreground">{metric.value}</span>
                <span className={`text-xs font-semibold ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
