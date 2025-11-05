import { MusicPlayer } from "@/components/music-player"
import { Visualizer } from "@/components/visualizer"
import { Playlist } from "@/components/playlist"

export default function Page() {
  return (
    <div className="min-h-screen vio-gradient">
      <header className="border-b border-border/30 bg-card/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-chart-3 glow-purple" />
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-chart-3 bg-clip-text text-transparent">
                VIO
              </h1>
            </div>
            <nav className="flex items-center gap-6">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Discover
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Library</button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Radio</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Visualizer />
            <MusicPlayer />
          </div>
          <div className="lg:col-span-4">
            <Playlist />
          </div>
        </div>
      </main>
    </div>
  )
}
