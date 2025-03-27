"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnalyticsChartContainerProps {
  title: string
  description?: string
  chart: React.ReactNode
  actions?: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function AnalyticsChartContainer({
  title,
  description,
  chart,
  actions,
  className,
  fullWidth = false,
}: AnalyticsChartContainerProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </CardHeader>
      <CardContent className={cn("h-[300px]", fullWidth && "px-2")}>{chart}</CardContent>
    </Card>
  )
}

