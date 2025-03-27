"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ReportedCommentsList } from "./reported-comments-list"
import { ReportDetailsPanel } from "./report-details-panel"
import { ReportFilters } from "./report-filters"
import { ReportStats } from "./report-stats"
import { useReportedComments } from "./hooks/use-reported-comments"
import type { ReportStatus, ReportSeverity, ReportType } from "@/types/comments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function CommentReporting() {
  const router = useRouter()
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<ReportStatus>("pending")
  const [filters, setFilters] = useState({
    severity: [] as ReportSeverity[],
    type: [] as ReportType[],
    dateRange: { from: null, to: null } as { from: Date | null; to: Date | null },
    searchTerm: "",
  })

  const {
    reports,
    isLoading,
    error,
    stats,
    handleResolveReport,
    handleDismissReport,
    handleDeleteComment,
    handleBanUser,
    refetch,
  } = useReportedComments(currentTab, filters)

  const handleTabChange = useCallback((value: string) => {
    setCurrentTab(value as ReportStatus)
    setSelectedReportId(null)
  }, [])

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters)
    setSelectedReportId(null)
  }, [])

  const selectedReport = selectedReportId ? reports.find((report) => report.id === selectedReportId) : null

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px]">
        <p className="text-destructive mb-4">Failed to load reported comments</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="md:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Comment Reports</h1>
          <ReportStats stats={stats} />
        </div>

        <ReportFilters filters={filters} onFilterChange={handleFilterChange} />

        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
          </TabsList>

          <TabsContent value={currentTab} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ReportedCommentsList
                reports={reports}
                selectedReportId={selectedReportId}
                onSelectReport={setSelectedReportId}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="md:col-span-1">
        {selectedReport ? (
          <ReportDetailsPanel
            report={selectedReport}
            onResolve={handleResolveReport}
            onDismiss={handleDismissReport}
            onDeleteComment={handleDeleteComment}
            onBanUser={handleBanUser}
          />
        ) : (
          <div className="border rounded-lg p-6 h-full flex items-center justify-center bg-muted/30">
            <p className="text-muted-foreground text-center">Select a report to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentReporting

