"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UserManagement } from "@/components/users/user-management"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and access controls for your digital legacy platform.
          </p>
        </div>

        <UserManagement />
      </div>
    </DashboardLayout>
  )
}

