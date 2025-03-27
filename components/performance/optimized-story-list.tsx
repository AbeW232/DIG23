"use client"

import React from "react"

import { useState, useMemo, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, Heart, MessageSquare } from "lucide-react"

// Fetch stories with pagination
const fetchStories = async ({ pageParam = 0 }) => {
  const response = await fetch(`/api/stories?page=${pageParam}&limit=20`)
  if (!response.ok) throw new Error("Failed to fetch stories")
  return response.json()
}

export function OptimizedStoryList() {
  const [filter, setFilter] = useState("all")
  const parentRef = React.useRef<HTMLDivElement>(null)

  // Use React Query for data fetching with caching
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useQuery({
    queryKey: ["stories", filter],
    queryFn: fetchStories,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.current < lastPage.pagination.pages ? lastPage.pagination.current + 1 : undefined,
    staleTime: 60 * 1000, // 1 minute
  })

  // Flatten all pages of data
  const allStories = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page.items)
  }, [data])

  // Filter stories based on selected filter
  const filteredStories = useMemo(() => {
    if (filter === "all") return allStories
    return allStories.filter((story) => story.category === filter)
  }, [allStories, filter])

  // Set up virtualization for efficient rendering
  const virtualizer = useVirtualizer({
    count: filteredStories.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280, // Approximate height of a story card
    overscan: 5, // Number of items to render outside of the visible area
  })

  // Set up intersection observer for infinite loading
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  })

  // Load more stories when the user scrolls to the bottom
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  // Memoize the filter change handler
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter)
  }, [])

  if (isLoading) {
    return <StoryListSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <FilterButton active={filter === "all"} onClick={() => handleFilterChange("all")}>
          All Stories
        </FilterButton>
        <FilterButton active={filter === "memoir"} onClick={() => handleFilterChange("memoir")}>
          Memoirs
        </FilterButton>
        <FilterButton active={filter === "legacy"} onClick={() => handleFilterChange("legacy")}>
          Legacy
        </FilterButton>
        <FilterButton active={filter === "family"} onClick={() => handleFilterChange("family")}>
          Family
        </FilterButton>
      </div>

      <div ref={parentRef} className="h-[800px] overflow-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <StoryCard story={filteredStories[virtualRow.index]} />
            </div>
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
            <span className="text-sm text-muted-foreground">No more stories</span>
          )}
        </div>
      </div>
    </div>
  )
}

// Memoized story card component to prevent unnecessary re-renders
const StoryCard = React.memo(function StoryCard({ story }) {
  // Use intersection observer for lazy loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  })

  return (
    <div ref={ref} className="p-2">
      <Card className="overflow-hidden">
        <div className="relative h-40">
          {inView ? (
            <Image
              src={story.coverImage || "/placeholder.svg?height=400&width=600"}
              alt={story.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/placeholder.svg?height=40&width=60"
            />
          ) : (
            <div className="w-full h-full bg-muted animate-pulse" />
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{story.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{story.description}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{story.readTime || "5 min"}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{story.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{story.likes || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{story.comments || 0}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

// Filter button component
function FilterButton({ active, onClick, children }) {
  return (
    <Button variant={active ? "default" : "outline"} size="sm" onClick={onClick} className="whitespace-nowrap">
      {children}
    </Button>
  )
}

// Skeleton loader for the story list
function StoryListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-9 w-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

