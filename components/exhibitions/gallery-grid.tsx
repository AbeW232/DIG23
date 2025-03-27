"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Settings,
  Share2,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Save,
  ArrowRight,
  ImageIcon,
  Layers,
} from "lucide-react"

// Sample data for exhibition templates
const exhibitionTemplates = [
  {
    id: 1,
    name: "Classic Gallery",
    description: "A traditional gallery layout with focus on images",
    preview: "/placeholder.svg?height=150&width=300",
    category: "gallery",
  },
  {
    id: 2,
    name: "Timeline Journey",
    description: "Chronological display of stories and memories",
    preview: "/placeholder.svg?height=150&width=300",
    category: "timeline",
  },
  {
    id: 3,
    name: "Memory Grid",
    description: "Modern grid layout with equal emphasis on all items",
    preview: "/placeholder.svg?height=150&width=300",
    category: "gallery",
  },
  {
    id: 4,
    name: "Story Spotlight",
    description: "Highlights one main story with supporting elements",
    preview: "/placeholder.svg?height=150&width=300",
    category: "featured",
  },
  {
    id: 5,
    name: "Family Tree",
    description: "Hierarchical display of family connections",
    preview: "/placeholder.svg?height=150&width=300",
    category: "tree",
  },
  {
    id: 6,
    name: "Photo Journal",
    description: "Blog-style layout with images and text",
    preview: "/placeholder.svg?height=150&width=300",
    category: "journal",
  },
]

// Sample data for themes
const themeOptions = [
  { id: 1, name: "Classic", primaryColor: "#3b82f6", secondaryColor: "#93c5fd" },
  { id: 2, name: "Vintage", primaryColor: "#a16207", secondaryColor: "#fcd34d" },
  { id: 3, name: "Modern", primaryColor: "#6366f1", secondaryColor: "#a5b4fc" },
  { id: 4, name: "Elegant", primaryColor: "#7c3aed", secondaryColor: "#c4b5fd" },
  { id: 5, name: "Minimal", primaryColor: "#475569", secondaryColor: "#cbd5e1" },
  { id: 6, name: "Bold", primaryColor: "#dc2626", secondaryColor: "#fca5a5" },
]

