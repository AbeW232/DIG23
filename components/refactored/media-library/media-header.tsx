"use client"

import { UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediaHeaderProps {
  onUploadClick: () => void
}

export function MediaHeader({ onUploadClick }: MediaHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
        <p className="text-muted-foreground">Manage your photos, videos, and other media files</p>
      </div>

      <Button onClick={onUploadClick} className="flex items-center gap-2">
        <UploadCloud className="h-4 w-4" />
        <span>Upload</span>
      </Button>
    </div>
  )
}

