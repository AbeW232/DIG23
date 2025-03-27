import { DashboardLayout } from "@/components/dashboard-layout"
import { SubscriptionTabs } from "@/components/subscription/subscription-tabs"

export default function SubscriptionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscription & Billing</h1>
            <p className="text-muted-foreground mt-1">Manage your subscription plans and payment methods</p>
          </div>
        </div>
        <SubscriptionTabs />
      </div>
    </DashboardLayout>
  )
}

