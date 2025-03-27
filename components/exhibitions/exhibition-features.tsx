"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUpDown,
  Calendar,
  Check,
  Clock,
  Edit,
  Eye,
  Filter,
  ImageIcon,
  LayoutGrid,
  MoreHorizontal,
  Palette,
  Plus,
  Search,
  Settings,
  Share2,
  Trash2,
  Move,
  Play,
  BarChart,
  Compass,
  ThumbsUp,
  StarIcon,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for exhibitions
const exhibitions = [
  {
    id: 1,
    title: "Family History Through the Decades",
    description: "A chronological journey through our family's most important moments.",
    status: "published",
    date: "2024-02-15",
    views: 342,
    stories: 8,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
  },
  {
    id: 2,
    title: "Grandparents' Legacy",
    description: "A tribute to the wisdom and memories of our grandparents.",
    status: "draft",
    date: "2024-03-10",
    views: 0,
    stories: 5,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
  },
  {
    id: 3,
    title: "Our Travel Adventures",
    description: "Exploring the world together as a family.",
    status: "published",
    date: "2023-12-05",
    views: 187,
    stories: 12,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
  },
  {
    id: 4,
    title: "Family Recipes Through Generations",
    description: "The culinary traditions that have been passed down in our family.",
    status: "draft",
    date: "2024-03-18",
    views: 0,
    stories: 6,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
  },
]

// Sample data for themes
const themes = [
  { id: 1, name: "Classic", preview: "/placeholder.svg?height=100&width=200" },
  { id: 2, name: "Modern", preview: "/placeholder.svg?height=100&width=200" },
  { id: 3, name: "Vintage", preview: "/placeholder.svg?height=100&width=200" },
  { id: 4, name: "Minimalist", preview: "/placeholder.svg?height=100&width=200" },
  { id: 5, name: "Elegant", preview: "/placeholder.svg?height=100&width=200" },
  { id: 6, name: "Bold", preview: "/placeholder.svg?height=100&width=200" },
]

// Sample data for stories
const stories = [
  { id: 1, title: "Summer Vacation 1995", selected: true },
  { id: 2, title: "Grandma's 80th Birthday", selected: true },
  { id: 3, title: "Our Wedding Day", selected: true },
  { id: 4, title: "First Home Purchase", selected: false },
  { id: 5, title: "Family Reunion 2020", selected: false },
  { id: 6, title: "Childhood Memories", selected: false },
  { id: 7, title: "College Graduation", selected: false },
  { id: 8, title: "Family Recipes", selected: false },
]

