import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FileText, Image, FileArchive, ChevronRight } from "lucide-react"

interface DigitalAssetsPreviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DigitalAssetsPreview({ className, ...props }: DigitalAssetsPreviewProps) {
  return (
    <Card
      className={cn(
        "col-span-3 border-0 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.1)]",
        className,
      )}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-amber-100">Digital Assets</CardTitle>
            <CardDescription className="text-slate-400">Your most important digital legacy items.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-amber-500/10 p-2">
                <FileText className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none text-amber-100">Last Will and Testament</p>
                <p className="text-sm text-slate-400 mt-1">PDF • 2.4 MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-slate-800">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-amber-500/10 p-2">
                <Image className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none text-amber-100">Family Photos Collection</p>
                <p className="text-sm text-slate-400 mt-1">128 items • 1.2 GB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-slate-800">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(234,179,8,0.2)]">
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-amber-500/10 p-2">
                <FileArchive className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium leading-none text-amber-100">Financial Documents</p>
                <p className="text-sm text-slate-400 mt-1">24 items • 156 MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-400 hover:bg-slate-800">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="pt-2">
            <Button variant="outline" className="w-full border-amber-500/30 text-amber-100 hover:bg-amber-500/10">
              View All Assets
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

