"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Search,
  Shield,
  Trash,
  User,
  Plus,
  Filter,
  XCircle,
  Save,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { format, formatDistanceToNow } from "date-fns"

// Sample data for reported comments
const reportedCommentsData = [
  {
    id: 1,
    comment: "This is completely inappropriate and offensive content that should be removed immediately.",
    author: "user123",
    story: "Family Vacation Memories",
    reportedBy: "moderator1",
    reportReason: "Offensive content",
    reportDate: "2024-03-15T14:32:00",
    status: "pending",
    flags: 3,
  },
  {
    id: 2,
    comment: "Check out this amazing deal at www.suspicious-link.com! Best prices guaranteed!",
    author: "newuser456",
    story: "Childhood Memories",
    reportedBy: "user789",
    reportReason: "Spam",
    reportDate: "2024-03-14T09:15:00",
    status: "pending",
    flags: 2,
  },
  {
    id: 3,
    comment: "I disagree with your perspective on this family tradition.",
    author: "familymember",
    story: "Family Traditions",
    reportedBy: "user555",
    reportReason: "Disagreement",
    reportDate: "2024-03-13T16:45:00",
    status: "dismissed",
    flags: 1,
  },
  {
    id: 4,
    comment: "Your personal information is visible in this photo. Your address is 123 Main St...",
    author: "helpfuluser",
    story: "Our New Home",
    reportedBy: "privacyadvocate",
    reportReason: "Personal information",
    reportDate: "2024-03-12T11:30:00",
    status: "removed",
    flags: 2,
  },
  {
    id: 5,
    comment: "This comment contains threatening language that makes me uncomfortable.",
    author: "visitor789",
    story: "School Memories",
    reportedBy: "concerneduser",
    reportReason: "Threatening content",
    reportDate: "2024-03-10T13:20:00",
    status: "removed",
    flags: 4,
  },
]

