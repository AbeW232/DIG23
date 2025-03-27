"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import type { ReportedComment } from "@/types/comments"
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
import { AlertTriangle, Check, Flag, MessageSquare, ThumbsDown, User, UserX } from "lucide-react"

interface ReportDetailsPanelProps {
  report: ReportedComment
  onResolve: (id: string, notes: string) => Promise<void>
  onDismiss: (id: string, notes: string) => Promise<void>
  onDeleteComment: (id: string) => Promise<void>
  onBanUser: (userId: string) => Promise<void>
}

export function ReportDetailsPanel({
  report,
  onResolve,
  onDismiss,
  onDeleteComment,
  onBanUser,
}: ReportDetailsPanelProps) {
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResolve = async () => {
    setIsSubmitting(true)
    try {
      await onResolve(report.id, notes)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismiss = async () => {
    setIsSubmitting(true)
    try {
      await onDismiss(report.id, notes)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Report Details</span>
          <ReportTypeBadge type={report.type} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Reported Comment
          </h3>
          <div className="p-3 bg-muted rounded-md text-sm">{report.comment.text}</div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Posted {formatDistanceToNow(new Date(report.comment.createdAt), { addSuffix: true })}</span>
            <span>Story: {report.comment.storyTitle}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Comment Author
          </h3>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={report.comment.author.avatar} alt={report.comment.author.name} />
              <AvatarFallback>{report.comment.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{report.comment.author.name}</p>
              <p className="text-xs text-muted-foreground">
                Member since {new Date(report.comment.author.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Report Information
          </h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm">Reported by:</span>
              <span className="text-sm font-medium">{report.reportedBy.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Date reported:</span>
              <span className="text-sm">{new Date(report.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total reports:</span>
              <span className="text-sm">{report.reportCount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Moderator Notes</h3>
          <Textarea
            placeholder="Add notes about this report..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-20"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1" onClick={handleDismiss} disabled={isSubmitting}>
            <ThumbsDown className="h-4 w-4 mr-2" />
            Dismiss
          </Button>
          <Button className="flex-1" onClick={handleResolve} disabled={isSubmitting}>
            <Check className="h-4 w-4 mr-2" />
            Resolve
          </Button>
        </div>

        <div className="flex gap-2 w-full">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Delete Comment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the comment. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeleteComment(report.comment.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1">
                <UserX className="h-4 w-4 mr-2" />
                Ban User
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ban User</AlertDialogTitle>
                <AlertDialogDescription>
                  This will ban {report.comment.author.name} from commenting on any stories. Are you sure?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onBanUser(report.comment.author.id)}>Ban User</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  )
}

function ReportTypeBadge({ type }: { type: string }) {
  switch (type) {
    case "harassment":
      return <Badge variant="destructive">Harassment</Badge>
    case "spam":
      return (
        <Badge variant="default" className="bg-amber-500">
          Spam
        </Badge>
      )
    case "inappropriate":
      return (
        <Badge variant="default" className="bg-orange-500">
          Inappropriate
        </Badge>
      )
    case "misinformation":
      return (
        <Badge variant="default" className="bg-blue-500">
          Misinformation
        </Badge>
      )
    default:
      return <Badge variant="outline">Other</Badge>
  }
}

