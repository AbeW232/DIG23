import { DashboardLayout } from "@/components/dashboard-layout"
import { CommentModeration } from "@/components/comments/comment-moderation"

export default function CommentModerationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Comment Moderation</h1>
          <p className="text-muted-foreground">Review and moderate comments on your digital legacy content</p>
        </div>

        <CommentModeration />
      </div>
    </DashboardLayout>
  )
}

