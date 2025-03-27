"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EmptyState } from "@/components/ui/empty-state"
import { Search } from "@/components/ui/search"
import {
  Clock,
  Download,
  FileAudio,
  FileText,
  Filter,
  Grid,
  ImageIcon,
  Info,
  List,
  MoreHorizontal,
  Share2,
  Tag,
  Trash2,
  Upload,
  Video,
  FolderPlus,
  SlidersHorizontal,
  HelpCircle,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function MediaDashboard() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { toast } = useToast()

  // Sample data for media items
  const mediaItems = [
    {
      id: 1,
      name: "Family Photo 2023.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2023-12-15",
      tags: ["family", "vacation"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Grandparents Interview.mp4",
      type: "video",
      size: "45.8 MB",
      duration: "5:32",
      uploadDate: "2023-11-20",
      tags: ["interview", "grandparents"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Childhood Home.jpg",
      type: "image",
      size: "1.8 MB",
      dimensions: "2400x1600",
      uploadDate: "2024-01-05",
      tags: ["home", "childhood"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Family Recipe Book.pdf",
      type: "document",
      size: "3.2 MB",
      pages: 12,
      uploadDate: "2024-02-10",
      tags: ["recipes", "tradition"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Wedding Day.jpg",
      type: "image",
      size: "3.5 MB",
      dimensions: "3000x2000",
      uploadDate: "2023-10-18",
      tags: ["wedding", "milestone"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Grandma's Stories.mp3",
      type: "audio",
      size: "18.2 MB",
      duration: "12:45",
      uploadDate: "2024-01-22",
      tags: ["stories", "grandparents", "audio"],
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Filter media items based on search query and active tab
  const filteredMediaItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    return matchesSearch && item.type === activeTab
  })

  // Simulate upload process
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          toast({
            title: "Upload Complete",
            description: "Your files have been uploaded successfully.",
            variant: "success",
          })
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Toggle item selection
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Select all items
  const selectAllItems = () => {
    if (selectedItems.length === filteredMediaItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredMediaItems.map((item) => item.id))
    }
  }

  // Delete selected items
  const deleteSelectedItems = () => {
    toast({
      title: "Items Deleted",
      description: `${selectedItems.length} items have been deleted.`,
      variant: "default",
    })
    setSelectedItems([])
  }

  // Get icon based on media type
  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "audio":
        return <FileAudio className="h-5 w-5 text-green-500" />
      case "document":
        return <FileText className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <EnhancedCard
          title="Total Files"
          icon={<FileText className="h-5 w-5 text-primary" />}
          badge="248"
          description={<span className="text-green-500 font-medium">+32 from last month</span>}
          variant="interactive"
        />
        <EnhancedCard
          title="Storage Used"
          icon={<Download className="h-5 w-5 text-primary" />}
          badge="4.2 GB"
          description={<span className="text-green-500 font-medium">42% of your storage</span>}
          variant="interactive"
        />
        <EnhancedCard
          title="Collections"
          icon={<Grid className="h-5 w-5 text-primary" />}
          badge="12"
          description={<span className="text-green-500 font-medium">+3 from last month</span>}
          variant="interactive"
        />
        <EnhancedCard
          title="Recent Uploads"
          icon={<Clock className="h-5 w-5 text-primary" />}
          badge="18"
          description={<span className="text-green-500 font-medium">Last 7 days</span>}
          variant="interactive"
        />
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <EnhancedCard variant="primary">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Upload className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">Uploading files...</span>
            </div>
            <span className="font-medium">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">Uploading 3 files. Please don't close this page.</p>
        </EnhancedCard>
      )}

      {/* Main Content */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search
              placeholder="Search media..."
              className="w-full sm:w-[250px]"
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <div className="flex items-center border rounded-md shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 ${viewType === "grid" ? "bg-muted" : ""}`}
                onClick={() => setViewType("grid")}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 ${viewType === "list" ? "bg-muted" : ""}`}
                onClick={() => setViewType("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`shadow-sm ${isFilterOpen ? "bg-muted" : ""}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-label="Filter"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isFilterOpen && (
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">File Type</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-images" />
                      <label htmlFor="filter-images" className="text-sm">
                        Images
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-videos" />
                      <label htmlFor="filter-videos" className="text-sm">
                        Videos
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-audio" />
                      <label htmlFor="filter-audio" className="text-sm">
                        Audio
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-documents" />
                      <label htmlFor="filter-documents" className="text-sm">
                        Documents
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Date Added</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-today" />
                      <label htmlFor="filter-today" className="text-sm">
                        Today
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-week" />
                      <label htmlFor="filter-week" className="text-sm">
                        Last 7 days
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-month" />
                      <label htmlFor="filter-month" className="text-sm">
                        Last 30 days
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="filter-year" />
                      <label htmlFor="filter-year" className="text-sm">
                        Last year
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "family",
                      "vacation",
                      "wedding",
                      "milestone",
                      "childhood",
                      "recipes",
                      "tradition",
                      "stories",
                      "grandparents",
                      "home",
                    ].map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">
                Reset Filters
              </Button>
              <Button size="sm">Apply Filters</Button>
            </CardFooter>
          </Card>
        )}

        <TabsContent value="all" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {selectedItems.length > 0 ? (
                <span>{selectedItems.length} items selected</span>
              ) : (
                <span>Showing {filteredMediaItems.length} items</span>
              )}
            </div>
            {selectedItems.length > 0 ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="shadow-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="shadow-sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="shadow-sm text-destructive hover:text-destructive"
                  onClick={deleteSelectedItems}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={selectAllItems}>
                Select All
              </Button>
            )}
          </div>

          {filteredMediaItems.length > 0 ? (
            viewType === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredMediaItems.map((item) => (
                  <div key={item.id} className="relative group">
                    <div
                      className={`aspect-square border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all ${
                        selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => toggleItemSelection(item.id)}
                    >
                      <div className="absolute top-2 left-2 z-10">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </div>

                      <div className="absolute top-2 right-2 z-10 bg-black/40 rounded-full p-1">
                        {getMediaIcon(item.type)}
                      </div>

                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium truncate">{item.name}</div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">{item.size}</div>
                        <div className="flex gap-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-4">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                              +{item.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedItems.length === filteredMediaItems.length && filteredMediaItems.length > 0}
                          onCheckedChange={selectAllItems}
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Tags</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {filteredMediaItems.map((item) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-muted/50 transition-colors ${
                          selectedItems.includes(item.id) ? "bg-muted/50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                          />
                        </td>
                        <td className="px-4 py-3 flex items-center gap-2">
                          {getMediaIcon(item.type)}
                          <span className="truncate max-w-[150px] text-sm">{item.name}</span>
                        </td>
                        <td className="px-4 py-3 capitalize text-sm">{item.type}</td>
                        <td className="px-4 py-3 text-sm">{item.size}</td>
                        <td className="px-4 py-3 text-sm">{item.uploadDate}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px]">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Info className="mr-2 h-4 w-4" />
                                <span>View Details</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="mr-2 h-4 w-4" />
                                <span>Edit Tags</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <EmptyState
              title="No media found"
              description="Try adjusting your search or filters"
              icon={<ImageIcon className="h-12 w-12 text-muted-foreground/50" />}
              action={{
                label: "Upload Media",
                onClick: simulateUpload,
              }}
              secondaryAction={{
                label: "Browse All",
                onClick: () => {
                  setSearchQuery("")
                  setActiveTab("all")
                },
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          {filteredMediaItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMediaItems.map((item) => (
                <div key={item.id} className="relative group">
                  <div
                    className="aspect-square border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                    onClick={() => toggleItemSelection(item.id)}
                  >
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </div>

                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.dimensions} • {item.size}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No images found"
              description="Try adjusting your search or filters"
              icon={<ImageIcon className="h-12 w-12 text-muted-foreground/50" />}
              action={{
                label: "Upload Images",
                onClick: simulateUpload,
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          {filteredMediaItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMediaItems.map((item) => (
                <div key={item.id} className="relative group">
                  <div
                    className="aspect-video border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                    onClick={() => toggleItemSelection(item.id)}
                  >
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                        <Video className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.size}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No videos found"
              description="Try adjusting your search or filters"
              icon={<Video className="h-12 w-12 text-muted-foreground/50" />}
              action={{
                label: "Upload Videos",
                onClick: simulateUpload,
              }}
            />
          )}
        </TabsContent>

        <TabsContent value="document" className="space-y-4">
          {filteredMediaItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMediaItems.map((item) => (
                <Card key={item.id} className="shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getMediaIcon(item.type)}
                        <CardTitle className="text-base">{item.name}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>
                      {item.type === "document" ? `${item.pages} pages` : item.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span>Size: {item.size}</span>
                      <span>Uploaded: {item.uploadDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full shadow-sm">
                      <Info className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No documents found"
              description="Try adjusting your search or filters"
              icon={<FileText className="h-12 w-12 text-muted-foreground/50" />}
              action={{
                label: "Upload Documents",
                onClick: simulateUpload,
              }}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start shadow-sm" onClick={simulateUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <Button variant="outline" className="w-full justify-start shadow-sm">
              <FolderPlus className="mr-2 h-4 w-4" />
              Create Collection
            </Button>
            <Button variant="outline" className="w-full justify-start shadow-sm">
              <Tag className="mr-2 h-4 w-4" />
              Manage Tags
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Storage Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used: 4.2 GB</span>
                <span>Total: 10 GB</span>
              </div>
              <Progress value={42} className="h-2" />
              <p className="text-xs text-muted-foreground">42% of your storage used</p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Usage by Type</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <ImageIcon className="h-3 w-3 mr-1 text-blue-500" />
                    Images
                  </span>
                  <span>2.1 GB</span>
                </div>
                <Progress value={21} className="h-1.5 bg-blue-100" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Video className="h-3 w-3 mr-1 text-red-500" />
                    Videos
                  </span>
                  <span>1.5 GB</span>
                </div>
                <Progress value={15} className="h-1.5 bg-red-100" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <FileAudio className="h-3 w-3 mr-1 text-green-500" />
                    Audio
                  </span>
                  <span>0.4 GB</span>
                </div>
                <Progress value={4} className="h-1.5 bg-green-100" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1 text-yellow-500" />
                    Documents
                  </span>
                  <span>0.2 GB</span>
                </div>
                <Progress value={2} className="h-1.5 bg-yellow-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { action: "Uploaded", item: "Family Photo 2023.jpg", time: "2 hours ago" },
              { action: "Created collection", item: "Wedding Photos", time: "Yesterday" },
              { action: "Tagged", item: "5 photos", time: "3 days ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>
                  <span className="font-medium">{activity.action}</span> {activity.item}
                </span>
                <span className="text-muted-foreground ml-auto">{activity.time}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full shadow-sm">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="text-lg font-medium">Need help with your media?</h3>
              <p className="text-sm text-muted-foreground">
                Check out our guides on organizing your digital legacy media or contact support for assistance.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">View Guides</Button>
              <Button variant="default">Contact Support</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

