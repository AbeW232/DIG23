"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check, Edit, Hash, Plus, Search, Tag, Trash2, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for tags
const initialTags = [
  { id: 1, name: "family", count: 24, color: "blue" },
  { id: 2, name: "vacation", count: 18, color: "green" },
  { id: 3, name: "wedding", count: 12, color: "pink" },
  { id: 4, name: "childhood", count: 15, color: "purple" },
  { id: 5, name: "grandparents", count: 9, color: "orange" },
  { id: 6, name: "recipes", count: 7, color: "yellow" },
  { id: 7, name: "milestone", count: 11, color: "red" },
  { id: 8, name: "interview", count: 6, color: "teal" },
  { id: 9, name: "home", count: 14, color: "indigo" },
  { id: 10, name: "tradition", count: 8, color: "amber" },
]

// Sample data for tag groups
const initialTagGroups = [
  { id: 1, name: "People", tags: [1, 5] },
  { id: 2, name: "Events", tags: [2, 3, 7] },
  { id: 3, name: "Places", tags: [9] },
  { id: 4, name: "Content Type", tags: [6, 8, 10] },
]

export function TagsManagement() {
  const [tags, setTags] = useState(initialTags)
  const [tagGroups, setTagGroups] = useState(initialTagGroups)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [editingTag, setEditingTag] = useState<number | null>(null)
  const [editingTagName, setEditingTagName] = useState("")
  const [editingTagColor, setEditingTagColor] = useState("")
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("blue")
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedTagsForGroup, setSelectedTagsForGroup] = useState<number[]>([])
  const [editingGroup, setEditingGroup] = useState<number | null>(null)
  const [editingGroupName, setEditingGroupName] = useState("")

  // Filter tags based on search query
  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Toggle tag selection
  const toggleTagSelection = (id: number) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== id))
    } else {
      setSelectedTags([...selectedTags, id])
    }
  }

  // Start editing a tag
  const startEditingTag = (tag: (typeof tags)[0]) => {
    setEditingTag(tag.id)
    setEditingTagName(tag.name)
    setEditingTagColor(tag.color)
  }

  // Save edited tag
  const saveEditedTag = () => {
    if (!editingTagName.trim()) return

    setTags(tags.map((tag) => (tag.id === editingTag ? { ...tag, name: editingTagName, color: editingTagColor } : tag)))
    setEditingTag(null)
    setEditingTagName("")
    setEditingTagColor("")
  }

  // Add new tag
  const addNewTag = () => {
    if (!newTagName.trim()) return

    const newTag = {
      id: Math.max(...tags.map((tag) => tag.id)) + 1,
      name: newTagName,
      count: 0,
      color: newTagColor,
    }

    setTags([...tags, newTag])
    setNewTagName("")
    setNewTagColor("blue")
  }

  // Delete tags
  const deleteTags = () => {
    if (selectedTags.length === 0) return

    setTags(tags.filter((tag) => !selectedTags.includes(tag.id)))

    // Also remove deleted tags from groups
    setTagGroups(
      tagGroups.map((group) => ({
        ...group,
        tags: group.tags.filter((tagId) => !selectedTags.includes(tagId)),
      })),
    )

    setSelectedTags([])
  }

  // Toggle tag selection for group
  const toggleTagForGroup = (id: number) => {
    if (selectedTagsForGroup.includes(id)) {
      setSelectedTagsForGroup(selectedTagsForGroup.filter((tagId) => tagId !== id))
    } else {
      setSelectedTagsForGroup([...selectedTagsForGroup, id])
    }
  }

  // Add new tag group
  const addNewGroup = () => {
    if (!newGroupName.trim() || selectedTagsForGroup.length === 0) return

    const newGroup = {
      id: Math.max(...tagGroups.map((group) => group.id)) + 1,
      name: newGroupName,
      tags: selectedTagsForGroup,
    }

    setTagGroups([...tagGroups, newGroup])
    setNewGroupName("")
    setSelectedTagsForGroup([])
  }

  // Start editing a group
  const startEditingGroup = (group: (typeof tagGroups)[0]) => {
    setEditingGroup(group.id)
    setEditingGroupName(group.name)
    setSelectedTagsForGroup(group.tags)
  }

  // Save edited group
  const saveEditedGroup = () => {
    if (!editingGroupName.trim()) return

    setTagGroups(
      tagGroups.map((group) =>
        group.id === editingGroup ? { ...group, name: editingGroupName, tags: selectedTagsForGroup } : group,
      ),
    )
    setEditingGroup(null)
    setEditingGroupName("")
    setSelectedTagsForGroup([])
  }

  // Delete group
  const deleteGroup = (id: number) => {
    setTagGroups(tagGroups.filter((group) => group.id !== id))
  }

  // Get tag name by id
  const getTagName = (id: number) => {
    const tag = tags.find((tag) => tag.id === id)
    return tag ? tag.name : ""
  }

  // Get tag color by id
  const getTagColor = (id: number) => {
    const tag = tags.find((tag) => tag.id === id)
    return tag ? tag.color : "gray"
  }

  // Get color class based on color name
  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "pink":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "orange":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "teal":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "indigo":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "amber":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all-tags">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all-tags">All Tags</TabsTrigger>
          <TabsTrigger value="tag-groups">Tag Groups</TabsTrigger>
          <TabsTrigger value="tag-cloud">Tag Cloud</TabsTrigger>
        </TabsList>

        {/* All Tags Tab */}
        <TabsContent value="all-tags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tags Management</CardTitle>
              <CardDescription>Create, edit, and organize your media tags</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tags..."
                    className="pl-8 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={deleteTags} disabled={selectedTags.length === 0}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Bulk Add Tags
                  </Button>
                </div>
              </div>

              <div className="border rounded-md">
                <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-3 border-b font-medium text-sm">
                  <div>
                    <Checkbox
                      checked={selectedTags.length > 0 && selectedTags.length === tags.length}
                      onCheckedChange={() => {
                        if (selectedTags.length === tags.length) {
                          setSelectedTags([])
                        } else {
                          setSelectedTags(tags.map((tag) => tag.id))
                        }
                      }}
                    />
                  </div>
                  <div>Tag Name</div>
                  <div>Count</div>
                  <div>Actions</div>
                </div>

                <ScrollArea className="h-[300px]">
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                      <div key={tag.id} className="grid grid-cols-[auto_1fr_auto_auto] gap-4 p-3 border-b items-center">
                        <div>
                          <Checkbox
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={() => toggleTagSelection(tag.id)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {editingTag === tag.id ? (
                            <div className="flex gap-2 w-full">
                              <Input
                                value={editingTagName}
                                onChange={(e) => setEditingTagName(e.target.value)}
                                className="h-8"
                              />
                              <Select value={editingTagColor} onValueChange={setEditingTagColor}>
                                <SelectTrigger className="w-[100px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="blue">Blue</SelectItem>
                                  <SelectItem value="green">Green</SelectItem>
                                  <SelectItem value="red">Red</SelectItem>
                                  <SelectItem value="yellow">Yellow</SelectItem>
                                  <SelectItem value="purple">Purple</SelectItem>
                                  <SelectItem value="pink">Pink</SelectItem>
                                  <SelectItem value="orange">Orange</SelectItem>
                                  <SelectItem value="teal">Teal</SelectItem>
                                  <SelectItem value="indigo">Indigo</SelectItem>
                                  <SelectItem value="amber">Amber</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <>
                              <Badge variant="outline" className={getColorClass(tag.color)}>
                                {tag.name}
                              </Badge>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{tag.count}</div>
                        <div className="flex items-center gap-1">
                          {editingTag === tag.id ? (
                            <>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={saveEditedTag}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setEditingTag(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => startEditingTag(tag)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive"
                                onClick={() => {
                                  setTags(tags.filter((t) => t.id !== tag.id))
                                  setTagGroups(
                                    tagGroups.map((group) => ({
                                      ...group,
                                      tags: group.tags.filter((tagId) => tagId !== tag.id),
                                    })),
                                  )
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      No tags found. Try a different search or create a new tag.
                    </div>
                  )}
                </ScrollArea>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Add New Tag</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Label htmlFor="new-tag-name" className="sr-only">
                      Tag Name
                    </Label>
                    <Input
                      id="new-tag-name"
                      placeholder="Enter tag name"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-[150px]">
                    <Label htmlFor="new-tag-color" className="sr-only">
                      Tag Color
                    </Label>
                    <Select value={newTagColor} onValueChange={setNewTagColor}>
                      <SelectTrigger id="new-tag-color">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="teal">Teal</SelectItem>
                        <SelectItem value="indigo">Indigo</SelectItem>
                        <SelectItem value="amber">Amber</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addNewTag} disabled={!newTagName.trim()}>
                    Add Tag
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Tip</AlertTitle>
                <AlertDescription>
                  Tags help organize your media and make it easier to find. Use descriptive names and consistent colors
                  for better organization.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tag Groups Tab */}
        <TabsContent value="tag-groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tag Groups</CardTitle>
              <CardDescription>Organize your tags into logical groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Existing Groups</h3>
                  <div className="border rounded-md">
                    <ScrollArea className="h-[400px]">
                      {tagGroups.map((group) => (
                        <div key={group.id} className="p-4 border-b">
                          {editingGroup === group.id ? (
                            <div className="space-y-3">
                              <div className="flex gap-2">
                                <Input
                                  value={editingGroupName}
                                  onChange={(e) => setEditingGroupName(e.target.value)}
                                  placeholder="Group name"
                                  className="flex-1"
                                />
                                <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={saveEditedGroup}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-10 w-10 p-0"
                                  onClick={() => {
                                    setEditingGroup(null)
                                    setEditingGroupName("")
                                    setSelectedTagsForGroup([])
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <Label>Select Tags for Group</Label>
                                <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
                                  {tags.map((tag) => (
                                    <div key={tag.id} className="flex items-center space-x-2 py-1">
                                      <Checkbox
                                        id={`tag-${tag.id}-for-edit`}
                                        checked={selectedTagsForGroup.includes(tag.id)}
                                        onCheckedChange={() => toggleTagForGroup(tag.id)}
                                      />
                                      <Label
                                        htmlFor={`tag-${tag.id}-for-edit`}
                                        className="text-sm font-normal cursor-pointer"
                                      >
                                        <Badge variant="outline" className={getColorClass(tag.color)}>
                                          {tag.name}
                                        </Badge>
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">{group.name}</h4>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => startEditingGroup(group)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive"
                                    onClick={() => deleteGroup(group.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {group.tags.map((tagId) => (
                                  <Badge key={tagId} variant="outline" className={getColorClass(getTagColor(tagId))}>
                                    {getTagName(tagId)}
                                  </Badge>
                                ))}
                                {group.tags.length === 0 && (
                                  <span className="text-sm text-muted-foreground">No tags in this group</span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {tagGroups.length === 0 && (
                        <div className="p-6 text-center text-muted-foreground">
                          No tag groups created yet. Create your first group.
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Create New Group</h3>
                  <div className="border rounded-md p-4 space-y-4">
                    <div>
                      <Label htmlFor="new-group-name">Group Name</Label>
                      <Input
                        id="new-group-name"
                        placeholder="Enter group name"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Select Tags for Group</Label>
                      <div className="border rounded-md p-2 max-h-[250px] overflow-y-auto">
                        {tags.map((tag) => (
                          <div key={tag.id} className="flex items-center space-x-2 py-1">
                            <Checkbox
                              id={`tag-${tag.id}`}
                              checked={selectedTagsForGroup.includes(tag.id)}
                              onCheckedChange={() => toggleTagForGroup(tag.id)}
                            />
                            <Label htmlFor={`tag-${tag.id}`} className="text-sm font-normal cursor-pointer">
                              <Badge variant="outline" className={getColorClass(tag.color)}>
                                {tag.name}
                              </Badge>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={addNewGroup}
                      disabled={!newGroupName.trim() || selectedTagsForGroup.length === 0}
                      className="w-full"
                    >
                      Create Group
                    </Button>
                  </div>

                  <Alert>
                    <Hash className="h-4 w-4" />
                    <AlertTitle>About Tag Groups</AlertTitle>
                    <AlertDescription>
                      Tag groups help you organize related tags together. For example, create groups for "People",
                      "Places", or "Events" to better categorize your media.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tag Cloud Tab */}
        <TabsContent value="tag-cloud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tag Cloud</CardTitle>
              <CardDescription>Visual representation of your tags based on usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6">
                <div className="flex flex-wrap gap-3 justify-center">
                  {tags.map((tag) => {
                    // Calculate font size based on count (1-5)
                    const fontSize = Math.max(1, Math.min(5, Math.floor(tag.count / 5) + 1))
                    const sizeClass = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"][fontSize - 1]

                    return (
                      <Badge
                        key={tag.id}
                        variant="outline"
                        className={`${getColorClass(tag.color)} ${sizeClass} m-1 cursor-pointer hover:shadow-sm transition-shadow`}
                      >
                        {tag.name} ({tag.count})
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium">Tag Usage Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Most Used Tags</h4>
                    <div className="space-y-2">
                      {[...tags]
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5)
                        .map((tag) => (
                          <div key={tag.id} className="flex justify-between items-center">
                            <Badge variant="outline" className={getColorClass(tag.color)}>
                              {tag.name}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{tag.count} items</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Recently Used Tags</h4>
                    <div className="space-y-2">
                      {[...tags]
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 5)
                        .map((tag) => (
                          <div key={tag.id} className="flex justify-between items-center">
                            <Badge variant="outline" className={getColorClass(tag.color)}>
                              {tag.name}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Last used 2d ago</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Tag className="h-4 w-4 mr-2" />
                Export Tag Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

