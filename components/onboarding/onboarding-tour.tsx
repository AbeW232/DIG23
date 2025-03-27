"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface OnboardingStep {
  title: string
  description: string
  targetSelector: string
  position: "top" | "right" | "bottom" | "left"
}

interface OnboardingTourProps {
  steps: OnboardingStep[]
  onComplete: () => void
  onSkip: () => void
  isOpen: boolean
}

export function OnboardingTour({ steps, onComplete, onSkip, isOpen }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const calculatePosition = (targetSelector: string, position: "top" | "right" | "bottom" | "left") => {
    const targetElement = document.querySelector(targetSelector)

    if (!targetElement) return { top: 0, left: 0 }

    const rect = targetElement.getBoundingClientRect()
    const tooltipWidth = 320
    const tooltipHeight = 200
    const spacing = 12

    switch (position) {
      case "top":
        return {
          top: rect.top - tooltipHeight - spacing,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        }
      case "right":
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.right + spacing,
        }
      case "bottom":
        return {
          top: rect.bottom + spacing,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        }
      case "left":
        return {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.left - tooltipWidth - spacing,
        }
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const updatePosition = () => {
      const newPosition = calculatePosition(steps[currentStep].targetSelector, steps[currentStep].position)
      setPosition(newPosition)
    }

    updatePosition()

    // Highlight the target element
    const targetElement = document.querySelector(steps[currentStep].targetSelector)
    if (targetElement) {
      targetElement.classList.add("ring-2", "ring-primary", "ring-offset-2")
    }

    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
      // Remove highlight
      const targetElement = document.querySelector(steps[currentStep].targetSelector)
      if (targetElement) {
        targetElement.classList.remove("ring-2", "ring-primary", "ring-offset-2")
      }
    }
  }, [currentStep, isOpen, steps])

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onSkip} />
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
            <Button variant="ghost" size="icon" onClick={onSkip} className="h-6 w-6">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            <Button size="sm" onClick={handleNext}>
              {currentStep < steps.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

