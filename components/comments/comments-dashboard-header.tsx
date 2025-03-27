"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Search } from "@/components/ui/search"
import { Filter, RefreshCw, Settings, Download, Upload, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export function CommentsDashboardHeader({
  pendingCount,
  flaggedCount,
  spamCount,
  onRefresh,
  refreshing,
  onToggleFilters,
  showFilters,
  onSearch,
}) {
  return (
    <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4 items-center">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Search placeholder="Search comments..." className="w-full sm:w-[260px]" onChange={onSearch} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onToggleFilters} className={showFilters ? "bg-muted" : ""}>
                <Filter className="h-4 w-4" />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle advanced filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center text-sm text-muted-foreground mr-2">
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
            {pendingCount} pending
          </span>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
            {flaggedCount} flagged
          </span>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-gray-500 mr-1"></span>
            {spamCount} spam
          </span>
        </div>

        <Button variant="outline" size="sm" onClick={onRefresh} disabled={refreshing}>
          {refreshing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mr-1"
            >
              <RefreshCw className="h-4 w-4" />
            </motion.div>
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Refresh
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export Comments
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="h-4 w-4 mr-2" />
              Import Comments
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Comment Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Documentation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