export function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1)
  const [selectedTheme, setSelectedTheme] = useState<number>(1)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [templateFilter, setTemplateFilter] = useState("all")
  const [customName, setCustomName] = useState("My Exhibition")

  // Filter templates based on category
  const filteredTemplates =
    templateFilter === "all"
      ? exhibitionTemplates
      : exhibitionTemplates.filter((template) => template.category === templateFilter)

  // Get selected theme data
  const currentTheme = themeOptions.find((theme) => theme.id === selectedTheme) || themeOptions[0]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="templates">Layout Templates</TabsTrigger>
          <TabsTrigger value="theme">Theme Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview Mode</TabsTrigger>
        </TabsList>

        {/* Layout Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exhibition Layout Templates</CardTitle>
              <CardDescription>Choose a template for your exhibition layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="exhibition-name">Exhibition Name</Label>
                  <Input
                    id="exhibition-name"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter exhibition name"
                  />
                </div>
                <div>
                  <Label>Filter Templates</Label>
                  <Select value={templateFilter} onValueChange={setTemplateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Templates</SelectItem>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="timeline">Timeline</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="tree">Family Tree</SelectItem>
                      <SelectItem value="journal">Journal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-md overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="aspect-[16/9] relative">
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Template
              </Button>
              <Button onClick={() => setActiveTab("theme")}>
                Continue to Theme
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Theme Editor Tab */}
        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exhibition Theme Editor</CardTitle>
              <CardDescription>Customize the look and feel of your exhibition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Presets</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {themeOptions.map((theme) => (
                        <div
                          key={theme.id}
                          className={`border rounded-md p-2 cursor-pointer hover:border-primary ${
                            selectedTheme === theme.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedTheme(theme.id)}
                        >
                          <div className="h-8 rounded-md mb-2" style={{ background: theme.primaryColor }}></div>
                          <div className="text-xs text-center font-medium">{theme.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ background: currentTheme.primaryColor }}
                      ></div>
                      <Input value={currentTheme.primaryColor} className="font-mono" readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ background: currentTheme.secondaryColor }}
                      ></div>
                      <Input value={currentTheme.secondaryColor} className="font-mono" readOnly />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Typography</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="playfair">Playfair Display</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                        <SelectItem value="merriweather">Merriweather</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Heading Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select heading size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Text Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select text size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Background Style</Label>
                    <Select defaultValue="solid">
                      <SelectTrigger>
                        <SelectValue placeholder="Select background style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid Color</SelectItem>
                        <SelectItem value="gradient">Gradient</SelectItem>
                        <SelectItem value="pattern">Pattern</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Element Style</Label>
                    <Select defaultValue="rounded">
                      <SelectTrigger>
                        <SelectValue placeholder="Select element style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="pill">Pill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <div className="text-sm text-muted-foreground">Enable dark mode theme</div>
                    </div>
                    <Switch id="dark-mode" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("templates")}>
                Back to Templates
              </Button>
              <Button onClick={() => setActiveTab("preview")}>
                Preview Exhibition
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preview Mode Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle>Preview: {customName}</CardTitle>
                  <CardDescription>Preview how your exhibition will appear to visitors</CardDescription>
                </div>
                <div className="flex items-center gap-2 border rounded-md p-1">
                  <Button
                    variant={previewDevice === "desktop" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                    <span className="sr-only">Desktop</span>
                  </Button>
                  <Button
                    variant={previewDevice === "tablet" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                    <span className="sr-only">Tablet</span>
                  </Button>
                  <Button
                    variant={previewDevice === "mobile" ? "secondary" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                    <span className="sr-only">Mobile</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div
                  className={`border rounded-md overflow-hidden bg-background ${
                    previewDevice === "desktop"
                      ? "w-full"
                      : previewDevice === "tablet"
                        ? "w-[768px] max-w-full"
                        : "w-[375px] max-w-full"
                  }`}
                >
                  <div className="border-b p-3 flex justify-between items-center">
                    <div className="font-medium">{customName}</div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 min-h-[500px]">
                    {selectedTemplate && (
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <h1 className="text-2xl font-bold" style={{ color: currentTheme.primaryColor }}>
                            {customName}
                          </h1>
                          <p className="text-muted-foreground">A beautiful collection of memories and stories</p>
                        </div>

                        {/* Preview content based on selected template */}
                        {exhibitionTemplates.find((t) => t.id === selectedTemplate)?.category === "gallery" && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div key={i} className="space-y-2">
                                <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div className="text-sm font-medium">Memory {i + 1}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {exhibitionTemplates.find((t) => t.id === selectedTemplate)?.category === "timeline" && (
                          <div className="space-y-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="flex gap-4">
                                <div
                                  className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold"
                                  style={{ background: currentTheme.primaryColor }}
                                >
                                  {1990 + i * 10}
                                </div>
                                <div className="space-y-2">
                                  <h3 className="font-medium">Decade Memories</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Important events and memories from this time period.
                                  </p>
                                  <div className="flex gap-2">
                                    <div className="w-16 h-16 bg-muted rounded-md"></div>
                                    <div className="w-16 h-16 bg-muted rounded-md"></div>
                                    <div className="w-16 h-16 bg-muted rounded-md"></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {exhibitionTemplates.find((t) => t.id === selectedTemplate)?.category === "featured" && (
                          <div className="space-y-6">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                              <ImageIcon className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                              <h2 className="text-xl font-medium">Featured Story Title</h2>
                              <p className="text-muted-foreground">
                                This is a detailed description of the featured story. It provides context and background
                                information.
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="aspect-square bg-muted rounded-md"></div>
                                  <div className="text-xs">Related item {i + 1}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {exhibitionTemplates.find((t) => t.id === selectedTemplate)?.category === "tree" && (
                          <div className="flex justify-center">
                            <div className="space-y-6 max-w-md">
                              <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                  <Layers className="h-8 w-8 text-muted-foreground" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {Array.from({ length: 2 }).map((_, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-muted"></div>
                                    <div className="h-8 w-px bg-border"></div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {Array.from({ length: 2 }).map((_, j) => (
                                        <div key={j} className="flex flex-col items-center">
                                          <div className="w-12 h-12 rounded-full bg-muted"></div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {exhibitionTemplates.find((t) => t.id === selectedTemplate)?.category === "journal" && (
                          <div className="space-y-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="space-y-3 pb-4 border-b last:border-0">
                                <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                  <h3 className="font-medium">Journal Entry {i + 1}</h3>
                                  <div className="text-sm text-muted-foreground">June {10 + i}, 2023</div>
                                </div>
                                <p className="text-sm">
                                  This is a sample journal entry with a description of the memory or story being shared.
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  This is a preview of how your exhibition will appear to visitors. The actual content will be populated
                  from your stories.
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("theme")}>
                Back to Theme Editor
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Exhibition
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