export function EnhancedCommentReporting({ reportedCount, setReportedCount }) {
  const [activeTab, setActiveTab] = useState("reports")
  const [selectedReport, setSelectedReport] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [reportedComments, setReportedComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [moderatorNotes, setModeratorNotes] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [reasonFilter, setReasonFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const { toast } = useToast()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setReportedComments(reportedCommentsData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter reports based on search query and status filter
  const filteredReports = reportedComments.filter((report) => {
    const matchesSearch =
      report.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportReason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    const matchesReason =
      reasonFilter === "all" || report.reportReason.toLowerCase().includes(reasonFilter.toLowerCase())

    // Date filtering
    let matchesDate = true
    const reportDate = new Date(report.reportDate)
    const now = new Date()

    if (dateFilter === "today") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      matchesDate = reportDate >= today
    } else if (dateFilter === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      matchesDate = reportDate >= weekAgo
    } else if (dateFilter === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      matchesDate = reportDate >= monthAgo
    }

    return matchesSearch && matchesStatus && matchesReason && matchesDate
  })

  // Handle report actions
  const handleReportAction = (id, action) => {
    if (action === "dismiss") {
      setReportedComments((prev) =>
        prev.map((report) => (report.id === id ? { ...report, status: "dismissed" } : report)),
      )

      if (selectedReport && selectedReport.id === id) {
        setSelectedReport((prev) => ({ ...prev, status: "dismissed" }))
      }

      // Update reported count if the report was pending
      const report = reportedComments.find((r) => r.id === id)
      if (report && report.status === "pending") {
        setReportedCount((prev) => Math.max(0, prev - 1))
      }

      toast({
        title: "Report dismissed",
        description: "The report has been dismissed and the comment remains visible",
      })
    } else if (action === "remove") {
      setReportedComments((prev) =>
        prev.map((report) => (report.id === id ? { ...report, status: "removed" } : report)),
      )

      if (selectedReport && selectedReport.id === id) {
        setSelectedReport((prev) => ({ ...prev, status: "removed" }))
      }

      // Update reported count if the report was pending
      const report = reportedComments.find((r) => r.id === id)
      if (report && report.status === "pending") {
        setReportedCount((prev) => Math.max(0, prev - 1))
      }

      toast({
        title: "Comment removed",
        description: "The reported comment has been removed",
      })
    }
  }

  // Save moderator notes
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Moderator notes have been saved successfully",
    })
  }

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "removed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Removed
          </Badge>
        )
      case "dismissed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Dismissed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true })
    } else {
      return format(date, "MMM d, yyyy 'at' h:mm a")
    }
  }

  // Get unique report reasons
  const uniqueReasons = ["all", ...new Set(reportedComments.map((report) => report.reportReason))]

  // Animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reports" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="reports" className="relative">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span>Reported Comments</span>
              {reportedCount > 0 && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Badge variant="destructive" className="ml-1">
                    {reportedCount}
                  </Badge>
                </motion.div>
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Report Settings</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Reporting Analytics</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <TabsContent value="reports" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <CardTitle>Comment Reports</CardTitle>
                    <CardDescription>Review and manage reported comments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-auto">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="pl-8 w-full md:w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="removed">Removed</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6 pb-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4">
                      <div className="space-y-2">
                        <Label htmlFor="reason-filter">Report Reason</Label>
                        <Select value={reasonFilter} onValueChange={setReasonFilter}>
                          <SelectTrigger id="reason-filter">
                            <SelectValue placeholder="Filter by reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {uniqueReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason === "all" ? "All Reasons" : reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-filter">Date Range</Label>
                        <Select value={dateFilter} onValueChange={setDateFilter}>
                          <SelectTrigger id="date-filter">
                            <SelectValue placeholder="Filter by date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">Past Week</SelectItem>
                            <SelectItem value="month">Past Month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setReasonFilter("all")
                            setDateFilter("all")
                            setStatusFilter("all")
                            setSearchQuery("")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <CardContent>
                <div className="border rounded-md">
                  {isLoading ? (
                    <div className="p-4 space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-2">
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-20" />
                          </div>
                          <Skeleton className="h-12 w-full" />
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Comment</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence>
                          {filteredReports.length > 0 ? (
                            filteredReports.map((report, i) => (
                              <motion.tr
                                key={report.id}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={tableRowVariants}
                                className={selectedReport && selectedReport.id === report.id ? "bg-muted/50" : ""}
                              >
                                <TableCell className="max-w-[200px] truncate">{report.comment}</TableCell>
                                <TableCell>{report.author}</TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    {report.reportReason}
                                    {report.flags > 1 && (
                                      <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                                        {report.flags} flags
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(report.reportDate)}</TableCell>
                                <TableCell>{getStatusBadge(report.status)}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={() => setSelectedReport(report)}
                                        className="cursor-pointer"
                                      >
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>View Details</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleReportAction(report.id, "dismiss")}
                                        className="cursor-pointer"
                                        disabled={report.status !== "pending"}
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        <span>Dismiss Report</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleReportAction(report.id, "remove")}
                                        className="cursor-pointer"
                                        disabled={report.status !== "pending"}
                                      >
                                        <Trash className="mr-2 h-4 w-4" />
                                        <span>Remove Comment</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="cursor-pointer">
                                        <Shield className="mr-2 h-4 w-4" />
                                        <span>Ban User</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </motion.tr>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center">
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                  <Flag className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                  <h3 className="text-lg font-medium">No Reports Found</h3>
                                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                                    No reports match your current filters. Try adjusting your search criteria or check
                                    back later.
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredReports.length} of {reportedComments.length} reports
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {selectedReport && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Report Details</CardTitle>
                      <CardDescription>
                        Report #{selectedReport.id} - {selectedReport.reportReason}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Reported Comment</h3>
                      <div className="p-4 border rounded-md bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{selectedReport.author}</span>
                          <span className="text-xs text-muted-foreground">on {selectedReport.story}</span>
                        </div>
                        <p className="text-sm">{selectedReport.comment}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Report Information</h3>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Reported By:</span>
                            <span className="text-sm font-medium">{selectedReport.reportedBy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Report Date:</span>
                            <span className="text-sm font-medium">{formatDate(selectedReport.reportDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Reason:</span>
                            <span className="text-sm font-medium">{selectedReport.reportReason}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className="text-sm font-medium">{getStatusBadge(selectedReport.status)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Flags:</span>
                            <span className="text-sm font-medium">{selectedReport.flags}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Moderation Actions</h3>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Eye className="h-4 w-4 mr-2" />
                            View in Context
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleReportAction(selectedReport.id, "dismiss")}
                            disabled={selectedReport.status !== "pending"}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Dismiss Report
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-destructive"
                            onClick={() => handleReportAction(selectedReport.id, "remove")}
                            disabled={selectedReport.status !== "pending"}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Remove Comment
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message User
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Moderator Notes</h3>
                      <Textarea
                        placeholder="Add notes about this report..."
                        className="h-20"
                        value={moderatorNotes}
                        onChange={(e) => setModeratorNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedReport(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNotes}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Decision
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Report Settings</CardTitle>
                <CardDescription>Configure how users can report comments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="enable-reporting">Enable Comment Reporting</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="enable-reporting">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users can report comments</SelectItem>
                      <SelectItem value="registered">Only registered users can report</SelectItem>
                      <SelectItem value="trusted">Only trusted users can report</SelectItem>
                      <SelectItem value="disabled">Disable comment reporting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Report Reasons</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2 pr-4">
                        {[
                          "Spam or advertising",
                          "Offensive content",
                          "Harassment or bullying",
                          "Misinformation",
                          "Personal information",
                          "Threatening content",
                          "Other",
                        ].map((reason, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center justify-between"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center gap-2">
                              <Flag className="h-4 w-4 text-muted-foreground" />
                              <span>{reason}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Report Reason
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-message">Custom Report Message</Label>
                  <Textarea
                    id="custom-message"
                    placeholder="Enter a message to show users when they report a comment"
                    defaultValue="Thank you for helping keep our community safe. Our moderators will review this report."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-threshold">Auto-hide Threshold</Label>
                  <Select defaultValue="3">
                    <SelectTrigger id="report-threshold">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="1">1 report</SelectItem>
                      <SelectItem value="3">3 reports</SelectItem>
                      <SelectItem value="5">5 reports</SelectItem>
                      <SelectItem value="10">10 reports</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Comments will be automatically hidden after receiving this many reports
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cooldown-period">Report Cooldown Period</Label>
                  <Select defaultValue="1h">
                    <SelectTrigger id="cooldown-period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No cooldown</SelectItem>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Time users must wait between submitting reports</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-limit">Daily Report Limit</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="report-limit">
                      <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                      <SelectItem value="5">5 reports</SelectItem>
                      <SelectItem value="10">10 reports</SelectItem>
                      <SelectItem value="20">20 reports</SelectItem>
                      <SelectItem value="50">50 reports</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Maximum number of reports a user can submit per day</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Reporting Analytics</CardTitle>
                <CardDescription>Insights into comment reporting patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    className="border rounded-md p-4"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Total Reports</h3>
                    </div>
                    <div className="text-3xl font-bold">127</div>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </motion.div>

                  <motion.div
                    className="border rounded-md p-4"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Avg. Response Time</h3>
                    </div>
                    <div className="text-3xl font-bold">4.2h</div>
                    <p className="text-sm text-muted-foreground">Time to resolution</p>
                  </motion.div>

                  <motion.div
                    className="border rounded-md p-4"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Action Rate</h3>
                    </div>
                    <div className="text-3xl font-bold">68%</div>
                    <p className="text-sm text-muted-foreground">Reports resulting in action</p>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Report Reasons Breakdown</h3>
                  <div className="border rounded-md p-4">
                    <div className="space-y-3">
                      {[
                        { reason: "Spam or advertising", count: 42, percentage: 33 },
                        { reason: "Offensive content", count: 35, percentage: 28 },
                        { reason: "Harassment or bullying", count: 18, percentage: 14 },
                        { reason: "Misinformation", count: 12, percentage: 9 },
                        { reason: "Personal information", count: 10, percentage: 8 },
                        { reason: "Threatening content", count: 6, percentage: 5 },
                        { reason: "Other", count: 4, percentage: 3 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.reason}</span>
                            <span className="font-medium">
                              {item.count} ({item.percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Report Resolution Outcomes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      className="border rounded-md p-4 text-center"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl font-bold text-red-600">42</div>
                      <div className="text-sm font-medium">Comments Removed</div>
                      <div className="text-xs text-muted-foreground">33% of reports</div>
                    </motion.div>

                    <motion.div
                      className="border rounded-md p-4 text-center"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl font-bold text-green-600">45</div>
                      <div className="text-sm font-medium">Reports Dismissed</div>
                      <div className="text-xs text-muted-foreground">35% of reports</div>
                    </motion.div>

                    <motion.div
                      className="border rounded-md p-4 text-center"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl font-bold text-yellow-600">40</div>
                      <div className="text-sm font-medium">Pending Review</div>
                      <div className="text-xs text-muted-foreground">32% of reports</div>
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Top Reported Users</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Reports</TableHead>
                          <TableHead>Action Rate</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { username: "user123", reports: 8, actionRate: "75%", status: "Active" },
                          { username: "newuser456", reports: 6, actionRate: "83%", status: "Warned" },
                          { username: "commenter789", reports: 5, actionRate: "40%", status: "Active" },
                          { username: "visitor321", reports: 4, actionRate: "50%", status: "Active" },
                          { username: "poster555", reports: 3, actionRate: "100%", status: "Banned" },
                        ].map((user, i) => (
                          <TableRow key={i}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.reports}</TableCell>
                            <TableCell>{user.actionRate}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  user.status === "Banned"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : user.status === "Warned"
                                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                      : "bg-green-50 text-green-700 border-green-200"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="ml-auto">
                  Download Full Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}

