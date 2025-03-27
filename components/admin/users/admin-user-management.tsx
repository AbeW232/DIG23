"use client"

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
import {
  Edit,
  FileText,
  Key,
  Link2,
  MoreHorizontal,
  Search,
  Shield,
  Trash2,
  Upload,
  User,
  UserPlus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DigitalLegacyAssets } from "@/components/admin/users/digital-legacy-assets"
import { LegacyContacts } from "@/components/admin/users/legacy-contacts"
import { InheritanceSettings } from "@/components/admin/users/inheritance-settings"

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
    legacyStatus: "configured",
    legacyAssets: 24,
    legacyContacts: 2,
    legacyStorage: "2.4 GB",
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
    legacyStatus: "configured",
    legacyAssets: 16,
    legacyContacts: 1,
    legacyStorage: "1.2 GB",
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
    legacyStatus: "not configured",
    legacyAssets: 0,
    legacyContacts: 0,
    legacyStorage: "0 GB",
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
    legacyStatus: "in progress",
    legacyAssets: 8,
    legacyContacts: 0,
    legacyStorage: "0.8 GB",
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
    legacyStatus: "not configured",
    legacyAssets: 0,
    legacyContacts: 0,
    legacyStorage: "0 GB",
  },
]

export function AdminUserManagement() {
  const [activeTab, setActiveTab] = useState("users")
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [legacyStatusFilter, setLegacyStatusFilter] = useState("all")
  const [userDetailTab, setUserDetailTab] = useState("details")

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesLegacyStatus = legacyStatusFilter === "all" || user.legacyStatus === legacyStatusFilter

    return matchesSearch && matchesStatus && matchesRole && matchesLegacyStatus
  })

  // Get selected user
  const selectedUserData = selectedUser !== null ? users.find((user) => user.id === selectedUser) : null

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="legacy">Legacy Settings</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6 mt-6">
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
                <Select value={legacyStatusFilter} onValueChange={setLegacyStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Legacy Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Legacy Status</SelectItem>
                    <SelectItem value="configured">Configured</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="not configured">Not Configured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-muted shadow-sm">
              <CardHeader>
                <CardTitle>User List</CardTitle>
                <CardDescription>Manage users and their digital legacy settings</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Legacy Status</TableHead>
                      <TableHead>Assets</TableHead>
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
                              user.legacyStatus === "configured"
                                ? "default"
                                : user.legacyStatus === "in progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              user.legacyStatus === "configured"
                                ? "bg-green-500/90 hover:bg-green-500 text-white"
                                : user.legacyStatus === "in progress"
                                  ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                  : "bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50"
                            }
                          >
                            {user.legacyStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {user.legacyAssets} files ({user.legacyStorage})
                            </span>
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
                            <DropdownMenuContent align="end" className="w-[220px]">
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
                              <DropdownMenuItem className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" />
                                <span>Upload Legacy Assets</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Link2 className="mr-2 h-4 w-4" />
                                <span>Manage Legacy Contacts</span>
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
                        <DropdownMenuContent align="end" className="w-[220px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit User</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            <span>Upload Legacy Assets</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Link2 className="mr-2 h-4 w-4" />
                            <span>Manage Legacy Contacts</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete User</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>View and edit user information and legacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="details" value={userDetailTab} onValueChange={setUserDetailTab}>
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="assets">Assets</TabsTrigger>
                        <TabsTrigger value="contacts">Contacts</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="p-4 space-y-4">
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
                            <div className="text-sm text-muted-foreground">Legacy Status</div>
                            <div className="font-medium">
                              <Badge
                                variant={
                                  selectedUserData.legacyStatus === "configured"
                                    ? "default"
                                    : selectedUserData.legacyStatus === "in progress"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  selectedUserData.legacyStatus === "configured"
                                    ? "bg-green-500/90 hover:bg-green-500 text-white"
                                    : selectedUserData.legacyStatus === "in progress"
                                      ? "bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 border-amber-500/50"
                                      : "bg-slate-500/20 text-slate-700 hover:bg-slate-500/30 border-slate-500/50"
                                }
                              >
                                {selectedUserData.legacyStatus}
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
                            <div className="text-sm text-muted-foreground">Legacy Assets</div>
                            <div className="font-medium">{selectedUserData.legacyAssets} files</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Storage Used</div>
                            <div className="font-medium">{selectedUserData.legacyStorage}</div>
                          </div>
                        </div>

                        <div className="space-y-2 pt-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="legacy-enabled" className="cursor-pointer">
                              Digital Legacy Enabled
                            </Label>
                            <Switch
                              id="legacy-enabled"
                              checked={selectedUserData.legacyStatus !== "not configured"}
                              className="data-[state=checked]:bg-green-500"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="assets" className="p-4">
                        <DigitalLegacyAssets userId={selectedUserData.id} />
                      </TabsContent>

                      <TabsContent value="contacts" className="p-4">
                        <LegacyContacts userId={selectedUserData.id} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 border-t p-4">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <User className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium">No User Selected</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    Select a user from the list to view details and manage their digital legacy settings.
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="legacy" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital Legacy Settings</CardTitle>
                <CardDescription>Configure global digital legacy settings for all users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-legacy">Automatic Legacy Setup</Label>
                    <div className="text-sm text-muted-foreground">Enable digital legacy setup for all new users</div>
                  </div>
                  <Switch id="auto-legacy" defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="legacy-reminders">Legacy Setup Reminders</Label>
                    <div className="text-sm text-muted-foreground">
                      Send periodic reminders to configure digital legacy
                    </div>
                  </div>
                  <Switch id="legacy-reminders" defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="space-y-2">
                  <Label>Reminder Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Storage Allocation</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select storage allocation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 GB</SelectItem>
                      <SelectItem value="5">5 GB</SelectItem>
                      <SelectItem value="10">10 GB</SelectItem>
                      <SelectItem value="25">25 GB</SelectItem>
                      <SelectItem value="50">50 GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Legacy Contacts</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select maximum contacts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Contact</SelectItem>
                      <SelectItem value="2">2 Contacts</SelectItem>
                      <SelectItem value="3">3 Contacts</SelectItem>
                      <SelectItem value="5">5 Contacts</SelectItem>
                      <SelectItem value="10">10 Contacts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Legacy Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inheritance Rules</CardTitle>
                <CardDescription>Configure how digital assets are transferred</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InheritanceSettings />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Inheritance Rules</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Digital Asset Types</CardTitle>
              <CardDescription>Configure which types of digital assets can be included in legacy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-stories" defaultChecked />
                    <Label htmlFor="asset-stories">Stories</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-photos" defaultChecked />
                    <Label htmlFor="asset-photos">Photos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-videos" defaultChecked />
                    <Label htmlFor="asset-videos">Videos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-audio" defaultChecked />
                    <Label htmlFor="asset-audio">Audio Recordings</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-documents" defaultChecked />
                    <Label htmlFor="asset-documents">Documents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-journals" defaultChecked />
                    <Label htmlFor="asset-journals">Journals</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-family-tree" defaultChecked />
                    <Label htmlFor="asset-family-tree">Family Tree Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-memorials" defaultChecked />
                    <Label htmlFor="asset-memorials">Memorial Pages</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-messages" defaultChecked />
                    <Label htmlFor="asset-messages">Messages</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-comments" defaultChecked />
                    <Label htmlFor="asset-comments">Comments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-account" defaultChecked />
                    <Label htmlFor="asset-account">Account Information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asset-custom" />
                    <Label htmlFor="asset-custom">Custom Asset Types</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Asset Types</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Legacy Operations</CardTitle>
              <CardDescription>Perform operations on multiple users at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Operation</Label>
                <Select defaultValue="enable">
                  <SelectTrigger>
                    <SelectValue placeholder="Select operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enable">Enable Digital Legacy</SelectItem>
                    <SelectItem value="disable">Disable Digital Legacy</SelectItem>
                    <SelectItem value="reset">Reset Legacy Settings</SelectItem>
                    <SelectItem value="export">Export Legacy Data</SelectItem>
                    <SelectItem value="archive">Archive Legacy Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Users</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                    <SelectItem value="configured">Users with Configured Legacy</SelectItem>
                    <SelectItem value="not-configured">Users without Configured Legacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Confirmation</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="confirm-bulk" />
                  <Label htmlFor="confirm-bulk">I understand this operation will affect multiple user accounts</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Execute Operation</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Import</CardTitle>
              <CardDescription>Import digital legacy data for multiple users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Upload CSV or ZIP File</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Drag and drop a CSV file with user data or a ZIP file containing digital assets
                </p>
                <Button>Select File</Button>
              </div>

              <div className="space-y-2">
                <Label>Import Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-overwrite" />
                    <Label htmlFor="option-overwrite">Overwrite existing data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-notify" defaultChecked />
                    <Label htmlFor="option-notify">Notify users about imported data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="option-validate" defaultChecked />
                    <Label htmlFor="option-validate">Validate data before import</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Start Import</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

