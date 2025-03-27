"use client"

import * as React from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface LazyLoadProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function LazyLoad({ children, placeholder, className, threshold = 0.1, rootMargin = "200px" }: LazyLoadProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const entry = useIntersectionObserver(ref, {
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  })

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      setIsLoaded(true)
    }
  }, [entry])

  return (
    <div ref={ref} className={cn("min-h-[100px]", className)}>
      {isLoaded
        ? children
        : placeholder || <div className="w-full h-full min-h-[100px] bg-muted animate-pulse rounded-md" />}
    </div>
  )
}

