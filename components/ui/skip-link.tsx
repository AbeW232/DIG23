import type React from "react"
// import { forwardRef } from "react" // Removed forwardRef
// import { cn } from "@/lib/utils" // Removed cn

// Removed SkipLinkProps interface and forwardRef

export function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
}: {
  href?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {children}
    </a>
  )
}

// SkipLink.displayName = "SkipLink" // Removed displayName

