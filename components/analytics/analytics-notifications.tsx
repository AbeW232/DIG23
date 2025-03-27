"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AnalyticsNotifications() {
  const notificationCount = 3

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              variant="destructive"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-auto">
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start p-3">
            <div className="font-medium">Traffic Spike Detected</div>
            <div className="text-sm text-muted-foreground mt-1">
              Your site is experiencing 150% more traffic than usual.
            </div>
            <div className="text-xs text-muted-foreground mt-2">10 minutes ago</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start p-3">
            <div className="font-medium">Weekly Report Available</div>
            <div className="text-sm text-muted-foreground mt-1">Your weekly analytics report is ready to view.</div>
            <div className="text-xs text-muted-foreground mt-2">2 hours ago</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start p-3">
            <div className="font-medium">New Feature Available</div>
            <div className="text-sm text-muted-foreground mt-1">Try our new predictive analytics tools.</div>
            <div className="text-xs text-muted-foreground mt-2">1 day ago</div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center text-primary">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

