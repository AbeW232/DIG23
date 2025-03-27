"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ColorSchemeProps {
  children: React.ReactNode
  scheme?: "default" | "brand" | "accent" | "muted" | "custom"
  customColors?: {
    background?: string
    foreground?: string
    primary?: string
    secondary?: string
    accent?: string
    muted?: string
  }
  className?: string
}

export function ColorScheme({ children, scheme = "default", customColors, className }: ColorSchemeProps) {
  const schemeClasses = React.useMemo(() => {
    switch (scheme) {
      case "brand":
        return "bg-brand text-brand-foreground"
      case "accent":
        return "bg-accent text-accent-foreground"
      case "muted":
        return "bg-muted text-muted-foreground"
      case "custom":
        return ""
      default:
        return "bg-background text-foreground"
    }
  }, [scheme])

  const customStyles = React.useMemo(() => {
    if (scheme !== "custom" || !customColors) return {}

    const styles: React.CSSProperties = {}

    if (customColors.background) styles["--background"] = customColors.background
    if (customColors.foreground) styles["--foreground"] = customColors.foreground
    if (customColors.primary) styles["--primary"] = customColors.primary
    if (customColors.secondary) styles["--secondary"] = customColors.secondary
    if (customColors.accent) styles["--accent"] = customColors.accent
    if (customColors.muted) styles["--muted"] = customColors.muted

    return styles
  }, [scheme, customColors])

  return (
    <div className={cn("p-4 rounded-md", schemeClasses, className)} style={customStyles}>
      {children}
    </div>
  )
}

