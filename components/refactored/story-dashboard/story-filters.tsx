"use client"

import { memo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { StoryFilter } from "./index"

interface StoryFiltersProps {
  filter: StoryFilter
  onFilterChange: (filter: Partial<StoryFilter>) => void
}

// Using memo to prevent unnecessary re-renders
export const StoryFilters = memo(function StoryFilters({ filter, onFilterChange }: StoryFiltersProps) {
  const categories = [
    { id: null, name: "All Categories" },
    { id: "personal", name: "Personal" },
    { id: "family", name: "Family" },
    { id: "travel", name: "Travel" },
    { id: "career", name: "Career" },
  ]

  const statuses = [
    { id: "all", name: "All Stories" },
    { id: "draft", name: "Drafts" },
    { id: "published", name: "Published" },
  ]

  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "oldest", name: "Oldest First" },
    { id: "title", name: "Title A-Z" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Select
        value={filter.category || "null"}
        onValueChange={(value) =>
          onFilterChange({
            category: value === "null" ? null : value,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id || "null"} value={category.id || "null"}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filter.status}
        onValueChange={(value) =>
          onFilterChange({
            status: value as "draft" | "published" | "all",
          })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.id}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto ml-auto">
            Sort by
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={() => onFilterChange({ sortBy: option.id as any })}
              className={filter.sortBy === option.id ? "bg-accent" : ""}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
})

