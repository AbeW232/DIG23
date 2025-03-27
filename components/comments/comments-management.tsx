"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Filter,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Reply,
  Search,
  ThumbsUp,
  Trash2,
  XCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for comments
const comments = [
  {
    id: 1,
    author: "John Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "This story brought back so many memories of my own childhood. Thank you for sharing these precious moments with us.",
    date: "2024-03-20 14:32",
    story: "Childhood Memories",
    status: "approved",
    likes: 12,
    replies: 2,
    isReported: false,
  },
  {
    id: 2,
    author: "Sarah Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "I love the photos you included in this story. They really help bring the narrative to life!",
    date: "2024-03-19 10:15",
    story: "Family Vacation 1995",
    status: "approved",
    likes: 8,
    replies: 1,
    isReported: false,
  },
  {
    id: 3,
    author: "Michael Brown",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "This content is inappropriate and should be removed.",
    date: "2024-03-18 16:45",
    story: "Wedding Day",
    status: "flagged",
    likes: 0,
    replies: 0,
    isReported: true,
  },
  {
    id: 4,
    author: "Emily Davis",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Your grandmother's recipes remind me so much of my own family traditions. Would you mind sharing the full recipe for that apple pie?",
    date: "2024-03-17 09:45",
    story: "Family Recipes",
    status: "pending",
    likes: 3,
    replies: 0,
    isReported: false,
  },
  {
    id: 5,
    author: "Robert Wilson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "I think there might be a mistake in the date mentioned in the third paragraph. Wasn't the reunion in 1998, not 1997?",
    date: "2024-03-16 11:30",
    story: "Family Reunion",
    status: "approved",
    likes: 5,
    replies: 3,
    isReported: false,
  },
]

// Sample data for replies
const replies = [
  {
    id: 101,
    parentId: 1,
    author: "Jane Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "I'm so glad you enjoyed the story! It means a lot to hear that it resonated with you.",
    date: "2024-03-20 15:10",
    isAuthor: true,
  },
  {
    id: 102,
    parentId: 1,
    author: "Thomas Lee",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "I had a similar childhood experience. We should connect and share more stories!",
    date: "2024-03-20 16:25",
    isAuthor: false,
  },
  {
    id: 103,
    parentId: 2,
    author: "Jane Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "Thank you! I spent a lot of time selecting the right photos to include.",
    date: "2024-03-19 11:05",
    isAuthor: true,
  },
  {
    id: 104,
    parentId: 5,
    author: "Jane Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "You're absolutely right! It was 1998. I'll update the story. Thank you for catching that!",
    date: "2024-03-16 12:15",
    isAuthor: true,
  },
  {
    id: 105,
    parentId: 5,
    author: "Robert Wilson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "No problem! Happy to help preserve the accuracy of these important memories.",
    date: "2024-03-16 13:20",
    isAuthor: false,
  },
  {
    id: 106,
    parentId: 5,
    author: "Lisa Thompson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "I remember that reunion! It was definitely 1998 because that's the year I graduated college.",
    date: "2024-03-16 14:45",
    isAuthor: false,
  },
]

export function CommentsManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedComment, setSelectedComment] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [replyText, setReplyText] = useState("")

  // Filter comments based on search query and filters
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.story.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter || (statusFilter === "reported" && comment.isReported)

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && comment.status === "pending") ||
      (activeTab === "approved" && comment.status === "approved") ||
      (activeTab === "flagged" && (comment.status === "flagged" || comment.isReported))

    return matchesSearch && matchesStatus && matchesTab
  })

  // Get replies for selected comment
  const commentReplies = replies.filter((reply) => selectedComment !== null && reply.parentId === selectedComment)

  // Get selected comment
  const selectedCommentData =
    selectedComment !== null ? comments.find((comment) => comment.id === selectedComment) : null

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All Comments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search comments..."
              className="pl-8 w-full sm:w-[300px] transition-all focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <Card className="border-muted">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Manage and moderate comments on your stories</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`border-b p-4 cursor-pointer hover:bg-muted/30 transition-colors ${
                          selectedComment === comment.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedComment(comment.id)}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {comment.author.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{comment.author}</div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    comment.status === "approved"
                                      ? "default"
                                      : comment.status === "pending"
                                        ? "outline"
                                        : "destructive"
                                  }
                                  className={
                                    comment.status === "approved"
                                      ? "bg-green-500/90 hover:bg-green-500 text-white"
                                      : comment.status === "pending"
                                        ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                        : ""
                                  }
                                >
                                  {comment.status}
                                </Badge>
                                {comment.isReported && (
                                  <Badge variant="destructive" className="bg-red-500/90 hover:bg-red-500 text-white">
                                    Reported
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              On "<span className="font-medium text-foreground/80">{comment.story}</span>" •{" "}
                              {comment.date}
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
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
                  Showing {filteredComments.length} of {comments.length} comments
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

          <div className="md:col-span-1">
            {selectedComment !== null && selectedCommentData ? (
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
                        <DropdownMenuItem className="cursor-pointer">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span>Approve</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          <span>Reject</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Flag className="mr-2 h-4 w-4" />
                          <span>Flag as Inappropriate</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive cursor-pointer">
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
                        <AvatarImage src={selectedCommentData.authorAvatar} alt={selectedCommentData.author} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {selectedCommentData.author.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{selectedCommentData.author}</div>
                        <div className="text-sm text-muted-foreground">{selectedCommentData.date}</div>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 bg-muted/30 mt-2">
                      <p>{selectedCommentData.content}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center">
                      <Label>Status</Label>
                      <Select defaultValue={selectedCommentData.status}>
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
                          {commentReplies.map((reply) => (
                            <div
                              key={reply.id}
                              className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={reply.authorAvatar} alt={reply.author} />
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
                                </div>
                                <p className="text-sm py-1">{reply.content}</p>
                                <div className="text-xs text-muted-foreground">{reply.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                          No replies yet
                        </div>
                      )}
                    </ScrollArea>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="reply">Reply to Comment</Label>
                    <Textarea
                      id="reply"
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t">
                  <Button variant="outline">Cancel</Button>
                  <Button className="gap-1">
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </CardFooter>
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
                <CardTitle>Comment Settings</CardTitle>
                <CardDescription>Configure comment moderation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="moderation" className="text-base">
                      Comment Moderation
                    </Label>
                    <div className="text-sm text-muted-foreground">Require approval before comments are published</div>
                  </div>
                  <Switch id="moderation" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base">
                      Comment Notifications
                    </Label>
                    <div className="text-sm text-muted-foreground">Receive email notifications for new comments</div>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="spam-filter" className="text-base">
                      Spam Filter
                    </Label>
                    <div className="text-sm text-muted-foreground">Automatically flag potential spam comments</div>
                  </div>
                  <Switch id="spam-filter" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Blocked Words</Label>
                  <Textarea
                    placeholder="Enter words to block, separated by commas..."
                    className="min-h-[80px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comments containing these words will be automatically flagged.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button className="w-full">Save Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

