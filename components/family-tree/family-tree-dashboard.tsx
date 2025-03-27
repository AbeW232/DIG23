"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Users, Settings, PlusCircle, HelpCircle, ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModernTreeVisualization } from "./modern-tree-visualization"
// Remove or comment out the old import:
// import { TreeVisualization } from "./tree-visualization"
import { MemberManagement } from "./member-management"
import { RelationshipEditor } from "./relationship-editor"
import { TreeSettings } from "./tree-settings"
import { ImportExport } from "./import-export"
import { FamilyTreeOverview } from "./family-tree-overview"
import type { FamilyTreeData, FamilyMember } from "./family-tree"

// Sample data
const sampleFamilyTree: FamilyTreeData = {
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
      children: ["member5", "member6"],
      partners: ["member7"],
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
      children: ["member8"],
      partners: ["member9"],
      siblings: ["member3"],
    },
    {
      id: "member5",
      name: "Emma Smith",
      birthDate: "2005-07-12",
      gender: "female",
      bio: "Granddaughter, student",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: ["member3", "member7"],
      children: [],
      partners: [],
      siblings: ["member6"],
    },
    {
      id: "member6",
      name: "Michael Smith",
      birthDate: "2008-02-28",
      gender: "male",
      bio: "Grandson, student",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: ["member3", "member7"],
      children: [],
      partners: [],
      siblings: ["member5"],
    },
    {
      id: "member7",
      name: "Lisa Smith",
      birthDate: "1976-09-18",
      gender: "female",
      bio: "Daughter-in-law, architect",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: [],
      children: ["member5", "member6"],
      partners: ["member3"],
      siblings: [],
    },
    {
      id: "member8",
      name: "Daniel Johnson",
      birthDate: "2010-04-05",
      gender: "male",
      bio: "Grandson, student",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: ["member4", "member9"],
      children: [],
      partners: [],
      siblings: [],
    },
    {
      id: "member9",
      name: "Robert Johnson",
      birthDate: "1977-12-03",
      gender: "male",
      bio: "Son-in-law, business owner",
      imageUrl: "/placeholder.svg?height=100&width=100",
      parents: [],
      children: ["member8"],
      partners: ["member4"],
      siblings: [],
    },
  ],
}

export function FamilyTreeDashboard() {
  const [familyTreeData, setFamilyTreeData] = useState<FamilyTreeData>(sampleFamilyTree)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const handleUpdateMember = (updatedMember: FamilyMember) => {
    setFamilyTreeData((prev) => ({
      ...prev,
      members: prev.members.map((member) => (member.id === updatedMember.id ? updatedMember : member)),
      lastModified: new Date().toISOString().split("T")[0],
    }))
  }

  const handleAddMember = (newMember: FamilyMember) => {
    setFamilyTreeData((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
      lastModified: new Date().toISOString().split("T")[0],
    }))
  }

  const handleDeleteMember = (memberId: string) => {
    setFamilyTreeData((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
      lastModified: new Date().toISOString().split("T")[0],
    }))
  }

  const handleUpdateTreeSettings = (name: string, description: string, rootMemberId: string) => {
    setFamilyTreeData((prev) => ({
      ...prev,
      name,
      description,
      rootMemberId,
      lastModified: new Date().toISOString().split("T")[0],
    }))
  }

  // Memoize the mapped members to prevent recreating on each render
  const mappedMembers = useMemo(() => {
    return familyTreeData.members.map((member) => ({
      id: member.id,
      name: member.name,
      birthYear: member.birthDate ? new Date(member.birthDate).getFullYear().toString() : undefined,
      deathYear: member.deathDate ? new Date(member.deathDate).getFullYear().toString() : undefined,
      gender: member.gender,
      bio: member.bio,
      imageUrl: member.imageUrl,
      parentIds: member.parents,
      spouseIds: member.partners,
      childrenIds: member.children,
    }))
  }, [familyTreeData.members])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Family Tree</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your family tree to preserve your family history
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search family members..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export as Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <h3 className="text-3xl font-bold mt-1">{familyTreeData.members.length}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {familyTreeData.members.filter((m) => m.gender === "male").length} Males
              </Badge>
              <Badge variant="outline" className="ml-2 bg-primary/5 text-primary border-primary/20">
                {familyTreeData.members.filter((m) => m.gender === "female").length} Females
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Generations</p>
                <h3 className="text-3xl font-bold mt-1">3</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <ChevronRight className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <p className="text-muted-foreground">Last updated: {familyTreeData.lastModified}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion</p>
                <h3 className="text-3xl font-bold mt-1">85%</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <Settings className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6">
              <TabsList className="h-14 w-full justify-start gap-4 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="visualization"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                >
                  Visualization
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                >
                  Members
                </TabsTrigger>
                <TabsTrigger
                  value="relationships"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                >
                  Relationships
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-14 px-4"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 focus-visible:outline-none focus-visible:ring-0">
              <FamilyTreeOverview familyTreeData={familyTreeData} />
            </TabsContent>

            <TabsContent value="visualization" className="p-6 focus-visible:outline-none focus-visible:ring-0">
              <ModernTreeVisualization members={mappedMembers} />
            </TabsContent>

            <TabsContent value="members" className="focus-visible:outline-none focus-visible:ring-0">
              <MemberManagement
                members={familyTreeData.members}
                onUpdateMember={handleUpdateMember}
                onAddMember={handleAddMember}
                onDeleteMember={handleDeleteMember}
              />
            </TabsContent>

            <TabsContent value="relationships" className="focus-visible:outline-none focus-visible:ring-0">
              <RelationshipEditor familyTreeData={familyTreeData} onUpdateMember={handleUpdateMember} />
            </TabsContent>

            <TabsContent value="settings" className="p-6 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TreeSettings familyTreeData={familyTreeData} onUpdateSettings={handleUpdateTreeSettings} />
                <ImportExport familyTreeData={familyTreeData} onImport={setFamilyTreeData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Need help with your family tree?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Check out our guides on building your family tree, adding relationships, and importing existing
                genealogy data.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  View Guides
                </Button>
                <Button variant="link" size="sm" className="text-primary">
                  Watch Tutorial
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

