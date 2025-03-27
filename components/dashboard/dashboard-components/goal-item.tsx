import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function GoalItem({ title, current, target, percentage, icon }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">{icon}</div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {current}/{target}
          </span>
          <Badge
            variant={percentage >= 80 ? "success" : percentage >= 50 ? "warning" : "default"}
            className={
              percentage >= 80
                ? "bg-green-100 text-green-800"
                : percentage >= 50
                  ? "bg-amber-100 text-amber-800"
                  : "bg-primary/10 text-primary"
            }
          >
            {percentage}%
          </Badge>
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

