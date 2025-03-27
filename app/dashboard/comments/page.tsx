import { DashboardLayout } from "@/components/dashboard-layout"
import { CommentsManagementDashboard } from "@/components/comments/comments-management-dashboard"

export default function CommentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Comments Management</h1>
          <p className="text-muted-foreground">Manage and moderate comments across your digital legacy content</p>
        </div>

        <CommentsManagementDashboard />
      </div>
    </DashboardLayout>
  )
}

