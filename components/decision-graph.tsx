"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"

interface Node {
  id: string
  label: string
  cost: number
  x: number
  y: number
  connections: string[]
  type: "decision" | "outcome" | "cost"
}

export function DecisionGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodes] = useState<Node[]>([
    { id: "1", label: "Initial Decision", cost: 0, x: 150, y: 300, connections: ["2", "3"], type: "decision" },
    { id: "2", label: "Option A: Invest Now", cost: 50000, x: 350, y: 200, connections: ["4", "5"], type: "outcome" },
    { id: "3", label: "Option B: Wait 6 Months", cost: 5000, x: 350, y: 400, connections: ["6"], type: "outcome" },
    { id: "4", label: "Year 1 Revenue", cost: -120000, x: 600, y: 150, connections: ["7"], type: "cost" },
    { id: "5", label: "Year 1 Maintenance", cost: 15000, x: 600, y: 250, connections: ["7"], type: "cost" },
    { id: "6", label: "Delayed Start Cost", cost: 80000, x: 600, y: 400, connections: ["8"], type: "cost" },
    { id: "7", label: "Net: -$55K", cost: -55000, x: 850, y: 200, connections: [], type: "outcome" },
    { id: "8", label: "Net: $85K", cost: 85000, x: 850, y: 400, connections: [], type: "outcome" },
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target = nodes.find((n) => n.id === targetId)
        if (target) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = "oklch(0.4 0.15 250)"
          ctx.lineWidth = 2
          ctx.stroke()

          // Draw arrow
          const angle = Math.atan2(target.y - node.y, target.x - node.x)
          const arrowSize = 10
          ctx.beginPath()
          ctx.moveTo(target.x, target.y)
          ctx.lineTo(
            target.x - arrowSize * Math.cos(angle - Math.PI / 6),
            target.y - arrowSize * Math.sin(angle - Math.PI / 6),
          )
          ctx.lineTo(
            target.x - arrowSize * Math.cos(angle + Math.PI / 6),
            target.y - arrowSize * Math.sin(angle + Math.PI / 6),
          )
          ctx.closePath()
          ctx.fillStyle = "oklch(0.4 0.15 250)"
          ctx.fill()
        }
      })
    })

    // Draw nodes
    nodes.forEach((node) => {
      const isSelected = selectedNode?.id === node.id
      const radius = isSelected ? 35 : 30

      // Glow effect
      if (isSelected) {
        ctx.shadowBlur = 20
        ctx.shadowColor = "oklch(0.6 0.2 250)"
      }

      // Node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)

      if (node.type === "decision") {
        ctx.fillStyle = "oklch(0.6 0.2 250)"
      } else if (node.type === "outcome") {
        ctx.fillStyle = node.cost < 0 ? "oklch(0.5 0.2 140)" : "oklch(0.5 0.25 240)"
      } else {
        ctx.fillStyle = node.cost < 0 ? "oklch(0.5 0.2 140)" : "oklch(0.6 0.2 30)"
      }

      ctx.fill()
      ctx.strokeStyle = "oklch(0.8 0.1 250)"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.shadowBlur = 0

      // Node label
      ctx.fillStyle = "oklch(0.95 0 0)"
      ctx.font = "12px Geist"
      ctx.textAlign = "center"
      ctx.fillText(node.label, node.x, node.y - radius - 10)
    })
  }, [nodes, selectedNode])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      return distance <= 30
    })

    setSelectedNode(clickedNode || null)
  }

  return (
    <div className="relative w-full h-full p-6">
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        className="w-full h-full cursor-pointer"
        onClick={handleCanvasClick}
      />

      {selectedNode && (
        <div className="absolute top-6 right-6 bg-card border border-border rounded-lg p-4 min-w-[250px]">
          <h3 className="font-semibold text-foreground mb-2">{selectedNode.label}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Type:</span>
              <Badge variant="outline" className="capitalize">
                {selectedNode.type}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost Impact:</span>
              <span className={selectedNode.cost < 0 ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                {selectedNode.cost < 0 ? "+" : ""}
                {Math.abs(selectedNode.cost).toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Connections:</span>
              <span className="text-foreground">{selectedNode.connections.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
