"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  SortAsc,
  User,
  Calendar,
  FileText,
  ChevronDown,
  Upload,
  Download,
} from "lucide-react"
import type { FamilyMember } from "./family-tree"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MemberManagementProps {
  members: FamilyMember[]
  onUpdateMember: (member: FamilyMember) => void
  onAddMember: (member: FamilyMember) => void
  onDeleteMember: (memberId: string) => void
}

export function MemberManagement({ members, onUpdateMember, onAddMember, onDeleteMember }: MemberManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState("table")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [genderFilter, setGenderFilter] = useState<string>("all")

  // Filter members based on search term and gender filter
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.bio && member.bio.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesGender = genderFilter === "all" || member.gender === genderFilter

    return matchesSearch && matchesGender
  })

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "birthDate":
        comparison = (a.birthDate || "").localeCompare(b.birthDate || "")
        break
      case "gender":
        comparison = a.gender.localeCompare(b.gender)
        break
      case "children":
        comparison = a.children.length - b.children.length
        break
      default:
        comparison = a.name.localeCompare(b.name)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  // Form for adding/editing members
  const form = useForm<Omit<FamilyMember, "id" | "parents" | "children" | "partners" | "siblings">>({
    defaultValues: {
      name: "",
      birthDate: "",
      deathDate: "",
      gender: "other",
      bio: "",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  })

  // Handle form submission for adding a new member
  const handleAddMember = (data: Omit<FamilyMember, "id" | "parents" | "children" | "partners" | "siblings">) => {
    const newMember: FamilyMember = {
      ...data,
      id: uuidv4(),
      parents: [],
      children: [],
      partners: [],
      siblings: [],
    }

    onAddMember(newMember)
    setIsAddDialogOpen(false)
    form.reset()
  }

  // Handle form submission for editing a member
  const handleEditMember = (data: Omit<FamilyMember, "id" | "parents" | "children" | "partners" | "siblings">) => {
    if (!selectedMember) return

    const updatedMember: FamilyMember = {
      ...selectedMember,
      ...data,
    }

    onUpdateMember(updatedMember)
    setIsEditDialogOpen(false)
    setSelectedMember(null)
  }

  // Open edit dialog and populate form with member data
  const openEditDialog = (member: FamilyMember) => {
    setSelectedMember(member)
    form.reset({
      name: member.name,
      birthDate: member.birthDate || "",
      deathDate: member.deathDate || "",
      gender: member.gender,
      bio: member.bio || "",
      imageUrl: member.imageUrl || "/placeholder.svg?height=100&width=100",
    })
    setIsEditDialogOpen(true)
  }

  // Confirm and handle member deletion
  const confirmDelete = () => {
    if (memberToDelete) {
      onDeleteMember(memberToDelete)
      setMemberToDelete(null)
    }
  }

  // Toggle sort direction or change sort field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Render card view
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {sortedMembers.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">No family members found</div>
        ) : (
          sortedMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        member.gender === "male"
                          ? "bg-blue-100 text-blue-600"
                          : member.gender === "female"
                            ? "bg-pink-100 text-pink-600"
                            : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      <User className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{member.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}
                        </Badge>
                        {member.birthDate && (
                          <span className="text-xs text-muted-foreground">
                            Born: {new Date(member.birthDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {member.bio && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 3v12" />
                        <circle cx="12" cy="20" r="3" />
                        <path d="M18 9a6 6 0 0 0-12 0" />
                      </svg>
                      {member.parents.length} parents
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 3v12" />
                        <circle cx="12" cy="3" r="3" />
                        <path d="M6 20h12" />
                        <path d="M6 16v4" />
                        <path d="M18 16v4" />
                      </svg>
                      {member.children.length} children
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                      {member.partners.length} partners
                    </div>
                  </div>
                </div>

                <div className="border-t flex divide-x">
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-none h-10 text-xs font-normal"
                    onClick={() => openEditDialog(member)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex-1 rounded-none h-10 text-xs font-normal text-destructive hover:text-destructive"
                        onClick={() => setMemberToDelete(member.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Family Member</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {member.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2">
                  <p className="text-xs font-medium mb-2">Gender</p>
                  <Select value={genderFilter} onValueChange={setGenderFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort("name")}>
                  <User className="h-4 w-4 mr-2" />
                  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("birthDate")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Birth Date {sortField === "birthDate" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("gender")}>
                  <User className="h-4 w-4 mr-2" />
                  Gender {sortField === "gender" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("children")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Children {sortField === "children" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tabs value={viewMode} onValueChange={setViewMode} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="card">Cards</TabsTrigger>
              </TabsList>
            </Tabs>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Family Member</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new family member. You can edit relationships in the Relationships tab.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddMember)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deathDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Death Date (if applicable)</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biography</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter a short biography..." className="resize-none" {...field} />
                          </FormControl>
                          <FormDescription>A brief description about this family member.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Member</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <TabsContent value="table" className={viewMode === "table" ? "block" : "hidden"}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <Button variant="ghost" className="-ml-4 font-medium" onClick={() => handleSort("name")}>
                    Name
                    {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="-ml-4 font-medium" onClick={() => handleSort("birthDate")}>
                    Birth Date
                    {sortField === "birthDate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="-ml-4 font-medium" onClick={() => handleSort("gender")}>
                    Gender
                    {sortField === "gender" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </Button>
                </TableHead>
                <TableHead>Relationships</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No family members found
                  </TableCell>
                </TableRow>
              ) : (
                sortedMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            member.gender === "male"
                              ? "bg-blue-100 text-blue-600"
                              : member.gender === "female"
                                ? "bg-pink-100 text-pink-600"
                                : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          <User className="h-4 w-4" />
                        </div>
                        {member.name}
                      </div>
                    </TableCell>
                    <TableCell>{member.birthDate || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          member.gender === "male"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : member.gender === "female"
                              ? "bg-pink-50 text-pink-700 border-pink-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                        }
                      `}
                      >
                        {member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm flex gap-2">
                        <Badge variant="outline">{member.children.length} children</Badge>
                        <Badge variant="outline">{member.parents.length} parents</Badge>
                        <Badge variant="outline">{member.partners.length} partners</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(member)}>
                          <Edit className="h-4 w-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setMemberToDelete(member.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Family Member</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {member.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="card" className={viewMode === "card" ? "block" : "hidden"}>
        {renderCardView()}
      </TabsContent>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Family Member</DialogTitle>
            <DialogDescription>
              Update the details of this family member. You can edit relationships in the Relationships tab.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditMember)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deathDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Death Date (if applicable)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a short biography..." className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>A brief description about this family member.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Footer */}
      <div className="border-t p-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{filteredMembers.length} members found</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Members
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Members
          </Button>
        </div>
      </div>
    </div>
  )
}

