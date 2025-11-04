import { DecisionVisualizer } from "@/components/decision-visualizer"
import { ControlPanel } from "@/components/control-panel"
import { MetricsPanel } from "@/components/metrics-panel"

export default function Page() {
  return (
    <div className="min-h-screen gradient-bg">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">desirelovell</h1>
              <p className="text-sm text-muted-foreground mt-1">Decision Cost Analysis Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono px-3 py-1 bg-secondary/50 rounded-full border border-border/50">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8">
            <DecisionVisualizer />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <ControlPanel />
            <MetricsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
