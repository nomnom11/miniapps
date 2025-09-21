"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopListeners } from "./top-listeners"
import { TopTracks } from "./top-tracks"
import { TopArtists } from "./top-artists"
import { Users, Music, Mic } from "lucide-react"

export function LeaderboardTabs() {
  return (
    <Tabs defaultValue="listeners" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="listeners" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Top Listeners
        </TabsTrigger>
        <TabsTrigger value="tracks" className="flex items-center gap-2">
          <Music className="h-4 w-4" />
          Top Tracks
        </TabsTrigger>
        <TabsTrigger value="artists" className="flex items-center gap-2">
          <Mic className="h-4 w-4" />
          Top Artists
        </TabsTrigger>
      </TabsList>

      <TabsContent value="listeners">
        <TopListeners />
      </TabsContent>

      <TabsContent value="tracks">
        <TopTracks />
      </TabsContent>

      <TabsContent value="artists">
        <TopArtists />
      </TabsContent>
    </Tabs>
  )
}
