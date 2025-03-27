"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MemorialTributesProps {
  memorialId: string
}

// Mock data for demonstration
const tributes = [
  {
    id: "trib1",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "April 2, 2023",
    content:
      "John was my husband of 53 years. He was the most loving, caring, and supportive partner anyone could ask for. His wisdom guided our family through good times and bad. I miss his laugh, his warmth, and his unwavering love every day. Thank you for being the light of my life, John.",
    likes: 24,
  },
  {
    id: "trib2",
    author: "Michael Smith",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "March 25, 2023",
    content:
      "Dad, you taught me what it means to be a good person, a good father, and a good teacher. Your patience and kindness touched everyone around you. I promise to carry on your legacy and make you proud. Rest in peace.",
    likes: 18,
  },
  {
    id: "trib3",
    author: "Emily Rodriguez",
    authorImage: "/placeholder.svg?height=50&width=50",
    date: "March 22, 2023",
    content:
      "Mr. Smith was my history teacher in 1998, and he changed my life. His passion for history and his ability to make the past come alive inspired me to become a teacher myself. He always took the time to help students who were struggling and made everyone feel valued. His impact on generations of students cannot be overstated.",
    likes: 12,
  },
]

export function MemorialTributes({ memorialId }: MemorialTributesProps) {
  const [newTribute, setNewTribute] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [likedTributes, setLikedTributes] = useState<string[]>([])

  const handleLike = (tributeId: string) => {
    if (likedTributes.includes(tributeId)) {
      setLikedTributes(likedTributes.filter((id) => id !== tributeId))
    } else {
      setLikedTributes([...likedTributes, tributeId])
    }
  }

  const handleSubmit = () => {
    // Submit logic would go here
    setNewTribute("")
    setName("")
    setEmail("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Leave a Tribute</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tribute">Your Message</Label>
              <Textarea
                id="tribute"
                placeholder="Share a memory or message of condolence..."
                className="min-h-[120px]"
                value={newTribute}
                onChange={(e) => setNewTribute(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Your email will not be displayed publicly</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex justify-end">
          <Button onClick={handleSubmit}>Post Tribute</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tributes & Memories</h2>
        {tributes.map((tribute) => (
          <Card key={tribute.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={tribute.authorImage} alt={tribute.author} />
                  <AvatarFallback>{tribute.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{tribute.author}</p>
                      <p className="text-sm text-muted-foreground">{tribute.date}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm">{tribute.content}</p>
                  <div className="flex items-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center gap-1 text-sm ${likedTributes.includes(tribute.id) ? "text-primary" : ""}`}
                      onClick={() => handleLike(tribute.id)}
                    >
                      <Heart className="h-4 w-4" fill={likedTributes.includes(tribute.id) ? "currentColor" : "none"} />
                      {tribute.likes + (likedTributes.includes(tribute.id) ? 1 : 0)}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

