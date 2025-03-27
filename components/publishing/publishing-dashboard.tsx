"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { Search } from "@/components/ui/search"
import { PublicationOptions } from "@/components/publishing/publication-options"
import { ExportOptions } from "@/components/publishing/export-options"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  BookOpen,
  FileText,
  Settings,
  Share2,
  Clock,
  BookType,
  BarChart3,
  CalendarIcon,
  Eye,
  Filter,
  MoreHorizontal,
  Download,
  Trash2,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
  Plus,
  Sparkles,
  Lightbulb,
  Pencil,
  ExternalLink,
  Copy,
  LayoutGrid,
  List,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PublishingDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const { toast } = useToast()

  // Filter publications based on search query
  const filteredPublications = allPublications.filter((pub) =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = () => {
    toast({
      title: "Publication Deleted",
      description: "The publication has been deleted successfully.",
      variant: "default",
    })
  }

  const handleSchedule = () => {
    setShowScheduleDialog(false)
    toast({
      title: "Publication Scheduled",
      description: "Your publication has been scheduled successfully.",
      variant: "success",
    })
  }

  const handleCopyLink = () => {
    toast({
      title: "Link Copied",
      description: "Publication link has been copied to clipboard.",
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gradient-to-br from-primary/90 to-primary w-2.5" />
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookType className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    +3 this month
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-muted-foreground">Total Publications</p>
                <div className="mt-3 flex items-center text-xs text-primary">
                  <span>View all</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gradient-to-br from-blue-500/90 to-blue-600 w-2.5" />
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <Badge variant="outline" className="bg-blue-500/5 text-blue-500 border-blue-500/20">
                    +18% from last month
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">1,248</h3>
                <p className="text-sm text-muted-foreground">Total Engagement</p>
                <div className="mt-3 flex items-center text-xs text-blue-500">
                  <span>View analytics</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gradient-to-br from-amber-500/90 to-amber-600 w-2.5" />
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-500" />
                  </div>
                  <Badge variant="outline" className="bg-amber-500/5 text-amber-500 border-amber-500/20">
                    Next: Tomorrow
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-sm text-muted-foreground">Scheduled Publications</p>
                <div className="mt-3 flex items-center text-xs text-amber-500">
                  <span>Manage schedule</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-1.5">
              <BookType className="h-4 w-4" />
              <span className="hidden sm:inline">Publications</span>
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1.5">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {activeTab === "publications" && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search
                placeholder="Search publications..."
                className="w-full sm:w-[250px]"
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Publications</h4>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          All
                        </Badge>
                        <Badge variant="secondary" className="cursor-pointer">
                          Published
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          Draft
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                          Scheduled
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Start Date
                        </Button>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          End Date
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Categories</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="memories">Memories</SelectItem>
                          <SelectItem value="family">Family History</SelectItem>
                          <SelectItem value="recipes">Recipes</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => setFilterOpen(false)}>
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => setFilterOpen(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-sm border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Publication Activity
                  </CardTitle>
                  <CardDescription>Your publishing activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">Publication Activity Chart</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Showing publication frequency and engagement metrics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-sm border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common publishing tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Publication
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule Publication
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Content
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Draft
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    Publishing Tips
                  </CardTitle>
                  <CardDescription>Improve your content reach</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Use engaging titles</p>
                      <p className="text-xs text-muted-foreground">Descriptive titles attract more readers</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Add quality images</p>
                      <p className="text-xs text-muted-foreground">Visual content increases engagement</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Schedule strategically</p>
                      <p className="text-xs text-muted-foreground">Publish when your audience is most active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm border-none">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Recent Publications
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Your recently published content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPublications.map((pub) => (
                    <div key={pub.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className="h-14 w-14 rounded-md bg-muted overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=56&width=56&text=${pub.title.charAt(0)}`}
                          alt={pub.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{pub.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {pub.date}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {pub.views} views
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Share</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-none">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Scheduled Publications
                  </CardTitle>
                  <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Schedule New
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Schedule Publication</DialogTitle>
                        <DialogDescription>
                          Choose when you want your content to be automatically published.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="schedule-title">Publication Title</Label>
                          <Input id="schedule-title" placeholder="Enter publication title" />
                        </div>
                        <div className="space-y-2">
                          <Label>Publication Date</Label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="border rounded-md p-3"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schedule-time">Publication Time</Label>
                          <Select defaultValue="9am">
                            <SelectTrigger id="schedule-time">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9am">9:00 AM</SelectItem>
                              <SelectItem value="12pm">12:00 PM</SelectItem>
                              <SelectItem value="3pm">3:00 PM</SelectItem>
                              <SelectItem value="6pm">6:00 PM</SelectItem>
                              <SelectItem value="9pm">9:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-schedule" />
                          <Label htmlFor="notify-schedule">Notify me when published</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSchedule}>Schedule Publication</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Content scheduled for future publication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPublications.map((pub) => (
                    <div key={pub.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div className="h-14 w-14 rounded-md bg-amber-50 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{pub.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            <CalendarDays className="h-3 w-3 mr-1" />
                            {pub.date}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Preview</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Reschedule</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Cancel Schedule</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="publications" className="mt-0">
          <Card className="shadow-sm border-none">
            <CardContent className="p-6">
              {filteredPublications.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPublications.map((pub) => (
                      <Card key={pub.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="relative h-40 bg-muted">
                          <img
                            src={`/placeholder.svg?height=160&width=320&text=${pub.title.charAt(0)}`}
                            alt={pub.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Badge
                              variant={
                                pub.status === "published"
                                  ? "default"
                                  : pub.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                pub.status === "draft"
                                  ? "bg-slate-200 text-slate-800"
                                  : pub.status === "published"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-amber-100 text-amber-800 border-amber-200"
                              }
                            >
                              {pub.status}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium truncate">{pub.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-muted-foreground flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {pub.date}
                            </p>
                            {pub.status === "published" && (
                              <p className="text-xs text-muted-foreground flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {pub.views} views
                              </p>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={handleCopyLink}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy Link</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPublications.map((pub) => (
                      <div
                        key={pub.id}
                        className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/20 transition-colors"
                      >
                        <div className="h-14 w-14 rounded-md bg-muted overflow-hidden">
                          <img
                            src={`/placeholder.svg?height=56&width=56&text=${pub.title.charAt(0)}`}
                            alt={pub.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium truncate">{pub.title}</h4>
                            <Badge
                              variant={
                                pub.status === "published"
                                  ? "default"
                                  : pub.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                pub.status === "draft"
                                  ? "bg-slate-200 text-slate-800"
                                  : pub.status === "published"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-amber-100 text-amber-800 border-amber-200"
                              }
                            >
                              {pub.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-muted-foreground flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {pub.date}
                            </p>
                            {pub.status === "published" && (
                              <p className="text-xs text-muted-foreground flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {pub.views} views
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={handleCopyLink}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy Link</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <EmptyState
                  title="No publications found"
                  description="Try adjusting your search or create a new publication"
                  icon={<BookType className="h-12 w-12 text-muted-foreground/50" />}
                  action={{
                    label: "Create Publication",
                    onClick: () => {},
                  }}
                  secondaryAction={{
                    label: "Clear Search",
                    onClick: () => setSearchQuery(""),
                  }}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredPublications.length} of {allPublications.length} publications
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
        </TabsContent>

        <TabsContent value="export" className="mt-0">
          <ExportOptions />
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <PublicationOptions />
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-none shadow-sm">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-medium">Publishing Best Practices</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Learn how to create engaging publications and reach a wider audience with your digital legacy content.
                Our comprehensive guide covers everything from content creation to distribution strategies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="gap-1.5">
                <FileText className="h-4 w-4" />
                View Guide
              </Button>
              <Button className="gap-1.5">
                <ExternalLink className="h-4 w-4" />
                Get Expert Help
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample data
const recentPublications = [
  {
    id: 1,
    title: "My Family History: Chapter 1",
    date: "2 days ago",
    views: 156,
  },
  {
    id: 2,
    title: "Summer Vacation Memories",
    date: "1 week ago",
    views: 342,
  },
  {
    id: 3,
    title: "Grandma's Recipes Collection",
    date: "2 weeks ago",
    views: 289,
  },
  {
    id: 4,
    title: "Our Wedding Anniversary",
    date: "3 weeks ago",
    views: 521,
  },
]

const scheduledPublications = [
  {
    id: 1,
    title: "Family Reunion 2023",
    date: "Tomorrow at 9:00 AM",
  },
  {
    id: 2,
    title: "My Family History: Chapter 2",
    date: "Next Monday at 10:00 AM",
  },
  {
    id: 3,
    title: "Holiday Traditions",
    date: "Dec 15, 2023 at 12:00 PM",
  },
]

const allPublications = [
  {
    id: 1,
    title: "My Family History: Chapter 1",
    date: "2 days ago",
    views: 156,
    status: "published",
  },
  {
    id: 2,
    title: "Summer Vacation Memories",
    date: "1 week ago",
    views: 342,
    status: "published",
  },
  {
    id: 3,
    title: "Grandma's Recipes Collection",
    date: "2 weeks ago",
    views: 289,
    status: "published",
  },
  {
    id: 4,
    title: "Our Wedding Anniversary",
    date: "3 weeks ago",
    views: 521,
    status: "published",
  },
  {
    id: 5,
    title: "Family Reunion 2023",
    date: "Tomorrow at 9:00 AM",
    views: 0,
    status: "scheduled",
  },
  {
    id: 6,
    title: "My Family History: Chapter 2",
    date: "Next Monday at 10:00 AM",
    views: 0,
    status: "scheduled",
  },
  {
    id: 7,
    title: "Holiday Traditions",
    date: "Dec 15, 2023 at 12:00 PM",
    views: 0,
    status: "scheduled",
  },
  {
    id: 8,
    title: "Childhood Memories",
    date: "Last edited 3 days ago",
    views: 0,
    status: "draft",
  },
  {
    id: 9,
    title: "Travel Adventures: Europe Trip",
    date: "Last edited 1 week ago",
    views: 0,
    status: "draft",
  },
]

