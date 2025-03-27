"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Share2, Globe, Eye } from "lucide-react"
import type { Memorial } from "@/types/memorial"

interface MemorialHeaderProps {
  memorial: Memorial
}

export function MemorialHeader({ memorial }: MemorialHeaderProps) {
  const handleShare = () => {
    // Share logic would go here
    console.log("Sharing memorial", memorial.id)
  }

  const handlePreview = () => {
    // Preview logic would go here
    window.open(`/memorials/${memorial.id}`, "_blank")
  }

  return (
    <div className="relative">
      <div className="relative h-48 w-full rounded-lg overflow-hidden">
        <Image
          src={memorial.coverImage || "/placeholder.svg?height=400&width=1200"}
          alt={memorial.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-4 left-4 text-white">
        <h1 className="text-2xl font-bold">{memorial.name}</h1>
        <p className="text-sm opacity-90">{memorial.dateRange}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm">
          <Globe className="h-4 w-4 mr-2" />
          {memorial.isPublic ? "Public" : "Private"}
        </Button>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>

        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}

