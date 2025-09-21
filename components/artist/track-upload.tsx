"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Upload, Music, ImageIcon } from "lucide-react"

export function TrackUpload() {
  const [royaltySplit, setRoyaltySplit] = useState([70])
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    setIsUploading(true)
    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUploading(false)
    // Reset form or show success message
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload New Track
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="track-title">Track Title</Label>
          <Input id="track-title" placeholder="Enter track title" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="track-description">Description</Label>
          <Textarea id="track-description" placeholder="Describe your track..." rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input id="genre" placeholder="e.g., Electronic" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (mm:ss)</Label>
            <Input id="duration" placeholder="e.g., 3:45" />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Royalty Split</Label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Artist Share</span>
              <span className="font-medium">{royaltySplit[0]}%</span>
            </div>
            <Slider
              value={royaltySplit}
              onValueChange={setRoyaltySplit}
              max={100}
              min={50}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Platform: {100 - royaltySplit[0]}%</span>
              <span>Listeners get AMPL rewards</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload audio file</p>
            <Button variant="outline" size="sm">
              Choose File
            </Button>
            <p className="text-xs text-muted-foreground mt-2">MP3, WAV, FLAC up to 50MB</p>
          </div>

          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload cover art</p>
            <Button variant="outline" size="sm">
              Choose Image
            </Button>
            <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 10MB</p>
          </div>
        </div>

        <Button onClick={handleUpload} disabled={isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Track"}
        </Button>
      </CardContent>
    </Card>
  )
}
