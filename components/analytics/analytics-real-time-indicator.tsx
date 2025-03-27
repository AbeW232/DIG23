"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Activity } from "lucide-react"

interface AnalyticsRealTimeIndicatorProps {
  isEnabled: boolean
  onToggle: () => void
}

export function AnalyticsRealTimeIndicator({ isEnabled, onToggle }: AnalyticsRealTimeIndicatorProps) {
  const [activeUsers, setActiveUsers] = useState(42)

  // Simulate real-time user count changes
  useEffect(() => {
    if (!isEnabled) return

    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2 // Random change between -2 and +2
      setActiveUsers((prev) => Math.max(1, prev + change))
    }, 5000)

    return () => clearInterval(interval)
  }, [isEnabled])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Switch checked={isEnabled} onCheckedChange={onToggle} id="real-time-mode" />
            {isEnabled && (
              <Badge variant="outline" className="flex items-center gap-1 bg-primary/5">
                <Activity className="h-3 w-3 text-primary animate-pulse" />
                <span className="text-xs">{activeUsers} active now</span>
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle real-time data updates</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

