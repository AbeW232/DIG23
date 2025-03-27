import type { Metadata } from "next"
import { FamilyTreeVisualization } from "@/components/family-tree/family-tree-visualization"
import { RelationshipManager } from "@/components/family-tree/relationship-manager"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Share2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Family Tree | Digital Legacy Platform",
  description: "Visualize and manage your family connections",
}

export default function FamilyTreePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Tree</h1>
          <p className="text-muted-foreground">Visualize and manage your family connections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border rounded-lg p-4 bg-card">
          <FamilyTreeVisualization />
        </div>
        <div className="border rounded-lg p-4 bg-card">
          <RelationshipManager />
        </div>
      </div>
    </div>
  )
}

