import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { MemorialEditor } from "@/components/memorial/memorial-editor"

export const metadata: Metadata = {
  title: "Create Memorial | Digital Legacy Platform",
  description: "Create a new memorial page to honor your loved ones",
}

export default function CreateMemorialPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Create Memorial"
        description="Create a beautiful memorial to honor and remember your loved ones"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Memorial", href: "/memorial" },
          { label: "Create", href: "/memorial/create" },
        ]}
      />
      <MemorialEditor />
    </div>
  )
}

