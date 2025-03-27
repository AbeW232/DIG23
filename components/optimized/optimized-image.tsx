"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string
  lowQualitySrc?: string
  fallbackSrc?: string
  loadingClassName?: string
}

/**
 * Optimized Image Component
 *
 * This component enhances the Next.js Image component with:
 * - Low quality image placeholder
 * - Fade-in effect when loaded
 * - Error handling with fallback
 * - Intersection Observer for lazy loading
 */
export function OptimizedImage({
  src,
  lowQualitySrc,
  fallbackSrc = "/placeholder.svg",
  alt,
  className,
  loadingClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!props.priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px" }, // Start loading when within 200px of viewport
      )

      const currentElement = document.getElementById(`image-${props.alt?.replace(/\s+/g, "-")}`)
      if (currentElement) {
        observer.observe(currentElement)
      }

      return () => {
        if (currentElement) {
          observer.unobserve(currentElement)
        }
      }
    } else {
      setIsInView(true)
    }
  }, [props.alt, props.priority])

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
  }

  // Handle image error
  const handleError = () => {
    setHasError(true)
  }

  // Determine which source to use
  const imageSrc = hasError ? fallbackSrc : src

  return (
    <div id={`image-${props.alt?.replace(/\s+/g, "-")}`} className={cn("relative overflow-hidden", className)}>
      {/* Low quality placeholder */}
      {lowQualitySrc && !isLoaded && (
        <Image
          src={lowQualitySrc || "/placeholder.svg"}
          alt={alt}
          className={cn("absolute inset-0 w-full h-full blur-sm scale-105", loadingClassName)}
          fill={props.fill}
          width={!props.fill ? props.width : undefined}
          height={!props.fill ? props.height : undefined}
        />
      )}

      {/* Main image - only load when in view or priority */}
      {(isInView || props.priority) && (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={alt}
          className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  )
}

