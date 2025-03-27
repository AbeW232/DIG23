import type React from "react"
import { cn } from "@/lib/utils"

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4
  gap?: "small" | "medium" | "large"
  children: React.ReactNode
}

export function CardGrid({ columns = 3, gap = "medium", className, children, ...props }: CardGridProps) {
  const gapClass = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  }[gap]

  const columnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns]

  return (
    <div className={cn("grid", columnsClass, gapClass, className)} {...props}>
      {children}
    </div>
  )
}

interface CardGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2 | 3
}

export function CardGridItem({ children, className, colSpan = 1, rowSpan = 1, ...props }: CardGridItemProps) {
  const colSpanClass = {
    1: "",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan]

  const rowSpanClass = {
    1: "",
    2: "md:row-span-2",
    3: "md:row-span-3",
  }[rowSpan]

  return (
    <div className={cn(colSpanClass, rowSpanClass, className)} {...props}>
      {children}
    </div>
  )
}

