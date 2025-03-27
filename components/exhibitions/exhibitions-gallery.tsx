"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { HelpTooltip } from "@/components/ui/help-tooltip"
import { SectionHeader } from "@/components/ui/section-header"
import {
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  Clock,
  Users,
  LayoutGrid,
  Layers,
  Settings,
  Copy,
  Trash2,
  Share2,
  PlusCircle,
  BarChart4,
  ArrowUpRight,
  Palette,
  LayoutTemplate,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

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
    visitors: 156,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    lastEdited: "2 days ago",
    author: "John Smith",
    featured: true,
  },
  {
    id: 2,
    title: "Grandparents' Legacy",
    description: "A tribute to the wisdom and memories of our grandparents.",
    status: "draft",
    date: "2024-03-10",
    views: 0,
    stories: 5,
    visitors: 0,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    lastEdited: "5 hours ago",
    author: "John Smith",
    featured: false,
  },
  {
    id: 3,
    title: "Our Travel Adventures",
    description: "Exploring the world together as a family.",
    status: "published",
    date: "2023-12-05",
    views: 187,
    stories: 12,
    visitors: 89,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    lastEdited: "1 week ago",
    author: "John Smith",
    featured: false,
  },
  {
    id: 4,
    title: "Family Recipes Through Generations",
    description: "The culinary traditions that have been passed down in our family.",
    status: "draft",
    date: "2024-03-18",
    views: 0,
    stories: 6,
    visitors: 0,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    lastEdited: "Just now",
    author: "John Smith",
    featured: false,
  },
  {
    id: 5,
    title: "Wedding Memories",
    description: "A collection of our most cherished wedding moments and memories.",
    status: "published",
    date: "2023-10-12",
    views: 245,
    stories: 9,
    visitors: 112,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    lastEdited: "3 weeks ago",
    author: "John Smith",
    featured: true,
  },
  {
    id: 6,
    title: "Childhood Memories",
    description: "Growing up in the 90s - a nostalgic look back at childhood.",
    status: "archived",
    date: "2023-08-05",
    views: 78,
    stories: 7,
    visitors: 42,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    lastEdited: "2 months ago",
    author: "John Smith",
    featured: false,
  },
]

// Sample data for templates
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

