import { memo } from "react"
import { StoryCard } from "./story-card"
import type { Story } from "@/types/story"

interface StoryGridProps {
  stories: Story[]
}

// Using memo to prevent unnecessary re-renders when parent components change
export const StoryGrid = memo(function StoryGrid({ stories }: StoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  )
})

