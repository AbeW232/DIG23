"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnalyticsInsightCardProps {
  title: string
  description: string
  icon: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function AnalyticsInsightCard({ title, description, icon, actions, className }: AnalyticsInsightCardProps) {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">{icon}</div>
          <div className="space-y-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
      {actions && <CardFooter className="pt-0">{actions}</CardFooter>}
    </Card>
  )
}

