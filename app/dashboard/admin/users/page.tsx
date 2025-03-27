import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminUserManagement } from "@/components/admin/users/admin-user-management"

export default function AdminUsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their digital legacy settings with advanced administrative controls.
          </p>
        </div>

        <AdminUserManagement />
      </div>
    </DashboardLayout>
  )
}

