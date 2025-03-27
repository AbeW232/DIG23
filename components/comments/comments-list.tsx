"use client"

import { useMemo } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmptyState } from "@/components/ui/empty-state"
import { CheckCircle, Clock, Flag, MessageSquare, MoreHorizontal, ThumbsUp, Trash2, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { format, formatDistanceToNow } from "date-fns"

export function CommentsList({
  comments,
  filters,
  activeTab,
  selectedComments,
  onSelectComment,
  onToggleSelection,
  onStatusChange,
  onDelete,
  selectedCommentId,
}) {
  // Filter and sort comments based on filters
  const filteredComments = useMemo(() => {
    return comments
      .filter((comment) => {
        // Status filter
        if (filters.status !== "all" && comment.status !== filters.status) {
          return false
        }

        // Search filter
        if (
          filters.search &&
          !comment.content.toLowerCase().includes(filters.search.toLowerCase()) &&
          !comment.author.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false
        }

        // Story filter
        if (filters.story !== "all" && comment.story !== filters.story) {
          return false
        }

        // Author filter
        if (filters.author !== "all" && comment.author !== filters.author) {
          return false
        }

        // Date range filter
        if (filters.dateRange !== "all") {
          const commentDate = new Date(comment.date)
          const now = new Date()

          if (filters.dateRange === "today") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (commentDate < today) return false
          } else if (filters.dateRange === "week") {
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)
            if (commentDate < weekAgo) return false
          } else if (filters.dateRange === "month") {
            const monthAgo = new Date()
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            if (commentDate < monthAgo) return false
          } else if (filters.dateRange === "custom" && filters.dateFrom && filters.dateTo) {
            const from = new Date(filters.dateFrom)
            const to = new Date(filters.dateTo)
            to.setHours(23, 59, 59, 999) // Include the entire "to" day

            if (commentDate < from || commentDate > to) return false
          }
        }

        return true
      })
      .sort((a, b) => {
        // Sort based on selected sort option
        if (filters.sortBy === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        } else if (filters.sortBy === "oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        } else if (filters.sortBy === "likes") {
          return b.likes - a.likes
        } else if (filters.sortBy === "replies") {
          return b.replies - a.replies
        } else if (filters.sortBy === "flags") {
          return b.flags - a.flags
        }
        return 0
      })
  }, [comments, filters])

  // Get status badge
  const getStatusBadge = (status, flags = 0) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "flagged":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <Flag className="h-3 w-3 mr-1" />
            Flagged
          </Badge>
        )
      case "spam":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Spam
          </Badge>
        )
      default:
        return null
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

  // Animation variants
  const commentVariants = {
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
    <ScrollArea className="h-full">
      {filteredComments.length > 0 ? (
        <div className="divide-y">
          <AnimatePresence initial={false}>
            {filteredComments.map((comment, i) => (
              <motion.div
                key={comment.id}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={commentVariants}
                layoutId={`comment-${comment.id}`}
                className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                  selectedCommentId === comment.id ? "bg-muted/50" : ""
                }`}
                onClick={() => onSelectComment(comment)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <Checkbox
                      checked={selectedComments.includes(comment.id)}
                      onCheckedChange={() => onToggleSelection(comment.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                  </div>

                  <Avatar className="h-10 w-10 border-2 border-background shadow-sm flex-shrink-0">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {comment.author.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">{comment.author}</div>
                      <div className="flex items-center gap-2">{getStatusBadge(comment.status, comment.flags)}</div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      On "<span className="font-medium text-foreground/80 truncate">{comment.story}</span>" •{" "}
                      {formatDate(comment.date)}
                    </div>

                    <p className="text-sm line-clamp-2">{comment.content}</p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {comment.replies}
                        </div>
                        {comment.flags > 0 && (
                          <div className="flex items-center text-red-600">
                            <Flag className="h-3 w-3 mr-1" />
                            {comment.flags}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[180px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                onStatusChange(comment.id, "approved")
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                onStatusChange(comment.id, "flagged")
                              }}
                            >
                              <Flag className="mr-2 h-4 w-4 text-red-500" />
                              <span>Flag</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                onStatusChange(comment.id, "spam")
                              }}
                            >
                              <AlertTriangle className="mr-2 h-4 w-4 text-gray-500" />
                              <span>Mark as Spam</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(comment.id)
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState
          icon={<MessageSquare className="h-10 w-10 text-muted-foreground/30" />}
          title="No comments found"
          description="No comments match your current filters. Try adjusting your search criteria or check back later."
          className="h-[400px]"
        />
      )}
    </ScrollArea>
  )
}

