"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExhibitionFeatures } from "@/components/exhibitions/exhibition-features"
import { CurationTools } from "@/components/exhibitions/curation-tools"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings, HelpCircle, BarChart, Eye, Globe, Palette, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function ExhibitionTabs() {
  const [activeTab, setActiveTab] = useState("gallery")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="gallery" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="curation">Curation</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="setup">Setup</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Exhibition
            </Button>
          </div>
        </div>

        <TabsContent value="gallery">
          <ExhibitionFeatures />
        </TabsContent>

        <TabsContent value="curation">
          <CurationTools />
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Exhibition Analytics</CardTitle>
              <CardDescription>Track visitor engagement with your exhibitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold">1,248</div>
                  <div className="text-sm text-muted-foreground">Total Visits</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold">4:32</div>
                  <div className="text-sm text-muted-foreground">Avg. Time Spent</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold">68%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>

              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Exhibition analytics visualization would appear here</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Top Exhibitions</h3>
                <div className="space-y-3">
                  {[
                    { name: "Family History Through the Decades", visits: 342, completion: "78%" },
                    { name: "Our Travel Adventures", visits: 187, completion: "65%" },
                    { name: "Grandparents' Legacy", visits: 124, completion: "82%" },
                  ].map((exhibition, i) => (
                    <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                      <div>
                        <div className="font-medium">{exhibition.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {exhibition.visits} visits · {exhibition.completion} completion rate
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                View Public Stats
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configure Analytics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="setup">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Configure the appearance of your exhibitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Theme</Label>
                  <Select defaultValue="classic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="elegant">Elegant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-8 bg-blue-500 rounded-md mb-1"></div>
                      <div className="text-xs text-center">Blue</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-8 bg-green-500 rounded-md mb-1"></div>
                      <div className="text-xs text-center">Green</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-8 bg-purple-500 rounded-md mb-1"></div>
                      <div className="text-xs text-center">Purple</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-8 bg-amber-500 rounded-md mb-1"></div>
                      <div className="text-xs text-center">Amber</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-8 bg-rose-500 rounded-md mb-1"></div>
                      <div className="text-xs text-center">Rose</div>
                    </div>
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="h-8 bg-slate-700 rounded-md mb-1"></div>
                      <div className="text-xs text-center">Slate</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select defaultValue="serif">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sans">Sans-serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="mono">Monospace</SelectItem>
                      <SelectItem value="display">Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="custom-css">Custom CSS</Label>
                    <div className="text-sm text-muted-foreground">Allow custom CSS for exhibitions</div>
                  </div>
                  <Switch id="custom-css" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Palette className="h-4 w-4 mr-2" />
                  Save Theme Settings
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Layout Settings</CardTitle>
                <CardDescription>Configure the layout of your exhibitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Layout</Label>
                  <Select defaultValue="grid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Layout</SelectItem>
                      <SelectItem value="masonry">Masonry Layout</SelectItem>
                      <SelectItem value="carousel">Carousel Layout</SelectItem>
                      <SelectItem value="timeline">Timeline Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Items Per Page</Label>
                  <Input type="number" defaultValue="12" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-title">Show Exhibition Title</Label>
                    <div className="text-sm text-muted-foreground">Display the exhibition title</div>
                  </div>
                  <Switch id="show-title" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-description">Show Description</Label>
                    <div className="text-sm text-muted-foreground">Display the exhibition description</div>
                  </div>
                  <Switch id="show-description" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-author">Show Author</Label>
                    <div className="text-sm text-muted-foreground">Display the exhibition author</div>
                  </div>
                  <Switch id="show-author" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Layout Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="text-lg font-medium">New to exhibitions?</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to create engaging exhibitions that showcase your digital legacy content effectively.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">View Tutorial</Button>
              <Button variant="default">Get Started</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

