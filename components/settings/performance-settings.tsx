"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Zap, Gauge, Image, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function PerformanceSettings() {
  // Performance settings
  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [prefetchMedia, setPrefetchMedia] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)
  const [imageQuality, setImageQuality] = useState([75])
  const [videoQuality, setVideoQuality] = useState("auto")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  // Cache info
  const cacheSize = 256 // MB
  const cacheUsed = 187 // MB
  const cachePercentage = (cacheUsed / cacheSize) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Monitor and optimize application performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-blue-500" />
                  <h4 className="font-medium">Load Time</h4>
                </div>
                <span className="text-lg font-semibold">1.2s</span>
              </div>
              <p className="text-sm text-muted-foreground">Average page load time</p>
            </div>

            <div className="space-y-2 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h4 className="font-medium">Memory</h4>
                </div>
                <span className="text-lg font-semibold">128MB</span>
              </div>
              <p className="text-sm text-muted-foreground">Current memory usage</p>
            </div>

            <div className="space-y-2 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium">Media</h4>
                </div>
                <span className="text-lg font-semibold">0.8s</span>
              </div>
              <p className="text-sm text-muted-foreground">Average media load time</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Cache Usage</h4>
              <span className="text-sm text-muted-foreground">
                {cacheUsed} MB of {cacheSize} MB
              </span>
            </div>
            <Progress value={cachePercentage} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            <span>Clear Cache</span>
          </Button>
        </CardFooter>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Performance Optimization</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-quality">Image Quality</Label>
            <Slider
              id="image-quality"
              min={0}
              max={100}
              step={1}
              value={imageQuality}
              onValueChange={setImageQuality}
            />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Low (Faster)</span>
              <span className="text-sm text-muted-foreground">High (Better Quality)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="video-quality">Video Playback Quality</Label>
            <Select value={videoQuality} onValueChange={setVideoQuality}>
              <SelectTrigger id="video-quality">
                <SelectValue placeholder="Select video quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (360p)</SelectItem>
                <SelectItem value="medium">Medium (480p)</SelectItem>
                <SelectItem value="high">High (720p)</SelectItem>
                <SelectItem value="hd">HD (1080p)</SelectItem>
                <SelectItem value="auto">Auto (Based on Connection)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Default quality for video playback</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cache-enabled">Enable Caching</Label>
              <p className="text-sm text-muted-foreground">Store frequently accessed content locally</p>
            </div>
            <Switch id="cache-enabled" checked={cacheEnabled} onCheckedChange={setCacheEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="prefetch-media">Prefetch Media</Label>
              <p className="text-sm text-muted-foreground">Load media in advance for smoother browsing</p>
            </div>
            <Switch id="prefetch-media" checked={prefetchMedia} onCheckedChange={setPrefetchMedia} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="lazy-loading">Lazy Loading</Label>
              <p className="text-sm text-muted-foreground">Only load content when it's visible on screen</p>
            </div>
            <Switch id="lazy-loading" checked={lazyLoading} onCheckedChange={setLazyLoading} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations-enabled">UI Animations</Label>
              <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
            </div>
            <Switch id="animations-enabled" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
          </div>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Performance Tip</AlertTitle>
        <AlertDescription>
          Reducing image quality and disabling animations can significantly improve performance on older devices.
        </AlertDescription>
      </Alert>

      <Button type="submit">Save Changes</Button>
    </div>
  )
}

