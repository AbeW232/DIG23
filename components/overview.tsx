import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface OverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Overview({ className, ...props }: OverviewProps) {
  return (
    <Card
      className={cn(
        "col-span-3 border-0 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]",
        className,
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-amber-100">Portfolio Overview</CardTitle>
        <CardDescription className="text-slate-400">Your digital legacy statistics and activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assets" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 p-1">
            <TabsTrigger value="assets" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              Digital Assets
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="beneficiaries"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-black"
            >
              Beneficiaries
            </TabsTrigger>
          </TabsList>
          <TabsContent value="assets" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Total Assets</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">247</div>
                <div className="mt-1 text-xs text-amber-500">+12% from last month</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Documents</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">89</div>
                <div className="mt-1 text-xs text-amber-500">+5% from last month</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Photos</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">128</div>
                <div className="mt-1 text-xs text-amber-500">+18% from last month</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Other Media</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">30</div>
                <div className="mt-1 text-xs text-amber-500">+3% from last month</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Last Login</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">Today</div>
                <div className="mt-1 text-xs text-slate-400">2 hours ago</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Assets Added</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">24</div>
                <div className="mt-1 text-xs text-slate-400">Last 30 days</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Settings Changed</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">3</div>
                <div className="mt-1 text-xs text-slate-400">days ago</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Security Check</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">7</div>
                <div className="mt-1 text-xs text-slate-400">days ago</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="beneficiaries" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Total Beneficiaries</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">5</div>
                <div className="mt-1 text-xs text-slate-400">Family members</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Primary</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">2</div>
                <div className="mt-1 text-xs text-slate-400">Immediate family</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Secondary</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">3</div>
                <div className="mt-1 text-xs text-slate-400">Extended family</div>
              </div>
              <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-4 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-400">Last Updated</div>
                  <ArrowUpRight className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-2 text-3xl font-bold text-amber-100">2</div>
                <div className="mt-1 text-xs text-slate-400">weeks ago</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

