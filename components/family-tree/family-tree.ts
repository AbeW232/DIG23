"\"use client"

import { useState } from "react"
import { FamilyTreeTabs } from "./family-tree-tabs"

// Define FamilyMember type
export type FamilyMember = {
  id: string
  name: string
  birthDate?: string
  deathDate?: string
  imageUrl?: string
  gender: "male" | "female" | "other"
  bio?: string
  parents: string[]
  children: string[]
  partners: string[]
  siblings: string[]
}

// Define FamilyTreeData type
export type FamilyTreeData = {
  members: FamilyMember[]
  rootMemberId?: string
  name: string
  description?: string
  lastModified: string
  createdAt: string
}

// Define ModernFamilyMember type (inferred from usage)
export type ModernFamilyMember = {
  id: string
  name: string
  birthYear?: string
  deathYear?: string
  gender: "male" | "female" | "other"
  bio?: string
  imageUrl?: string
  parentIds: string[]
  spouseIds: string[]
  childrenIds: string[]
}

// Family Tree component
export function FamilyTree() {
  const [familyTreeData, setFamilyTreeData] = useState({
    name: "Smith Family Tree",
    description: "A digital record of the Smith family history",
    lastModified: "2025-03-22",
    createdAt: "2025-01-15",
    rootMemberId: "member1",
    members: [],
  })

  return (
    <div className="space-y-6">
      <FamilyTreeTabs familyTreeData={familyTreeData} onFamilyTreeDataChange={setFamilyTreeData} />
    </div>
  )
}

