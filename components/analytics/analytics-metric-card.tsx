"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsMetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
    label: string
  }
  className?: string
  onClick?: () => void
}

export function AnalyticsMetricCard({ title, value, icon, trend, className, onClick }: AnalyticsMetricCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", onClick && "cursor-pointer", className)} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend.direction === "up" ? (
              <ArrowUpRight className="inline h-3 w-3 mr-1 text-green-500" />
            ) : trend.direction === "down" ? (
              <ArrowDownRight className="inline h-3 w-3 mr-1 text-red-500" />
            ) : (
              <ArrowRight className="inline h-3 w-3 mr-1 text-gray-500" />
            )}
            {trend.value} {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

