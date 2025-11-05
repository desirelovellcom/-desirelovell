"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play } from "lucide-react"

const playlist = [
  { id: 1, title: "Neon Dreams", artist: "Synthwave Collective", duration: "4:05" },
  { id: 2, title: "Electric Pulse", artist: "Digital Horizon", duration: "3:18" },
  { id: 3, title: "Cosmic Journey", artist: "Stellar Waves", duration: "5:12" },
  { id: 4, title: "Midnight Drive", artist: "Retro Future", duration: "3:45" },
  { id: 5, title: "Neon Lights", artist: "Cyber Dreams", duration: "4:22" },
  { id: 6, title: "Digital Love", artist: "Synthwave Collective", duration: "3:56" },
  { id: 7, title: "Future Memories", artist: "Time Traveler", duration: "4:38" },
  { id: 8, title: "Starlight", artist: "Cosmic Waves", duration: "3:29" },
]

export function Playlist() {
  return (
    <Card className="p-6 bg-card/40 backdrop-blur-xl border-border/50 h-[calc(100vh-12rem)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Now Playing</h2>
        <p className="text-sm text-muted-foreground mt-1">8 tracks</p>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-2">
          {playlist.map((track, index) => (
            <button
              key={track.id}
              className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary/20 via-accent/20 to-chart-3/20 flex items-center justify-center flex-shrink-0 group-hover:from-primary group-hover:via-accent group-hover:to-chart-3 transition-all">
                <Play className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{track.duration}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
