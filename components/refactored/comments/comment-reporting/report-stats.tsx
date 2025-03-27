import type React from "react"
import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Clock, Flag } from "lucide-react"

interface ReportStatsProps {
  stats: {
    pending: number
    resolved: number
    dismissed: number
    highSeverity: number
  }
}

export const ReportStats = memo(function ReportStats({ stats }: ReportStatsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <StatCard icon={<Clock className="h-4 w-4 text-amber-500" />} label="Pending" value={stats.pending} />
      <StatCard icon={<CheckCircle className="h-4 w-4 text-green-500" />} label="Resolved" value={stats.resolved} />
      <StatCard icon={<Flag className="h-4 w-4 text-gray-500" />} label="Dismissed" value={stats.dismissed} />
      <StatCard
        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        label="High Severity"
        value={stats.highSeverity}
      />
    </div>
  )
})

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="bg-background">
      <CardContent className="flex items-center gap-2 p-2">
        {icon}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      </CardContent>
    </Card>
  )
}

