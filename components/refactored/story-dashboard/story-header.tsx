"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function StoryHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Stories</h1>
        <p className="text-muted-foreground">Create, manage and publish your legacy stories</p>
      </div>

      <Button onClick={() => router.push("/dashboard/stories/new")} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>New Story</span>
      </Button>
    </div>
  )
}

