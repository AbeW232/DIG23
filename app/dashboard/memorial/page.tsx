import { DashboardLayout } from "@/components/dashboard-layout"
import { MemorialDashboard } from "@/components/memorial/memorial-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Memorial Dashboard | Digital Legacy Platform",
  description: "Create and manage memorial pages for your loved ones",
}

export default function MemorialPage() {
  return (
    <DashboardLayout>
      <MemorialDashboard />
    </DashboardLayout>
  )
}

