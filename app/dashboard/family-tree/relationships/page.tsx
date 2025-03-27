import { DashboardLayout } from "@/components/dashboard-layout"
import { RelationshipEditor } from "@/components/family-tree/relationship-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for demonstration
const sampleFamilyTreeData = {
  name: "Smith Family Tree",
  description: "A digital record of the Smith family history",
  lastModified: "2025-03-22",
  createdAt: "2025-01-15",
  rootMemberId: "member1",
  members: [
    {
      id: "member1",
      name: "John Smith",
      birthDate: "1950-05-10",
      gender: "male",
      bio: "Family patriarch, worked as an engineer for 40 years",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: [],
      children: ["member3", "member4"],
      partners: ["member2"],
      siblings: [],
    },
    {
      id: "member2",
      name: "Mary Smith",
      birthDate: "1952-08-15",
      gender: "female",
      bio: "Loving mother and teacher",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: [],
      children: ["member3", "member4"],
      partners: ["member1"],
      siblings: [],
    },
    {
      id: "member3",
      name: "James Smith",
      birthDate: "1975-03-22",
      gender: "male",
      bio: "Eldest son, software developer",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: ["member1", "member2"],
      children: [],
      partners: [],
      siblings: ["member4"],
    },
    {
      id: "member4",
      name: "Sarah Johnson",
      birthDate: "1978-11-30",
      gender: "female",
      bio: "Daughter, doctor",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: ["member1", "member2"],
      children: [],
      partners: [],
      siblings: ["member3"],
    },
  ],
}

export default function FamilyTreeRelationshipsPage() {
  // In a real application, you would fetch this data from an API or state management
  const handleUpdateMember = (member) => {
    console.log("Update member relationship:", member)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Relationships</h1>
          <p className="text-muted-foreground">Manage relationships between family members</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Relationship Editor</CardTitle>
            <CardDescription>Define and edit relationships between family members</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <RelationshipEditor familyTreeData={sampleFamilyTreeData} onUpdateMember={handleUpdateMember} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

