"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { debounce } from "@/lib/utils"

interface CanvasOptimizerProps {
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number, timestamp: number) => void
  width?: number
  height?: number
  className?: string
  fps?: number
  isAnimated?: boolean
  isResponsive?: boolean
  onResize?: (width: number, height: number) => void
}

/**
 * Canvas Optimizer Component
 *
 * This component optimizes canvas rendering with:
 * - High DPI support
 * - FPS limiting
 * - Responsive resizing
 * - Animation frame optimization
 */
export function CanvasOptimizer({
  draw,
  width,
  height,
  className,
  fps = 60,
  isAnimated = false,
  isResponsive = true,
  onResize,
}: CanvasOptimizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestIdRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number>(0)
  const fpsInterval = 1000 / fps

  const [canvasSize, setCanvasSize] = useState({
    width: width || 300,
    height: height || 150,
  })

  // Set up canvas with high DPI support
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get device pixel ratio
    const dpr = window.devicePixelRatio || 1

    // Get canvas size from container if responsive
    let newWidth = width || canvas.clientWidth
    let newHeight = height || canvas.clientHeight

    if (isResponsive && !width && !height) {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        newWidth = rect.width
        newHeight = rect.height
      }
    }

    // Update canvas size state
    setCanvasSize({ width: newWidth, height: newHeight })

    // Set canvas dimensions accounting for device pixel ratio
    canvas.width = newWidth * dpr
    canvas.height = newHeight * dpr

    // Scale canvas back down to original size for CSS
    canvas.style.width = `${newWidth}px`
    canvas.style.height = `${newHeight}px`

    // Scale context to account for device pixel ratio
    ctx.scale(dpr, dpr)

    // Notify parent component of resize
    if (onResize) {
      onResize(newWidth, newHeight)
    }

    // If not animated, draw once
    if (!isAnimated) {
      ctx.clearRect(0, 0, newWidth, newHeight)
      draw(ctx, newWidth, newHeight, 0)
    }
  }, [width, height, isResponsive, draw, isAnimated, onResize])

  // Animation loop with FPS limiting
  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      requestIdRef.current = requestAnimationFrame(animate)

      // FPS limiting
      const elapsed = timestamp - previousTimeRef.current
      if (elapsed < fpsInterval) return

      // Adjust for FPS
      previousTimeRef.current = timestamp - (elapsed % fpsInterval)

      // Clear and draw
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
      draw(ctx, canvasSize.width, canvasSize.height, timestamp)
    },
    [draw, fpsInterval, canvasSize.width, canvasSize.height],
  )

  // Handle window resize
  const handleResize = useCallback(
    debounce(() => {
      setupCanvas()
    }, 200),
    [setupCanvas],
  )

  // Initialize canvas
  useEffect(() => {
    setupCanvas()

    // Set up resize listener if responsive
    if (isResponsive) {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (isResponsive) {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [setupCanvas, isResponsive, handleResize])

  // Start/stop animation loop
  useEffect(() => {
    if (isAnimated) {
      previousTimeRef.current = 0
      requestIdRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
      }
    }
  }, [isAnimated, animate])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    />
  )
}

