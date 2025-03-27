"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Trash2 } from "lucide-react"
import type { FamilyTreeData, FamilyMember } from "./family-tree"

interface RelationshipEditorProps {
  familyTreeData: FamilyTreeData
  onUpdateMember: (member: FamilyMember) => void
}

type RelationshipType = "parents" | "children" | "partners" | "siblings"

export function RelationshipEditor({ familyTreeData, onUpdateMember }: RelationshipEditorProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<RelationshipType>("parents")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [relationToAdd, setRelationToAdd] = useState<string | null>(null)
  const [relationToRemove, setRelationToRemove] = useState<{
    type: RelationshipType
    id: string
  } | null>(null)

  // Get the selected member
  const selectedMember = selectedMemberId ? familyTreeData.members.find((m) => m.id === selectedMemberId) : null

  // Get available members for relationship selection (excluding the selected member)
  const getAvailableMembers = (relationshipType: RelationshipType) => {
    if (!selectedMember) return []

    // Get IDs of members already in the relationship
    const existingRelationIds = selectedMember[relationshipType]

    // Filter out the selected member and existing relations
    return familyTreeData.members.filter((m) => m.id !== selectedMemberId && !existingRelationIds.includes(m.id))
  }

  // Get members that are in the relationship
  const getRelationMembers = (relationshipType: RelationshipType) => {
    if (!selectedMember) return []

    return familyTreeData.members.filter((m) => selectedMember[relationshipType].includes(m.id))
  }

  // Add a relationship
  const addRelationship = () => {
    if (!selectedMember || !relationToAdd) return

    // Create updated member with new relationship
    const updatedMember = {
      ...selectedMember,
      [activeTab]: [...selectedMember[activeTab], relationToAdd],
    }

    // Update the related member as well
    const relatedMember = familyTreeData.members.find((m) => m.id === relationToAdd)
    if (relatedMember) {
      let relatedRelationType: RelationshipType

      // Determine the reciprocal relationship type
      switch (activeTab) {
        case "parents":
          relatedRelationType = "children"
          break
        case "children":
          relatedRelationType = "parents"
          break
        case "partners":
          relatedRelationType = "partners"
          break
        case "siblings":
          relatedRelationType = "siblings"
          break
      }

      const updatedRelatedMember = {
        ...relatedMember,
        [relatedRelationType]: [...relatedMember[relatedRelationType], selectedMember.id],
      }

      // Update both members
      onUpdateMember(updatedMember)
      onUpdateMember(updatedRelatedMember)
    }

    // Reset state
    setIsAddDialogOpen(false)
    setRelationToAdd(null)
  }

  // Remove a relationship
  const removeRelationship = () => {
    if (!selectedMember || !relationToRemove) return

    // Create updated member with relationship removed
    const updatedMember = {
      ...selectedMember,
      [relationToRemove.type]: selectedMember[relationToRemove.type].filter((id) => id !== relationToRemove.id),
    }

    // Update the related member as well
    const relatedMember = familyTreeData.members.find((m) => m.id === relationToRemove.id)
    if (relatedMember) {
      let relatedRelationType: RelationshipType

      // Determine the reciprocal relationship type
      switch (relationToRemove.type) {
        case "parents":
          relatedRelationType = "children"
          break
        case "children":
          relatedRelationType = "parents"
          break
        case "partners":
          relatedRelationType = "partners"
          break
        case "siblings":
          relatedRelationType = "siblings"
          break
      }

      const updatedRelatedMember = {
        ...relatedMember,
        [relatedRelationType]: relatedMember[relatedRelationType].filter((id) => id !== selectedMember.id),
      }

      // Update both members
      onUpdateMember(updatedMember)
      onUpdateMember(updatedRelatedMember)
    }

    // Reset state
    setRelationToRemove(null)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Relationship Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Family Member</label>
              <Select
                value={selectedMemberId || ""}
                onValueChange={(value) => {
                  setSelectedMemberId(value)
                  setActiveTab("parents")
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a family member" />
                </SelectTrigger>
                <SelectContent>
                  {familyTreeData.members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMember && (
              <div className="pt-4">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as RelationshipType)}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="parents">Parents</TabsTrigger>
                    <TabsTrigger value="children">Children</TabsTrigger>
                    <TabsTrigger value="partners">Partners</TabsTrigger>
                    <TabsTrigger value="siblings">Siblings</TabsTrigger>
                  </TabsList>

                  {(["parents", "children", "partners", "siblings"] as const).map((tabValue) => (
                    <TabsContent key={tabValue} value={tabValue} className="pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold capitalize">
                          {selectedMember.name}'s {tabValue}
                        </h3>

                        <Dialog
                          open={isAddDialogOpen && activeTab === tabValue}
                          onOpenChange={(open) => {
                            setIsAddDialogOpen(open)
                            if (!open) setRelationToAdd(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add {tabValue.slice(0, -1)}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add {tabValue.slice(0, -1)}</DialogTitle>
                              <DialogDescription>
                                Select a family member to add as {selectedMember.name}'s {tabValue.slice(0, -1)}.
                              </DialogDescription>
                            </DialogHeader>

                            <Select onValueChange={setRelationToAdd}>
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${tabValue.slice(0, -1)}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableMembers(tabValue).map((member) => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={addRelationship} disabled={!relationToAdd}>
                                Add Relationship
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Birth Date</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getRelationMembers(tabValue).length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                No {tabValue} found
                              </TableCell>
                            </TableRow>
                          ) : (
                            getRelationMembers(tabValue).map((member) => (
                              <TableRow key={member.id}>
                                <TableCell className="font-medium">{member.name}</TableCell>
                                <TableCell>{member.birthDate || "Unknown"}</TableCell>
                                <TableCell>{member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}</TableCell>
                                <TableCell className="text-right">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          setRelationToRemove({
                                            type: tabValue,
                                            id: member.id,
                                          })
                                        }
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Remove Relationship</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to remove {member.name} as {selectedMember.name}'s{" "}
                                          {tabValue.slice(0, -1)}?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={removeRelationship}>Remove</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

