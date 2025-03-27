import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Activity, File, Settings, User } from "lucide-react"

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  return (
    <Card
      className={cn(
        "col-span-3 border-0 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]",
        className,
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-amber-100">Recent Activity</CardTitle>
        <CardDescription className="text-slate-400">Your latest actions and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="rounded-full bg-amber-500/10 p-2">
              <File className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-amber-100">Added new document</p>
              <p className="text-sm text-slate-400">You uploaded "Last Will and Testament.pdf"</p>
            </div>
            <div className="text-sm text-slate-500 font-medium">2 hours ago</div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="rounded-full bg-amber-500/10 p-2">
              <Settings className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-amber-100">Updated settings</p>
              <p className="text-sm text-slate-400">Changed privacy preferences</p>
            </div>
            <div className="text-sm text-slate-500 font-medium">Yesterday</div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="rounded-full bg-amber-500/10 p-2">
              <User className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-amber-100">Added beneficiary</p>
              <p className="text-sm text-slate-400">Added "Jane Smith" as a secondary beneficiary</p>
            </div>
            <div className="text-sm text-slate-500 font-medium">3 days ago</div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="rounded-full bg-amber-500/10 p-2">
              <Activity className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-amber-100">Security check</p>
              <p className="text-sm text-slate-400">Completed quarterly security verification</p>
            </div>
            <div className="text-sm text-slate-500 font-medium">1 week ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

