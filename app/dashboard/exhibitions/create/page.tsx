"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { HelpTooltip } from "@/components/ui/help-tooltip"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Save,
  Eye,
  Image,
  Upload,
  LayoutTemplate,
  Palette,
  Globe,
  Calendar,
  MessageSquare,
  Share2,
  PlusCircle,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

// Sample templates data
const templates = [
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

export default function CreateExhibitionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("details")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  useEffect(() => {
    // Check URL parameters safely
    const template = searchParams?.get("template")
    if (template) {
      setActiveTab("template")
      if (template !== "blank") {
        setSelectedTemplate(1) // Default to first template
      }
    }
  }, [searchParams])

  const handleBack = () => {
    router.back()
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Create New Exhibition"
          description="Design and publish a beautiful exhibition to showcase your digital legacy content"
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Exhibitions", href: "/dashboard/exhibitions" },
            { label: "Create" },
          ]}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          }
        />

        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exhibition Details</CardTitle>
                <CardDescription>Provide basic information about your exhibition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Exhibition Title
                    <HelpTooltip content="This will be displayed as the main title of your exhibition" />
                  </Label>
                  <Input id="title" placeholder="Enter a title for your exhibition" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                    <HelpTooltip content="Provide a brief description of what your exhibition is about" />
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter a description for your exhibition"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category
                      <HelpTooltip content="Select a category that best describes your exhibition" />
                    </Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family-history">Family History</SelectItem>
                        <SelectItem value="personal-memories">Personal Memories</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="celebrations">Celebrations</SelectItem>
                        <SelectItem value="legacy">Legacy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">
                      Tags
                      <HelpTooltip content="Add tags to help people find your exhibition" />
                    </Label>
                    <Input id="tags" placeholder="Add tags separated by commas" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="block mb-2">
                    Cover Image
                    <HelpTooltip content="This image will be displayed as the cover of your exhibition" />
                  </Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image className="h-10 w-10 text-muted-foreground" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Drag and drop an image, or click to browse</p>
                        <p className="text-xs text-muted-foreground">
                          Recommended size: 1200 x 800px. Max file size: 5MB
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Cancel
                </Button>
                <Button onClick={() => handleTabChange("template")}>Continue to Template</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
                <CardDescription>Select a template for your exhibition or start with a blank canvas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Button
                    variant={selectedTemplate === null ? "default" : "outline"}
                    className="h-auto flex flex-col items-center justify-center p-6 gap-3"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    <Palette className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-medium">Start Blank</div>
                      <div className="text-xs text-muted-foreground">Create a custom exhibition from scratch</div>
                    </div>
                  </Button>

                  <Button
                    variant={selectedTemplate !== null ? "default" : "outline"}
                    className="h-auto flex flex-col items-center justify-center p-6 gap-3"
                    onClick={() => setSelectedTemplate(1)}
                  >
                    <LayoutTemplate className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-medium">Use Template</div>
                      <div className="text-xs text-muted-foreground">Start with a pre-designed layout</div>
                    </div>
                  </Button>
                </div>

                {selectedTemplate !== null && (
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className={`overflow-hidden cursor-pointer transition-all ${
                            selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={template.preview || "/placeholder.svg"}
                              alt={template.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">{template.name}</h3>
                              <div className="text-xs bg-muted px-2 py-1 rounded-full">{template.category}</div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleTabChange("details")}>
                  Back
                </Button>
                <Button onClick={() => handleTabChange("content")}>Continue to Content</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Content</CardTitle>
                <CardDescription>Select stories and media to include in your exhibition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-8 border-2 border-dashed rounded-lg text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <PlusCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Add Stories to Your Exhibition</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Select stories from your collection to include in this exhibition. You can add, remove, and
                        reorder them later.
                      </p>
                      <Button className="mt-2">Select Stories</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-8 border-2 border-dashed rounded-lg text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Image className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Add Media to Your Exhibition</h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Select photos, videos, and other media from your library to enhance your exhibition.
                      </p>
                      <Button className="mt-2">Select Media</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleTabChange("template")}>
                  Back
                </Button>
                <Button onClick={() => handleTabChange("settings")}>Continue to Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exhibition Settings</CardTitle>
                <CardDescription>Configure visibility, sharing, and other settings for your exhibition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Visibility
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 p-4 rounded-lg border">
                        <div className="flex-shrink-0 mt-0.5">
                          <Switch id="public" />
                        </div>
                        <div>
                          <Label htmlFor="public" className="font-medium">
                            Public
                          </Label>
                          <p className="text-sm text-muted-foreground">Anyone with the link can view this exhibition</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-lg border">
                        <div className="flex-shrink-0 mt-0.5">
                          <Switch id="private" />
                        </div>
                        <div>
                          <Label htmlFor="private" className="font-medium">
                            Private
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Only you and people you invite can view this exhibition
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Publishing Schedule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="publish-date">Publish Date</Label>
                        <Input type="date" id="publish-date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publish-time">Publish Time</Label>
                        <Input type="time" id="publish-time" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comments
                    </h3>
                    <div className="flex items-start space-x-3 p-4 rounded-lg border">
                      <div className="flex-shrink-0 mt-0.5">
                        <Switch id="comments-enabled" />
                      </div>
                      <div>
                        <Label htmlFor="comments-enabled" className="font-medium">
                          Enable Comments
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow visitors to leave comments on your exhibition
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Sharing Options
                    </h3>
                    <div className="flex items-start space-x-3 p-4 rounded-lg border">
                      <div className="flex-shrink-0 mt-0.5">
                        <Switch id="social-sharing" />
                      </div>
                      <div>
                        <Label htmlFor="social-sharing" className="font-medium">
                          Social Media Sharing
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow visitors to share your exhibition on social media
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleTabChange("content")}>
                  Back
                </Button>
                <Button>Create Exhibition</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

