"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { StoryFilter } from "./index"

interface StoryEmptyStateProps {
  filter: StoryFilter
}

export function StoryEmptyState({ filter }: StoryEmptyStateProps) {
  const router = useRouter()

  // Customize message based on active filters
  const getMessage = () => {
    if (filter.category) {
      return `No stories found in the "${filter.category}" category.`
    }

    if (filter.status === "draft") {
      return "No draft stories found."
    }

    if (filter.status === "published") {
      return "No published stories found."
    }

    return "No stories found."
  }

  return (
    <div className="text-center py-10 px-6 border-2 border-dashed rounded-lg">
      <h3 className="text-lg font-medium">{getMessage()}</h3>
      <p className="text-muted-foreground mt-1">Create your first story to get started.</p>

      <Button onClick={() => router.push("/dashboard/stories/new")} className="mt-4 flex items-center gap-2 mx-auto">
        <PlusCircle className="h-4 w-4" />
        <span>New Story</span>
      </Button>
    </div>
  )
}

