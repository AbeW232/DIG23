"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, Settings, BookOpen, Edit3, Clock, CheckCircle, AlertCircle, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function StoryDashboard() {
  const router = useRouter()
  const [showNewStoryModal, setShowNewStoryModal] = useState(false)
  const [newStoryTitle, setNewStoryTitle] = useState("")
  const [newStoryDescription, setNewStoryDescription] = useState("")
  const [newStoryCategory, setNewStoryCategory] = useState("")

  const handleCreateStory = () => {
    // Here you would typically save the new story to your backend
    // For now, we'll just close the modal and could redirect to the editor
    setShowNewStoryModal(false)

    // Optional: Navigate to the story editor with the new story ID
    // In a real implementation, you'd get the ID from your backend
    router.push("/dashboard/story/editor?new=true")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Story Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage your digital legacy stories.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/settings/content")}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
          <Button onClick={() => setShowNewStoryModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Story
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search stories..." className="pl-10" />
        </div>
        <Button variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Stories</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Story Cards */}
            {[
              {
                id: 1,
                title: "My Childhood Memories",
                excerpt: "Recollections of growing up in the countryside...",
                status: "published",
                date: "2023-05-15",
                author: "John Doe",
                views: 245,
                comments: 12,
              },
              {
                id: 2,
                title: "Family Vacation to Europe",
                excerpt: "Our amazing journey through France, Italy, and Spain...",
                status: "draft",
                date: "2023-06-02",
                author: "John Doe",
                views: 0,
                comments: 0,
              },
              {
                id: 3,
                title: "Grandma's Recipes",
                excerpt: "A collection of traditional family recipes passed down...",
                status: "published",
                date: "2023-04-10",
                author: "John Doe",
                views: 1203,
                comments: 47,
              },
              {
                id: 4,
                title: "My Career Journey",
                excerpt: "From college graduate to industry professional...",
                status: "draft",
                date: "2023-06-10",
                author: "John Doe",
                views: 0,
                comments: 0,
              },
              {
                id: 5,
                title: "Wedding Day Memories",
                excerpt: "Capturing the magic of our special day...",
                status: "archived",
                date: "2022-08-22",
                author: "John Doe",
                views: 567,
                comments: 23,
              },
              {
                id: 6,
                title: "Family Tree Research",
                excerpt: "Documenting our ancestry and heritage...",
                status: "published",
                date: "2023-03-05",
                author: "John Doe",
                views: 892,
                comments: 31,
              },
            ].map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-40 bg-muted">
                    <img
                      src={`/placeholder.svg?height=160&width=320&text=Story+Cover`}
                      alt={story.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          story.status === "published" ? "default" : story.status === "draft" ? "outline" : "secondary"
                        }
                      >
                        {story.status === "published" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {story.status === "draft" && <Clock className="mr-1 h-3 w-3" />}
                        {story.status === "archived" && <AlertCircle className="mr-1 h-3 w-3" />}
                        {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold truncate">{story.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{story.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-1">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>{story.author}</span>
                    </div>
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      <span>{story.views}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/story/view/${story.id}`)}>
                      <BookOpen className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/dashboard/story/editor/${story.id}`)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="published" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Published stories would be filtered here */}
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Draft stories would be filtered here */}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Archived stories would be filtered here */}
          </div>
        </TabsContent>
      </Tabs>

      {/* New Story Modal */}
      <Dialog open={showNewStoryModal} onOpenChange={setShowNewStoryModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Story</DialogTitle>
            <DialogDescription>Start your new digital legacy story. You can edit all details later.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Story Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your story"
                value={newStoryTitle}
                onChange={(e) => setNewStoryTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newStoryCategory} onValueChange={setNewStoryCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="memoir">Memoir</SelectItem>
                  <SelectItem value="family-history">Family History</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="recipes">Recipes</SelectItem>
                  <SelectItem value="life-lessons">Life Lessons</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Brief Description</Label>
              <Textarea
                id="description"
                placeholder="What is your story about?"
                value={newStoryDescription}
                onChange={(e) => setNewStoryDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewStoryModal(false)}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleCreateStory}>
              <Save className="mr-2 h-4 w-4" /> Create Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Import this component
import { MessageSquare } from "lucide-react"

