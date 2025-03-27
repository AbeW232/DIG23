"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Edit, Eye, MoreHorizontal, Plus, Save, Settings, Trash, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for roles
const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to all features and settings",
    users: 2,
    isDefault: false,
    isSystem: true,
    permissions: {
      stories: ["create", "read", "update", "delete", "publish"],
      media: ["create", "read", "update", "delete"],
      users: ["create", "read", "update", "delete"],
      settings: ["read", "update"],
      comments: ["create", "read", "update", "delete", "moderate"],
      exhibitions: ["create", "read", "update", "delete", "publish"],
    },
  },
  {
    id: 2,
    name: "Editor",
    description: "Can create, edit, and publish content",
    users: 5,
    isDefault: false,
    isSystem: true,
    permissions: {
      stories: ["create", "read", "update", "delete", "publish"],
      media: ["create", "read", "update", "delete"],
      users: ["read"],
      settings: ["read"],
      comments: ["create", "read", "update", "moderate"],
      exhibitions: ["create", "read", "update", "publish"],
    },
  },
  {
    id: 3,
    name: "Contributor",
    description: "Can create and edit their own content",
    users: 8,
    isDefault: true,
    isSystem: true,
    permissions: {
      stories: ["create", "read", "update"],
      media: ["create", "read", "update"],
      users: ["read"],
      settings: [],
      comments: ["create", "read"],
      exhibitions: ["read"],
    },
  },
  {
    id: 4,
    name: "Viewer",
    description: "Read-only access to content",
    users: 15,
    isDefault: false,
    isSystem: true,
    permissions: {
      stories: ["read"],
      media: ["read"],
      users: [],
      settings: [],
      comments: ["create", "read"],
      exhibitions: ["read"],
    },
  },
  {
    id: 5,
    name: "Family Member",
    description: "Custom role for family members",
    users: 12,
    isDefault: false,
    isSystem: false,
    permissions: {
      stories: ["read", "create", "update"],
      media: ["read", "create"],
      users: [],
      settings: [],
      comments: ["create", "read"],
      exhibitions: ["read"],
    },
  },
]

