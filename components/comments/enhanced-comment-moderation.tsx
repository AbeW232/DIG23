"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle,
  Clock,
  Filter,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Reply,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  Trash2,
  XCircle,
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

// Sample data for comments
const commentsData = [
  {
    id: 1,
    content: "This is such a beautiful story! It reminds me of my own grandmother's stories about her childhood.",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-15T14:30:00",
    status: "approved",
    story: "Family Vacation Memories",
    flags: 0,
    likes: 12,
    replies: 2,
  },
  {
    id: 2,
    content:
      "I'm not sure if this is historically accurate. My grandfather told me a different version of these events.",
    author: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-14T09:15:00",
    status: "pending",
    story: "World War II Memories",
    flags: 0,
    likes: 3,
    replies: 0,
  },
  {
    id: 3,
    content: "This is completely inappropriate content and should be removed immediately.",
    author: "Anonymous User",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-13T22:45:00",
    status: "flagged",
    story: "College Years",
    flags: 3,
    likes: 0,
    replies: 1,
  },
  {
    id: 4,
    content: "Thank you for sharing this beautiful memory. It brought tears to my eyes.",
    author: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-12T16:20:00",
    status: "approved",
    story: "Grandmother's Recipe",
    flags: 0,
    likes: 8,
    replies: 3,
  },
  {
    id: 5,
    content: "I disagree with some points in this story, but I appreciate the perspective.",
    author: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-11T11:05:00",
    status: "pending",
    story: "Political Memories",
    flags: 1,
    likes: 2,
    replies: 0,
  },
  {
    id: 6,
    content: "This content contains offensive language and should be reviewed.",
    author: "Robert Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-10T08:30:00",
    status: "flagged",
    story: "High School Memories",
    flags: 2,
    likes: 1,
    replies: 0,
  },
  {
    id: 7,
    content: "I love how you've captured the essence of that era. The details are so vivid!",
    author: "Jennifer Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-09T19:45:00",
    status: "approved",
    story: "1960s Childhood",
    flags: 0,
    likes: 15,
    replies: 4,
  },
  {
    id: 8,
    content: "Could you share more details about the location? I think my family visited the same place.",
    author: "Thomas Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-08T13:20:00",
    status: "pending",
    story: "Summer Vacation 1985",
    flags: 0,
    likes: 5,
    replies: 1,
  },
]

// Sample data for replies
const repliesData = [
  {
    id: 101,
    parentId: 1,
    content: "Thank you so much! I'm glad it resonated with you.",
    author: "Memory Keeper",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-15T15:10:00",
    isAuthor: true,
  },
  {
    id: 102,
    parentId: 1,
    content: "Would you be willing to share some of your grandmother's stories too?",
    author: "Memory Keeper",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-15T15:12:00",
    isAuthor: true,
  },
  {
    id: 103,
    parentId: 3,
    content: "Thank you for flagging this. We'll review it promptly.",
    author: "Moderator",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-13T23:15:00",
    isAuthor: false,
    isModerator: true,
  },
  {
    id: 104,
    parentId: 4,
    content: "I'm touched that it moved you so much. These memories are precious to me.",
    author: "Memory Keeper",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-12T17:05:00",
    isAuthor: true,
  },
  {
    id: 105,
    parentId: 4,
    content: "Did your grandmother have a similar recipe? I'd love to compare notes!",
    author: "Memory Keeper",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-12T17:08:00",
    isAuthor: true,
  },
  {
    id: 106,
    parentId: 4,
    content: "Yes, she did! Her secret ingredient was a pinch of cardamom.",
    author: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-12T18:30:00",
    isAuthor: false,
  },
  {
    id: 107,
    parentId: 7,
    content: "Thank you! I spent a lot of time going through old photos to get the details right.",
    author: "Memory Keeper",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-09T20:15:00",
    isAuthor: true,
  },
  {
    id: 108,
    parentId: 7,
    content: "The colors in those old Kodak photos really capture the mood of that time.",
    author: "Jennifer Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-09T20:45:00",
    isAuthor: false,
  },
  {
    id: 109,
    parentId: 7,
    content: "Did you use any special techniques to restore the old photos?",
    author: "PhotoEnthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-10T09:30:00",
    isAuthor: false,
  },
  {
    id: 110,
    parentId: 7,
    content: "I'd love to know more about the music you mentioned from that era.",
    author: "MusicLover",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-10T11:15:00",
    isAuthor: false,
  },
  {
    id: 111,
    parentId: 8,
    content: "It was at Lake Winnipesaukee in New Hampshire. Did your family visit there too?",
    author: "Memory Keeper",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-08T14:10:00",
    isAuthor: true,
  },
]

