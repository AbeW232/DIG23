"use client"

import { memo } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { FileText, Film, Music } from "lucide-react"
import { formatFileSize } from "@/lib/utils"
import type { MediaItem } from "@/types/media"

interface MediaCardProps {
  item: MediaItem
  onClick: () => void
}

export const MediaCard = memo(function MediaCard({ item, onClick }: MediaCardProps) {
  // Render different preview based on media type
  const renderPreview = () => {
    switch (item.type) {
      case "image":
        return (
          <Image
            src={item.thumbnailUrl || "/placeholder.svg?height=200&width=200"}
            alt={item.name}
            fill
            className="object-cover transition-all hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        )
      case "video":
        return (
          <div className="flex items-center justify-center h-full bg-muted">
            <Film className="h-10 w-10 text-muted-foreground" />
          </div>
        )
      case "audio":
        return (
          <div className="flex items-center justify-center h-full bg-muted">
            <Music className="h-10 w-10 text-muted-foreground" />
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full bg-muted">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
        )
    }
  }

  return (
    <Card className="overflow-hidden cursor-pointer group" onClick={onClick}>
      <div className="relative aspect-square">{renderPreview()}</div>

      <div className="p-2 text-xs truncate">
        <div className="font-medium truncate">{item.name}</div>
        <div className="text-muted-foreground">{formatFileSize(item.size)}</div>
      </div>
    </Card>
  )
})

