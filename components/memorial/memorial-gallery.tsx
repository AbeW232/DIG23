"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface MemorialGalleryProps {
  memorialId: string
}

// Mock data for demonstration
const galleryImages = [
  {
    id: "img1",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Family gathering",
    caption: "Family reunion, summer 1995",
  },
  {
    id: "img2",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Graduation day",
    caption: "University graduation ceremony, 1967",
  },
  {
    id: "img3",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Wedding day",
    caption: "Wedding day with Sarah, June 12, 1970",
  },
  {
    id: "img4",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Fishing trip",
    caption: "Annual fishing trip in Montana, 2010",
  },
  {
    id: "img5",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Teaching award",
    caption: "Receiving the Excellence in Teaching award, 1992",
  },
  {
    id: "img6",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Retirement party",
    caption: "Retirement celebration after 38 years of teaching, 2010",
  },
]

export function MemorialGallery({ memorialId }: MemorialGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="max-w-4xl p-0 bg-black/90 border-none">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative h-[80vh] flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <div className="h-full w-full flex flex-col items-center justify-center">
                <img
                  src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={galleryImages[currentImageIndex].alt}
                  className="max-h-[calc(80vh-80px)] max-w-full object-contain"
                />
                <div className="text-white p-4 text-center">{galleryImages[currentImageIndex].caption}</div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-10 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

