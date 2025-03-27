"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"
import { useState } from "react"

export function AnalyticsCustomizeMenu() {
  const [showVisitors, setShowVisitors] = useState(true)
  const [showEngagement, setShowEngagement] = useState(true)
  const [showContent, setShowContent] = useState(true)
  const [showDevices, setShowDevices] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Customize Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showVisitors} onCheckedChange={setShowVisitors}>
          Visitor Metrics
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showEngagement} onCheckedChange={setShowEngagement}>
          Engagement Metrics
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showContent} onCheckedChange={setShowContent}>
          Content Performance
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showDevices} onCheckedChange={setShowDevices}>
          Device Breakdown
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Save Layout</DropdownMenuItem>
        <DropdownMenuItem>Reset to Default</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

