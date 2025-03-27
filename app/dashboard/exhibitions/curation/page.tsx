import { DashboardLayout } from "@/components/dashboard-layout"
import { CurationTools } from "@/components/exhibitions/curation-tools"

export default function ExhibitionCurationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Exhibition Curation</h1>
          <p className="text-muted-foreground">Create and manage curated exhibitions of your digital legacy content</p>
        </div>

        <CurationTools />
      </div>
    </DashboardLayout>
  )
}

