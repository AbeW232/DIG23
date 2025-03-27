"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, ImageIcon, Video, Calendar, MapPin, MessageSquare } from "lucide-react"

// Sample memorial data
const memorialData = {
  name: "John Smith",
  dates: "1950 - 2020",
  bio: "John was a loving husband, father, and grandfather. He was known for his kindness, wisdom, and sense of humor. He enjoyed fishing, woodworking, and spending time with his family.",
  quote: "The legacy of a life well-lived remains in the hearts of those who loved him.",
  coverImage: "/placeholder.svg?height=400&width=800",
  profileImage: "/placeholder.svg?height=150&width=150",
  location: "Boston, Massachusetts",
  events: [
    { id: "1", title: "Annual Memorial Gathering", date: "2023-07-15", location: "Smith Family Home" },
    { id: "2", title: "Birthday Remembrance", date: "2023-10-05", location: "Riverside Park" },
  ],
  memories: [
    { id: "1", type: "image", url: "/placeholder.svg?height=300&width=400", caption: "Family vacation, 2015" },
    { id: "2", type: "image", url: "/placeholder.svg?height=300&width=400", caption: "50th Birthday celebration" },
    {
      id: "3",
      type: "image",
      url: "/placeholder.svg?height=300&width=400",
      caption: "Fishing trip with grandchildren",
    },
    { id: "4", type: "image", url: "/placeholder.svg?height=300&width=400", caption: "Wedding anniversary, 2010" },
  ],
}

export function MemorialSpace() {
  const [isEditBioOpen, setIsEditBioOpen] = useState(false)
  const [bio, setBio] = useState(memorialData.bio)
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Cover Image and Profile */}
      <div className="relative rounded-lg overflow-hidden h-[300px]">
        <Image
          src={memorialData.coverImage || "/placeholder.svg"}
          alt="Memorial cover"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={memorialData.profileImage || "/placeholder.svg"}
              alt={memorialData.name}
              className="object-cover"
              fill
            />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">{memorialData.name}</h2>
            <p>{memorialData.dates}</p>
            <p className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {memorialData.location}
            </p>
          </div>
        </div>
      </div>

      {/* Bio and Quote */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>About</CardTitle>
            <CardDescription>Biography and personal details</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsEditBioOpen(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 border-primary pl-4 italic mb-4">"{memorialData.quote}"</blockquote>
          <p>{bio}</p>
        </CardContent>
      </Card>

      {/* Edit Bio Dialog */}
      <Dialog open={isEditBioOpen} onOpenChange={setIsEditBioOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Biography</DialogTitle>
            <DialogDescription>Update the biographical information for this memorial.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={6} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quote">Quote</Label>
              <Input id="quote" defaultValue={memorialData.quote} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBioOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditBioOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Memories Gallery */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Memories</CardTitle>
            <CardDescription>Photos and videos of cherished moments</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setIsAddMemoryOpen(true)}>
            Add Memory
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {memorialData.memories.map((memory) => (
              <div key={memory.id} className="relative group rounded-lg overflow-hidden">
                <Image
                  src={memory.url || "/placeholder.svg"}
                  alt={memory.caption}
                  width={300}
                  height={200}
                  className="object-cover w-full h-[150px]"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-2 text-white text-sm w-full">{memory.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="link">View All Memories</Button>
        </CardFooter>
      </Card>

      {/* Add Memory Dialog */}
      <Dialog open={isAddMemoryOpen} onOpenChange={setIsAddMemoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Memory</DialogTitle>
            <DialogDescription>Share a photo, video, or story to commemorate your loved one.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="photo">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="photo">
                <ImageIcon className="h-4 w-4 mr-2" /> Photo
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="h-4 w-4 mr-2" /> Video
              </TabsTrigger>
              <TabsTrigger value="story">
                <MessageSquare className="h-4 w-4 mr-2" /> Story
              </TabsTrigger>
            </TabsList>
            <TabsContent value="photo" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop a photo, or click to browse</p>
                <Button variant="secondary" size="sm">
                  Upload Photo
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="caption">Caption</Label>
                <Input id="caption" placeholder="Describe this memory" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date (optional)</Label>
                <Input id="date" type="date" />
              </div>
            </TabsContent>
            <TabsContent value="video" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload a video or provide a YouTube link</p>
                <Button variant="secondary" size="sm">
                  Upload Video
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="video-url">YouTube URL</Label>
                <Input id="video-url" placeholder="https://youtube.com/..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="video-caption">Caption</Label>
                <Input id="video-caption" placeholder="Describe this memory" />
              </div>
            </TabsContent>
            <TabsContent value="story" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="story-title">Title</Label>
                <Input id="story-title" placeholder="Title of your story" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="story-content">Story</Label>
                <Textarea id="story-content" placeholder="Share your memory or story..." rows={6} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="story-date">Date (optional)</Label>
                <Input id="story-date" type="date" />
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddMemoryOpen(false)}>Add Memory</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Scheduled memorial events and gatherings</CardDescription>
        </CardHeader>
        <CardContent>
          {memorialData.events.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No upcoming events scheduled</p>
          ) : (
            <div className="space-y-4">
              {memorialData.events.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" /> {event.location}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule New Event
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

