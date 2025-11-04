"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DecisionGraph } from "@/components/decision-graph"
import { TimelineView } from "@/components/timeline-view"
import { Button } from "@/components/ui/button"
import { BarChart3, Network } from "lucide-react"

export function DecisionVisualizer() {
  const [viewMode, setViewMode] = useState<"graph" | "timeline">("graph")

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Decision Network</h2>
          <p className="text-sm text-muted-foreground mt-1">Visualize future cost implications</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "graph" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("graph")}
            className="gap-2"
          >
            <Network className="h-4 w-4" />
            Graph
          </Button>
          <Button
            variant={viewMode === "timeline" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("timeline")}
            className="gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Timeline
          </Button>
        </div>
      </div>

      <div className="min-h-[500px] lg:min-h-[600px] bg-secondary/20 rounded-lg border border-border/50 overflow-hidden">
        {viewMode === "graph" ? <DecisionGraph /> : <TimelineView />}
      </div>
    </Card>
  )
}
