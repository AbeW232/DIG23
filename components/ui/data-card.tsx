import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface DataCardProps {
  title: string
  value: string
  icon?: React.ReactNode
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
    label?: string
  }
  loading?: boolean
  className?: string
}

export function DataCard({ title, value, icon, trend, loading = false, className }: DataCardProps) {
  return (
    <Card className={cn("dashboard-card overflow-hidden", className)}>
      <CardHeader className="dashboard-card-header pb-2">
        <CardTitle className="dashboard-card-title text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-10 w-24" />
        ) : (
          <>
            <div className="dashboard-card-value">{value}</div>
            {trend && (
              <div
                className={cn(
                  "dashboard-card-trend",
                  trend.direction === "up" ? "stat-trend-up" : trend.direction === "down" ? "stat-trend-down" : "",
                )}
              >
                {trend.direction === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : trend.direction === "down" ? (
                  <ArrowDownRight className="h-4 w-4" />
                ) : null}
                <span>
                  {trend.value} {trend.label}
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

