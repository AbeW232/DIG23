"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

interface Step {
  id: string
  label: string
  description?: string
  isCompleted?: boolean
  isOptional?: boolean
}

interface StepNavigatorProps {
  steps: Step[]
  currentStepIndex: number
  onStepChange: (index: number) => void
  onNext?: () => void
  onPrevious?: () => void
  disableNext?: boolean
  disablePrevious?: boolean
  className?: string
  orientation?: "horizontal" | "vertical"
  showStepDescription?: boolean
  allowSkip?: boolean
  nextLabel?: string
  previousLabel?: string
  finishLabel?: string
}

export function StepNavigator({
  steps,
  currentStepIndex,
  onStepChange,
  onNext,
  onPrevious,
  disableNext = false,
  disablePrevious = false,
  className,
  orientation = "horizontal",
  showStepDescription = true,
  allowSkip = false,
  nextLabel = "Next",
  previousLabel = "Previous",
  finishLabel = "Finish",
}: StepNavigatorProps) {
  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0

  const handleNext = () => {
    if (isLastStep) {
      return
    }

    if (onNext) {
      onNext()
    } else {
      onStepChange(currentStepIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (isFirstStep) {
      return
    }

    if (onPrevious) {
      onPrevious()
    } else {
      onStepChange(currentStepIndex - 1)
    }
  }

  const handleStepClick = (index: number) => {
    // Only allow clicking on completed steps or the next step
    if (allowSkip || index <= currentStepIndex || steps[index - 1]?.isCompleted) {
      onStepChange(index)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("mb-8", orientation === "horizontal" ? "flex items-center" : "flex flex-col space-y-4")}>
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex
          const isComplete = step.isCompleted || index < currentStepIndex
          const isClickable = allowSkip || index <= currentStepIndex || steps[index - 1]?.isCompleted

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex items-center",
                  orientation === "horizontal" ? "flex-col" : "flex-row",
                  isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                )}
                onClick={() => isClickable && handleStepClick(index)}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium border transition-colors",
                      isActive && "border-primary bg-primary text-primary-foreground",
                      isComplete && "border-primary bg-primary text-primary-foreground",
                      !isActive && !isComplete && "border-muted-foreground text-muted-foreground",
                    )}
                  >
                    {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                  </div>

                  {orientation === "horizontal" && index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-12 h-[1px] mx-2",
                        isComplete || index < currentStepIndex ? "bg-primary" : "bg-muted-foreground",
                      )}
                    />
                  )}
                </div>

                <div className={cn("mt-2 text-center", orientation === "horizontal" ? "w-20" : "ml-3")}>
                  <div className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {step.label}
                    {step.isOptional && <span className="text-xs ml-1">(Optional)</span>}
                  </div>

                  {showStepDescription && step.description && (
                    <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
                  )}
                </div>
              </div>

              {orientation === "vertical" && index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-[1px] h-6 ml-4",
                    isComplete || index < currentStepIndex ? "bg-primary" : "bg-muted-foreground",
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={isFirstStep || disablePrevious}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          {previousLabel}
        </Button>

        <Button onClick={handleNext} disabled={isLastStep || disableNext}>
          {isLastStep ? finishLabel : nextLabel}
          {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

