"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

interface ColorModeToggleProps {
  className?: string
  iconClassName?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function ColorModeToggle({ className, iconClassName, size = "md", variant = "outline" }: ColorModeToggleProps) {
  const [isDark, setIsDark] = React.useState(false)

  // Check for dark mode on mount
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleColorMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("color-mode", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("color-mode", "dark")
    }
    setIsDark(!isDark)
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleColorMode}
      className={cn(sizeClasses[size], className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className={cn(iconSizes[size], iconClassName)} />
      ) : (
        <Moon className={cn(iconSizes[size], iconClassName)} />
      )}
    </Button>
  )
}

