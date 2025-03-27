"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Archive,
  Download,
  Eye,
  File,
  FileText,
  Image,
  MoreHorizontal,
  Music,
  Plus,
  Trash2,
  Upload,
  Video,
} from "lucide-react"

// Sample data for digital assets
const sampleAssets = [
  {
    id: 1,
    name: "Family Photo Album.zip",
    type: "archive",
    size: "1.2 GB",
    dateAdded: "2024-01-15",
    category: "photos",
    status: "active",
    icon: <Archive className="h-8 w-8 text-blue-500" />,
  },
  {
    id: 2,
    name: "Last Will and Testament.pdf",
    type: "document",
    size: "2.4 MB",
    dateAdded: "2024-02-20",
    category: "documents",
    status: "active",
    icon: <FileText className="h-8 w-8 text-amber-500" />,
  },
  {
    id: 3,
    name: "Childhood Memories.mp4",
    type: "video",
    size: "450 MB",
    dateAdded: "2024-01-30",
    category: "videos",
    status: "active",
    icon: <Video className="h-8 w-8 text-red-500" />,
  },
  {
    id: 4,
    name: "Voice Message for Children.mp3",
    type: "audio",
    size: "8.5 MB",
    dateAdded: "2024-03-05",
    category: "audio",
    status: "active",
    icon: <Music className="h-8 w-8 text-green-500" />,
  },
  {
    id: 5,
    name: "Personal Journal.docx",
    type: "document",
    size: "1.8 MB",
    dateAdded: "2024-02-10",
    category: "documents",
    status: "active",
    icon: <FileText className="h-8 w-8 text-amber-500" />,
  },
  {
    id: 6,
    name: "Wedding Photos.jpg",
    type: "image",
    size: "5.2 MB",
    dateAdded: "2024-01-22",
    category: "photos",
    status: "active",
    icon: <Image className="h-8 w-8 text-purple-500" />,
  },
]

interface DigitalLegacyAssetsProps {
  userId: number
}

export function DigitalLegacyAssets({ userId }: DigitalLegacyAssetsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter assets based on search query and category
  const filteredAssets = sampleAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || asset.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-8 w-8 text-amber-500" />
      case "image":
        return <Image className="h-8 w-8 text-purple-500" />
      case "video":
        return <Video className="h-8 w-8 text-red-500" />
      case "audio":
        return <Music className="h-8 w-8 text-green-500" />
      case "archive":
        return <Archive className="h-8 w-8 text-blue-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <Button variant="default" size="sm" className="gap-1">
          <Upload className="h-4 w-4 mr-1" />
          Upload Assets
        </Button>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="search"
            placeholder="Search assets..."
            className="w-full sm:w-[200px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="photos">Photos</SelectItem>
              <SelectItem value="videos">Videos</SelectItem>
              <SelectItem value="documents">Documents</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <Card key={asset.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-3">
                  <div className="flex-shrink-0 mr-3">{asset.icon}</div>
                  <div className="flex-grow min-w-0">
                    <div className="font-medium truncate">{asset.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{asset.size}</span>
                      <span className="mx-2">•</span>
                      <span>{asset.dateAdded}</span>
                      <span className="mx-2">•</span>
                      <Badge variant="outline" className="capitalize">
                        {asset.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
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
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <File className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No Assets Found</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {searchQuery || categoryFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Upload digital assets to include in this user's legacy"}
            </p>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4 mr-1" />
              Add Assets
            </Button>
          </div>
        )}
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Showing {filteredAssets.length} of {sampleAssets.length} assets
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Storage Usage</Label>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full w-[35%] bg-primary"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1.7 GB used</span>
              <span>5 GB total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

