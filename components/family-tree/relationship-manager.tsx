"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Label } from "@/components/ui/label"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

// Sample family members
const familyMembers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Mary Smith" },
  { id: "3", name: "James Smith" },
  { id: "4", name: "Sarah Johnson" },
  { id: "5", name: "Emily Smith" },
  { id: "6", name: "Michael Smith" },
]

// Sample relationships
const initialRelationships = [
  { id: "1", person1: "1", person2: "2", type: "spouse" },
  { id: "2", person1: "1", person2: "3", type: "parent" },
  { id: "3", person1: "2", person2: "3", type: "parent" },
  { id: "4", person1: "3", person2: "4", type: "spouse" },
]

export function RelationshipManager() {
  const [relationships, setRelationships] = useState(initialRelationships)
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newRelationship, setNewRelationship] = useState({
    person1: "",
    person2: "",
    type: "parent",
  })

  const relationshipTypes = [
    { value: "parent", label: "Parent" },
    { value: "child", label: "Child" },
    { value: "spouse", label: "Spouse" },
    { value: "sibling", label: "Sibling" },
  ]

  const getPersonName = (id: string) => {
    const person = familyMembers.find((p) => p.id === id)
    return person ? person.name : "Unknown"
  }

  const handleAddRelationship = () => {
    if (newRelationship.person1 && newRelationship.person2 && newRelationship.type) {
      setRelationships([
        ...relationships,
        {
          id: `${relationships.length + 1}`,
          ...newRelationship,
        },
      ])
      setIsAddDialogOpen(false)
      setNewRelationship({ person1: "", person2: "", type: "parent" })
    }
  }

  const handleDeleteRelationship = (id: string) => {
    setRelationships(relationships.filter((r) => r.id !== id))
  }

  const filteredRelationships = selectedPerson
    ? relationships.filter((r) => r.person1 === selectedPerson || r.person2 === selectedPerson)
    : relationships

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Relationship Manager</CardTitle>
        <CardDescription>Manage family connections and relationships</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Select value={selectedPerson || ""} onValueChange={(value) => setSelectedPerson(value || null)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by person" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Relationships</SelectItem>
              {familyMembers.map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  {person.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Relationship
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Relationship</DialogTitle>
                <DialogDescription>Define a relationship between two family members.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="person1">Person 1</Label>
                  <Select
                    value={newRelationship.person1}
                    onValueChange={(value) => setNewRelationship({ ...newRelationship, person1: value })}
                  >
                    <SelectTrigger id="person1">
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      {familyMembers.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="relationshipType">Relationship Type</Label>
                  <Select
                    value={newRelationship.type}
                    onValueChange={(value) => setNewRelationship({ ...newRelationship, type: value })}
                  >
                    <SelectTrigger id="relationshipType">
                      <SelectValue placeholder="Select relationship type" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="person2">Person 2</Label>
                  <Select
                    value={newRelationship.person2}
                    onValueChange={(value) => setNewRelationship({ ...newRelationship, person2: value })}
                  >
                    <SelectTrigger id="person2">
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      {familyMembers.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRelationship}>Add Relationship</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person 1</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Person 2</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelationships.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    No relationships found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRelationships.map((relationship) => (
                  <TableRow key={relationship.id}>
                    <TableCell>{getPersonName(relationship.person1)}</TableCell>
                    <TableCell className="capitalize">{relationship.type}</TableCell>
                    <TableCell>{getPersonName(relationship.person2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRelationship(relationship.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

