"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Edit,
  Eye,
  Laptop,
  LayoutTemplate,
  Maximize,
  Minimize,
  MoveHorizontal,
  Play,
  Plus,
  Smartphone,
  Tablet,
  Trash,
} from "lucide-react"

// Sample data for exhibition screens
const exhibitionScreens = [
  {
    id: 1,
    title: "Welcome Screen",
    description: "Introduction to the family history exhibition",
    type: "cover",
    content: {
      heading: "Our Family Legacy",
      subheading: "A journey through generations",
      backgroundImage: "/placeholder.svg?height=400&width=600",
    },
  },
  {
    id: 2,
    title: "Family Tree",
    description: "Interactive family tree visualization",
    type: "interactive",
    content: {
      heading: "Family Connections",
      elements: ["Family Tree Visualization", "Interactive Portraits", "Timeline"],
    },
  },
  {
    id: 3,
    title: "Photo Gallery",
    description: "Collection of family photographs",
    type: "gallery",
    content: {
      heading: "Memories in Pictures",
      images: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
    },
  },
  {
    id: 4,
    title: "Video Interviews",
    description: "Recorded interviews with family members",
    type: "media",
    content: {
      heading: "Stories Told",
      videos: [
        { title: "Grandma's Childhood", thumbnail: "/placeholder.svg?height=200&width=300", duration: "5:32" },
        { title: "Dad's Workshop", thumbnail: "/placeholder.svg?height=200&width=300", duration: "8:15" },
      ],
    },
  },
  {
    id: 5,
    title: "Conclusion",
    description: "Final thoughts and credits",
    type: "text",
    content: {
      heading: "Preserving Our Legacy",
      text: "This exhibition is dedicated to preserving our family's stories for future generations.",
    },
  },
]