export function UserRoles() {
  const [activeTab, setActiveTab] = useState("roles")
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>Manage roles and assign permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id} className={selectedRole === role.id ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell>
                        {role.isDefault ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {role.isSystem ? (
                          <Badge variant="secondary">System</Badge>
                        ) : (
                          <Badge variant="outline">Custom</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRole(role.id)
                                setEditMode(false)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRole(role.id)
                                setEditMode(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Role</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              <span>Assign Users</span>
                            </DropdownMenuItem>
                            {!role.isDefault && (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Make Default</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {!role.isSystem && (
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Role</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedRole !== null && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{editMode ? "Edit Role" : "Role Details"}</CardTitle>
                    <CardDescription>
                      {roles.find((r) => r.id === selectedRole)?.name} -
                      {roles.find((r) => r.id === selectedRole)?.isSystem ? " System Role" : " Custom Role"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!editMode && (
                      <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setSelectedRole(null)}>
                      ✕
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const role = roles.find((r) => r.id === selectedRole)
                  if (!role) return null

                  if (editMode) {
                    return (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="role-name">Role Name</Label>
                          <Input id="role-name" defaultValue={role.name} disabled={role.isSystem} />
                          {role.isSystem && (
                            <p className="text-xs text-muted-foreground">System role names cannot be changed</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role-description">Description</Label>
                          <Input id="role-description" defaultValue={role.description} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="default-role">Default Role</Label>
                            <p className="text-xs text-muted-foreground">Assign this role to new users by default</p>
                          </div>
                          <Switch id="default-role" checked={role.isDefault} />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Permissions</h3>
                          <div className="border rounded-md p-4 space-y-4">
                            {Object.entries(role.permissions).map(([category, actions]) => (
                              <div key={category} className="space-y-2">
                                <h4 className="text-sm font-medium capitalize">{category}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {["create", "read", "update", "delete", "publish", "moderate"].map((action) => {
                                    // Skip if this action is not applicable to this category
                                    if (
                                      (action === "publish" && !["stories", "exhibitions"].includes(category)) ||
                                      (action === "moderate" && category !== "comments")
                                    ) {
                                      return null
                                    }

                                    return (
                                      <div key={action} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`${category}-${action}`}
                                          checked={role.permissions[category as keyof typeof role.permissions].includes(
                                            action,
                                          )}
                                          disabled={role.isSystem && category === "users" && action === "read"}
                                        />
                                        <Label htmlFor={`${category}-${action}`} className="capitalize">
                                          {action}
                                        </Label>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {role.isSystem && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>System Role</AlertTitle>
                            <AlertDescription>
                              This is a system role with some restrictions on what can be modified. Core permissions
                              cannot be changed.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )
                  } else {
                    return (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">Role Name</h3>
                            <p>{role.name}</p>
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">Users Assigned</h3>
                            <p>{role.users}</p>
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">Default Role</h3>
                            <p>{role.isDefault ? "Yes" : "No"}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Description</h3>
                          <p className="text-sm">{role.description}</p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Permissions</h3>
                          <div className="border rounded-md">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Category</TableHead>
                                  <TableHead>Create</TableHead>
                                  <TableHead>Read</TableHead>
                                  <TableHead>Update</TableHead>
                                  <TableHead>Delete</TableHead>
                                  <TableHead>Other</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Object.entries(role.permissions).map(([category, actions]) => (
                                  <TableRow key={category}>
                                    <TableCell className="font-medium capitalize">{category}</TableCell>
                                    <TableCell>
                                      {actions.includes("create") ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <span className="text-muted-foreground">—</span>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {actions.includes("read") ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <span className="text-muted-foreground">—</span>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {actions.includes("update") ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <span className="text-muted-foreground">—</span>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {actions.includes("delete") ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                      ) : (
                                        <span className="text-muted-foreground">—</span>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {actions.includes("publish") && <Badge className="mr-1">Publish</Badge>}
                                      {actions.includes("moderate") && <Badge>Moderate</Badge>}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })()}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {editMode && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditMode(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Settings</CardTitle>
              <CardDescription>Configure system-wide permission settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Content Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="private-stories">Private Stories</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow users to create private stories only they can access
                      </p>
                    </div>
                    <Switch id="private-stories" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shared-editing">Shared Editing</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow multiple users to collaborate on the same story
                      </p>
                    </div>
                    <Switch id="shared-editing" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="content-approval">Content Approval</Label>
                      <p className="text-xs text-muted-foreground">
                        Require admin approval before publishing new content
                      </p>
                    </div>
                    <Switch id="content-approval" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">User Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="self-registration">Self Registration</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow users to register accounts without admin approval
                      </p>
                    </div>
                    <Switch id="self-registration" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="invite-users">User Invitations</Label>
                      <p className="text-xs text-muted-foreground">Allow users to invite others to the platform</p>
                    </div>
                    <Switch id="invite-users" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <p className="text-xs text-muted-foreground">Allow users to control who can see their profile</p>
                    </div>
                    <Switch id="profile-visibility" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Advanced Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="role-inheritance">Role Inheritance</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow roles to inherit permissions from other roles
                      </p>
                    </div>
                    <Switch id="role-inheritance" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="granular-permissions">Granular Permissions</Label>
                      <p className="text-xs text-muted-foreground">Enable more detailed permission controls</p>
                    </div>
                    <Switch id="granular-permissions" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="permission-audit">Permission Auditing</Label>
                      <p className="text-xs text-muted-foreground">Log all permission changes for audit purposes</p>
                    </div>
                    <Switch id="permission-audit" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Settings className="h-4 w-4 mr-2" />
                Save Permission Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

