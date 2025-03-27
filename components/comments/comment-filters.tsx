"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

export function CommentFilters({ filters, onFilterChange, stories, authors }) {
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  })

  const handleDateRangeChange = (range) => {
    setDateRange(range)

    if (range.from && range.to) {
      onFilterChange({ dateRange: "custom", dateFrom: range.from, dateTo: range.to })
    }
  }

  const handleResetFilters = () => {
    onFilterChange({
      status: "all",
      dateRange: "all",
      story: "all",
      author: "all",
      sortBy: "newest",
    })
    setDateRange({ from: undefined, to: undefined })
  }

  return (
    <div className="p-4 bg-muted/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={filters.status} onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-filter">Date Range</Label>
          <Select value={filters.dateRange} onValueChange={(value) => onFilterChange({ dateRange: value })}>
            <SelectTrigger id="date-filter">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {filters.dateRange === "custom" && (
            <div className="pt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="story-filter">Story</Label>
          <Select value={filters.story} onValueChange={(value) => onFilterChange({ story: value })}>
            <SelectTrigger id="story-filter">
              <SelectValue placeholder="Filter by story" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stories</SelectItem>
              {stories.map((story) => (
                <SelectItem key={story} value={story}>
                  {story}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author-filter">Author</Label>
          <Select value={filters.author} onValueChange={(value) => onFilterChange({ author: value })}>
            <SelectTrigger id="author-filter">
              <SelectValue placeholder="Filter by author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map((author) => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort-by">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange({ sortBy: value })}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Sort comments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="likes">Most Likes</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
              <SelectItem value="flags">Most Flags</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm" onClick={handleResetFilters} className="text-xs">
          <X className="h-3 w-3 mr-1" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

