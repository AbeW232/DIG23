"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { StoryHeader } from "./story-header"
import { StoryFilters } from "./story-filters"
import { StoryGrid } from "./story-grid"
import { StoryEmptyState } from "./story-empty-state"
import { StoryPagination } from "./story-pagination"
import { fetchStories } from "@/lib/api/stories"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export type StoryFilter = {
  category: string | null
  status: "draft" | "published" | "all"
  sortBy: "newest" | "oldest" | "title"
}

export function StoryDashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<StoryFilter>({
    category: null,
    status: "all",
    sortBy: "newest",
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ["stories", currentPage, filter],
    queryFn: () => fetchStories({ page: currentPage, ...filter }),
    keepPreviousData: true,
  })

  const handleFilterChange = (newFilter: Partial<StoryFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the list
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load stories. Please try again.</div>
  }

  const { stories, totalPages } = data || { stories: [], totalPages: 0 }

  return (
    <div className="space-y-6">
      <StoryHeader />

      <StoryFilters filter={filter} onFilterChange={handleFilterChange} />

      {stories.length > 0 ? (
        <>
          <StoryGrid stories={stories} />

          <StoryPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <StoryEmptyState filter={filter} />
      )}
    </div>
  )
}

