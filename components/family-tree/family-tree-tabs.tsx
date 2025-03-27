"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FamilyTree } from "./family-tree"
import { TreeVisualization } from "./tree-visualization"
import { MemberManagement } from "./member-management"
import { RelationshipEditor } from "./relationship-editor"
import { TreeSettings } from "./tree-settings"
import { ImportExport } from "./import-export"
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

export function FamilyTreeTabs() {
  const [familyTreeData, setFamilyTreeData] = useState<FamilyTreeData>(sampleFamilyTree)
  const [activeTab, setActiveTab] = useState("overview")

  const handleUpdateMember = (updatedMember: FamilyMember) => {
    setFamilyTreeData((prev) => ({
      ...prev,
      members: prev.members.map((member) => (member.id === updatedMember.id ? updatedMember : member)),
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

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="relationships">Relationships</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <FamilyTree />
      </TabsContent>

      <TabsContent value="visualization" className="mt-6">
        <TreeVisualization familyTreeData={familyTreeData} />
      </TabsContent>

      <TabsContent value="members" className="mt-6">
        <MemberManagement
          members={familyTreeData.members}
          onUpdateMember={handleUpdateMember}
          onAddMember={handleAddMember}
          onDeleteMember={handleDeleteMember}
        />
      </TabsContent>

      <TabsContent value="relationships" className="mt-6">
        <RelationshipEditor familyTreeData={familyTreeData} onUpdateMember={handleUpdateMember} />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TreeSettings familyTreeData={familyTreeData} onUpdateSettings={handleUpdateTreeSettings} />
          <ImportExport familyTreeData={familyTreeData} onImport={setFamilyTreeData} />
        </div>
      </TabsContent>
    </Tabs>
  )
}

