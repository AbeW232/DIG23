"use client"

import type * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fallbackRoute?: string
  label?: string
  variant?: "default" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showIcon?: boolean
}

export function BackButton({
  fallbackRoute = "/dashboard",
  label = "Back",
  variant = "ghost",
  size = "default",
  showIcon = true,
  className,
  ...props
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Try to go back in history first
    if (window.history.length > 1) {
      router.back()
    } else {
      // If no history, go to fallback route
      router.push(fallbackRoute)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={cn("gap-1", className)} {...props}>
      {showIcon && <ChevronLeft className="h-4 w-4" />}
      {label}
    </Button>
  )
}

