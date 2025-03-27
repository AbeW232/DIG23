"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CheckCircle,
  Clock,
  Flag,
  MessageSquare,
  Reply,
  Send,
  ThumbsUp,
  Trash2,
  AlertTriangle,
  Mail,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format, formatDistanceToNow } from "date-fns"

export function CommentDetail({ comment, replies, onStatusChange, onDelete, onAddReply }) {
  const [replyText, setReplyText] = useState("")
  const [isReplying, setIsReplying] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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

  // Get status badge
  const getStatusBadge = (status) => {
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

  // Handle reply submission
  const handleSubmitReply = () => {
    if (!replyText.trim()) return

    onAddReply(replyText.trim())
    setReplyText("")
    setIsReplying(false)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">Comment Details</h3>
          {getStatusBadge(comment.status)}
        </div>
        <p className="text-sm text-muted-foreground">View and respond to this comment</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Comment Content */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {comment.author.substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author}</span>
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(comment.date)}</div>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-muted/30">
              <p className="whitespace-pre-line">{comment.content}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {comment.likes} likes
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {comment.replies} replies
              </div>
              {comment.flags > 0 && (
                <div className="flex items-center text-red-600">
                  <Flag className="h-4 w-4 mr-1" />
                  {comment.flags} flags
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Comment Metadata */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Comment Information</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Story</p>
                <p className="text-sm font-medium">{comment.story}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Author</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{comment.author}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{comment.authorEmail || "No email provided"}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Mail className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Date Posted</p>
                <p className="text-sm font-medium">{format(new Date(comment.date), "PPP 'at' p")}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Moderation Actions */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Moderation Actions</h4>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={comment.status} onValueChange={(value) => onStatusChange(comment.id, value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(comment.id, "approved")}
                className="bg-green-500/10 border-green-500/20 text-green-700 hover:bg-green-500/20 hover:text-green-800"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(comment.id, "flagged")}
                className="bg-yellow-500/10 border-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20 hover:text-yellow-800"
              >
                <Flag className="h-4 w-4 mr-1" />
                Flag
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(comment.id, "spam")}
                className="bg-gray-500/10 border-gray-500/20 text-gray-700 hover:bg-gray-500/20 hover:text-gray-800"
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Mark as Spam
              </Button>

              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-500/10 border-red-500/20 text-red-700 hover:bg-red-500/20 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This comment will be permanently deleted from the system.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDelete(comment.id)
                        setShowDeleteDialog(false)
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <Separator />

          {/* Replies */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Replies</h4>
              <span className="text-xs text-muted-foreground">{replies.length} replies</span>
            </div>

            {replies.length > 0 ? (
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {replies.map((reply, i) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.avatar} alt={reply.author} />
                        <AvatarFallback className="text-xs">{reply.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{reply.author}</span>
                          {reply.isAuthor && (
                            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                              Author
                            </Badge>
                          )}
                          {reply.isModerator && (
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                              Moderator
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm">{reply.content}</p>

                        <div className="text-xs text-muted-foreground">{formatDate(reply.date)}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center justify-center h-20 border rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground">No replies yet</p>
              </div>
            )}

            {isReplying ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[100px] resize-none"
                />

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsReplying(false)
                      setReplyText("")
                    }}
                  >
                    Cancel
                  </Button>

                  <Button size="sm" onClick={handleSubmitReply} disabled={!replyText.trim()}>
                    <Send className="h-4 w-4 mr-1" />
                    Send Reply
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Button variant="outline" className="w-full" onClick={() => setIsReplying(true)}>
                <Reply className="h-4 w-4 mr-1" />
                Reply to Comment
              </Button>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

