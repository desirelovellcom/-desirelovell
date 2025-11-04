"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Play } from "lucide-react"

export function ControlPanel() {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Decision Parameters</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="initial-cost" className="text-sm font-medium text-foreground">
            Initial Investment
          </Label>
          <Input
            id="initial-cost"
            type="number"
            placeholder="50000"
            className="bg-secondary/50 border-border/50 text-foreground h-10"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="time-horizon" className="text-sm font-medium text-foreground">
            Time Horizon (months)
          </Label>
          <Slider id="time-horizon" defaultValue={[12]} max={60} step={1} className="py-2" />
          <span className="text-xs text-muted-foreground font-mono">12 months</span>
        </div>

        <div className="space-y-3">
          <Label htmlFor="discount-rate" className="text-sm font-medium text-foreground">
            Discount Rate (%)
          </Label>
          <Slider id="discount-rate" defaultValue={[5]} max={20} step={0.5} className="py-2" />
          <span className="text-xs text-muted-foreground font-mono">5%</span>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1 gap-2" size="default">
            <Plus className="h-4 w-4" />
            Add Decision
          </Button>
          <Button variant="outline" className="flex-1 gap-2 bg-transparent" size="default">
            <Play className="h-4 w-4" />
            Simulate
          </Button>
        </div>
      </div>
    </Card>
  )
}
