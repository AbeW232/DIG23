"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetGridView } from "@/components/media-library/asset-grid-view"
import { UploadInterface } from "@/components/media-library/upload-interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, HardDrive, Settings } from "lucide-react"

export function MediaLibraryTabs() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="browse" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="browse">Browse Media</TabsTrigger>
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="storage">Storage Management</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6">
          <AssetGridView />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <UploadInterface />
        </TabsContent>

        <TabsContent value="storage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
              <CardDescription>Manage your media storage and organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Storage Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Used Storage</span>
                        <span className="text-sm font-medium">35.2 GB</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[35%] bg-primary"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>35.2 GB used</span>
                        <span>100 GB total</span>
                      </div>

                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span>Images</span>
                          </div>
                          <span>15.8 GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span>Videos</span>
                          </div>
                          <span>12.4 GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>Audio</span>
                          </div>
                          <span>4.6 GB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <span>Documents</span>
                          </div>
                          <span>2.4 GB</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <HardDrive className="h-4 w-4 mr-2" />
                      Upgrade Storage
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Collections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Family Photos", count: 248, size: "8.4 GB" },
                        { name: "Video Interviews", count: 12, size: "6.2 GB" },
                        { name: "Historical Documents", count: 56, size: "1.8 GB" },
                        { name: "Audio Recordings", count: 34, size: "3.5 GB" },
                        { name: "Recipes", count: 18, size: "0.6 GB" },
                      ].map((collection, i) => (
                        <div key={i} className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                          <div className="flex items-center">
                            <Folder className="h-4 w-4 mr-2 text-primary" />
                            <span className="text-sm">{collection.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {collection.count} items · {collection.size}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Manage Collections
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Storage Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Auto-Organize Media</span>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Media Compression</span>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Backup Settings</span>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Storage Provider</span>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Settings
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Storage Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

