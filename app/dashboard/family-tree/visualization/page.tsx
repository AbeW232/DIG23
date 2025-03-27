"use client"
import { ModernTreeVisualization } from "@/components/family-tree/modern-tree-visualization"
import { PageHeader } from "@/components/ui/page-header"

export default function FamilyTreeVisualizationPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="Family Tree Visualization"
        description="Interactive visualization of your family connections"
      />

      <div className="h-[calc(100vh-200px)] bg-white rounded-lg shadow-sm border">
        <ModernTreeVisualization
          members={[
            {
              id: "1",
              name: "John Smith",
              birthYear: "1950",
              gender: "male",
              bio: "Family patriarch",
              parentIds: [],
              spouseIds: ["2"],
              childrenIds: ["3", "4"],
            },
            {
              id: "2",
              name: "Mary Smith",
              birthYear: "1952",
              gender: "female",
              bio: "Family matriarch",
              parentIds: [],
              spouseIds: ["1"],
              childrenIds: ["3", "4"],
            },
            {
              id: "3",
              name: "James Smith",
              birthYear: "1975",
              gender: "male",
              parentIds: ["1", "2"],
              spouseIds: [],
              childrenIds: [],
            },
            {
              id: "4",
              name: "Sarah Smith",
              birthYear: "1978",
              gender: "female",
              parentIds: ["1", "2"],
              spouseIds: [],
              childrenIds: [],
            },
          ]}
        />
      </div>
    </div>
  )
}

