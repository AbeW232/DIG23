"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Key, MoreHorizontal, Plus, Search, Shield, Trash2, User, UserPlus, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for users
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-03-20 14:32",
    avatar: "/placeholder.svg?height=40&width=40",
    stories: 12,
    joined: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "editor",
    status: "active",
    lastLogin: "2024-03-19 10:15",
    avatar: "/placeholder.svg?height=40&width=40",
    stories: 8,
    joined: "2023-06-22",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2024-02-28 09:45",
    avatar: "/placeholder.svg?height=40&width=40",
    stories: 0,
    joined: "2023-07-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "contributor",
    status: "active",
    lastLogin: "2024-03-18 16:30",
    avatar: "/placeholder.svg?height=40&width=40",
    stories: 5,
    joined: "2023-08-05",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "viewer",
    status: "pending",
    lastLogin: "Never",
    avatar: "/placeholder.svg?height=40&width=40",
    stories: 0,
    joined: "2024-03-15",
  },
]

// Sample data for roles
const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all features and settings",
    users: 1,
    permissions: [
      { id: 1, name: "Create Stories", granted: true },
      { id: 2, name: "Edit Stories", granted: true },
      { id: 3, name: "Delete Stories", granted: true },
      { id: 4, name: "Manage Users", granted: true },
      { id: 5, name: "Manage Settings", granted: true },
      { id: 6, name: "Manage Comments", granted: true },
      { id: 7, name: "View Analytics", granted: true },
    ],
  },
  {
    id: 2,
    name: "Editor",
    description: "Can create and edit content, but cannot manage users or settings",
    users: 1,
    permissions: [
      { id: 1, name: "Create Stories", granted: true },
      { id: 2, name: "Edit Stories", granted: true },
      { id: 3, name: "Delete Stories", granted: true },
      { id: 4, name: "Manage Users", granted: false },
      { id: 5, name: "Manage Settings", granted: false },
      { id: 6, name: "Manage Comments", granted: true },
      { id: 7, name: "View Analytics", granted: true },
    ],
  },
  {
    id: 3,
    name: "Contributor",
    description: "Can create and edit their own content only",
    users: 1,
    permissions: [
      { id: 1, name: "Create Stories", granted: true },
      { id: 2, name: "Edit Stories", granted: true, note: "Own stories only" },
      { id: 3, name: "Delete Stories", granted: true, note: "Own stories only" },
      { id: 4, name: "Manage Users", granted: false },
      { id: 5, name: "Manage Settings", granted: false },
      { id: 6, name: "Manage Comments", granted: true, note: "Own stories only" },
      { id: 7, name: "View Analytics", granted: true, note: "Own stories only" },
    ],
  },
  {
    id: 4,
    name: "Viewer",
    description: "Can only view content, cannot make any changes",
    users: 2,
    permissions: [
      { id: 1, name: "Create Stories", granted: false },
      { id: 2, name: "Edit Stories", granted: false },
      { id: 3, name: "Delete Stories", granted: false },
      { id: 4, name: "Manage Users", granted: false },
      { id: 5, name: "Manage Settings", granted: false },
      { id: 6, name: "Manage Comments", granted: false },
      { id: 7, name: "View Analytics", granted: false },
    ],
  },
]

