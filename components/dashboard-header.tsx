import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between px-2 mb-4", className)}>
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
          {heading}
        </h1>
        {text && <p className="text-slate-400 text-lg">{text}</p>}
      </div>
      <div className="mt-4 md:mt-0">{children}</div>
    </div>
  )
}

