"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, HardDrive, Cloud, Database, Image, FileText, Film } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function StorageSettings() {
  // Storage provider settings
  const [storageProvider, setStorageProvider] = useState("cloud")
  const [autoSync, setAutoSync] = useState(true)
  const [compressionLevel, setCompressionLevel] = useState([50])
  const [mediaQuality, setMediaQuality] = useState("high")
  const [localBackup, setLocalBackup] = useState(true)

  // Storage usage data
  const totalStorage = 100 // GB
  const usedStorage = 68 // GB
  const usagePercentage = (usedStorage / totalStorage) * 100

  // Storage breakdown
  const storageBreakdown = [
    { type: "Images", icon: Image, size: 32, color: "bg-blue-500" },
    { type: "Videos", icon: Film, size: 24, color: "bg-purple-500" },
    { type: "Documents", icon: FileText, size: 8, color: "bg-green-500" },
    { type: "Other", icon: Database, size: 4, color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Monitor and manage your storage allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {usedStorage} GB of {totalStorage} GB used
              </span>
              <span className="text-sm text-muted-foreground">{totalStorage - usedStorage} GB available</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Storage Breakdown</h4>
            <div className="space-y-3">
              {storageBreakdown.map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.type}</span>
                    </div>
                    <span className="text-sm">{item.size} GB</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.size / usedStorage) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {usagePercentage > 80 && (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Storage Almost Full</AlertTitle>
              <AlertDescription>
                You're using {usagePercentage.toFixed(0)}% of your storage. Consider upgrading your plan or removing
                unused content.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline">Upgrade Storage Plan</Button>
        </CardFooter>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Storage Configuration</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storage-provider">Storage Provider</Label>
            <Select value={storageProvider} onValueChange={setStorageProvider}>
              <SelectTrigger id="storage-provider">
                <SelectValue placeholder="Select storage provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    <span>Cloud Storage (Recommended)</span>
                  </div>
                </SelectItem>
                <SelectItem value="local">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    <span>Local Storage</span>
                  </div>
                </SelectItem>
                <SelectItem value="hybrid">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>Hybrid Storage</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Choose where your content will be stored</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="compression-level">Compression Level</Label>
            <Slider
              id="compression-level"
              min={0}
              max={100}
              step={1}
              value={compressionLevel}
              onValueChange={setCompressionLevel}
            />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Low (Faster)</span>
              <span className="text-sm text-muted-foreground">High (Smaller Files)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="media-quality">Media Quality</Label>
            <Select value={mediaQuality} onValueChange={setMediaQuality}>
              <SelectTrigger id="media-quality">
                <SelectValue placeholder="Select media quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Save Space)</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High (Best Quality)</SelectItem>
                <SelectItem value="original">Original (No Compression)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Set the quality level for uploaded media</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Automatic Sync</Label>
              <p className="text-sm text-muted-foreground">Automatically sync content across devices</p>
            </div>
            <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="local-backup">Local Backup</Label>
              <p className="text-sm text-muted-foreground">Keep a local copy of your content</p>
            </div>
            <Switch id="local-backup" checked={localBackup} onCheckedChange={setLocalBackup} />
          </div>
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
    </div>
  )
}

