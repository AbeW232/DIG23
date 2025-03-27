"use client"

import { memo } from "react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ReportedComment } from "@/types/comments"
import { cn } from "@/lib/utils"
import { AlertTriangle, Flag, MessageSquare, User } from "lucide-react"

interface ReportedCommentsListProps {
  reports: ReportedComment[]
  selectedReportId: string | null
  onSelectReport: (id: string) => void
}

export const ReportedCommentsList = memo(function ReportedCommentsList({
  reports,
  selectedReportId,
  onSelectReport,
}: ReportedCommentsListProps) {
  if (reports.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No reports found</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[600px] rounded-md border">
      <div className="divide-y">
        {reports.map((report) => (
          <div
            key={report.id}
            className={cn(
              "p-4 cursor-pointer hover:bg-accent/50 transition-colors",
              selectedReportId === report.id && "bg-accent",
            )}
            onClick={() => onSelectReport(report.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium truncate max-w-[200px]">
                  {report.comment.text.substring(0, 50)}
                  {report.comment.text.length > 50 ? "..." : ""}
                </span>
              </div>
              <SeverityBadge severity={report.severity} />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <User className="h-3 w-3" />
              <span>{report.comment.author.name}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
              </span>
              <span className="text-muted-foreground">{report.reportCount > 1 && `${report.reportCount} reports`}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
})

function SeverityBadge({ severity }: { severity: string }) {
  switch (severity) {
    case "high":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          High
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-amber-500">
          <Flag className="h-3 w-3" />
          Medium
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <Flag className="h-3 w-3" />
          Low
        </Badge>
      )
  }
}

