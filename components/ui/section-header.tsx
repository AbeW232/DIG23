"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  }
  icon?: React.ReactNode
}

export function SectionHeader({ title, description, action, icon, className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start gap-4 mb-6", className)} {...props}>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Button variant={action.variant || "default"} onClick={action.onClick} className="sm:self-start">
          {action.label}
        </Button>
      )}
    </div>
  )
}

