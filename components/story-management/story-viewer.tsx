"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Edit3,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Printer,
  Download,
  Calendar,
  User,
  Tag,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function StoryViewer({ storyId }) {
  const router = useRouter()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the story data from your API
    // For this example, we'll use mock data
    setTimeout(() => {
      setStory({
        id: storyId,
        title: "My Childhood Memories",
        content: `
          <h2>Growing Up in the Countryside</h2>
          <p>I was born in a small town surrounded by rolling hills and vast farmlands. My earliest memories are of running through fields of golden wheat, the sun warm on my face and the wind in my hair.</p>
          <p>Our house was a modest two-story building with a large backyard where my siblings and I would spend hours playing. My father built us a treehouse in the old oak tree, which became our fortress, spaceship, and castle all in one.</p>
          
          <h2>School Days</h2>
          <p>The local school was a twenty-minute walk from our house. Every morning, I would meet up with my friends at the corner store, and we would walk together, sharing stories and dreams.</p>
          <p>Mrs. Johnson, my third-grade teacher, was particularly influential in my life. She recognized my love for books and encouraged me to write my own stories. I still have the first story I ever wrote, carefully preserved in a folder with her encouraging notes in the margins.</p>
          
          <h2>Summer Adventures</h2>
          <p>Summers were magical. Days stretched endlessly, filled with adventures by the creek, catching fireflies in jars at dusk, and camping in the backyard. My grandfather would visit every July and take us fishing at the lake.</p>
          <p>I remember the taste of freshly picked berries, warm from the sun, and the sticky sweetness of homemade ice cream churned on the porch while my grandmother told stories of her own childhood.</p>
        `,
        author: "John Doe",
        date: "2023-05-15",
        category: "Memoir",
        tags: ["childhood", "countryside", "family", "school"],
        views: 245,
        likes: 37,
        comments: 12,
        coverImage: "/placeholder.svg?height=400&width=800&text=Story+Cover",
      })
      setLoading(false)
    }, 1000)
  }, [storyId])

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="animate-pulse h-8 w-1/3 bg-muted rounded"></div>
        <div className="animate-pulse h-64 w-full bg-muted rounded"></div>
        <div className="space-y-4">
          <div className="animate-pulse h-6 w-1/4 bg-muted rounded"></div>
          <div className="animate-pulse h-4 w-full bg-muted rounded"></div>
          <div className="animate-pulse h-4 w-full bg-muted rounded"></div>
          <div className="animate-pulse h-4 w-3/4 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Story Not Found</h2>
          <p className="text-muted-foreground mb-4">The story you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/dashboard/story")}>Return to Stories</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="default" size="sm" onClick={() => router.push(`/dashboard/story/editor/${story.id}`)}>
            <Edit3 className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
        <img src={story.coverImage || "/placeholder.svg"} alt={story.title} className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{new Date(story.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center">
              <Tag className="mr-1 h-4 w-4" />
              <span>{story.category}</span>
            </div>
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              <span>{story.views} views</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: story.content }} />

          <div className="flex items-center gap-3 mt-8">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" /> Like ({story.likes})
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" /> Comment ({story.comments})
            </Button>
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">About the Author</h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{story.author}</p>
                  <p className="text-sm text-muted-foreground">Storyteller</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                John has been documenting his family history and personal memories for over 5 years. He has published 15
                stories on various aspects of his life and family traditions.
              </p>
            </CardContent>
          </Card>

          <h3 className="font-semibold mt-6 mb-3">Related Stories</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1/3 bg-muted">
                    <img
                      src={`/placeholder.svg?height=80&width=80&text=Related`}
                      alt="Related story"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="w-2/3 p-3">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {i === 1 ? "Family Traditions" : i === 2 ? "School Memories" : "Summer Vacations"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(2023, 3 + i, 10 + i).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

