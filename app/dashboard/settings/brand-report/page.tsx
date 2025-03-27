import { BrandGuidelinesReport } from "@/components/brand-guidelines-report"

export default function BrandReportPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Brand Guidelines Compliance</h1>
        <p className="text-muted-foreground">
          Review how well our platform adheres to our established brand guidelines.
        </p>
      </div>
      <BrandGuidelinesReport />
    </div>
  )
}