export function ExhibitionsGallery() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<"grid" | "list" | "analytics">("grid")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const handleCreateExhibition = (type?: string) => {
    if (type) {
      router.push(`/dashboard/exhibitions/create?${type}=true`)
    } else {
      router.push("/dashboard/exhibitions/create")
    }
    setShowCreateDialog(false)
  }

  const handleCardClick = () => {
    setShowCreateDialog(true)
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="exhibitions" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="exhibitions">My Exhibitions</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button
              variant={activeView === "grid" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setActiveView("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === "list" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setActiveView("list")}
            >
              <Layers className="h-4 w-4" />
            </Button>
            <Button
              variant={activeView === "analytics" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setActiveView("analytics")}
            >
              <BarChart4 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="exhibitions" className="mt-0">
          {activeView === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibitions.map((exhibition) => (
                <EnhancedCard
                  key={exhibition.id}
                  variant="interactive"
                  className="overflow-hidden group transition-all duration-300 hover:shadow-md"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={exhibition.coverImage || "/placeholder.svg"}
                      alt={exhibition.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {exhibition.featured && (
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                          Featured
                        </Badge>
                      )}
                      <Badge
                        variant={
                          exhibition.status === "published"
                            ? "default"
                            : exhibition.status === "draft"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          exhibition.status === "published"
                            ? "bg-green-500/90 hover:bg-green-500 text-white"
                            : exhibition.status === "draft"
                              ? "bg-amber-500/90 hover:bg-amber-500 text-white"
                              : "bg-slate-500/90 hover:bg-slate-500 text-white"
                        }
                      >
                        {exhibition.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-sm font-medium">{exhibition.description}</div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                        {exhibition.title}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
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
                          <DropdownMenuItem className="cursor-pointer">
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>Views</span>
                        </div>
                        <span className="font-medium">{exhibition.views}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Layers className="h-3 w-3 mr-1" />
                          <span>Stories</span>
                        </div>
                        <span className="font-medium">{exhibition.stories}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span>Visitors</span>
                        </div>
                        <span className="font-medium">{exhibition.visitors}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-4 py-3 border-t flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {exhibition.date}
                    </div>
                    <div>Edited {exhibition.lastEdited}</div>
                  </CardFooter>
                </EnhancedCard>
              ))}

              {/* Create New Exhibition Card */}
              <Card
                className="border-dashed border-2 hover:border-primary/50 hover:bg-muted/50 cursor-pointer flex flex-col items-center justify-center p-6 h-full min-h-[300px] transition-colors"
                onClick={handleCardClick}
              >
                <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Create New Exhibition</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Start from scratch or use a template to showcase your stories
                </p>
              </Card>
            </div>
          )}

          {activeView === "list" && (
            <div className="space-y-3">
              {exhibitions.map((exhibition) => (
                <Card key={exhibition.id} className="overflow-hidden hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-[180px] h-[120px] overflow-hidden">
                      <img
                        src={exhibition.coverImage || "/placeholder.svg"}
                        alt={exhibition.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{exhibition.title}</h3>
                            <Badge
                              variant={
                                exhibition.status === "published"
                                  ? "default"
                                  : exhibition.status === "draft"
                                    ? "outline"
                                    : "secondary"
                              }
                              className={
                                exhibition.status === "published"
                                  ? "bg-green-500/90 hover:bg-green-500 text-white"
                                  : exhibition.status === "draft"
                                    ? "bg-amber-500/90 hover:bg-amber-500 text-white"
                                    : "bg-slate-500/90 hover:bg-slate-500 text-white"
                              }
                            >
                              {exhibition.status}
                            </Badge>
                            {exhibition.featured && (
                              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{exhibition.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px]">
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
                            <DropdownMenuItem className="cursor-pointer">
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Duplicate</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{exhibition.date}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Edited {exhibition.lastEdited}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          <span>{exhibition.views} views</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Layers className="h-3.5 w-3.5 mr-1" />
                          <span>{exhibition.stories} stories</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex sm:flex-col justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <Card
                className="border-dashed border-2 hover:border-primary/50 hover:bg-muted/50 cursor-pointer p-4"
                onClick={handleCardClick}
              >
                <div className="flex items-center gap-4">
                  <PlusCircle className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Create New Exhibition</h3>
                    <p className="text-sm text-muted-foreground">Start from scratch or use a template</p>
                  </div>
                  <Button
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCreateExhibition()
                    }}
                  >
                    Create
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeView === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">Total Exhibitions</span>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold">{exhibitions.length}</span>
                        <span className="ml-2 text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          +2 this month
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">Total Views</span>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold">
                          {exhibitions.reduce((sum, exhibition) => sum + exhibition.views, 0)}
                        </span>
                        <span className="ml-2 text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          +18% this month
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">Avg. Engagement</span>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold">4:32</span>
                        <span className="ml-2 text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          +0:45 this month
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold">68%</span>
                        <span className="ml-2 text-sm text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-0.5" />
                          +5% this month
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Top Exhibitions by Views</h3>
                    <div className="space-y-4">
                      {exhibitions
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 5)
                        .map((exhibition, index) => (
                          <div key={exhibition.id} className="flex items-center gap-3">
                            <div className="font-medium text-muted-foreground w-5">{index + 1}</div>
                            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={exhibition.coverImage || "/placeholder.svg"}
                                alt={exhibition.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{exhibition.title}</div>
                              <div className="text-sm text-muted-foreground">{exhibition.views} views</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Eye className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Family History Through the Decades</span> was viewed 24 times
                            today
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <Edit className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm">
                            You edited <span className="font-medium">Grandparents' Legacy</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <Share2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm">
                            You shared <span className="font-medium">Our Travel Adventures</span> with 3 people
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                          <PlusCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm">
                            You created <span className="font-medium">Family Recipes Through Generations</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="mt-0">
          <div className="space-y-6">
            <SectionHeader
              title="Exhibition Templates"
              description="Start with a pre-designed template to showcase your stories"
              action={{
                label: "Submit Template",
                onClick: () => {},
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={template.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm">{template.description}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium group-hover:text-primary transition-colors">{template.name}</h3>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm">Use Template</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <BarChart4 className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Exhibition Analytics Dashboard</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Track performance, engagement, and visitor statistics for all your exhibitions in one place.
                </p>
                <Button>View Full Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpTooltip
                content={
                  <div className="space-y-2">
                    <p>Exhibitions allow you to curate and showcase your digital legacy content.</p>
                    <p>You can create multiple exhibitions with different themes and layouts.</p>
                  </div>
                }
                iconClassName="h-6 w-6 text-primary"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-medium">Need help with exhibitions?</h3>
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

      {/* Global dialog for create exhibition */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Exhibition</DialogTitle>
            <DialogDescription>Choose how you want to start your new exhibition</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-6 gap-3"
              onClick={() => handleCreateExhibition("template")}
            >
              <LayoutTemplate className="h-8 w-8 text-primary" />
              <div className="text-center">
                <div className="font-medium">Use Template</div>
                <div className="text-xs text-muted-foreground">Start with a pre-designed layout</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-6 gap-3"
              onClick={() => handleCreateExhibition("blank")}
            >
              <Palette className="h-8 w-8 text-primary" />
              <div className="text-center">
                <div className="font-medium">Start Blank</div>
                <div className="text-xs text-muted-foreground">Create a custom exhibition</div>
              </div>
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleCreateExhibition()}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

