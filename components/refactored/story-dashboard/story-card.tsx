"use client"

import { memo } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Edit, Eye, Trash, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import type { Story } from "@/types/story"

interface StoryCardProps {
  story: Story
}

export const StoryCard = memo(function StoryCard({ story }: StoryCardProps) {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/dashboard/stories/${story.id}/edit`)
  }

  const handleView = () => {
    router.push(`/stories/${story.id}`)
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this story?")) {
      // Delete logic would go here
      console.log("Deleting story", story.id)
    }
  }

  const handleShare = () => {
    // Share logic would go here
    console.log("Sharing story", story.id)
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={story.coverImage || "/placeholder.svg?height=400&width=600"}
          alt={story.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{story.title}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(story.updatedAt)}</p>
          </div>

          <Badge variant={story.status === "published" ? "default" : "outline"}>
            {story.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>

        <p className="mt-2 text-sm line-clamp-2">{story.excerpt}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleView}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>

        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
})

