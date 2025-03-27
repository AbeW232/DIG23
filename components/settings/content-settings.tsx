"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, Plus, Save, Video, X } from "lucide-react"

export function ContentSettings() {
  const [activeTab, setActiveTab] = useState("creation")
  const [allowedFileTypes, setAllowedFileTypes] = useState({
    images: ["jpg", "jpeg", "png", "gif", "webp"],
    videos: ["mp4", "webm", "mov", "avi"],
    audio: ["mp3", "wav", "ogg", "m4a"],
    documents: ["pdf", "doc", "docx", "txt", "rtf"],
  })

  const handleRemoveFileType = (category, type) => {
    setAllowedFileTypes({
      ...allowedFileTypes,
      [category]: allowedFileTypes[category].filter((t) => t !== type),
    })
  }

  const handleAddFileType = (category, type) => {
    if (type && !allowedFileTypes[category].includes(type)) {
      setAllowedFileTypes({
        ...allowedFileTypes,
        [category]: [...allowedFileTypes[category], type],
      })
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="creation" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="creation">Content Creation</TabsTrigger>
          <TabsTrigger value="media">Media Settings</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Content Creation Tab */}
        <TabsContent value="creation" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Content Creation Settings</CardTitle>
              <CardDescription>Configure settings for story creation and editing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Editor Mode</Label>
                <Select defaultValue="rich">
                  <SelectTrigger>
                    <SelectValue placeholder="Select editor mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rich">Rich Text Editor</SelectItem>
                    <SelectItem value="markdown">Markdown Editor</SelectItem>
                    <SelectItem value="simple">Simple Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Default Story Privacy</Label>
                <Select defaultValue="private">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="shared">Shared with Family</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-Save Drafts</Label>
                  <div className="text-sm text-muted-foreground">Automatically save story drafts while editing</div>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="version-history">Version History</Label>
                  <div className="text-sm text-muted-foreground">Keep track of story revisions</div>
                </div>
                <Switch id="version-history" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Maximum Revision History</Label>
                <Select defaultValue="20">
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum revisions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 revisions</SelectItem>
                    <SelectItem value="10">10 revisions</SelectItem>
                    <SelectItem value="20">20 revisions</SelectItem>
                    <SelectItem value="50">50 revisions</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="spell-check">Spell Check</Label>
                  <div className="text-sm text-muted-foreground">Enable spell checking in the editor</div>
                </div>
                <Switch id="spell-check" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="grammar-check">Grammar Check</Label>
                  <div className="text-sm text-muted-foreground">Enable grammar checking in the editor</div>
                </div>
                <Switch id="grammar-check" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Default Word Count Goal</Label>
                <Input type="number" defaultValue="500" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Content Creation Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Content Organization</CardTitle>
              <CardDescription>Configure settings for content organization and categorization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Story Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Family History", "Personal Memories", "Milestones", "Traditions", "Recipes", "Travel"].map(
                    (category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                        <button className="ml-1 text-muted-foreground hover:text-foreground">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ),
                  )}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add new category" />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Default Story Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["memories", "legacy", "family", "history", "important", "childhood"].map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                      <button className="ml-1 text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add new tag" />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-categorize">Auto-Categorization</Label>
                  <div className="text-sm text-muted-foreground">Automatically suggest categories based on content</div>
                </div>
                <Switch id="auto-categorize" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-tag">Auto-Tagging</Label>
                  <div className="text-sm text-muted-foreground">Automatically suggest tags based on content</div>
                </div>
                <Switch id="auto-tag" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Organization Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Media Settings Tab */}
        <TabsContent value="media" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Media Settings</CardTitle>
              <CardDescription>Configure settings for media uploads and processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Allowed Image File Types</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {allowedFileTypes.images.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {type}
                      <button
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveFileType("images", type)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add file type (e.g., svg)" id="image-type" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("image-type") as HTMLInputElement
                      handleAddFileType("images", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allowed Video File Types</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {allowedFileTypes.videos.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      {type}
                      <button
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveFileType("videos", type)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add file type (e.g., mkv)" id="video-type" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("video-type") as HTMLInputElement
                      handleAddFileType("videos", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allowed Document File Types</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {allowedFileTypes.documents.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {type}
                      <button
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveFileType("documents", type)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add file type (e.g., xlsx)" id="document-type" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("document-type") as HTMLInputElement
                      handleAddFileType("documents", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allowed Audio File Types</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {allowedFileTypes.audio.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {type}
                      <button
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveFileType("audio", type)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Add file type (e.g., flac)" id="audio-type" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById("audio-type") as HTMLInputElement
                      handleAddFileType("audio", input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="image-optimization">Image Optimization</Label>
                  <div className="text-sm text-muted-foreground">Automatically optimize images on upload</div>
                </div>
                <Switch id="image-optimization" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="video-transcoding">Video Transcoding</Label>
                  <div className="text-sm text-muted-foreground">
                    Automatically transcode videos to web-friendly formats
                  </div>
                </div>
                <Switch id="video-transcoding" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-thumbnail">Auto-Generate Thumbnails</Label>
                  <div className="text-sm text-muted-foreground">Automatically generate thumbnails for media</div>
                </div>
                <Switch id="auto-thumbnail" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Media Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Media Processing</CardTitle>
              <CardDescription>Configure settings for media processing and optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Image Quality</Label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue placeholder="Select image quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (faster loading)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="original">Original (no compression)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Default Video Quality</Label>
                <Select defaultValue="720p">
                  <SelectTrigger>
                    <SelectValue placeholder="Select video quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="original">Original</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Image Resize Dimensions</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Max Width (px)</Label>
                    <Input type="number" defaultValue="1920" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Max Height (px)</Label>
                    <Input type="number" defaultValue="1080" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="preserve-exif">Preserve EXIF Data</Label>
                  <div className="text-sm text-muted-foreground">Keep image metadata when processing</div>
                </div>
                <Switch id="preserve-exif" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-orient">Auto-Orient Images</Label>
                  <div className="text-sm text-muted-foreground">Automatically correct image orientation</div>
                </div>
                <Switch id="auto-orient" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Processing Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6 mt-6">
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Story Templates</CardTitle>
              <CardDescription>Configure default story templates for users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Story Template</Label>
                <Select defaultValue="blank">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blank">Blank Story</SelectItem>
                    <SelectItem value="personal">Personal Memory</SelectItem>
                    <SelectItem value="family">Family History</SelectItem>
                    <SelectItem value="milestone">Life Milestone</SelectItem>
                    <SelectItem value="recipe">Family Recipe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Available Templates</h3>
                    <p className="text-sm text-muted-foreground">Templates available to users</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Template
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, name: "Blank Story", description: "Start with a blank canvas", enabled: true },
                    { id: 2, name: "Personal Memory", description: "Template for personal memories", enabled: true },
                    { id: 3, name: "Family History", description: "Template for family history", enabled: true },
                    { id: 4, name: "Life Milestone", description: "Template for life milestones", enabled: true },
                    { id: 5, name: "Family Recipe", description: "Template for family recipes", enabled: true },
                    { id: 6, name: "Travel Story", description: "Template for travel stories", enabled: false },
                  ].map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox id={`template-${template.id}`} checked={template.enabled} />
                        <div>
                          <Label htmlFor={`template-${template.id}`} className="font-medium">
                            {template.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Template Sections</Label>
                <div className="border rounded-md p-4">
                  <div className="space-y-3">
                    {[
                      { id: 1, name: "Introduction", required: true },
                      { id: 2, name: "Main Content", required: true },
                      { id: 3, name: "People Involved", required: false },
                      { id: 4, name: "Location", required: false },
                      { id: 5, name: "Date & Time", required: true },
                      { id: 6, name: "Photos & Media", required: false },
                      { id: 7, name: "Reflections", required: false },
                    ].map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="font-medium">{section.name}</div>
                          {section.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Template Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Exhibition Templates</CardTitle>
              <CardDescription>Configure default exhibition templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Exhibition Template</Label>
                <Select defaultValue="gallery">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallery">Gallery View</SelectItem>
                    <SelectItem value="timeline">Timeline View</SelectItem>
                    <SelectItem value="slideshow">Slideshow</SelectItem>
                    <SelectItem value="book">Book Format</SelectItem>
                    <SelectItem value="custom">Custom Layout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Available Exhibition Templates</h3>
                    <p className="text-sm text-muted-foreground">Templates available to users</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Template
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 1, name: "Gallery View", description: "Grid-based gallery layout", enabled: true },
                    { id: 2, name: "Timeline View", description: "Chronological timeline layout", enabled: true },
                    { id: 3, name: "Slideshow", description: "Full-screen slideshow presentation", enabled: true },
                    { id: 4, name: "Book Format", description: "Flippable book-style layout", enabled: true },
                    { id: 5, name: "Custom Layout", description: "Fully customizable layout", enabled: false },
                  ].map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox id={`exhibition-${template.id}`} checked={template.enabled} />
                        <div>
                          <Label htmlFor={`exhibition-${template.id}`} className="font-medium">
                            {template.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Exhibition Templates
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

