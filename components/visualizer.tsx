"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseRadius = 80

    let rotation = 0
    const bars = 64

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw outer rings
      for (let ring = 0; ring < 3; ring++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, baseRadius + ring * 40, 0, Math.PI * 2)
        ctx.strokeStyle = `oklch(0.4 0.2 ${280 + ring * 20} / ${0.2 - ring * 0.05})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw frequency bars
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 + rotation
        const barHeight = isPlaying ? Math.random() * 60 + 20 : 10 + Math.sin(i * 0.5) * 5

        const startX = centerX + Math.cos(angle) * baseRadius
        const startY = centerY + Math.sin(angle) * baseRadius
        const endX = centerX + Math.cos(angle) * (baseRadius + barHeight)
        const endY = centerY + Math.sin(angle) * (baseRadius + barHeight)

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        const hue = 280 + (i / bars) * 80
        gradient.addColorStop(0, `oklch(0.5 0.25 ${hue} / 0.8)`)
        gradient.addColorStop(1, `oklch(0.7 0.3 ${hue} / 1)`)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.lineCap = "round"
        ctx.stroke()
      }

      // Draw center circle
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 0.6)
      centerGradient.addColorStop(0, "oklch(0.6 0.3 280 / 0.8)")
      centerGradient.addColorStop(0.5, "oklch(0.5 0.35 320 / 0.6)")
      centerGradient.addColorStop(1, "oklch(0.4 0.28 240 / 0.4)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = centerGradient
      ctx.fill()

      rotation += isPlaying ? 0.01 : 0.002

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <Card className="p-8 bg-card/40 backdrop-blur-xl border-border/50 glow-purple">
      <div className="flex flex-col items-center gap-6">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="max-w-full h-auto"
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <p className="text-sm text-muted-foreground text-center">
          {isPlaying ? "Click to pause visualization" : "Click to start visualization"}
        </p>
      </div>
    </Card>
  )
}
