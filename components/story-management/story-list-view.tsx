"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, Filter, Grid, List, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for stories
const stories = [
  {
    id: 1,
    title: "My Childhood Memories",
    excerpt: "A collection of stories from my early years growing up in the countryside.",
    status: "published",
    date: "2023-12-15",
    author: "John Doe",
    category: "Memoir",
    views: 1245,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Family Traditions",
    excerpt: "Exploring the traditions that have been passed down through generations in our family.",
    status: "draft",
    date: "2024-02-20",
    author: "John Doe",
    category: "Family History",
    views: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "The Great Adventure",
    excerpt: "Recounting the cross-country road trip that changed my perspective on life.",
    status: "published",
    date: "2024-01-10",
    author: "John Doe",
    category: "Travel",
    views: 876,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Lessons from Grandpa",
    excerpt: "Wisdom and life lessons passed down from my grandfather.",
    status: "review",
    date: "2024-03-05",
    author: "John Doe",
    category: "Wisdom",
    views: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Our Wedding Day",
    excerpt: "A detailed account of our special day and the memories we created.",
    status: "published",
    date: "2023-11-28",
    author: "John Doe",
    category: "Milestone",
    views: 2134,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Career Highlights",
    excerpt: "Key moments and achievements throughout my professional journey.",
    status: "draft",
    date: "2024-03-15",
    author: "John Doe",
    category: "Career",
    views: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function StoryListView() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter stories based on search query and filters
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || story.status === statusFilter
    const matchesCategory = categoryFilter === "all" || story.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(stories.map((story) => story.category))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Story
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stories..."
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
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">In Review</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Date Range:</div>
          <div className="flex items-center gap-2">
            <Input type="date" className="w-[150px]" placeholder="From" />
            <span>to</span>
            <Input type="date" className="w-[150px]" placeholder="To" />
            <Button variant="outline" size="sm">
              Apply
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredStories.length} of {stories.length} stories
        </div>
      </div>

      {viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img src={story.image || "/placeholder.svg"} alt={story.title} className="object-cover w-full h-full" />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      story.status === "published" ? "default" : story.status === "draft" ? "secondary" : "outline"
                    }
                  >
                    {story.status}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Preview</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2">{story.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {story.date}
                </div>
                <div>{story.category}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-md">
          {viewType === "list" && (
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm" disabled={true}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <Button variant="outline" size="sm" disabled={true}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Selected
              </Button>
              <Button variant="outline" size="sm" disabled={true}>
                <Eye className="h-4 w-4 mr-2" />
                Preview Selected
              </Button>
              <div className="text-sm text-muted-foreground ml-auto">0 items selected</div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox id="select-all" />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell>
                    <Checkbox id={`select-${story.id}`} />
                  </TableCell>
                  <TableCell className="font-medium">{story.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        story.status === "published" ? "default" : story.status === "draft" ? "secondary" : "outline"
                      }
                    >
                      {story.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{story.category}</TableCell>
                  <TableCell>{story.date}</TableCell>
                  <TableCell>{story.views}</TableCell>
                  <TableCell className="text-right">
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
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

