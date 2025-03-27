"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { EnhancedCard, type EnhancedCardProps } from "@/components/ui/enhanced-card"
import { Button } from "@/components/ui/button"

interface ActionCardProps extends Omit<EnhancedCardProps, "children"> {
  actionIcon?: React.ReactNode
  actionLabel: string
  description?: string
  buttonLabel?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  onClick?: () => void
  iconBackground?: string
  iconColor?: string
}

export function ActionCard({
  actionIcon,
  actionLabel,
  description,
  buttonLabel = "View",
  buttonVariant = "default",
  onClick,
  iconBackground = "bg-primary/10",
  iconColor = "text-primary",
  variant = "interactive",
  ...props
}: ActionCardProps) {
  return (
    <EnhancedCard variant={variant} {...props}>
      <div className="flex flex-col items-center text-center gap-3 py-2">
        {actionIcon && (
          <div className={cn("p-3 rounded-full", iconBackground)}>
            <div className={cn("h-6 w-6", iconColor)}>{actionIcon}</div>
          </div>
        )}
        <h3 className="font-medium">{actionLabel}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <Button variant={buttonVariant} className="mt-2 w-full" onClick={onClick}>
          {buttonLabel}
        </Button>
      </div>
    </EnhancedCard>
  )
}

