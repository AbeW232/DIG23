"use client"

import type * as React from "react"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"

interface DesignSystemProviderProps {
  children: React.ReactNode
  defaultTheme?: "light" | "dark" | "system"
  disableTransitionOnThemeChange?: boolean
  enableSystem?: boolean
}

export function DesignSystemProvider({
  children,
  defaultTheme = "system",
  disableTransitionOnThemeChange = false,
  enableSystem = true,
}: DesignSystemProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnThemeChange={disableTransitionOnThemeChange}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}

