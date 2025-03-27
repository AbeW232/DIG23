"use client"

import { memo, useState } from "react"
import { MediaCard } from "./media-card"
import { MediaViewer } from "./media-viewer"
import type { MediaItem } from "@/types/media"

interface MediaGridProps {
  mediaItems: MediaItem[]
}

export const MediaGrid = memo(function MediaGrid({ mediaItems }: MediaGridProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaItems.map((item) => (
          <MediaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {selectedItem && <MediaViewer item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  )
})

