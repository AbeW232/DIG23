"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemHeight: number
  className?: string
  overscan?: number
  onEndReached?: () => void
  endReachedThreshold?: number
}

/**
 * Virtualized List Component
 *
 * This component renders only the items that are visible in the viewport,
 * which significantly improves performance for long lists.
 */
export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  className,
  overscan = 3,
  onEndReached,
  endReachedThreshold = 200,
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)

  // Calculate total height of all items
  const totalHeight = items.length * itemHeight

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + overscan)

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current
      setScrollTop(scrollTop)

      // Check if end reached
      if (onEndReached && scrollHeight - scrollTop - clientHeight < endReachedThreshold) {
        onEndReached()
      }
    }
  }, [onEndReached, endReachedThreshold])

  // Update container height on resize
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight)

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === containerRef.current) {
            setContainerHeight(entry.contentRect.height)
          }
        }
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current)
        }
      }
    }
  }, [])

  // Visible items
  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => {
    const actualIndex = startIndex + index
    return (
      <div
        key={actualIndex}
        style={{
          position: "absolute",
          top: actualIndex * itemHeight,
          height: itemHeight,
          left: 0,
          right: 0,
        }}
      >
        {renderItem(item, actualIndex)}
      </div>
    )
  })

  return (
    <div ref={containerRef} className={cn("overflow-auto relative", className)} onScroll={handleScroll}>
      <div style={{ height: totalHeight, position: "relative" }}>{visibleItems}</div>
    </div>
  )
}

