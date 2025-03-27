import { DashboardLayout } from "@/components/dashboard-layout"
import { SearchFilters } from "@/components/media-library/search-filters"

export default function MediaSearchPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Advanced Search</h1>
          <p className="text-muted-foreground">Find media items with powerful search and filtering tools</p>
        </div>

        <SearchFilters />
      </div>
    </DashboardLayout>
  )
}