export function UserManagement() {
  const [activeTab, setActiveTab] = useState("administration")
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  // Get selected user
  const selectedUserData = selectedUser !== null ? users.find((user) => user.id === selectedUser) : null

  // Get selected role
  const selectedRoleData = selectedRole !== null ? roles.find((role) => role.id === selectedRole) : null

  return (
    <div className="space-y-6">
      <Tabs defaultValue="administration" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="administration">Administration</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="administration" className="space-y-6 mt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button variant="default" className="gap-1 shadow-sm hover:shadow transition-all">
              <UserPlus className="h-4 w-4 mr-1" />
              Add User
            </Button>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-[300px] transition-all focus-visible:ring-offset-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="contributor">Contributor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-muted shadow-sm">
              <CardHeader>
                <CardTitle>User List</CardTitle>
                <CardDescription>Manage users and their access to the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className={`${selectedUser === user.id ? "bg-muted" : ""} hover:bg-muted/50 transition-colors cursor-pointer`}
                        onClick={() => setSelectedUser(user.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {user.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "admin" ? "default" : user.role === "editor" ? "secondary" : "outline"
                            }
                            className={
                              user.role === "admin"
                                ? "bg-blue-500/90 hover:bg-blue-500 text-white"
                                : user.role === "editor"
                                  ? "bg-purple-500/90 hover:bg-purple-500 text-white"
                                  : user.role === "contributor"
                                    ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                    : "bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              user.status === "active"
                                ? "bg-green-500/90 hover:bg-green-500 text-white"
                                : user.status === "pending"
                                  ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                  : user.status === "inactive"
                                    ? "bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50"
                                    : ""
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                user.lastLogin === "Never"
                                  ? "bg-slate-400"
                                  : new Date(user.lastLogin).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
                                    ? "bg-green-500"
                                    : "bg-amber-500"
                              }`}
                            ></div>
                            {user.lastLogin}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[180px]">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Key className="mr-2 h-4 w-4" />
                                <span>Reset Password</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Change Role</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="md:col-span-1 border-muted shadow-sm">
              {selectedUser !== null && selectedUserData ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>User Details</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit User</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Key className="mr-2 h-4 w-4" />
                            <span>Reset Password</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete User</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>View and edit user information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                        <AvatarImage src={selectedUserData.avatar} alt={selectedUserData.name} />
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary font-medium">
                          {selectedUserData.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <div className="font-medium text-lg">{selectedUserData.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedUserData.email}</div>
                      </div>
                    </div>

                    <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Role</div>
                        <div className="font-medium">
                          <Badge
                            variant={
                              selectedUserData.role === "admin"
                                ? "default"
                                : selectedUserData.role === "editor"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              selectedUserData.role === "admin"
                                ? "bg-blue-500/90 hover:bg-blue-500 text-white"
                                : selectedUserData.role === "editor"
                                  ? "bg-purple-500/90 hover:bg-purple-500 text-white"
                                  : selectedUserData.role === "contributor"
                                    ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                    : "bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50"
                            }
                          >
                            {selectedUserData.role}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div className="font-medium">
                          <Badge
                            variant={
                              selectedUserData.status === "active"
                                ? "default"
                                : selectedUserData.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              selectedUserData.status === "active"
                                ? "bg-green-500/90 hover:bg-green-500 text-white"
                                : selectedUserData.status === "pending"
                                  ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                  : selectedUserData.status === "inactive"
                                    ? "bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50"
                                    : ""
                            }
                          >
                            {selectedUserData.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Joined</div>
                        <div className="font-medium">{selectedUserData.joined}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Last Login</div>
                        <div className="font-medium">{selectedUserData.lastLogin}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm text-muted-foreground">Stories</div>
                        <div className="font-medium">{selectedUserData.stories}</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Label>Change Role</Label>
                      <Select defaultValue={selectedUserData.role}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="contributor">Contributor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Change Status</Label>
                      <Select defaultValue={selectedUserData.status}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <User className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium">No User Selected</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    Select a user from the list to view details and make changes.
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6 mt-6">
          <div className="flex justify-between gap-4">
            <Button variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Create New Role
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Roles</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-2">
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${selectedRole === role.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-primary" />
                          <span>{role.name}</span>
                        </div>
                        <Badge variant="outline">{role.users} users</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Role
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              {selectedRole !== null && selectedRoleData ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{selectedRoleData.name} Role</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Role</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>View Users</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Role</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{selectedRoleData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Role Name</Label>
                      <Input value={selectedRoleData.name} />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={selectedRoleData.description} />
                    </div>

                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Permission</TableHead>
                              <TableHead className="w-[100px]">Access</TableHead>
                              <TableHead>Notes</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedRoleData.permissions.map((permission) => (
                              <TableRow key={permission.id}>
                                <TableCell>{permission.name}</TableCell>
                                <TableCell>
                                  <Checkbox checked={permission.granted} />
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">{permission.note}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Role Selected</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select a role from the list to view and edit permissions.
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Control Settings</CardTitle>
                <CardDescription>Configure global access control settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <div className="text-sm text-muted-foreground">Require two-factor authentication for all users</div>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-policy">Strong Password Policy</Label>
                    <div className="text-sm text-muted-foreground">Enforce strong password requirements</div>
                  </div>
                  <Switch id="password-policy" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <div className="text-sm text-muted-foreground">Automatically log out inactive users</div>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout Duration</Label>
                  <Select defaultValue="60">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Role for New Users</Label>
                  <Select defaultValue="viewer">
                    <SelectTrigger>
                      <SelectValue placeholder="Select default role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Security</CardTitle>
                <CardDescription>Configure login and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="failed-attempts">Failed Login Attempts</Label>
                    <div className="text-sm text-muted-foreground">
                      Lock accounts after multiple failed login attempts
                    </div>
                  </div>
                  <Switch id="failed-attempts" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Failed Attempts</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select maximum attempts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Account Lockout Duration</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select lockout duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="1440">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <div className="text-sm text-muted-foreground">Force password change after a certain period</div>
                  </div>
                  <Switch id="password-expiry" />
                </div>

                <div className="space-y-2">
                  <Label>Password Expiry Period</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiry period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Security Settings</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Access Controls</CardTitle>
              <CardDescription>Configure who can access different types of content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Story Visibility Default</Label>
                    <Select defaultValue="private">
                      <SelectTrigger>
                        <SelectValue placeholder="Select default visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="shared">Shared with specific users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Media Library Access</Label>
                    <Select defaultValue="role-based">
                      <SelectTrigger>
                        <SelectValue placeholder="Select access type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-users">All Users</SelectItem>
                        <SelectItem value="role-based">Role-Based</SelectItem>
                        <SelectItem value="owner-only">Owner Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Analytics Access</Label>
                    <Select defaultValue="admin-editor">
                      <SelectTrigger>
                        <SelectValue placeholder="Select access type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin-only">Admin Only</SelectItem>
                        <SelectItem value="admin-editor">Admin & Editors</SelectItem>
                        <SelectItem value="all-users">All Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Role-Based Content Access</Label>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content Type</TableHead>
                          <TableHead>Admin</TableHead>
                          <TableHead>Editor</TableHead>
                          <TableHead>Contributor</TableHead>
                          <TableHead>Viewer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Stories</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Media Library</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Analytics</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>User Management</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Settings</TableCell>
                          <TableCell>
                            <Checkbox defaultChecked />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Access Controls</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

