"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Edit, Folder, FolderPlus, Hash, MoreHorizontal, Plus, Tag, Trash2, X } from "lucide-react"
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

// Sample data for categories
const categories = [
  {
    id: 1,
    name: "Family History",
    description: "Stories about family heritage and ancestry",
    count: 12,
    subcategories: [
      { id: 11, name: "Ancestors", count: 5 },
      { id: 12, name: "Family Traditions", count: 4 },
      { id: 13, name: "Reunions", count: 3 },
    ],
  },
  {
    id: 2,
    name: "Personal Memories",
    description: "Individual life experiences and memories",
    count: 18,
    subcategories: [
      { id: 21, name: "Childhood", count: 7 },
      { id: 22, name: "School Years", count: 5 },
      { id: 23, name: "Career", count: 6 },
    ],
  },
  {
    id: 3,
    name: "Travel",
    description: "Stories from journeys and adventures",
    count: 8,
    subcategories: [
      { id: 31, name: "International", count: 3 },
      { id: 32, name: "Road Trips", count: 2 },
      { id: 33, name: "Memorable Places", count: 3 },
    ],
  },
  {
    id: 4,
    name: "Milestones",
    description: "Significant life events and achievements",
    count: 10,
    subcategories: [
      { id: 41, name: "Weddings", count: 4 },
      { id: 42, name: "Graduations", count: 3 },
      { id: 43, name: "Anniversaries", count: 3 },
    ],
  },
]

// Sample data for tags
const tags = [
  { id: 1, name: "nostalgic", count: 15 },
  { id: 2, name: "childhood", count: 12 },
  { id: 3, name: "family", count: 24 },
  { id: 4, name: "adventure", count: 8 },
  { id: 5, name: "historical", count: 10 },
  { id: 6, name: "emotional", count: 7 },
  { id: 7, name: "funny", count: 14 },
  { id: 8, name: "inspiring", count: 9 },
  { id: 9, name: "educational", count: 6 },
  { id: 10, name: "reflective", count: 11 },
  { id: 11, name: "holiday", count: 8 },
  { id: 12, name: "celebration", count: 13 },
  { id: 13, name: "tradition", count: 9 },
  { id: 14, name: "legacy", count: 7 },
  { id: 15, name: "wisdom", count: 5 },
]

// Sample data for collections
const collections = [
  {
    id: 1,
    name: "Summer Memories",
    description: "A collection of stories from summer vacations and activities",
    storyCount: 8,
    isPublic: true,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Family Recipes",
    description: "Stories behind our cherished family recipes and cooking traditions",
    storyCount: 12,
    isPublic: true,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Grandparents' Tales",
    description: "Stories and wisdom passed down from our grandparents",
    storyCount: 6,
    isPublic: false,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "School Days",
    description: "Memories from elementary through college years",
    storyCount: 10,
    isPublic: true,
    coverImage: "/placeholder.svg?height=200&width=300",
  },
]

export function ContentOrganization() {
  const [selectedTab, setSelectedTab] = useState("categories")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [newTagName, setNewTagName] = useState("")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="categories" onValueChange={setSelectedTab} value={selectedTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Organize stories by category.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${selectedCategory === category.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-center">
                          <Folder className="h-4 w-4 mr-2 text-primary" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Category
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              {selectedCategory !== null ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{categories.find((c) => c.id === selectedCategory)?.name}</CardTitle>
                        <CardDescription>
                          {categories.find((c) => c.id === selectedCategory)?.description}
                        </CardDescription>
                      </div>
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
                            <span>Edit Category</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Category</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Subcategories</Label>
                      <div className="space-y-2">
                        {categories
                          .find((c) => c.id === selectedCategory)
                          ?.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center">
                                <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{sub.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{sub.count}</Badge>
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
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subcategory
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Category Details</Label>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="category-name">Name</Label>
                          <Input id="category-name" value={categories.find((c) => c.id === selectedCategory)?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-description">Description</Label>
                          <Textarea
                            id="category-description"
                            value={categories.find((c) => c.id === selectedCategory)?.description}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
                  <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Category Selected</h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-4">
                    Select a category from the list to view and edit its details.
                  </p>
                  <Button variant="outline">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Create New Category
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tag Management</CardTitle>
              <CardDescription>Organize stories with tags for easier discovery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center bg-muted rounded-full px-3 py-1">
                    <Tag className="h-3 w-3 mr-1 text-primary" />
                    <span className="text-sm">{tag.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {tag.count}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Add a new tag..."
                    className="pl-8"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                </div>
                <Button>Add Tag</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tag Cloud</CardTitle>
                <CardDescription>Visual representation of tag popularity.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center p-4">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="cursor-pointer hover:text-primary transition-colors"
                      style={{
                        fontSize: `${Math.max(0.8, Math.min(2, 0.8 + tag.count / 10))}rem`,
                      }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tag Groups</CardTitle>
                <CardDescription>Organize related tags together.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium">Emotions</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">nostalgic</Badge>
                      <Badge variant="outline">emotional</Badge>
                      <Badge variant="outline">funny</Badge>
                      <Badge variant="outline">inspiring</Badge>
                      <Badge variant="outline">reflective</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Events</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">holiday</Badge>
                      <Badge variant="outline">celebration</Badge>
                      <Badge variant="outline">tradition</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium">Themes</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">family</Badge>
                      <Badge variant="outline">childhood</Badge>
                      <Badge variant="outline">legacy</Badge>
                      <Badge variant="outline">wisdom</Badge>
                      <Badge variant="outline">historical</Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tag Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Story Collections</CardTitle>
                    <CardDescription>Group related stories into curated collections.</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Collection
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {collections.map((collection) => (
                    <Card key={collection.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={collection.coverImage || "/placeholder.svg"}
                          alt={collection.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant={collection.isPublic ? "default" : "secondary"}>
                            {collection.isPublic ? "Public" : "Private"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base">{collection.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{collection.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-3 pt-0 flex justify-between text-xs text-muted-foreground">
                        <div>{collection.storyCount} stories</div>
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
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Collection</CardTitle>
                <CardDescription>Create a new collection of stories.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="collection-name">Collection Name</Label>
                  <Input id="collection-name" placeholder="Enter collection name..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collection-description">Description</Label>
                  <Textarea id="collection-description" placeholder="Enter collection description..." />
                </div>

                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="shared">Shared with specific users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="border border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload cover image</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Create Collection</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Sets</CardTitle>
                <CardDescription>Add or remove stories from collections.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Collection</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id.toString()}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Stories in Collection</Label>
                  <ScrollArea className="h-[200px] border rounded-md p-2">
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="text-sm">Story Title {i}</div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-2">
                  <Label>Add Stories</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a story to add" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="story1">My Childhood Memories</SelectItem>
                      <SelectItem value="story2">Family Traditions</SelectItem>
                      <SelectItem value="story3">The Great Adventure</SelectItem>
                      <SelectItem value="story4">Lessons from Grandpa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Selected Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