export function ExhibitionFeatures() {
  const [activeTab, setActiveTab] = useState("gallery")
  const [selectedExhibition, setSelectedExhibition] = useState<number | null>(null)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter exhibitions based on search query
  const filteredExhibitions = exhibitions.filter(
    (exhibition) =>
      exhibition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibition.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="gallery" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="gallery">Gallery Grid</TabsTrigger>
          <TabsTrigger value="curation">Curation Tools</TabsTrigger>
          <TabsTrigger value="statistics">Visitor Statistics</TabsTrigger>
          <TabsTrigger value="setup">Exhibition Setup</TabsTrigger>
          <TabsTrigger value="experience">Visitor Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Exhibition Gallery</CardTitle>
                  <CardDescription>Manage and showcase your digital legacy exhibitions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="default" className="shadow-sm transition-all hover:shadow">
                    <Plus className="h-4 w-4 mr-2" />
                    New Exhibition
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search exhibitions..."
                    className="pl-8 w-full sm:w-[300px] transition-all focus-visible:ring-offset-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExhibitions.length > 0 ? (
                  filteredExhibitions.map((exhibition) => (
                    <Card
                      key={exhibition.id}
                      className="overflow-hidden group hover:shadow-md transition-all border-muted"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={exhibition.coverImage || "/placeholder.svg"}
                          alt={exhibition.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant={exhibition.status === "published" ? "default" : "secondary"}
                            className={
                              exhibition.status === "published"
                                ? "bg-green-500/90 hover:bg-green-500 text-white"
                                : "bg-amber-500/90 hover:bg-amber-500 text-white"
                            }
                          >
                            {exhibition.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="outline" className="bg-black/60 text-white border-none">
                            {exhibition.stories} stories
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {exhibition.title}
                          </CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-70 hover:opacity-100 hover:bg-muted"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Preview</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription className="line-clamp-2 mt-1">{exhibition.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground border-t border-border/40 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground/70" />
                          {exhibition.date}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1 text-muted-foreground/70" />
                          {exhibition.views} views
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No exhibitions found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                    <Button>Create Your First Exhibition</Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredExhibitions.length} of {exhibitions.length} exhibitions
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden border-muted">
              <CardHeader>
                <CardTitle>Layout Templates</CardTitle>
                <CardDescription>Choose from various layout templates for your exhibitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors group overflow-hidden"
                    >
                      <div className="aspect-video bg-muted mb-2 flex items-center justify-center relative overflow-hidden">
                        <LayoutGrid className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="text-sm font-medium group-hover:text-primary transition-colors">
                        Layout Template {i}
                      </div>
                      <div className="text-xs text-muted-foreground">Description of layout {i}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" className="w-full">
                  Browse More Templates
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-muted">
              <CardHeader>
                <CardTitle>Theme Editor</CardTitle>
                <CardDescription>Customize the look and feel of your exhibitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Theme</Label>
                  <Select defaultValue="classic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.id} value={theme.name.toLowerCase()}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {themes.slice(0, 3).map((theme) => (
                    <div
                      key={theme.id}
                      className="border rounded-md p-2 cursor-pointer hover:border-primary transition-colors group overflow-hidden"
                    >
                      <div className="aspect-video bg-muted mb-2 relative overflow-hidden">
                        <img
                          src={theme.preview || "/placeholder.svg"}
                          alt={theme.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="text-xs font-medium text-center group-hover:text-primary transition-colors">
                        {theme.name}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2"></div>
                    <div className="w-8 h-8 rounded-full bg-amber-500 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2"></div>
                    <div className="w-8 h-8 rounded-full bg-rose-500 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-700 cursor-pointer ring-offset-background transition-shadow hover:ring-2 hover:ring-ring hover:ring-offset-2"></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Palette className="h-4 w-4 mr-2" />
                  Open Theme Editor
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Story Selection</CardTitle>
                <CardDescription>Select stories to include in your exhibition</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-2">
                    {stories.map((story) => (
                      <div key={story.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                        <Checkbox id={`story-${story.id}`} checked={story.selected} />
                        <label
                          htmlFor={`story-${story.id}`}
                          className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {story.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Select All
                </Button>
                <Button variant="outline" size="sm">
                  Clear All
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Media Arrangement</CardTitle>
                <CardDescription>Arrange and organize media for your exhibition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 min-h-[400px] bg-muted/30">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="border rounded-md bg-background p-2 cursor-move">
                        <div className="aspect-video bg-muted mb-2 flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium truncate">Story Item {i}</div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Move className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button>Save Arrangement</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exhibition Flow</CardTitle>
              <CardDescription>Define the narrative flow and sequence of your exhibition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Story Sequence</Label>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                </div>

                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md bg-background">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-muted-foreground">{i}.</div>
                        <div>
                          <div className="font-medium">Story Section {i}</div>
                          <div className="text-sm text-muted-foreground">Brief description of this section</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Move className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Flow</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time Spent</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4:32</div>
                <p className="text-xs text-muted-foreground">+0:45 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7/5</div>
                <p className="text-xs text-muted-foreground">Based on 87 ratings</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visit Analytics</CardTitle>
                <CardDescription>Track visitor engagement over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Visit analytics chart would appear here</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Time</CardTitle>
                <CardDescription>How long visitors spend on each section</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Engagement time chart would appear here</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Data</CardTitle>
              <CardDescription>Visitor feedback and comments on your exhibitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">Visitor {i}</div>
                        <div className="text-sm text-muted-foreground">March {10 + i}, 2024</div>
                      </div>
                      <div className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <StarIcon
                              key={j}
                              className={`h-4 w-4 ${j < 5 - (i % 2) ? "text-yellow-400" : "text-muted"}`}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      "This exhibition was very well organized and presented. I especially enjoyed the section about
                      family traditions."
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Feedback
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Settings</CardTitle>
                <CardDescription>Control who can view your exhibitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can view)</SelectItem>
                      <SelectItem value="private">Private (Only you can view)</SelectItem>
                      <SelectItem value="shared">Shared (Specific people can view)</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password Protection</Label>
                    <Switch id="password-toggle" />
                  </div>
                  <Input id="password" type="password" placeholder="Enter password" disabled />
                </div>

                <div className="space-y-2">
                  <Label>Share with Specific People</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter email address" className="flex-1" />
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-2 mt-2">
                    {["john.doe@example.com", "jane.smith@example.com"].map((email, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="text-sm">{email}</div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Access Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Options</CardTitle>
                <CardDescription>Customize how your exhibition is displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Layout Style</Label>
                  <Select defaultValue="grid">
                    <SelectTrigger>
                      <SelectValue placeholder="Select layout style" />
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
                  <Label>Cover Image</Label>
                  <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload cover image</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Display Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-title" defaultChecked />
                      <label htmlFor="show-title" className="text-sm">
                        Show exhibition title
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-description" defaultChecked />
                      <label htmlFor="show-description" className="text-sm">
                        Show exhibition description
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-author" defaultChecked />
                      <label htmlFor="show-author" className="text-sm">
                        Show author information
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-dates" defaultChecked />
                      <label htmlFor="show-dates" className="text-sm">
                        Show dates
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Display Options</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduling</CardTitle>
              <CardDescription>Set when your exhibition will be available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="schedule-exhibition" />
                <label htmlFor="schedule-exhibition" className="text-sm font-medium">
                  Schedule exhibition availability
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="featured" />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Feature this exhibition
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Featured exhibitions will be highlighted on your profile and may receive more visibility.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Schedule</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription>Add interactive features to enhance visitor experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Interactive Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audio-narration" />
                        <label htmlFor="audio-narration" className="text-sm">
                          Audio Narration
                        </label>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="image-zoom" defaultChecked />
                        <label htmlFor="image-zoom" className="text-sm">
                          Image Zoom
                        </label>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="slideshow" defaultChecked />
                        <label htmlFor="slideshow" className="text-sm">
                          Slideshow
                        </label>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="comments" defaultChecked />
                        <label htmlFor="comments" className="text-sm">
                          Comments Section
                        </label>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="quiz" />
                        <label htmlFor="quiz" className="text-sm">
                          Interactive Quiz
                        </label>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Music</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="Select background music" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ambient">Ambient</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="custom">Custom Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Interactive Elements</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Guide</CardTitle>
                <CardDescription>Help visitors navigate through your exhibition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Navigation Style</Label>
                  <Select defaultValue="guided">
                    <SelectTrigger>
                      <SelectValue placeholder="Select navigation style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guided">Guided Tour</SelectItem>
                      <SelectItem value="free">Free Exploration</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Both Options)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Navigation Elements</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="table-of-contents" defaultChecked />
                      <label htmlFor="table-of-contents" className="text-sm">
                        Table of Contents
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="next-prev" defaultChecked />
                      <label htmlFor="next-prev" className="text-sm">
                        Next/Previous Buttons
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="progress-indicator" defaultChecked />
                      <label htmlFor="progress-indicator" className="text-sm">
                        Progress Indicator
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="section-markers" />
                      <label htmlFor="section-markers" className="text-sm">
                        Section Markers
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Welcome Message</Label>
                  <Textarea placeholder="Enter a welcome message for visitors..." />
                  <p className="text-xs text-muted-foreground">
                    This message will be displayed when visitors first enter your exhibition.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Navigation Settings</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Virtual Tour</CardTitle>
              <CardDescription>Create an immersive virtual tour experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="enable-virtual-tour" />
                  <Label htmlFor="enable-virtual-tour">Enable Virtual Tour</Label>
                </div>
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Preview Tour
                </Button>
              </div>

              <div className="aspect-video border rounded-md bg-muted flex items-center justify-center">
                <div className="text-center">
                  <Compass className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Virtual tour preview would appear here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tour Type</Label>
                  <Select defaultValue="guided">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tour type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guided">Guided Tour</SelectItem>
                      <SelectItem value="360">360° Panorama</SelectItem>
                      <SelectItem value="interactive">Interactive Map</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tour Duration</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tour duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (5-10 minutes)</SelectItem>
                      <SelectItem value="medium">Medium (10-20 minutes)</SelectItem>
                      <SelectItem value="long">Long (20+ minutes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tour Hotspots</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <div className="font-medium">Hotspot {i}</div>
                        <div className="text-xs text-muted-foreground">Description of hotspot {i}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hotspot
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Virtual Tour</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

