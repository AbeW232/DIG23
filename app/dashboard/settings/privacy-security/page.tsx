import { DashboardLayout } from "@/components/dashboard-layout"
import { PrivacySecuritySettings } from "@/components/settings/privacy-security-settings"

export default function PrivacySecurityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Privacy & Security</h1>
          <p className="text-muted-foreground">Manage your privacy settings and account security</p>
        </div>

        <PrivacySecuritySettings />
      </div>
    </DashboardLayout>
  )
}

