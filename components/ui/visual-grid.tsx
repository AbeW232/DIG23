"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface VisualGridProps {
  children: React.ReactNode
  columns?: number
  gap?: number
  className?: string
  itemClassName?: string
  aspectRatio?: string
  breakpoints?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
    "2xl"?: number
  }
}

export function VisualGrid({
  children,
  columns = 3,
  gap = 4,
  className,
  itemClassName,
  aspectRatio = "16/9",
  breakpoints = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    "2xl": 5,
  },
}: VisualGridProps) {
  const gridClasses = React.useMemo(() => {
    const gapClass = `gap-${gap}`
    const gridColsClass = `grid-cols-${breakpoints.sm || 1}`
    const mdClass = breakpoints.md ? `md:grid-cols-${breakpoints.md}` : ""
    const lgClass = breakpoints.lg ? `lg:grid-cols-${breakpoints.lg}` : ""
    const xlClass = breakpoints.xl ? `xl:grid-cols-${breakpoints.xl}` : ""
    const xxlClass = breakpoints["2xl"] ? `2xl:grid-cols-${breakpoints["2xl"]}` : ""

    return cn("grid", gapClass, gridColsClass, mdClass, lgClass, xlClass, xxlClass)
  }, [gap, breakpoints])

  return (
    <div className={cn(gridClasses, className)}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={cn("overflow-hidden rounded-md", itemClassName)} style={{ aspectRatio }}>
          {child}
        </div>
      ))}
    </div>
  )
}

