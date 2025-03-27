import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { FamilyTreePreview } from "@/components/family-tree-preview"
import { DigitalAssetsPreview } from "@/components/digital-assets-preview"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | Digital Legacy Platform",
  description: "Manage your digital legacy and assets",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <DashboardShell>
        <DashboardHeader heading="Digital Legacy" text="Your premium digital asset management platform.">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Legacy Item
          </Button>
        </DashboardHeader>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Overview className="lg:col-span-4" />
          <RecentActivity className="lg:col-span-3" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <FamilyTreePreview className="lg:col-span-4" />
          <DigitalAssetsPreview className="lg:col-span-3" />
        </div>
      </DashboardShell>
    </div>
  )
}

