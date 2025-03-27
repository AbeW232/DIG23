import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Clock } from "lucide-react"

interface ActivityItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  iconBackground?: string
  title: string
  description?: string
  timestamp?: string
  avatar?: {
    src?: string
    fallback: string
  }
  actions?: React.ReactNode
  content?: React.ReactNode
  border?: boolean
}

export function ActivityItem({
  icon,
  iconBackground = "bg-primary/10",
  title,
  description,
  timestamp,
  avatar,
  actions,
  content,
  border = true,
  className,
  ...props
}: ActivityItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-3 group hover:bg-muted/50 rounded-md transition-colors",
        border && "pb-4 border-b last:border-0",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0", iconBackground)}>
          {icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="text-sm font-medium truncate">{title}</h4>
            {avatar && (
              <Avatar className="h-5 w-5 flex-shrink-0">
                <AvatarImage src={avatar.src} alt="Avatar" />
                <AvatarFallback>{avatar.fallback}</AvatarFallback>
              </Avatar>
            )}
          </div>
          {timestamp && (
            <span className="text-xs text-muted-foreground flex items-center flex-shrink-0">
              <Clock className="h-3 w-3 mr-1" />
              {timestamp}
            </span>
          )}
        </div>

        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}

        {content && <div className="mt-2">{content}</div>}
      </div>

      {actions ? (
        actions
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

