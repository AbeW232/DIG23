"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Flag, ThumbsUp, Flower } from "lucide-react"

// Sample tributes data
const tributesData = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      relationship: "Daughter",
    },
    date: "2023-05-15",
    content:
      "Dad, I miss your wisdom and guidance every day. You taught me to be strong and to always stand up for what I believe in. Your legacy lives on in all of us.",
    type: "message",
    likes: 12,
    comments: 3,
  },
  {
    id: "2",
    author: {
      name: "Michael Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      relationship: "Son",
    },
    date: "2023-04-22",
    content:
      "I remember all those fishing trips we took. You were always so patient teaching me how to cast the line just right. Those are memories I'll cherish forever.",
    type: "message",
    likes: 8,
    comments: 2,
  },
  {
    id: "3",
    author: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      relationship: "Friend",
    },
    date: "2023-03-10",
    content:
      "John was the kindest soul I've ever known. He always had time to help others, no matter how busy he was. The world is a little darker without his light.",
    type: "message",
    likes: 15,
    comments: 5,
  },
  {
    id: "4",
    author: {
      name: "Robert Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      relationship: "Colleague",
    },
    date: "2023-02-28",
    content: "",
    type: "flowers",
    image: "/placeholder.svg?height=200&width=300",
    caption: "In remembrance of a wonderful mentor and friend.",
    likes: 7,
    comments: 1,
  },
]

export function TributeCollection() {
  const [isAddTributeOpen, setIsAddTributeOpen] = useState(false)
  const [newTribute, setNewTribute] = useState("")
  const [tributes, setTributes] = useState(tributesData)

  const handleAddTribute = () => {
    if (newTribute.trim()) {
      const newTributeObj = {
        id: `${tributes.length + 1}`,
        author: {
          name: "Current User",
          avatar: "/placeholder.svg?height=40&width=40",
          relationship: "Family",
        },
        date: new Date().toISOString().split("T")[0],
        content: newTribute,
        type: "message",
        likes: 0,
        comments: 0,
      }

      setTributes([newTributeObj, ...tributes])
      setNewTribute("")
      setIsAddTributeOpen(false)
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tributes & Condolences</CardTitle>
          <CardDescription>Share your memories and messages of support</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => setIsAddTributeOpen(true)}>
            <Heart className="h-4 w-4 mr-2" />
            Leave a Tribute
          </Button>
        </CardContent>
      </Card>

      {/* Add Tribute Dialog */}
      <Dialog open={isAddTributeOpen} onOpenChange={setIsAddTributeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Tribute</DialogTitle>
            <DialogDescription>Share your memories, condolences, or words of support.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tribute">Your Message</Label>
              <Textarea
                id="tribute"
                placeholder="Share your thoughts, memories, or condolences..."
                rows={6}
                value={newTribute}
                onChange={(e) => setNewTribute(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Flower className="h-4 w-4" />
                Add Flowers
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                Add Photo
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTributeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTribute}>Post Tribute</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tributes List */}
      <div className="space-y-4">
        {tributes.map((tribute) => (
          <Card key={tribute.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={tribute.author.avatar} alt={tribute.author.name} />
                  <AvatarFallback>{tribute.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{tribute.author.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {tribute.author.relationship} • {formatDate(tribute.date)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>

                  {tribute.type === "message" && <p className="mt-2">{tribute.content}</p>}

                  {tribute.type === "flowers" && (
                    <div className="mt-2">
                      <div className="relative h-[200px] w-full rounded-md overflow-hidden mb-2">
                        <Image src={tribute.image || ""} alt="Flowers tribute" fill className="object-cover" />
                      </div>
                      <p className="text-sm italic">{tribute.caption}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {tribute.likes > 0 && <span>{tribute.likes}</span>}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {tribute.comments > 0 && <span>{tribute.comments}</span>}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Tributes</Button>
      </div>
    </div>
  )
}

