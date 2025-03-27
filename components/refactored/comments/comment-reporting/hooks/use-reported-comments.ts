"use client"

import { useState, useEffect, useCallback } from "react"
import type { ReportedComment, ReportStatus, ReportSeverity, ReportType } from "@/types/comments"
import { fetchReportedComments, resolveReport, dismissReport, deleteComment, banUser } from "@/lib/api/comments"
import { useToast } from "@/hooks/use-toast"

interface ReportFilters {
  severity: ReportSeverity[]
  type: ReportType[]
  dateRange: { from: Date | null; to: Date | null }
  searchTerm: string
}

export function useReportedComments(status: ReportStatus, filters: ReportFilters) {
  const [reports, setReports] = useState<ReportedComment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [stats, setStats] = useState({
    pending: 0,
    resolved: 0,
    dismissed: 0,
    highSeverity: 0,
  })
  const { toast } = useToast()

  const fetchReports = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { reports, stats } = await fetchReportedComments(status, filters)
      setReports(reports)
      setStats(stats)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to load reported comments",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [status, filters, toast])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const handleResolveReport = async (id: string, notes: string) => {
    try {
      await resolveReport(id, notes)
      toast({
        title: "Report resolved",
        description: "The report has been marked as resolved",
      })
      fetchReports()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resolve report",
        variant: "destructive",
      })
    }
  }

  const handleDismissReport = async (id: string, notes: string) => {
    try {
      await dismissReport(id, notes)
      toast({
        title: "Report dismissed",
        description: "The report has been dismissed",
      })
      fetchReports()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to dismiss report",
        variant: "destructive",
      })
    }
  }

  const handleDeleteComment = async (id: string) => {
    try {
      await deleteComment(id)
      toast({
        title: "Comment deleted",
        description: "The comment has been permanently deleted",
      })
      fetchReports()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      })
    }
  }

  const handleBanUser = async (userId: string) => {
    try {
      await banUser(userId)
      toast({
        title: "User banned",
        description: "The user has been banned from commenting",
      })
      fetchReports()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to ban user",
        variant: "destructive",
      })
    }
  }

  return {
    reports,
    isLoading,
    error,
    stats,
    handleResolveReport,
    handleDismissReport,
    handleDeleteComment,
    handleBanUser,
    refetch: fetchReports,
  }
}

