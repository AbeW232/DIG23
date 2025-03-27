"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileSettings } from "@/components/profile/profile-settings"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings, privacy controls, and notification preferences.
          </p>
        </div>

        <ProfileSettings />
      </div>
    </DashboardLayout>
  )
}

