import { DashboardLayout } from "@/components/dashboard-layout"
import { MemberManagement } from "@/components/family-tree/member-management"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for demonstration
const sampleMembers = [
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
]

export default function FamilyTreeMembersPage() {
  // In a real application, you would fetch this data from an API or state management
  const handleUpdateMember = (member) => {
    console.log("Update member:", member)
  }

  const handleAddMember = (member) => {
    console.log("Add member:", member)
  }

  const handleDeleteMember = (memberId) => {
    console.log("Delete member:", memberId)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Members</h1>
          <p className="text-muted-foreground">Manage the members of your family tree</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Member Management</CardTitle>
            <CardDescription>Add, edit, and remove family members</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <MemberManagement
              members={sampleMembers}
              onUpdateMember={handleUpdateMember}
              onAddMember={handleAddMember}
              onDeleteMember={handleDeleteMember}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

