"use client"

import { memo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Filter } from "lucide-react"
import type { MediaFilter } from "./index"

interface MediaFiltersProps {
  filter: MediaFilter
  onFilterChange: (filter: Partial<MediaFilter>) => void
}

export const MediaFilters = memo(function MediaFilters({ filter, onFilterChange }: MediaFiltersProps) {
  const mediaTypes = [
    { id: "all", name: "All Media" },
    { id: "image", name: "Images" },
    { id: "video", name: "Videos" },
    { id: "audio", name: "Audio" },
    { id: "document", name: "Documents" },
  ]

  const albums = [
    { id: null, name: "All Albums" },
    { id: "family", name: "Family" },
    { id: "travel", name: "Travel" },
    { id: "events", name: "Events" },
  ]

  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "oldest", name: "Oldest First" },
    { id: "name", name: "Name A-Z" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Select
        value={filter.type}
        onValueChange={(value) =>
          onFilterChange({
            type: value as MediaFilter["type"],
          })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Media Type" />
        </SelectTrigger>
        <SelectContent>
          {mediaTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filter.album || "null"}
        onValueChange={(value) =>
          onFilterChange({
            album: value === "null" ? null : value,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Album" />
        </SelectTrigger>
        <SelectContent>
          {albums.map((album) => (
            <SelectItem key={album.id || "null"} value={album.id || "null"}>
              {album.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto ml-auto">
            <Filter className="mr-2 h-4 w-4" />
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

