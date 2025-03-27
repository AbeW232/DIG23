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
  Search,
  Share2,
  Tag,
  Trash2,
  Video,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export function AssetGridView() {
  const [viewType, setViewType] = useState<"grid" | "list" | "details">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [sortOrder, setSortOrder] = useState<"name" | "date" | "size" | "type">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter media items based on search query and filters
  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = typeFilter === "all" || item.type === typeFilter

    return matchesSearch && matchesType
  })

  // Sort media items
  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0

    switch (sortOrder) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "date":
        comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        break
      case "size":
        comparison = Number.parseFloat(a.size) - Number.parseFloat(b.size)
        break
      case "type":
        comparison = a.type.localeCompare(b.type)
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

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
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
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

  // Handle sort change
  const handleSortChange = (newSortOrder: "name" | "date" | "size" | "type") => {
    if (sortOrder === newSortOrder) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortOrder(newSortOrder)
      setSortDirection("desc")
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="gallery">Gallery View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="metadata">Metadata Display</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <CardTitle>Media Gallery</CardTitle>
                  <CardDescription>Browse and manage your media assets</CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button variant="outline" size="sm" onClick={() => handleSortChange(sortOrder)}>
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    {sortDirection === "asc" ? "Ascending" : "Descending"}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search media..."
                    className="pl-8 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewType === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedItems.map((item) => (
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
                          <Checkbox
                            checked={selectedItems.length > 0 && selectedItems.length === filteredItems.length}
                            onCheckedChange={selectAllItems}
                          />
                        </th>
                        <th className="px-4 py-2 text-left">
                          <Button variant="ghost" size="sm" onClick={() => handleSortChange("name")}>
                            Name {sortOrder === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                          </Button>
                        </th>
                        <th className="px-4 py-2 text-left">
                          <Button variant="ghost" size="sm" onClick={() => handleSortChange("type")}>
                            Type {sortOrder === "type" && (sortDirection === "asc" ? "↑" : "↓")}
                          </Button>
                        </th>
                        <th className="px-4 py-2 text-left">
                          <Button variant="ghost" size="sm" onClick={() => handleSortChange("size")}>
                            Size {sortOrder === "size" && (sortDirection === "asc" ? "↑" : "↓")}
                          </Button>
                        </th>
                        <th className="px-4 py-2 text-left">
                          <Button variant="ghost" size="sm" onClick={() => handleSortChange("date")}>
                            Date {sortOrder === "date" && (sortDirection === "asc" ? "↑" : "↓")}
                          </Button>
                        </th>
                        <th className="px-4 py-2 text-left">Tags</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {sortedItems.map((item) => (
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
                Showing {sortedItems.length} of {mediaItems.length} items
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

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>List View</CardTitle>
              <CardDescription>View your media assets in a detailed list format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">
                        <Checkbox
                          checked={selectedItems.length > 0 && selectedItems.length === filteredItems.length}
                          onCheckedChange={selectAllItems}
                        />
                      </th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Size</th>
                      <th className="px-4 py-2 text-left">Dimensions/Duration</th>
                      <th className="px-4 py-2 text-left">Upload Date</th>
                      <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sortedItems.map((item) => (
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
                        <td className="px-4 py-2">
                          {item.dimensions || item.duration || (item.pages ? `${item.pages} pages` : "-")}
                        </td>
                        <td className="px-4 py-2">{item.uploadDate}</td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {sortedItems.length} of {mediaItems.length} items
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

        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metadata Display</CardTitle>
              <CardDescription>View and edit detailed metadata for your media assets</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedItems.length === 1 ? (
                <div className="space-y-4">
                  {(() => {
                    const selectedItem = mediaItems.find((item) => item.id === selectedItems[0])
                    if (!selectedItem) return null

                    return (
                      <>
                        <div className="flex gap-6">
                          <div className="w-1/3">
                            <div className="aspect-square bg-muted rounded-md overflow-hidden">
                              <img
                                src={selectedItem.thumbnail || "/placeholder.svg"}
                                alt={selectedItem.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="w-2/3 space-y-4">
                            <div>
                              <h3 className="text-lg font-medium">{selectedItem.name}</h3>
                              <p className="text-sm text-muted-foreground">Uploaded on {selectedItem.uploadDate}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Type</Label>
                                <div className="flex items-center gap-2">
                                  {getMediaIcon(selectedItem.type)}
                                  <span className="capitalize">{selectedItem.type}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Size</Label>
                                <div>{selectedItem.size}</div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                  {selectedItem.dimensions
                                    ? "Dimensions"
                                    : selectedItem.duration
                                      ? "Duration"
                                      : selectedItem.pages
                                        ? "Pages"
                                        : "Details"}
                                </Label>
                                <div>
                                  {selectedItem.dimensions ||
                                    selectedItem.duration ||
                                    (selectedItem.pages ? `${selectedItem.pages} pages` : "-")}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Tags</Label>
                                <div className="flex flex-wrap gap-1">
                                  {selectedItem.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Edit Tags</Label>
                              <div className="flex gap-2">
                                <Input placeholder="Add new tag" className="flex-1" />
                                <Button variant="outline" size="sm">
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input placeholder="Add a description for this media item" />
                        </div>

                        <div className="space-y-2">
                          <Label>Additional Metadata</Label>
                          <div className="border rounded-md p-4 space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <Label className="text-xs">Location</Label>
                                <Input placeholder="Add location" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Date Taken</Label>
                                <Input type="date" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">People</Label>
                                <Input placeholder="Add people in this media" />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Event</Label>
                                <Input placeholder="Add associated event" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No Item Selected</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select a single item to view and edit its metadata
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

