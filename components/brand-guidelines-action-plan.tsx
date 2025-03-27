import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, ArrowRight, Calendar, User, AlertTriangle } from "lucide-react"

interface ActionItemProps {
  title: string
  description: string
  priority: "high" | "medium" | "low"
  assignee?: string
  dueDate?: string
  completed?: boolean
}

function ActionItem({ title, description, priority, assignee, dueDate, completed = false }: ActionItemProps) {
  return (
    <div className="flex items-start space-x-4 py-4">
      <Checkbox id={`task-${title.toLowerCase().replace(/\s+/g, "-")}`} checked={completed} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor={`task-${title.toLowerCase().replace(/\s+/g, "-")}`}
            className={`font-medium ${completed ? "line-through text-muted-foreground" : ""}`}
          >
            {title}
          </label>
          <Badge
            variant="outline"
            className={
              priority === "high"
                ? "bg-red-500/10 text-red-700 border-red-200"
                : priority === "medium"
                  ? "bg-amber-500/10 text-amber-700 border-amber-200"
                  : "bg-green-500/10 text-green-700 border-green-200"
            }
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {(assignee || dueDate) && (
          <div className="flex items-center gap-4 mt-2">
            {assignee && (
              <div className="flex items-center text-xs text-muted-foreground">
                <User className="mr-1 h-3 w-3" />
                {assignee}
              </div>
            )}
            {dueDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {dueDate}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function BrandGuidelinesActionPlan() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Brand Compliance Action Plan</CardTitle>
          <Badge className="bg-amber-500/20 text-amber-700 hover:bg-amber-500/30">In Progress</Badge>
        </div>
        <CardDescription>Prioritized tasks to address brand guideline compliance issues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estimated completion time: 2 weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-600">3 high priority items</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium">Color System</h3>
          <Separator />
          <ActionItem
            title="Update Secondary Color Implementation"
            description="Change secondary color from #2d3748 to #f5f5f5 in tailwind.config.ts and update all related components."
            priority="high"
            assignee="Design Team"
            dueDate="Apr 3, 2025"
          />
          <ActionItem
            title="Standardize Primary Color Usage"
            description="Audit all components using primary color and ensure they use the CSS variable or Tailwind class."
            priority="medium"
            assignee="Frontend Team"
            dueDate="Apr 5, 2025"
          />
          <ActionItem
            title="Fix Text Contrast Issues"
            description="Identify and fix all instances where text doesn't meet WCAG AA contrast standards."
            priority="high"
            assignee="Accessibility Team"
            dueDate="Apr 4, 2025"
          />
        </div>

        <div className="space-y-1 mt-6">
          <h3 className="font-medium">Typography</h3>
          <Separator />
          <ActionItem
            title="Standardize H3 Elements"
            description="Update all H3 elements to use text-xl (1.5rem/24px) as specified in the guidelines."
            priority="medium"
            assignee="Frontend Team"
            dueDate="Apr 7, 2025"
            completed={true}
          />
          <ActionItem
            title="Create Typography Component Library"
            description="Develop a component library for typography to ensure consistent implementation."
            priority="low"
            assignee="Design System Team"
            dueDate="Apr 12, 2025"
          />
        </div>

        <div className="space-y-1 mt-6">
          <h3 className="font-medium">Logo & Assets</h3>
          <Separator />
          <ActionItem
            title="Fix Dark Mode Logo Color"
            description="Update the logo color in dark mode to match the specified color variation for dark backgrounds."
            priority="high"
            assignee="Design Team"
            dueDate="Apr 2, 2025"
          />
          <ActionItem
            title="Create Asset Usage Documentation"
            description="Develop comprehensive documentation for asset usage to ensure future compliance."
            priority="low"
            assignee="Documentation Team"
            dueDate="Apr 15, 2025"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Assign Tasks</Button>
        <Button className="gap-1">
          View Detailed Plan
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

