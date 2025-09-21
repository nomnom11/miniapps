import { ArtistHeader } from "@/components/artist/artist-header"
import { ArtistStats } from "@/components/artist/artist-stats"
import { TrackUpload } from "@/components/artist/track-upload"
import { TrackManagement } from "@/components/artist/track-management"
import { EarningsChart } from "@/components/artist/earnings-chart"
import { NFTMinting } from "@/components/artist/nft-minting"

export default function ArtistDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <ArtistHeader />
      <main className="container py-8">
        <div className="space-y-8">
          <ArtistStats />

          <div className="grid lg:grid-cols-2 gap-8">
            <TrackUpload />
            <NFTMinting />
          </div>

          <EarningsChart />

          <TrackManagement />
        </div>
      </main>
    </div>
  )
}
