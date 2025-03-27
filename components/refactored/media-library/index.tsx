"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MediaHeader } from "./media-header"
import { MediaFilters } from "./media-filters"
import { MediaGrid } from "./media-grid"
import { MediaUploader } from "./media-uploader"
import { MediaPagination } from "./media-pagination"
import { fetchMedia } from "@/lib/api/media"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"

export type MediaFilter = {
  type: "all" | "image" | "video" | "audio" | "document"
  album: string | null
  sortBy: "newest" | "oldest" | "name"
}

export function MediaLibrary() {
  const [isUploading, setIsUploading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<MediaFilter>({
    type: "all",
    album: null,
    sortBy: "newest",
  })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["media", currentPage, filter],
    queryFn: () => fetchMedia({ page: currentPage, ...filter }),
    keepPreviousData: true,
  })

  const handleFilterChange = (newFilter: Partial<MediaFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the list
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleUploadComplete = () => {
    setIsUploading(false)
    refetch() // Refresh the media list
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load media. Please try again.</div>
  }

  const { mediaItems, totalPages } = data || { mediaItems: [], totalPages: 0 }

  return (
    <div className="space-y-6">
      <MediaHeader onUploadClick={() => setIsUploading(true)} />

      {isUploading ? (
        <MediaUploader onCancel={() => setIsUploading(false)} onComplete={handleUploadComplete} />
      ) : (
        <>
          <MediaFilters filter={filter} onFilterChange={handleFilterChange} />

          <MediaGrid mediaItems={mediaItems} />

          <MediaPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

