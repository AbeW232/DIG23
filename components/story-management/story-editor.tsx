"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Video,
  FileAudio,
  Save,
  Eye,
  Upload,
  Search,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  PanelLeft,
  PanelRight,
  Columns,
  Laptop,
  Smartphone,
  Tablet,
  Plus,
  Sparkles,
  CheckCircle,
  BookOpen,
  Check,
  X,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function StoryEditor() {
  const [title, setTitle] = useState("Untitled Story")
  const [content, setContent] = useState("")
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [selectedTemplate, setSelectedTemplate] = useState("default")
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [showLayoutOptions, setShowLayoutOptions] = useState(false)
  const [showSeoTools, setShowSeoTools] = useState(false)

  const templates = [
    { id: "default", name: "Default", description: "A clean, simple layout for all types of stories." },
    { id: "memoir", name: "Memoir", description: "Perfect for personal stories and life experiences." },
    { id: "timeline", name: "Timeline", description: "Chronological layout for historical narratives." },
    { id: "photo-essay", name: "Photo Essay", description: "Image-focused layout with supporting text." },
    { id: "letter", name: "Letter", description: "Formatted as a personal letter or correspondence." },
  ]

  const themes = [
    { id: "light", name: "Light", description: "Clean, bright theme with good readability." },
    { id: "dark", name: "Dark", description: "Dark background with light text for evening reading." },
    { id: "sepia", name: "Sepia", description: "Warm, yellowish tint that's easy on the eyes." },
    { id: "classic", name: "Classic", description: "Traditional book-like appearance with serif fonts." },
    { id: "modern", name: "Modern", description: "Contemporary design with sans-serif fonts." },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold h-10 w-full md:w-[400px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Story
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="default" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader className="p-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heading3 className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Underline className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <FileAudio className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Redo className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" size="sm" className="h-8 px-2" title="AI Writing Assistant">
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" title="Grammar Check">
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2" title="Readability Score">
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Start writing your story here..."
                className="min-h-[400px] resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Last saved: 2 minutes ago</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowLayoutOptions(!showLayoutOptions)}>
                  <PanelLeft className="h-4 w-4 mr-2" />
                  Layout Options
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowSeoTools(!showSeoTools)}>
                  <Search className="h-4 w-4 mr-2" />
                  SEO Tools
                </Button>
              </div>
            </CardFooter>
            {showLayoutOptions && (
              <div className="border-t p-4 space-y-4">
                <h3 className="font-medium">Layout Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Column Layout</Label>
                    <Select defaultValue="single">
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Column</SelectItem>
                        <SelectItem value="two">Two Columns</SelectItem>
                        <SelectItem value="three">Three Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Text Alignment</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Font Size</Label>
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
                    <Label>Line Spacing</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select spacing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">Tight</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="relaxed">Relaxed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            {showSeoTools && (
              <div className="border-t p-4 space-y-4">
                <h3 className="font-medium">SEO Tools</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input id="meta-title" placeholder="Enter meta title (55-60 characters)" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>55-60 characters recommended for optimal display in search results</span>
                      <span className="font-medium">0/60</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea id="meta-description" placeholder="Enter meta description (150-160 characters)" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>150-160 characters recommended for optimal display in search results</span>
                      <span className="font-medium">0/160</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input id="keywords" placeholder="Enter keywords separated by commas" />
                    <div className="text-xs text-muted-foreground">
                      Add 3-5 relevant keywords to improve discoverability
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Preview</Label>
                    <div className="border rounded-md p-3 space-y-2">
                      <div className="text-blue-600 text-base font-medium truncate">
                        Your Story Title - Digital Legacy Platform
                      </div>
                      <div className="text-green-600 text-xs">https://digitallegacy.com/stories/your-story-title</div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        Your meta description will appear here. Make it compelling to encourage clicks from search
                        results.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>SEO Score</Label>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-green-500"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">67/100</span>
                      <span className="text-green-500 font-medium">Good</span>
                    </div>

                    <div className="space-y-1 mt-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-xs">Meta title length is optimal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-xs">Keywords present in content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-xs">Meta description missing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-xs">Image alt tags missing</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Run SEO Check
                    </Button>
                    <Button variant="default" size="sm">
                      Apply SEO Recommendations
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Integration</CardTitle>
              <CardDescription>Add images, videos, and audio to enhance your story.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Image Gallery</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square relative border rounded-md overflow-hidden bg-muted flex items-center justify-center"
                    >
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                  ))}
                  <div className="aspect-square border rounded-md border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Upload Image</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Video Embed</Label>
                <div className="aspect-video border rounded-md bg-muted flex flex-col items-center justify-center gap-2">
                  <Video className="h-8 w-8 text-muted-foreground" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Audio Player</Label>
                <div className="border rounded-md p-4 bg-muted flex items-center gap-4">
                  <FileAudio className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-primary"></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Audio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Selection</CardTitle>
                <CardDescription>Choose a layout template for your story.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {templates.find((t) => t.id === selectedTemplate)?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Layout Options</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <PanelLeft className="h-4 w-4 mr-2" />
                      Left Sidebar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Columns className="h-4 w-4 mr-2" />
                      Two Columns
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <PanelRight className="h-4 w-4 mr-2" />
                      Right Sidebar
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label>Custom Templates</Label>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input id="template-name" placeholder="Enter a name for your custom template" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-description">Description</Label>
                      <Textarea id="template-description" placeholder="Describe your template" />
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Save as New Template
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Template
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Your custom templates will appear in the template selection dropdown.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theme Selection</CardTitle>
                <CardDescription>Choose a visual theme for your story.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Theme</Label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {themes.find((t) => t.id === selectedTheme)?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-md p-4">
                    <div className="flex justify-center gap-2 mb-4">
                      <Button
                        variant={previewMode === "desktop" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewMode("desktop")}
                      >
                        <Laptop className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewMode === "tablet" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewMode("tablet")}
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewMode === "mobile" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewMode("mobile")}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                    <div
                      className={`border rounded-md mx-auto overflow-hidden ${
                        previewMode === "desktop"
                          ? "w-full"
                          : previewMode === "tablet"
                            ? "w-[768px] max-w-full"
                            : "w-[320px] max-w-full"
                      }`}
                    >
                      <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                        <div className="text-center p-4">
                          <h3 className="text-lg font-medium">Template Preview</h3>
                          <p className="text-sm text-muted-foreground">
                            {templates.find((t) => t.id === selectedTemplate)?.name} with{" "}
                            {themes.find((t) => t.id === selectedTheme)?.name} theme
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

