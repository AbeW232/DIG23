"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Share2, Trash, X } from "lucide-react"
import Image from "next/image"
import { formatDate, formatFileSize } from "@/lib/utils"
import type { MediaItem } from "@/types/media"

interface MediaViewerProps {
  item: MediaItem
  onClose: () => void
}

export function MediaViewer({ item, onClose }: MediaViewerProps) {
  const handleDownload = () => {
    // Download logic would go here
    window.open(item.url, "_blank")
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this item?")) {
      // Delete logic would go here
      console.log("Deleting item", item.id)
      onClose()
    }
  }

  const handleShare = () => {
    // Share logic would go here
    console.log("Sharing item", item.id)
  }

  // Render content based on media type
  const renderContent = () => {
    switch (item.type) {
      case "image":
        return (
          <div className="relative w-full h-[60vh]">
            <Image
              src={item.url || "/placeholder.svg?height=600&width=800"}
              alt={item.name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        )
      case "video":
        return (
          <video src={item.url} controls className="max-h-[60vh] mx-auto">
            Your browser does not support the video tag.
          </video>
        )
      case "audio":
        return (
          <audio src={item.url} controls className="w-full">
            Your browser does not support the audio tag.
          </audio>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center p-10">
            <div className="text-center">
              <p>Preview not available for this file type.</p>
              <Button variant="outline" onClick={handleDownload} className="mt-4">
                <Download className="h-4 w-4 mr-2" />
                Download to view
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl w-[90vw]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="truncate">{item.name}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="mt-4">{renderContent()}</div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Uploaded on {formatDate(item.createdAt)}</p>
            <p className="text-sm text-muted-foreground">{formatFileSize(item.size)}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

