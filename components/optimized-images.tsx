import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Image, Zap, Settings, Download } from "lucide-react"

export function OptimizedImages() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5 text-primary" />
          Optimized Images
        </CardTitle>
        <CardDescription>Manage and optimize your image assets.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="batch">Batch Processing</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Original Image</Label>
                <div className="aspect-video overflow-hidden rounded-lg border bg-muted/50">
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Original: 2.4 MB</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Optimized Image</Label>
                <div className="aspect-video overflow-hidden rounded-lg border bg-muted/50">
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-full w-full">
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                        <Image className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-primary">
                    <Zap className="h-4 w-4" />
                    Optimized: 450 KB (81% smaller)
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Image Information</h4>
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Dimensions</span>
                  <span className="text-sm font-medium">1920 × 1080 px</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Format</span>
                  <span className="text-sm font-medium">JPEG → WebP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quality</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Color Profile</span>
                  <span className="text-sm font-medium">sRGB</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select defaultValue="webp">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Original Format</SelectItem>
                    <SelectItem value="webp">WebP (Recommended)</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="avif">AVIF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Quality</Label>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Slider defaultValue={[85]} max={100} step={5} />
                <p className="text-xs text-muted-foreground">
                  Higher quality means larger file size. 85% is recommended for most images.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Resize</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="Select resize option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Resize</SelectItem>
                    <SelectItem value="1080p">1080p (1920×1080)</SelectItem>
                    <SelectItem value="720p">720p (1280×720)</SelectItem>
                    <SelectItem value="480p">480p (854×480)</SelectItem>
                    <SelectItem value="custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Preserve Metadata</Label>
                  <p className="text-sm text-muted-foreground">Keep EXIF and other metadata</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Apply Compression</Label>
                  <p className="text-sm text-muted-foreground">Use advanced compression algorithms</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Apply Settings
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="batch" className="space-y-4 pt-4">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Batch Processing Queue</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                  <span className="text-sm font-medium">5 images selected</span>
                  <Button variant="outline" size="sm">
                    Add More
                  </Button>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="font-medium">family_photo_1.jpg</span>
                    <span className="text-muted-foreground">2.1 MB</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="font-medium">vacation_2023.png</span>
                    <span className="text-muted-foreground">3.4 MB</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="font-medium">graduation.jpg</span>
                    <span className="text-muted-foreground">1.8 MB</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="font-medium">wedding_anniversary.jpg</span>
                    <span className="text-muted-foreground">4.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <span className="font-medium">birthday_party.jpg</span>
                    <span className="text-muted-foreground">2.7 MB</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Batch Settings</Label>
              <div className="rounded-lg border p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Use Global Settings</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Output Format</Label>
                      <Select defaultValue="webp">
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="webp">WebP</SelectItem>
                          <SelectItem value="jpeg">JPEG</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Quality</Label>
                      <Select defaultValue="85">
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100% (Lossless)</SelectItem>
                          <SelectItem value="85">85% (Recommended)</SelectItem>
                          <SelectItem value="70">70% (Balanced)</SelectItem>
                          <SelectItem value="50">50% (Smaller size)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Preserve Original Files</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Zap className="mr-2 h-4 w-4" />
                Process Batch
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

