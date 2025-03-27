import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "completed" | "pending" | "failed" | "in-progress"
  className?: string
  children?: React.ReactNode
}

export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "status-badge",
        status === "completed" && "status-badge-completed",
        status === "pending" && "status-badge-pending",
        status === "failed" && "bg-error/10 text-error",
        status === "in-progress" && "bg-info/10 text-info",
        className,
      )}
    >
      {children || status}
    </span>
  )
}

