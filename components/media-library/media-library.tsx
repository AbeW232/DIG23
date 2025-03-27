"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUpDown,
  Download,
  Eye,
  FileText,
  Filter,
  Grid,
  ImageIcon,
  Info,
  List,
  MoreHorizontal,
  Music,
  Plus,
  Search,
  Share2,
  Tag,
  Trash2,
  Upload,
  Video,
  Folder,
} from "lucide-react"

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
  {
    id: 7,
    name: "Family Reunion 2023.jpg",
    type: "image",
    size: "2.1 MB",
    dimensions: "1800x1200",
    uploadDate: "2023-12-28",
    tags: ["family", "reunion"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    name: "Dad's Workshop.jpg",
    type: "image",
    size: "1.9 MB",
    dimensions: "2100x1400",
    uploadDate: "2024-02-15",
    tags: ["workshop", "dad"],
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

// Sample data for collections
const collections = [
  { id: 1, name: "Family Photos", count: 24 },
  { id: 2, name: "Interviews", count: 8 },
  { id: 3, name: "Documents", count: 15 },
  { id: 4, name: "Audio Recordings", count: 6 },
]

export function MediaLibrary() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Filter media items based on search query and filters
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || item.type === typeFilter

    return matchesSearch && matchesType
  })

  // Toggle item selection
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Simulate upload process
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  // Get icon based on media type
  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6 text-blue-500" />
      case "video":
        return <Video className="h-6 w-6 text-red-500" />
      case "audio":
        return <Music className="h-6 w-6 text-green-500" />
      case "document":
        return <FileText className="h-6 w-6 text-yellow-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collections</CardTitle>
              <CardDescription>Organize your media into collections</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted">
                    <div className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2 text-primary" />
                      <span>All Media</span>
                    </div>
                    <Badge>{mediaItems.length}</Badge>
                  </div>

                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted"
                    >
                      <div className="flex items-center">
                        <Folder className="h-4 w-4 mr-2 text-primary" />
                        <span>{collection.name}</span>
                      </div>
                      <Badge variant="outline">{collection.count}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                New Collection
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter media by type and tags</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Media Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Popular Tags</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">
                    family
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    vacation
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    grandparents
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    childhood
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    milestone
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" placeholder="From" />
                  <Input type="date" placeholder="To" />
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="default" size="sm" onClick={simulateUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search media..."
                      className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${viewType === "grid" ? "bg-muted" : ""}`}
                      onClick={() => setViewType("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 ${viewType === "list" ? "bg-muted" : ""}`}
                      onClick={() => setViewType("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              {isUploading && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading files...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardHeader>
            <CardContent>
              {viewType === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="relative group">
                      <div
                        className={`aspect-square border rounded-md overflow-hidden ${selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""}`}
                        onClick={() => toggleItemSelection(item.id)}
                      >
                        <div className="absolute top-2 left-2 z-10">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                          />
                        </div>

                        <div className="absolute top-2 right-2 z-10">{getMediaIcon(item.type)}</div>

                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-1 text-xs truncate">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.size}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">
                          <Checkbox />
                        </th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Size</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Tags</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/50" : ""}>
                          <td className="px-4 py-2">
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onCheckedChange={() => toggleItemSelection(item.id)}
                            />
                          </td>
                          <td className="px-4 py-2 flex items-center gap-2">
                            {getMediaIcon(item.type)}
                            <span className="truncate max-w-[150px]">{item.name}</span>
                          </td>
                          <td className="px-4 py-2 capitalize">{item.type}</td>
                          <td className="px-4 py-2">{item.size}</td>
                          <td className="px-4 py-2">{item.uploadDate}</td>
                          <td className="px-4 py-2">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
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
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredItems.length} of {mediaItems.length} items
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
        </div>
      </div>
    </div>
  )
}

