import { BrandGuidelinesActionPlan } from "@/components/brand-guidelines-action-plan"

export default function BrandActionPlanPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Brand Compliance Action Plan</h1>
        <p className="text-muted-foreground">
          Prioritized tasks to address brand guideline compliance issues across the platform.
        </p>
      </div>
      <BrandGuidelinesActionPlan />
    </div>
  )
}

