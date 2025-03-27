import { DashboardLayout } from "@/components/dashboard-layout"
import { TreeSettings } from "@/components/family-tree/tree-settings"
import { ImportExport } from "@/components/family-tree/import-export"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  ],
}

export default function FamilyTreeSettingsPage() {
  // In a real application, you would fetch this data from an API or state management
  const handleUpdateSettings = (name, description, rootMemberId) => {
    console.log("Update settings:", { name, description, rootMemberId })
  }

  const handleImport = (data) => {
    console.log("Import data:", data)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Tree Settings</h1>
          <p className="text-muted-foreground">Configure and manage your family tree settings</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="import-export">Import & Export</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure the basic settings for your family tree</CardDescription>
              </CardHeader>
              <CardContent>
                <TreeSettings familyTreeData={sampleFamilyTreeData} onUpdateSettings={handleUpdateSettings} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import-export" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Import & Export</CardTitle>
                <CardDescription>Import or export your family tree data</CardDescription>
              </CardHeader>
              <CardContent>
                <ImportExport familyTreeData={sampleFamilyTreeData} onImport={handleImport} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

