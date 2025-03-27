"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  Edit,
  Eye,
  Folder,
  FolderPlus,
  Globe,
  ImageIcon,
  Link,
  Lock,
  MoreHorizontal,
  Search,
  Share2,
  Trash2,
  Users,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for collections
const initialCollections = [
  {
    id: 1,
    name: "Family Photos",
    description: "A collection of family photos through the years",
    itemCount: 24,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    sharedWith: ["user1@example.com", "user2@example.com"],
    createdAt: "2023-12-15",
  },
  {
    id: 2,
    name: "Interviews",
    description: "Video interviews with family members",
    itemCount: 8,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    sharedWith: ["user3@example.com"],
    createdAt: "2023-11-20",
  },
  {
    id: 3,
    name: "Historical Documents",
    description: "Important family documents and certificates",
    itemCount: 15,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: true,
    sharedWith: [],
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    name: "Audio Recordings",
    description: "Audio stories and recordings from grandparents",
    itemCount: 6,
    coverImage: "/placeholder.svg?height=200&width=300",
    isPublic: false,
    sharedWith: ["user1@example.com"],
    createdAt: "2024-01-22",
  },
]

// Sample data for media items
const mediaItems = [
  {
    id: 1,
    name: "Family Photo 2023.jpg",
    type: "image",
    size: "2.4 MB",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Grandparents Interview.mp4",
    type: "video",
    size: "45.8 MB",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Childhood Home.jpg",
    type: "image",
    size: "1.8 MB",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Family Recipe Book.pdf",
    type: "document",
    size: "3.2 MB",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Wedding Day.jpg",
    type: "image",
    size: "3.5 MB",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Grandma's Stories.mp3",
    type: "audio",
    size: "18.2 MB",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export function CollectionsManagement() {
  const [collections, setCollections] = useState(initialCollections)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollections, setSelectedCollections] = useState<number[]>([])
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [newCollectionIsPublic, setNewCollectionIsPublic] = useState(false)
  const [editingCollection, setEditingCollection] = useState<number | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editIsPublic, setEditIsPublic] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [shareEmail, setShareEmail] = useState("")
  const [sharePermission, setSharePermission] = useState("view")
  const [activeCollection, setActiveCollection] = useState<number | null>(null)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showAccessDialog, setShowAccessDialog] = useState(false)

  // Filter collections based on search query
  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle collection selection
  const toggleCollectionSelection = (id: number) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(selectedCollections.filter((collectionId) => collectionId !== id))
    } else {
      setSelectedCollections([...selectedCollections, id])
    }
  }

  // Add new collection
  const addNewCollection = () => {
    if (!newCollectionName.trim()) return

    const newCollection = {
      id: Math.max(...collections.map((collection) => collection.id)) + 1,
      name: newCollectionName,
      description: newCollectionDescription,
      itemCount: 0,
      coverImage: "/placeholder.svg?height=200&width=300",
      isPublic: newCollectionIsPublic,
      sharedWith: [],
      createdAt: new Date().toISOString().split("T")[0],
    }

    setCollections([...collections, newCollection])
    setNewCollectionName("")
    setNewCollectionDescription("")
    setNewCollectionIsPublic(false)
  }

  // Delete collections
  const deleteCollections = () => {
    if (selectedCollections.length === 0) return
    setCollections(collections.filter((collection) => !selectedCollections.includes(collection.id)))
    setSelectedCollections([])
  }

  // Start editing a collection
  const startEditingCollection = (collection: (typeof collections)[0]) => {
    setEditingCollection(collection.id)
    setEditName(collection.name)
    setEditDescription(collection.description)
    setEditIsPublic(collection.isPublic)
  }

  // Save edited collection
  const saveEditedCollection = () => {
    if (!editName.trim()) return

    setCollections(
      collections.map((collection) =>
        collection.id === editingCollection
          ? {
              ...collection,
              name: editName,
              description: editDescription,
              isPublic: editIsPublic,
            }
          : collection,
      ),
    )
    setEditingCollection(null)
  }

  // Toggle item selection for collection
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Add items to collection
  const addItemsToCollection = (collectionId: number) => {
    if (selectedItems.length === 0) return

    setCollections(
      collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              itemCount: collection.itemCount + selectedItems.length,
            }
          : collection,
      ),
    )
    setSelectedItems([])
  }

  // Share collection
  const shareCollection = () => {
    if (!shareEmail.trim() || !activeCollection) return

    setCollections(
      collections.map((collection) =>
        collection.id === activeCollection
          ? {
              ...collection,
              sharedWith: [...collection.sharedWith, shareEmail],
            }
          : collection,
      ),
    )
    setShareEmail("")
    setShowShareDialog(false)
  }

  // Remove shared user
  const removeSharedUser = (collectionId: number, email: string) => {
    setCollections(
      collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              sharedWith: collection.sharedWith.filter((e) => e !== email),
            }
          : collection,
      ),
    )
  }

  // Get collection by id
  const getCollection = (id: number) => {
    return collections.find((collection) => collection.id === id)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all-collections">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all-collections">All Collections</TabsTrigger>
          <TabsTrigger value="create-collection">Create Collection</TabsTrigger>
          <TabsTrigger value="sharing">Sharing & Access</TabsTrigger>
        </TabsList>

        {/* All Collections Tab */}
        <TabsContent value="all-collections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collections Management</CardTitle>
              <CardDescription>Create, edit, and organize your media collections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search collections..."
                    className="pl-8 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deleteCollections}
                    disabled={selectedCollections.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                  <Button variant="default" size="sm">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Collection
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCollections.length > 0 ? (
                  filteredCollections.map((collection) => (
                    <Card
                      key={collection.id}
                      className={`overflow-hidden ${selectedCollections.includes(collection.id) ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className="relative aspect-video">
                        <div className="absolute top-2 left-2 z-10">
                          <Checkbox
                            checked={selectedCollections.includes(collection.id)}
                            onCheckedChange={() => toggleCollectionSelection(collection.id)}
                          />
                        </div>
                        <div className="absolute top-2 right-2 z-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-white"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => startEditingCollection(collection)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Collection
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setActiveCollection(collection.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setActiveCollection(collection.id)
                                  setShowShareDialog(true)
                                }}
                              >
                                <Share2 className="h-4 w-4 mr-2" />
                                Share Collection
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setActiveCollection(collection.id)
                                  setShowAccessDialog(true)
                                }}
                              >
                                <Users className="h-4 w-4 mr-2" />
                                Manage Access
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  setCollections(collections.filter((c) => c.id !== collection.id))
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Collection
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <img
                          src={collection.coverImage || "/placeholder.svg"}
                          alt={collection.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium truncate">{collection.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
                          </div>
                          {collection.isPublic ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Globe className="h-3 w-3 mr-1" />
                              Public
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Lock className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>{collection.itemCount} items</span>
                          <span>Created {collection.createdAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full p-6 text-center text-muted-foreground border rounded-md">
                    No collections found. Try a different search or create a new collection.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Alert>
                <Folder className="h-4 w-4" />
                <AlertTitle>Collections</AlertTitle>
                <AlertDescription>
                  Collections help you organize related media items together. You can share collections with family
                  members or make them public.
                </AlertDescription>
              </Alert>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Create Collection Tab */}
        <TabsContent value="create-collection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Collection</CardTitle>
              <CardDescription>Organize your media into a new collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="collection-name">Collection Name</Label>
                    <Input
                      id="collection-name"
                      placeholder="Enter collection name"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collection-description">Description</Label>
                    <Textarea
                      id="collection-description"
                      placeholder="Enter collection description"
                      value={newCollectionDescription}
                      onChange={(e) => setNewCollectionDescription(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collection-public">Make Collection Public</Label>
                      <Switch
                        id="collection-public"
                        checked={newCollectionIsPublic}
                        onCheckedChange={setNewCollectionIsPublic}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Public collections can be viewed by anyone with the link. Private collections are only visible to
                      you and people you share with.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collection-cover">Cover Image</Label>
                    <div className="border rounded-md p-4 text-center">
                      <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline" size="sm">
                        Choose Cover Image
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Add Items to Collection</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search media items..." className="pl-8" />
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="p-3 border-b font-medium text-sm">Select items to add to this collection</div>
                    <ScrollArea className="h-[300px]">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {mediaItems.map((item) => (
                          <div
                            key={item.id}
                            className={`border rounded-md overflow-hidden cursor-pointer ${selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""}`}
                            onClick={() => toggleItemSelection(item.id)}
                          >
                            <div className="relative aspect-square">
                              <div className="absolute top-1 left-1">
                                <Checkbox
                                  checked={selectedItems.includes(item.id)}
                                  onCheckedChange={() => toggleItemSelection(item.id)}
                                />
                              </div>
                              <img
                                src={item.thumbnail || "/placeholder.svg"}
                                alt={item.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="p-2">
                              <div className="text-xs truncate font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.size}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-3 border-t text-sm text-muted-foreground">
                      {selectedItems.length} items selected
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={addNewCollection} disabled={!newCollectionName.trim()}>
                Create Collection
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Sharing & Access Tab */}
        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sharing & Access Control</CardTitle>
              <CardDescription>Manage who can access your collections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Shared Collections</h3>
                <div className="border rounded-md">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-3 border-b font-medium text-sm">
                    <div>Collection</div>
                    <div>Visibility</div>
                    <div>Shared With</div>
                  </div>

                  <ScrollArea className="h-[300px]">
                    {collections.map((collection) => (
                      <div
                        key={collection.id}
                        className="grid grid-cols-[1fr_auto_auto] gap-4 p-3 border-b items-center"
                      >
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4 text-primary" />
                          <span className="font-medium">{collection.name}</span>
                        </div>
                        <div>
                          {collection.isPublic ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Globe className="h-3 w-3 mr-1" />
                              Public
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Lock className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{collection.sharedWith.length} users</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setActiveCollection(collection.id)
                              setShowShareDialog(true)
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Quick Share</h3>
                <div className="border rounded-md p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="share-collection">Select Collection</Label>
                      <Select onValueChange={(value) => setActiveCollection(Number(value))}>
                        <SelectTrigger id="share-collection">
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
                      <Label htmlFor="share-email">Email Address</Label>
                      <Input
                        id="share-email"
                        placeholder="Enter email address"
                        type="email"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="share-permission">Permission</Label>
                      <Select value={sharePermission} onValueChange={setSharePermission}>
                        <SelectTrigger id="share-permission">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View Only</SelectItem>
                          <SelectItem value="comment">Can Comment</SelectItem>
                          <SelectItem value="edit">Can Edit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full"
                      onClick={shareCollection}
                      disabled={!shareEmail.trim() || !activeCollection}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Collection
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Public Link Sharing</h3>
                <div className="border rounded-md p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="public-collection">Select Public Collection</Label>
                      <Select>
                        <SelectTrigger id="public-collection">
                          <SelectValue placeholder="Select a public collection" />
                        </SelectTrigger>
                        <SelectContent>
                          {collections
                            .filter((collection) => collection.isPublic)
                            .map((collection) => (
                              <SelectItem key={collection.id} value={collection.id.toString()}>
                                {collection.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Input value="https://legacy.example.com/collections/share/abc123" readOnly />
                      <Button variant="outline" size="sm">
                        <Link className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Public Link Sharing</AlertTitle>
                      <AlertDescription>
                        Anyone with this link can view the collection. Make sure you only share public links with people
                        you trust.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Collection</DialogTitle>
            <DialogDescription>
              Share "{activeCollection ? getCollection(activeCollection)?.name : ""}" with others
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dialog-share-email">Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="dialog-share-email"
                  placeholder="Enter email address"
                  type="email"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
                <Select value={sharePermission} onValueChange={setSharePermission}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">View Only</SelectItem>
                    <SelectItem value="comment">Can Comment</SelectItem>
                    <SelectItem value="edit">Can Edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full" onClick={shareCollection}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Collection
            </Button>

            <div className="space-y-2">
              <Label>Currently Shared With</Label>
              <div className="border rounded-md">
                <ScrollArea className="h-[200px]">
                  {activeCollection && getCollection(activeCollection)?.sharedWith.length ? (
                    getCollection(activeCollection)?.sharedWith.map((email, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border-b">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{email}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => activeCollection && removeSharedUser(activeCollection, email)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      This collection is not shared with anyone yet.
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Control Dialog */}
      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Access Control</DialogTitle>
            <DialogDescription>
              Manage access settings for "{activeCollection ? getCollection(activeCollection)?.name : ""}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dialog-public-toggle">Make Collection Public</Label>
              <Switch
                id="dialog-public-toggle"
                checked={activeCollection ? getCollection(activeCollection)?.isPublic : false}
                onCheckedChange={(checked) => {
                  if (activeCollection) {
                    setCollections(
                      collections.map((collection) =>
                        collection.id === activeCollection ? { ...collection, isPublic: checked } : collection,
                      ),
                    )
                  }
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Public collections can be viewed by anyone with the link. Private collections are only visible to you and
              people you share with.
            </p>

            {activeCollection && getCollection(activeCollection)?.isPublic && (
              <div className="space-y-2">
                <Label>Public Link</Label>
                <div className="flex gap-2">
                  <Input value={`https://legacy.example.com/collections/share/${activeCollection}`} readOnly />
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Access Permissions</Label>
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Allow Comments</div>
                    <div className="text-xs text-muted-foreground">Let viewers comment on items in this collection</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Allow Downloads</div>
                    <div className="text-xs text-muted-foreground">Let viewers download items from this collection</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Allow Resharing</div>
                    <div className="text-xs text-muted-foreground">Let viewers share this collection with others</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAccessDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAccessDialog(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

