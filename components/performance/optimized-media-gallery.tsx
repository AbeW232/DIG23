"use client"

import React from "react"

import { useState, useCallback } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Eye, MoreHorizontal, Pencil, Trash2, ImageIcon, Video, FileText, Music } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Fetch media items with pagination
const fetchMediaItems = async ({ pageParam = 0 }) => {
  const response = await fetch(`/api/media?page=${pageParam}&limit=20`)
  if (!response.ok) throw new Error("Failed to fetch media items")
  return response.json()
}

export function OptimizedMediaGallery() {
  const [filter, setFilter] = useState("all")
  const [layout, setLayout] = useState("grid")

  // Use React Query for data fetching with caching and pagination
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["media", filter],
    queryFn: fetchMediaItems,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current < lastPage.pagination.pages ? lastPage.pagination.current + 1 : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Set up intersection observer for infinite loading
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  })

  // Load more media items when the user scrolls to the bottom
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Flatten all pages of data
  const allMediaItems = data?.pages.flatMap((page) => page.items) || []

  // Filter media items based on selected filter
  const filteredMediaItems = filter === "all" ? allMediaItems : allMediaItems.filter((item) => item.type === filter)

  // Memoize the filter change handler
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  // Memoize the layout change handler
  const handleLayoutChange = useCallback((newLayout) => {
    setLayout(newLayout)
  }, [])

  if (isLoading) {
    return <MediaGallerySkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterButton active={filter === "all"} onClick={() => handleFilterChange("all")}>
            All Media
          </FilterButton>
          <FilterButton active={filter === "image"} onClick={() => handleFilterChange("image")}>
            <ImageIcon className="h-4 w-4 mr-1" />
            Images
          </FilterButton>
          <FilterButton active={filter === "video"} onClick={() => handleFilterChange("video")}>
            <Video className="h-4 w-4 mr-1" />
            Videos
          </FilterButton>
          <FilterButton active={filter === "document"} onClick={() => handleFilterChange("document")}>
            <FileText className="h-4 w-4 mr-1" />
            Documents
          </FilterButton>
          <FilterButton active={filter === "audio"} onClick={() => handleFilterChange("audio")}>
            <Music className="h-4 w-4 mr-1" />
            Audio
          </FilterButton>
        </div>

        <div className="flex gap-2">
          <Button
            variant={layout === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => handleLayoutChange("grid")}
          >
            Grid
          </Button>
          <Button
            variant={layout === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => handleLayoutChange("list")}
          >
            List
          </Button>
        </div>
      </div>

      <div className={layout === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
        {filteredMediaItems.map((item) => (
          <MediaItem key={item.id} item={item} layout={layout} />
        ))}
      </div>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading more...</span>
          </div>
        ) : hasNextPage ? (
          <span className="text-sm text-muted-foreground">Scroll for more</span>
        ) : (
          <span className="text-sm text-muted-foreground">No more media items</span>
        )}
      </div>
    </div>
  )
}

// Memoized media item component to prevent unnecessary re-renders
const MediaItem = React.memo(function MediaItem({ item, layout }) {
  // Use intersection observer for lazy loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  // Get the appropriate icon based on media type
  const getTypeIcon = () => {
    switch (item.type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (layout === "grid") {
    return (
      <Card ref={ref} className="overflow-hidden">
        <div className="relative aspect-square bg-muted">
          {inView &&
            (item.type === "image" ? (
              <Image
                src={item.url || "/placeholder.svg?height=400&width=400"}
                alt={item.name || "Media item"}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-opacity duration-300"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder.svg?height=40&width=40"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">{getTypeIcon()}</div>
            ))}
        </div>
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card ref={ref} className="overflow-hidden">
      <div className="flex">
        <div className="relative h-24 w-24 flex-shrink-0 bg-muted">
          {inView &&
            (item.type === "image" ? (
              <Image
                src={item.url || "/placeholder.svg?height=200&width=200"}
                alt={item.name || "Media item"}
                fill
                sizes="96px"
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">{getTypeIcon()}</div>
            ))}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                <span className="text-xs text-muted-foreground">
                  {item.size ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : "Unknown size"}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
})

// Filter button component
function FilterButton({ active, onClick, children }) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className="whitespace-nowrap flex items-center"
    >
      {children}
    </Button>
  )
}

// Skeleton loader for the media gallery
function MediaGallerySkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-24" />
          ))}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/2 mt-1" />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

