import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className={cn("container mx-auto py-10 grid items-start gap-10", className)} {...props}>
      {children}
    </div>
  )
}

