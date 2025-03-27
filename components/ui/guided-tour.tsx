"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface TourStep {
  title: string
  description: string
  targetSelector: string
  position: "top" | "right" | "bottom" | "left"
}

interface GuidedTourProps {
  tourId: string
  steps: TourStep[]
  onComplete?: () => void
  onSkip?: () => void
}

export function GuidedTour({ tourId, steps, onComplete, onSkip }: GuidedTourProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    // Check if this tour has been completed before
    const completedTours = localStorage.getItem("completedTours")
    const completedToursArray = completedTours ? JSON.parse(completedTours) : []

    if (!completedToursArray.includes(tourId)) {
      setIsVisible(true)
    }
  }, [tourId])

  useEffect(() => {
    if (!isVisible) return

    const updatePosition = () => {
      const targetElement = document.querySelector(steps[currentStep].targetSelector)

      if (!targetElement) {
        console.warn(`Target element not found: ${steps[currentStep].targetSelector}`)
        return
      }

      const rect = targetElement.getBoundingClientRect()
      const tooltipWidth = 320
      const tooltipHeight = 200
      const spacing = 12

      // Add highlight to the target element
      targetElement.classList.add("ring-2", "ring-primary", "ring-offset-2", "transition-all", "duration-300")

      // Calculate position based on specified direction
      switch (steps[currentStep].position) {
        case "top":
          setPosition({
            top: rect.top - tooltipHeight - spacing,
            left: rect.left + rect.width / 2 - tooltipWidth / 2,
          })
          break
        case "right":
          setPosition({
            top: rect.top + rect.height / 2 - tooltipHeight / 2,
            left: rect.right + spacing,
          })
          break
        case "bottom":
          setPosition({
            top: rect.bottom + spacing,
            left: rect.left + rect.width / 2 - tooltipWidth / 2,
          })
          break
        case "left":
          setPosition({
            top: rect.top + rect.height / 2 - tooltipHeight / 2,
            left: rect.left - tooltipWidth - spacing,
          })
          break
      }
    }

    // Remove highlight from all elements
    document.querySelectorAll(".ring-2.ring-primary.ring-offset-2").forEach((el) => {
      el.classList.remove("ring-2", "ring-primary", "ring-offset-2", "transition-all", "duration-300")
    })

    updatePosition()
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)

      // Remove highlight from all elements when component unmounts
      document.querySelectorAll(".ring-2.ring-primary.ring-offset-2").forEach((el) => {
        el.classList.remove("ring-2", "ring-primary", "ring-offset-2", "transition-all", "duration-300")
      })
    }
  }, [currentStep, isVisible, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeTour = () => {
    setIsVisible(false)

    // Mark this tour as completed
    const completedTours = localStorage.getItem("completedTours")
    const completedToursArray = completedTours ? JSON.parse(completedTours) : []

    if (!completedToursArray.includes(tourId)) {
      completedToursArray.push(tourId)
      localStorage.setItem("completedTours", JSON.stringify(completedToursArray))
    }

    if (onComplete) {
      onComplete()
    }
  }

  const skipTour = () => {
    setIsVisible(false)

    if (onSkip) {
      onSkip()
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={skipTour} />
      <Card
        className="fixed z-50 w-80 shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{steps[currentStep].title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={skipTour} className="h-6 w-6">
              <X className="h-4 w-4" />
              <span className="sr-only">Skip tour</span>
            </Button>
          </div>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-1" />
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

