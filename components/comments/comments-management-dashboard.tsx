"use client"

import { useState, useEffect } from "react"
import { CommentsList } from "@/components/comments/comments-list"
import { CommentDetail } from "@/components/comments/comment-detail"
import { CommentsDashboardHeader } from "@/components/comments/comments-dashboard-header"
import { CommentsDashboardStats } from "@/components/comments/comments-dashboard-stats"
import { CommentsBulkActions } from "@/components/comments/comments-bulk-actions"
import { CommentFilters } from "@/components/comments/comment-filters"
import { useToast } from "@/hooks/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/ui/loading-state"
import { ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Import sample data
import { commentsData, repliesData, getCommentStatistics } from "@/components/comments/comments-data"

export function CommentsManagementDashboard() {
  // State for comments and UI
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState([])
  const [selectedComment, setSelectedComment] = useState(null)
  const [selectedComments, setSelectedComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [flaggedCount, setFlaggedCount] = useState(0)
  const [spamCount, setSpamCount] = useState(0)
  const [statistics, setStatistics] = useState(null)

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    dateRange: "all",
    story: "all",
    author: "all",
    sortBy: "newest",
  })

  // Responsive state
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mobileView, setMobileView] = useState("list") // "list" or "detail"

  const { toast } = useToast()

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setComments(commentsData)
      setReplies(repliesData)

      // Calculate counts
      const pending = commentsData.filter((c) => c.status === "pending").length
      const flagged = commentsData.filter((c) => c.status === "flagged").length
      const spam = commentsData.filter((c) => c.status === "spam").length

      setPendingCount(pending)
      setFlaggedCount(flagged)
      setSpamCount(spam)

      // Get statistics
      setStatistics(getCommentStatistics())

      setIsLoading(false)
    }

    loadData()
  }, [])

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Simulate new comment
    const newComment = {
      id: Date.now(),
      content: "I just discovered this amazing story! Thank you for sharing these memories.",
      author: "NewVisitor",
      authorEmail: "visitor@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date().toISOString(),
      status: "pending",
      story: "Summer Vacation 1985",
      flags: 0,
      likes: 0,
      replies: 0,
    }

    setComments((prev) => [newComment, ...prev])
    setPendingCount((prev) => prev + 1)

    toast({
      title: "Comments refreshed",
      description: "New comments have been loaded",
    })

    setRefreshing(false)
  }

  // Handle comment status change
  const handleStatusChange = (commentId, newStatus) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, status: newStatus } : comment)),
    )

    // Update selected comment if it's the one being changed
    if (selectedComment && selectedComment.id === commentId) {
      setSelectedComment((prev) => ({ ...prev, status: newStatus }))
    }

    // Update counts
    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
      if (comment.status === "pending") {
        setPendingCount((prev) => Math.max(0, prev - 1))
      } else if (comment.status === "flagged") {
        setFlaggedCount((prev) => Math.max(0, prev - 1))
      } else if (comment.status === "spam") {
        setSpamCount((prev) => Math.max(0, prev - 1))
      }

      if (newStatus === "pending") {
        setPendingCount((prev) => prev + 1)
      } else if (newStatus === "flagged") {
        setFlaggedCount((prev) => prev + 1)
      } else if (newStatus === "spam") {
        setSpamCount((prev) => prev + 1)
      }
    }

    // Show toast notification
    const statusMessages = {
      approved: "Comment approved and published",
      pending: "Comment marked as pending review",
      flagged: "Comment flagged for review",
      spam: "Comment marked as spam",
      deleted: "Comment deleted",
    }

    toast({
      title: `Comment ${newStatus}`,
      description: statusMessages[newStatus] || `Comment status changed to ${newStatus}`,
    })
  }

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedComments.length === 0) return

    let pendingReduction = 0
    let flaggedReduction = 0
    let spamReduction = 0

    if (action === "approve" || action === "reject" || action === "spam" || action === "delete") {
      const newStatus = {
        approve: "approved",
        reject: "flagged",
        spam: "spam",
        delete: "deleted",
      }[action]

      // Count reductions for each status
      selectedComments.forEach((id) => {
        const comment = comments.find((c) => c.id === id)
        if (comment) {
          if (comment.status === "pending") pendingReduction++
          if (comment.status === "flagged") flaggedReduction++
          if (comment.status === "spam") spamReduction++
        }
      })

      if (action === "delete") {
        // Remove comments
        setComments((prev) => prev.filter((comment) => !selectedComments.includes(comment.id)))

        if (selectedComment && selectedComments.includes(selectedComment.id)) {
          setSelectedComment(null)
        }
      } else {
        // Update comment statuses
        setComments((prev) =>
          prev.map((comment) => (selectedComments.includes(comment.id) ? { ...comment, status: newStatus } : comment)),
        )

        // Update selected comment if it's in the selection
        if (selectedComment && selectedComments.includes(selectedComment.id)) {
          setSelectedComment((prev) => ({ ...prev, status: newStatus }))
        }
      }

      // Update counts
      setPendingCount((prev) => Math.max(0, prev - pendingReduction))
      setFlaggedCount((prev) => Math.max(0, prev - flaggedReduction))
      setSpamCount((prev) => Math.max(0, prev - spamReduction))

      if (action === "reject") {
        setFlaggedCount((prev) => prev + selectedComments.length)
      } else if (action === "spam") {
        setSpamCount((prev) => prev + selectedComments.length)
      }

      // Show toast notification
      const actionMessages = {
        approve: "Comments approved",
        reject: "Comments rejected",
        spam: "Comments marked as spam",
        delete: "Comments deleted",
      }

      toast({
        title: actionMessages[action],
        description: `${selectedComments.length} comments have been ${action === "delete" ? "deleted" : "updated"}`,
      })

      // Clear selection
      setSelectedComments([])
    }
  }

  // Handle adding a reply
  const handleAddReply = (commentId, replyContent) => {
    const newReply = {
      id: Date.now(),
      parentId: commentId,
      content: replyContent,
      author: "Moderator",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date().toISOString(),
      isAuthor: false,
      isModerator: true,
    }

    setReplies((prev) => [...prev, newReply])

    // Update reply count for the comment
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, replies: comment.replies + 1 } : comment)),
    )

    if (selectedComment && selectedComment.id === commentId) {
      setSelectedComment((prev) => ({ ...prev, replies: prev.replies + 1 }))
    }

    toast({
      title: "Reply added",
      description: "Your reply has been added to the comment",
    })
  }

  // Handle comment deletion
  const handleDeleteComment = (commentId) => {
    // Find comment to determine its status for count updates
    const comment = comments.find((c) => c.id === commentId)

    // Remove comment
    setComments((prev) => prev.filter((c) => c.id !== commentId))

    // Update selected comment if it's the one being deleted
    if (selectedComment && selectedComment.id === commentId) {
      setSelectedComment(null)
    }

    // Update counts
    if (comment) {
      if (comment.status === "pending") {
        setPendingCount((prev) => Math.max(0, prev - 1))
      } else if (comment.status === "flagged") {
        setFlaggedCount((prev) => Math.max(0, prev - 1))
      } else if (comment.status === "spam") {
        setSpamCount((prev) => Math.max(0, prev - 1))
      }
    }

    toast({
      title: "Comment deleted",
      description: "The comment has been permanently deleted",
    })
  }

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)

    // Update status filter based on tab
    if (value === "all") {
      handleFilterChange({ status: "all" })
    } else if (value === "pending") {
      handleFilterChange({ status: "pending" })
    } else if (value === "approved") {
      handleFilterChange({ status: "approved" })
    } else if (value === "flagged") {
      handleFilterChange({ status: "flagged" })
    } else if (value === "spam") {
      handleFilterChange({ status: "spam" })
    }
  }

  // Handle comment selection
  const handleCommentSelect = (comment) => {
    setSelectedComment(comment)
    if (isMobile) {
      setMobileView("detail")
    }
  }

  // Handle back to list on mobile
  const handleBackToList = () => {
    setMobileView("list")
    setSelectedComment(null)
  }

  // Get comment replies
  const getCommentReplies = (commentId) => {
    return replies.filter((reply) => reply.parentId === commentId)
  }

  // Render the dashboard
  return (
    <div className="space-y-4">
      {/* Dashboard Stats */}
      <CommentsDashboardStats
        statistics={statistics}
        pendingCount={pendingCount}
        flaggedCount={flaggedCount}
        spamCount={spamCount}
        isLoading={isLoading}
      />

      {/* Main Dashboard */}
      <Card className="overflow-hidden border-muted">
        {/* Dashboard Header */}
        <CommentsDashboardHeader
          pendingCount={pendingCount}
          flaggedCount={flaggedCount}
          spamCount={spamCount}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />

        {/* Tabs Navigation */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="px-4 pt-2 pb-0 border-b">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {pendingCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
              <TabsTrigger value="spam">Spam</TabsTrigger>
            </TabsList>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-b"
              >
                <CommentFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  stories={Array.from(new Set(comments.map((c) => c.story)))}
                  authors={Array.from(new Set(comments.map((c) => c.author)))}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Actions */}
          <AnimatePresence>
            {selectedComments.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-b"
              >
                <CommentsBulkActions
                  selectedCount={selectedComments.length}
                  onAction={handleBulkAction}
                  onClearSelection={() => setSelectedComments([])}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <TabsContent value={activeTab} className="m-0 p-0">
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <LoadingState text="Loading comments..." />
              </div>
            ) : (
              <>
                {/* Mobile View */}
                {isMobile && (
                  <>
                    {mobileView === "list" ? (
                      <CommentsList
                        comments={comments}
                        filters={filters}
                        activeTab={activeTab}
                        selectedComments={selectedComments}
                        onSelectComment={handleCommentSelect}
                        onToggleSelection={(id) => {
                          setSelectedComments((prev) =>
                            prev.includes(id) ? prev.filter((commentId) => commentId !== id) : [...prev, id],
                          )
                        }}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteComment}
                      />
                    ) : (
                      <div className="p-4">
                        <Button variant="outline" size="sm" onClick={handleBackToList} className="mb-4">
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Back to List
                        </Button>

                        {selectedComment && (
                          <CommentDetail
                            comment={selectedComment}
                            replies={getCommentReplies(selectedComment.id)}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDeleteComment}
                            onAddReply={(content) => handleAddReply(selectedComment.id, content)}
                          />
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Desktop View */}
                {!isMobile && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[600px]">
                    <div className="col-span-1 lg:col-span-2 border-r overflow-hidden">
                      <CommentsList
                        comments={comments}
                        filters={filters}
                        activeTab={activeTab}
                        selectedComments={selectedComments}
                        onSelectComment={handleCommentSelect}
                        onToggleSelection={(id) => {
                          setSelectedComments((prev) =>
                            prev.includes(id) ? prev.filter((commentId) => commentId !== id) : [...prev, id],
                          )
                        }}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteComment}
                        selectedCommentId={selectedComment?.id}
                      />
                    </div>

                    <div className="hidden md:block md:col-span-1 overflow-hidden">
                      {selectedComment ? (
                        <CommentDetail
                          comment={selectedComment}
                          replies={getCommentReplies(selectedComment.id)}
                          onStatusChange={handleStatusChange}
                          onDelete={handleDeleteComment}
                          onAddReply={(content) => handleAddReply(selectedComment.id, content)}
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center p-6 text-center">
                          <div className="max-w-md space-y-2">
                            <h3 className="text-lg font-medium">No Comment Selected</h3>
                            <p className="text-sm text-muted-foreground">
                              Select a comment from the list to view details, reply, or take moderation actions.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