export function EnhancedCommentModeration({ pendingCount, setPendingCount }) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComments, setSelectedComments] = useState([])
  const [selectedComment, setSelectedComment] = useState(null)
  const [sortOrder, setSortOrder] = useState("newest")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [replyText, setReplyText] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [dateRangeFilter, setDateRangeFilter] = useState("all")
  const [storyFilter, setStoryFilter] = useState("all")
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState([])
  const [isReplying, setIsReplying] = useState(false)
  const [viewMode, setViewMode] = useState("list")
  const [isViewingDetails, setIsViewingDetails] = useState(false)

  const { toast } = useToast()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setComments(commentsData)
      setReplies(repliesData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter comments based on active tab, search query, and filters
  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      const matchesSearch =
        comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.story.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || comment.status === statusFilter

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "pending" && comment.status === "pending") ||
        (activeTab === "approved" && comment.status === "approved") ||
        (activeTab === "flagged" && (comment.status === "flagged" || comment.flags > 0))

      const matchesStory = storyFilter === "all" || comment.story === storyFilter

      // Date range filtering
      let matchesDateRange = true
      const commentDate = new Date(comment.date)
      const now = new Date()

      if (dateRangeFilter === "today") {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        matchesDateRange = commentDate >= today
      } else if (dateRangeFilter === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        matchesDateRange = commentDate >= weekAgo
      } else if (dateRangeFilter === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        matchesDateRange = commentDate >= monthAgo
      }

      return matchesSearch && matchesStatus && matchesTab && matchesStory && matchesDateRange
    })
  }, [comments, activeTab, searchQuery, statusFilter, storyFilter, dateRangeFilter])

  // Sort comments
  const sortedComments = useMemo(() => {
    return [...filteredComments].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortOrder === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortOrder === "likes") {
        return b.likes - a.likes
      } else if (sortOrder === "flags") {
        return b.flags - a.flags
      } else if (sortOrder === "replies") {
        return b.replies - a.replies
      }
      return 0
    })
  }, [filteredComments, sortOrder])

  // Get unique stories for filter
  const uniqueStories = useMemo(() => {
    return ["all", ...new Set(comments.map((comment) => comment.story))]
  }, [comments])

  // Get replies for selected comment
  const commentReplies = useMemo(() => {
    return replies.filter((reply) => selectedComment && reply.parentId === selectedComment.id)
  }, [replies, selectedComment])

  // Toggle comment selection
  const toggleCommentSelection = (id) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id))
    } else {
      setSelectedComments([...selectedComments, id])
    }
  }

  // Select all comments
  const selectAllComments = () => {
    if (selectedComments.length === sortedComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(sortedComments.map((comment) => comment.id))
    }
  }

  // Handle comment approval
  const handleApproveComment = (id) => {
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, status: "approved" } : comment)))

    if (selectedComment && selectedComment.id === id) {
      setSelectedComment((prev) => ({ ...prev, status: "approved" }))
    }

    // Update pending count if the comment was pending
    const comment = comments.find((c) => c.id === id)
    if (comment && comment.status === "pending") {
      setPendingCount((prev) => Math.max(0, prev - 1))
    }

    toast({
      title: "Comment approved",
      description: "The comment has been approved and published",
    })
  }

  // Handle comment rejection
  const handleRejectComment = (id) => {
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, status: "flagged" } : comment)))

    if (selectedComment && selectedComment.id === id) {
      setSelectedComment((prev) => ({ ...prev, status: "flagged" }))
    }

    // Update pending count if the comment was pending
    const comment = comments.find((c) => c.id === id)
    if (comment && comment.status === "pending") {
      setPendingCount((prev) => Math.max(0, prev - 1))
    }

    toast({
      title: "Comment rejected",
      description: "The comment has been rejected and hidden",
    })
  }

  // Handle comment deletion
  const handleDeleteComment = (id) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id))

    if (selectedComment && selectedComment.id === id) {
      setSelectedComment(null)
    }

    // Update pending count if the comment was pending
    const comment = comments.find((c) => c.id === id)
    if (comment && comment.status === "pending") {
      setPendingCount((prev) => Math.max(0, prev - 1))
    }

    toast({
      title: "Comment deleted",
      description: "The comment has been permanently deleted",
    })
  }

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedComments.length === 0) return

    let pendingReduction = 0

    if (action === "approve") {
      setComments((prev) =>
        prev.map((comment) => (selectedComments.includes(comment.id) ? { ...comment, status: "approved" } : comment)),
      )

      // Count how many pending comments were approved
      pendingReduction = comments.filter((c) => selectedComments.includes(c.id) && c.status === "pending").length

      toast({
        title: "Comments approved",
        description: `${selectedComments.length} comments have been approved`,
      })
    } else if (action === "reject") {
      setComments((prev) =>
        prev.map((comment) => (selectedComments.includes(comment.id) ? { ...comment, status: "flagged" } : comment)),
      )

      // Count how many pending comments were rejected
      pendingReduction = comments.filter((c) => selectedComments.includes(c.id) && c.status === "pending").length

      toast({
        title: "Comments rejected",
        description: `${selectedComments.length} comments have been rejected`,
      })
    } else if (action === "delete") {
      setComments((prev) => prev.filter((comment) => !selectedComments.includes(comment.id)))

      if (selectedComment && selectedComments.includes(selectedComment.id)) {
        setSelectedComment(null)
      }

      // Count how many pending comments were deleted
      pendingReduction = comments.filter((c) => selectedComments.includes(c.id) && c.status === "pending").length

      toast({
        title: "Comments deleted",
        description: `${selectedComments.length} comments have been deleted`,
      })
    }

    // Update pending count
    if (pendingReduction > 0) {
      setPendingCount((prev) => Math.max(0, prev - pendingReduction))
    }

    setSelectedComments([])
  }

  // Handle reply submission
  const handleSubmitReply = () => {
    if (!replyText.trim() || !selectedComment) return

    const newReply = {
      id: Date.now(),
      parentId: selectedComment.id,
      content: replyText,
      author: "Memory Keeper",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date().toISOString(),
      isAuthor: true,
    }

    setReplies((prev) => [...prev, newReply])

    // Update reply count for the comment
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === selectedComment.id ? { ...comment, replies: comment.replies + 1 } : comment,
      ),
    )

    if (selectedComment) {
      setSelectedComment((prev) => ({ ...prev, replies: prev.replies + 1 }))
    }

    setReplyText("")
    setIsReplying(false)

    toast({
      title: "Reply submitted",
      description: "Your reply has been added to the comment",
    })
  }

  // Get status badge
  const getStatusBadge = (status, flags = 0) => {
    if (status === "approved") {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 transition-all">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    } else if (status === "pending") {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 transition-all">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      )
    } else if (status === "flagged" || flags > 0) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 transition-all">
          <Flag className="h-3 w-3 mr-1" />
          {status === "flagged" ? "Flagged" : `${flags} Flags`}
        </Badge>
      )
    }
    return null
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

  // Card animation variants
  const cardVariants = {
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
      <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">All Comments</TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingCount > 0 && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {pendingCount}
                  </Badge>
                </motion.div>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search comments..."
                className="pl-8 w-full sm:w-[250px] transition-all focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="likes">Most Likes</SelectItem>
                  <SelectItem value="flags">Most Flags</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
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
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="mb-4 border-dashed">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="flagged">Flagged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-filter">Date Range</Label>
                      <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
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
                    <div className="space-y-2">
                      <Label htmlFor="story-filter">Story</Label>
                      <Select value={storyFilter} onValueChange={setStoryFilter}>
                        <SelectTrigger id="story-filter">
                          <SelectValue placeholder="Filter by story" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueStories.map((story) => (
                            <SelectItem key={story} value={story}>
                              {story === "all" ? "All Stories" : story}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <Card className="border-muted">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Comments</CardTitle>
                    <CardDescription>Review and moderate user comments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedComments.length === 0}
                      onClick={() => handleBulkAction("approve")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={selectedComments.length === 0}
                      onClick={() => handleBulkAction("reject")}
                    >
                      <XCircle className="h-4 w-4 mr-2 text-red-600" />
                      Reject
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <SlidersHorizontal className="h-4 w-4 mr-2" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={selectAllComments} className="cursor-pointer">
                          {selectedComments.length === sortedComments.length ? "Deselect All" : "Select All"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBulkAction("delete")}
                          disabled={selectedComments.length === 0}
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  {isLoading ? (
                    <div className="space-y-4 p-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex gap-2">
                              <Skeleton className="h-3 w-16" />
                              <Skeleton className="h-3 w-16" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : sortedComments.length > 0 ? (
                    <AnimatePresence>
                      {sortedComments.map((comment, i) => (
                        <motion.div
                          key={comment.id}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={cardVariants}
                          layoutId={`comment-${comment.id}`}
                          className={`border-b p-4 cursor-pointer hover:bg-muted/30 transition-colors ${
                            selectedComment && selectedComment.id === comment.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedComment(comment)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <Checkbox
                                checked={selectedComments.includes(comment.id)}
                                onCheckedChange={() => toggleCommentSelection(comment.id)}
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
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{comment.author}</div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(comment.status, comment.flags)}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                On "<span className="font-medium text-foreground/80">{comment.story}</span>" •{" "}
                                {formatDate(comment.date)}
                              </div>
                              <p className="text-sm py-1">{comment.content}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                                <div className="flex items-center">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.likes} likes
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="h-3 w-3 mr-1" />
                                  {comment.replies} replies
                                </div>
                                <div className="flex items-center gap-1 ml-auto">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 rounded-full"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleApproveComment(comment.id)
                                    }}
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 rounded-full"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRejectComment(comment.id)
                                    }}
                                  >
                                    <XCircle className="h-3.5 w-3.5 text-red-600" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <MessageCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">No Comments Found</h3>
                      <p className="text-sm text-muted-foreground mt-2 max-w-md">
                        No comments match your current filters. Try adjusting your search criteria or check back later.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {sortedComments.length} of {comments.length} comments
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="md:w-1/3">
            {selectedComment ? (
              <Card className="border-muted sticky top-4">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Comment Details</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleApproveComment(selectedComment.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span>Approve</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleRejectComment(selectedComment.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          <span>Reject</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Flag as Inappropriate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive cursor-pointer"
                          onClick={() => handleDeleteComment(selectedComment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>View and respond to this comment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                        <AvatarImage src={selectedComment.avatar} alt={selectedComment.author} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {selectedComment.author.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{selectedComment.author}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(selectedComment.date)}</div>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 bg-muted/30 mt-2">
                      <p>{selectedComment.content}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center">
                      <Label>Status</Label>
                      <Select
                        defaultValue={selectedComment.status}
                        onValueChange={(value) => {
                          if (value === "approved") {
                            handleApproveComment(selectedComment.id)
                          } else if (value === "flagged") {
                            handleRejectComment(selectedComment.id)
                          }
                        }}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="flagged">Flagged</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label className="flex items-center justify-between">
                      <span>Replies</span>
                      <span className="text-xs text-muted-foreground">{commentReplies.length} replies</span>
                    </Label>
                    <ScrollArea className="h-[200px] border rounded-md">
                      {commentReplies.length > 0 ? (
                        <div className="space-y-3 p-3">
                          <AnimatePresence>
                            {commentReplies.map((reply, i) => (
                              <motion.div
                                key={reply.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                              >
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={reply.avatar} alt={reply.author} />
                                  <AvatarFallback className="text-xs">{reply.author.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium">{reply.author}</div>
                                    {reply.isAuthor && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-primary/10 text-primary border-primary/20"
                                      >
                                        Author
                                      </Badge>
                                    )}
                                    {reply.isModerator && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                                      >
                                        Moderator
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm py-1">{reply.content}</p>
                                  <div className="text-xs text-muted-foreground">{formatDate(reply.date)}</div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                          No replies yet
                        </div>
                      )}
                    </ScrollArea>
                  </div>

                  <div className="space-y-2 pt-2">
                    {isReplying ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Label htmlFor="reply">Reply to Comment</Label>
                        <Textarea
                          id="reply"
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[100px] resize-none mt-2"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsReplying(false)
                              setReplyText("")
                            }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleSubmitReply}>
                            <Reply className="h-4 w-4 mr-1" />
                            Submit Reply
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <Button className="w-full" onClick={() => setIsReplying(true)}>
                        <Reply className="h-4 w-4 mr-1" />
                        Reply to Comment
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-muted">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium">No Comment Selected</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    Select a comment from the list to view details and reply.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="mt-6 border-muted">
              <CardHeader>
                <CardTitle>Comment Statistics</CardTitle>
                <CardDescription>Overview of comment activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">{comments.filter((c) => c.status === "approved").length}</div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">{comments.filter((c) => c.status === "pending").length}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">
                      {comments.filter((c) => c.status === "flagged" || c.flags > 0).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Flagged</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Comments today</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Comments this week</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average response time</span>
                      <span className="font-medium">3.5 hours</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

