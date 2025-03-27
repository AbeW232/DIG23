"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  breakpoint?: "sm" | "md" | "lg" | "xl"
  mobileView?: React.ReactNode
}

export function ResponsiveContainer({
  children,
  breakpoint = "md",
  mobileView,
  className,
  ...props
}: ResponsiveContainerProps) {
  const isMobile = useMobile()
  const breakpointMap = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  }

  // If a specific mobile view is provided and we're on mobile, show that
  if (isMobile && mobileView) {
    return (
      <div className={cn("w-full", className)} {...props}>
        {mobileView}
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Hide on mobile if no mobile view is provided but we're below the breakpoint */}
      <div className={`hidden ${breakpoint}:block`}>{children}</div>

      {/* Show mobile fallback message if no specific mobile view */}
      {isMobile && !mobileView && (
        <div className={`block ${breakpoint}:hidden`}>
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              This content is optimized for larger screens. Please rotate your device or use a larger screen for the
              best experience.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

