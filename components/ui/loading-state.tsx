"use client"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  text?: string
  size?: "sm" | "md" | "lg"
  fullPage?: boolean
  className?: string
  textClassName?: string
}

export function LoadingState({
  text = "Loading...",
  size = "md",
  fullPage = false,
  className,
  textClassName,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const content = (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} aria-hidden="true" />
      {text && <p className={cn("mt-2 text-sm text-muted-foreground", textClassName)}>{text}</p>}
      <span className="sr-only">Loading</span>
    </div>
  )

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
        role="alert"
        aria-live="assertive"
      >
        {content}
      </div>
    )
  }

  return (
    <div role="alert" aria-live="polite" className="w-full h-full flex items-center justify-center">
      {content}
    </div>
  )
}

