"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  disabled?: boolean
  isLoading?: boolean
}

interface PageActionsProps {
  primaryAction?: Action
  secondaryAction?: Action
  moreActions?: Action[]
  className?: string
  align?: "start" | "center" | "end"
  sticky?: boolean
}

export function PageActions({
  primaryAction,
  secondaryAction,
  moreActions = [],
  className,
  align = "end",
  sticky = false,
}: PageActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        sticky && "sticky bottom-0 py-4 bg-background border-t",
        className,
      )}
    >
      {secondaryAction && (
        <Button
          variant={secondaryAction.variant || "outline"}
          onClick={secondaryAction.onClick}
          disabled={secondaryAction.disabled}
          isLoading={secondaryAction.isLoading}
        >
          {secondaryAction.icon}
          {secondaryAction.label}
        </Button>
      )}

      {primaryAction && (
        <Button
          variant={primaryAction.variant || "default"}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled}
          isLoading={primaryAction.isLoading}
        >
          {primaryAction.icon}
          {primaryAction.label}
        </Button>
      )}

      {moreActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {moreActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(action.variant === "destructive" && "text-destructive focus:text-destructive")}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

