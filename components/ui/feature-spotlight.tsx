"use client"

import { useState, useEffect, type ReactNode } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureSpotlightProps {
  featureId: string
  title: string
  description: string
  children: ReactNode
  position?: "top" | "right" | "bottom" | "left"
  className?: string
  onDismiss?: () => void
}

export function FeatureSpotlight({
  featureId,
  title,
  description,
  children,
  position = "bottom",
  className,
  onDismiss,
}: FeatureSpotlightProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)

  useEffect(() => {
    // Check if this feature has been seen before
    const seenFeatures = localStorage.getItem("seenFeatures")
    const seenFeaturesArray = seenFeatures ? JSON.parse(seenFeatures) : []

    if (!seenFeaturesArray.includes(featureId)) {
      setIsVisible(true)
      setHasBeenSeen(false)
    } else {
      setHasBeenSeen(true)
    }
  }, [featureId])

  const handleDismiss = () => {
    setIsVisible(false)

    // Mark this feature as seen
    const seenFeatures = localStorage.getItem("seenFeatures")
    const seenFeaturesArray = seenFeatures ? JSON.parse(seenFeatures) : []

    if (!seenFeaturesArray.includes(featureId)) {
      seenFeaturesArray.push(featureId)
      localStorage.setItem("seenFeatures", JSON.stringify(seenFeaturesArray))
    }

    if (onDismiss) {
      onDismiss()
    }
  }

  return (
    <div className={cn("relative", className)}>
      {children}

      {isVisible && (
        <div
          className={cn(
            "absolute z-50 w-72",
            position === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            position === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
            position === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            position === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
          )}
        >
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{title}</CardTitle>
                <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-6 w-6">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button size="sm" onClick={handleDismiss} className="w-full">
                Got it
              </Button>
            </CardFooter>
          </Card>

          {/* Arrow pointing to the feature */}
          <div
            className={cn(
              "absolute w-3 h-3 bg-background rotate-45 border",
              position === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1.5 border-t-0 border-l-0",
              position === "right" && "right-full top-1/2 -translate-y-1/2 -mr-1.5 border-t-0 border-r-0",
              position === "bottom" && "bottom-full left-1/2 -translate-x-1/2 -mb-1.5 border-b-0 border-r-0",
              position === "left" && "left-full top-1/2 -translate-y-1/2 -ml-1.5 border-b-0 border-l-0",
            )}
          />
        </div>
      )}
    </div>
  )
}

