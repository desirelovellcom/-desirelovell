"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react"

const tracks = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "Synthwave Collective",
    duration: 245,
    url: "/placeholder.mp3",
  },
  {
    id: 2,
    title: "Electric Pulse",
    artist: "Digital Horizon",
    duration: 198,
    url: "/placeholder.mp3",
  },
  {
    id: 3,
    title: "Cosmic Journey",
    artist: "Stellar Waves",
    duration: 312,
    url: "/placeholder.mp3",
  },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([75])
  const audioRef = useRef<HTMLAudioElement>(null)

  const track = tracks[currentTrack]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    audio.addEventListener("timeupdate", updateTime)

    return () => audio.removeEventListener("timeupdate", updateTime)
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setCurrentTime(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setCurrentTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="p-8 bg-card/40 backdrop-blur-xl border-border/50 glow-pink">
      <audio ref={audioRef} src={track.url} />

      <div className="space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary via-accent to-chart-3 flex-shrink-0 glow-blue" />
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-foreground truncate">{track.title}</h3>
            <p className="text-muted-foreground mt-1">{track.artist}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-muted-foreground font-mono">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={track.duration}
                step={1}
                className="flex-1"
                onValueChange={(value) => {
                  setCurrentTime(value[0])
                  if (audioRef.current) {
                    audioRef.current.currentTime = value[0]
                  }
                }}
              />
              <span className="text-xs text-muted-foreground font-mono">{formatTime(track.duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={prevTrack} className="text-foreground hover:text-primary">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-chart-3 hover:opacity-90 glow-purple"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack} className="text-foreground hover:text-primary">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-3 w-32">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider value={volume} max={100} step={1} onValueChange={setVolume} />
          </div>
        </div>
      </div>
    </Card>
  )
}
