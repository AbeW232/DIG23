import type { Metadata } from "next"
import { PageHeader } from "@/components/ui/page-header"
import { MemorialTemplates } from "@/components/memorial/memorial-templates"

export const metadata: Metadata = {
  title: "Memorial Templates | Digital Legacy Platform",
  description: "Choose from a variety of beautiful memorial templates",
}

export default function MemorialTemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Memorial Templates"
        description="Choose from a variety of beautiful templates for your memorial page"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Memorial", href: "/memorial" },
          { label: "Templates", href: "/memorial/templates" },
        ]}
      />
      <MemorialTemplates />
    </div>
  )
}