export function ExhibitionFlow() {
  const [selectedScreen, setSelectedScreen] = useState<number | null>(null)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleSelectScreen = (id: number) => {
    setSelectedScreen(id)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="flow">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="flow">Exhibition Flow</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Exhibition Flow</CardTitle>
                  <CardDescription>Arrange and organize your exhibition screens</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Screen
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exhibitionScreens.map((screen, index) => (
                  <div
                    key={screen.id}
                    className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-muted/50 ${selectedScreen === screen.id ? "bg-muted" : ""}`}
                    onClick={() => handleSelectScreen(screen.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{screen.title}</div>
                          <div className="text-sm text-muted-foreground">{screen.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoveHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">{exhibitionScreens.length} screens in exhibition</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          {selectedScreen !== null && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Edit Screen</CardTitle>
                    <CardDescription>
                      {exhibitionScreens.find((s) => s.id === selectedScreen)?.title} -
                      {exhibitionScreens.find((s) => s.id === selectedScreen)?.type}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedScreen(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="screen-title">Screen Title</Label>
                      <Input
                        id="screen-title"
                        defaultValue={exhibitionScreens.find((s) => s.id === selectedScreen)?.title}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="screen-type">Screen Type</Label>
                      <Select defaultValue={exhibitionScreens.find((s) => s.id === selectedScreen)?.type}>
                        <SelectTrigger id="screen-type">
                          <SelectValue placeholder="Select screen type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cover">Cover</SelectItem>
                          <SelectItem value="gallery">Gallery</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="interactive">Interactive</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screen-description">Description</Label>
                    <Textarea
                      id="screen-description"
                      defaultValue={exhibitionScreens.find((s) => s.id === selectedScreen)?.description}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screen-heading">Heading</Label>
                    <Input
                      id="screen-heading"
                      defaultValue={exhibitionScreens.find((s) => s.id === selectedScreen)?.content.heading}
                    />
                  </div>

                  {/* Conditional content based on screen type */}
                  {(() => {
                    const screen = exhibitionScreens.find((s) => s.id === selectedScreen)
                    if (!screen) return null

                    switch (screen.type) {
                      case "cover":
                        return (
                          <div className="space-y-2">
                            <Label htmlFor="screen-subheading">Subheading</Label>
                            <Input id="screen-subheading" defaultValue={screen.content.subheading} />
                            <Label className="mt-4">Background Image</Label>
                            <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                              <div className="flex flex-col items-center gap-2">
                                <div className="aspect-video w-full max-w-md bg-muted rounded-md overflow-hidden">
                                  <img
                                    src={screen.content.backgroundImage || "/placeholder.svg"}
                                    alt="Background"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <Button variant="outline" size="sm">
                                  Change Background
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      case "gallery":
                        return (
                          <div className="space-y-4">
                            <Label>Gallery Images</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {screen.content.images.map((image, i) => (
                                <div key={i} className="relative group">
                                  <div className="aspect-square border rounded-md overflow-hidden">
                                    <img
                                      src={image || "/placeholder.svg"}
                                      alt={`Gallery ${i + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <div className="aspect-square border border-dashed rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors">
                                <Plus className="h-8 w-8 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Add Image</span>
                              </div>
                            </div>
                          </div>
                        )
                      case "text":
                        return (
                          <div className="space-y-2">
                            <Label htmlFor="screen-text">Text Content</Label>
                            <Textarea id="screen-text" defaultValue={screen.content.text} className="min-h-[200px]" />
                          </div>
                        )
                      default:
                        return (
                          <div className="border rounded-md p-4 bg-muted/50">
                            <p className="text-center text-muted-foreground">
                              Content editor for {screen.type} type would appear here
                            </p>
                          </div>
                        )
                    }
                  })()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Exhibition Preview</CardTitle>
                  <CardDescription>Preview how your exhibition will appear to viewers</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${previewMode === "desktop" ? "bg-muted" : ""}`}
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Laptop className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${previewMode === "tablet" ? "bg-muted" : ""}`}
                      onClick={() => setPreviewMode("tablet")}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${previewMode === "mobile" ? "bg-muted" : ""}`}
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`border rounded-md mx-auto overflow-hidden ${
                  previewMode === "desktop"
                    ? "w-full"
                    : previewMode === "tablet"
                      ? "w-[768px] max-w-full"
                      : "w-[320px] max-w-full"
                }`}
              >
                <div className="bg-black text-white">
                  <div className="p-2 bg-gray-800 flex justify-between items-center">
                    <div className="text-sm">Preview Mode</div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-white">
                        <ArrowLeft className="h-3 w-3 mr-1" />
                        Prev
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-white">
                        Next
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="aspect-[16/9] bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-6">
                    <div className="text-center max-w-md">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2">Our Family Legacy</h2>
                      <p className="text-lg md:text-xl text-gray-300 mb-6">A journey through generations</p>
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                        Begin Journey
                      </Button>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-800 flex justify-center">
                    <div className="flex gap-1">
                      {exhibitionScreens.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-gray-600"}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing screen 1 of {exhibitionScreens.length}</div>
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                Launch Full Preview
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exhibition Settings</CardTitle>
              <CardDescription>Configure your exhibition display settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="exhibition-title">Exhibition Title</Label>
                  <Input id="exhibition-title" defaultValue="Our Family Legacy" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exhibition-description">Exhibition Description</Label>
                  <Textarea
                    id="exhibition-description"
                    defaultValue="A digital exhibition showcasing our family's history, stories, and memories across generations."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="classic">
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="vintage">Vintage</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transition">Transitions</Label>
                    <Select defaultValue="fade">
                      <SelectTrigger id="transition">
                        <SelectValue placeholder="Select transition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade">Fade</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="flip">Flip</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Navigation Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-advance" className="cursor-pointer">
                        Auto-advance slides
                      </Label>
                      <Switch id="auto-advance" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-progress" className="cursor-pointer">
                        Show progress indicators
                      </Label>
                      <Switch id="show-progress" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-keyboard" className="cursor-pointer">
                        Allow keyboard navigation
                      </Label>
                      <Switch id="allow-keyboard" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loop-exhibition" className="cursor-pointer">
                        Loop exhibition
                      </Label>
                      <Switch id="loop-exhibition" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Layout Templates</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Classic", "Modern", "Gallery", "Timeline"].map((template, i) => (
                      <div
                        key={i}
                        className={`border rounded-md p-2 cursor-pointer hover:bg-muted/50 ${i === 0 ? "ring-2 ring-primary" : ""}`}
                      >
                        <div className="aspect-video bg-muted rounded flex items-center justify-center mb-2">
                          <LayoutTemplate className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="text-sm font-medium text-center">{template}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Visibility & Sharing</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Public Exhibition</div>
                        <div className="text-sm text-muted-foreground">
                          Make this exhibition visible to anyone with the link
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Allow Embedding</div>
                        <div className="text-sm text-muted-foreground">
                          Let others embed this exhibition on their websites
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Password Protection</div>
                        <div className="text-sm text-muted-foreground">Require a password to view this exhibition</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

