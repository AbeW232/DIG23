import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, Eye } from "lucide-react"

interface FamilyTreePreviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FamilyTreePreview({ className, ...props }: FamilyTreePreviewProps) {
  return (
    <Card
      className={cn(
        "col-span-4 border-0 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]",
        className,
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-amber-100">Family Tree</CardTitle>
            <CardDescription className="text-slate-400">Visualize and manage your family connections.</CardDescription>
          </div>
          <div className="rounded-full bg-slate-800 p-2">
            <Users className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[320px] w-full rounded-xl border border-slate-700 bg-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),transparent_70%)]"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg className="h-full w-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="100" r="20" className="fill-amber-500" />
              <line x1="200" y1="120" x2="200" y2="140" className="stroke-amber-500 stroke-2" />
              <line x1="160" y1="160" x2="240" y2="160" className="stroke-amber-500 stroke-2" />
              <line x1="160" y1="140" x2="160" y2="160" className="stroke-amber-500 stroke-2" />
              <line x1="240" y1="140" x2="240" y2="160" className="stroke-amber-500 stroke-2" />
              <circle cx="160" cy="180" r="20" className="fill-amber-500" />
              <circle cx="240" cy="180" r="20" className="fill-amber-500" />
              <line x1="160" y1="200" x2="160" y2="220" className="stroke-amber-500 stroke-2" />
              <line x1="240" y1="200" x2="240" y2="220" className="stroke-amber-500 stroke-2" />
              <circle cx="160" cy="240" r="20" className="fill-amber-500" />
              <circle cx="240" cy="240" r="20" className="fill-amber-500" />
            </svg>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="flex flex-col items-center justify-center space-y-4 max-w-xs text-center">
              <div className="rounded-full bg-amber-500 p-3">
                <Users className="h-6 w-6 text-black" />
              </div>
              <div>
                <p className="text-lg font-medium text-amber-100">Family Tree Visualization</p>
                <p className="text-sm text-slate-400 mt-1">
                  Explore your family connections with our premium interactive visualization
                </p>
              </div>
              <Button className="bg-slate-800 hover:bg-slate-700 text-amber-100 border border-amber-500/30">
                <Eye className="mr-2 h-4 w-4" />
                View Full Tree
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

