"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string
  aspectRatio?: string
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  lazyLoad?: boolean
  blurPlaceholder?: boolean
}

export function OptimizedImage({
  src,
  alt,
  fallback = "/placeholder.svg?height=300&width=300",
  aspectRatio = "16/9",
  objectFit = "cover",
  lazyLoad = true,
  blurPlaceholder = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [error, setError] = React.useState(false)
  const imageRef = React.useRef<HTMLImageElement>(null)

  const entry = useIntersectionObserver(imageRef, {
    rootMargin: "200px",
    freezeOnceVisible: true,
  })

  const isVisible = !!entry?.isIntersecting
  const shouldLoad = lazyLoad ? isVisible : true

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  const imageSrc = error ? fallback : src

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)} style={{ aspectRatio }}>
      {blurPlaceholder && !isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

      <img
        ref={imageRef}
        src={shouldLoad ? imageSrc : fallback}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          objectFit === "contain" && "object-contain",
          objectFit === "cover" && "object-cover",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
        )}
        loading={lazyLoad ? "lazy" : "eager"}
        {...props}
      />
    </div>
  )
}

