"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, FileText, Image, Lock, MessageSquare, Save, Settings, Shield, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for permission matrix
const permissionMatrix = {
  stories: {
    name: "Stories",
    icon: <FileText className="h-4 w-4" />,
    permissions: [
      { name: "create", admin: true, editor: true, contributor: true, viewer: false },
      { name: "read", admin: true, editor: true, contributor: true, viewer: true },
      { name: "update", admin: true, editor: true, contributor: true, viewer: false },
      { name: "delete", admin: true, editor: true, contributor: false, viewer: false },
      { name: "publish", admin: true, editor: true, contributor: false, viewer: false },
    ],
  },
  media: {
    name: "Media Library",
    icon: <Image className="h-4 w-4" />,
    permissions: [
      { name: "create", admin: true, editor: true, contributor: true, viewer: false },
      { name: "read", admin: true, editor: true, contributor: true, viewer: true },
      { name: "update", admin: true, editor: true, contributor: true, viewer: false },
      { name: "delete", admin: true, editor: true, contributor: false, viewer: false },
    ],
  },
  users: {
    name: "User Management",
    icon: <Users className="h-4 w-4" />,
    permissions: [
      { name: "create", admin: true, editor: false, contributor: false, viewer: false },
      { name: "read", admin: true, editor: true, contributor: true, viewer: false },
      { name: "update", admin: true, editor: false, contributor: false, viewer: false },
      { name: "delete", admin: true, editor: false, contributor: false, viewer: false },
    ],
  },
  settings: {
    name: "Settings",
    icon: <Settings className="h-4 w-4" />,
    permissions: [
      { name: "read", admin: true, editor: true, contributor: false, viewer: false },
      { name: "update", admin: true, editor: false, contributor: false, viewer: false },
    ],
  },
  comments: {
    name: "Comments",
    icon: <MessageSquare className="h-4 w-4" />,
    permissions: [
      { name: "create", admin: true, editor: true, contributor: true, viewer: true },
      { name: "read", admin: true, editor: true, contributor: true, viewer: true },
      { name: "update", admin: true, editor: true, contributor: false, viewer: false },
      { name: "delete", admin: true, editor: true, contributor: false, viewer: false },
      { name: "moderate", admin: true, editor: true, contributor: false, viewer: false },
    ],
  },
}

export function Permissions() {
  const [activeTab, setActiveTab] = useState("matrix")
  const [selectedRole, setSelectedRole] = useState("admin")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="matrix" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Permissions</TabsTrigger>
          <TabsTrigger value="audit">Permission Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>View and configure permissions for each role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role to edit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Feature / Permission</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Editor</TableHead>
                        <TableHead>Contributor</TableHead>
                        <TableHead>Viewer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(permissionMatrix).map(([key, category]) => (
                        <React.Fragment key={key}>
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={5} className="font-medium">
                              <div className="flex items-center gap-2">
                                {category.icon}
                                {category.name}
                              </div>
                            </TableCell>
                          </TableRow>
                          {category.permissions.map((permission, index) => (
                            <TableRow key={`${key}-${permission.name}`}>
                              <TableCell className="pl-8 capitalize">{permission.name}</TableCell>
                              <TableCell>
                                <Checkbox
                                  checked={permission.admin}
                                  disabled={selectedRole !== "admin" || (key === "users" && permission.name === "read")}
                                />
                              </TableCell>
                              <TableCell>
                                <Checkbox checked={permission.editor} disabled={selectedRole !== "editor"} />
                              </TableCell>
                              <TableCell>
                                <Checkbox checked={permission.contributor} disabled={selectedRole !== "contributor"} />
                              </TableCell>
                              <TableCell>
                                <Checkbox checked={permission.viewer} disabled={selectedRole !== "viewer"} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Permission Changes</AlertTitle>
                  <AlertDescription>
                    Changes to permissions will affect all users with the selected role. Some system permissions cannot
                    be modified.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Permissions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Permissions</CardTitle>
              <CardDescription>Configure granular and custom permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Content Ownership</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="own-content">Own Content Permissions</Label>
                      <p className="text-xs text-muted-foreground">
                        Users have additional permissions for content they created
                      </p>
                    </div>
                    <Switch id="own-content" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Own Content Overrides</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="own-update" defaultChecked />
                        <Label htmlFor="own-update">Can always update own content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="own-delete" defaultChecked />
                        <Label htmlFor="own-delete">Can always delete own content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="own-publish" />
                        <Label htmlFor="own-publish">Can always publish own content</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="own-share" defaultChecked />
                        <Label htmlFor="own-share">Can always share own content</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Permission Inheritance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="inheritance">Role Inheritance</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow roles to inherit permissions from other roles
                      </p>
                    </div>
                    <Switch id="inheritance" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inheritance-chain">Inheritance Chain</Label>
                    <Select disabled>
                      <SelectTrigger id="inheritance-chain">
                        <SelectValue placeholder="Enable role inheritance first" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple (Viewer → Contributor → Editor → Admin)</SelectItem>
                        <SelectItem value="custom">Custom Inheritance Chain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Content Access Controls</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="private-content">Private Content</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow users to create private content only they can access
                      </p>
                    </div>
                    <Switch id="private-content" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="shared-content">Shared Content</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow users to share content with specific users or groups
                      </p>
                    </div>
                    <Switch id="shared-content" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="content-expiry">Content Expiry</Label>
                      <p className="text-xs text-muted-foreground">Allow setting expiration dates for content access</p>
                    </div>
                    <Switch id="content-expiry" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Custom Permission Groups</h3>
                <div className="border rounded-md p-4">
                  <div className="text-center text-muted-foreground py-8">
                    <Lock className="h-8 w-8 mx-auto mb-2" />
                    <p>Custom permission groups are not enabled</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Shield className="h-4 w-4 mr-2" />
                      Enable Custom Groups
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Audit Log</CardTitle>
              <CardDescription>Track changes to permissions and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Audit Logging</h3>
                    <p className="text-xs text-muted-foreground">
                      Record all permission changes for security and compliance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          date: "2024-03-20 14:32",
                          user: "John Doe (Admin)",
                          action: "Role Modified",
                          details: "Changed permissions for Editor role",
                        },
                        {
                          date: "2024-03-18 09:15",
                          user: "John Doe (Admin)",
                          action: "Permission Added",
                          details: "Added 'publish' permission to Contributor role",
                        },
                        {
                          date: "2024-03-15 16:45",
                          user: "System",
                          action: "Role Created",
                          details: "Created new custom role 'Family Member'",
                        },
                        {
                          date: "2024-03-10 11:30",
                          user: "Jane Smith (Editor)",
                          action: "User Role Changed",
                          details: "Changed Robert Johnson from Viewer to Contributor",
                        },
                        {
                          date: "2024-03-05 13:20",
                          user: "John Doe (Admin)",
                          action: "Permission Removed",
                          details: "Removed 'delete' permission from Contributor role",
                        },
                      ].map((log, i) => (
                        <TableRow key={i}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{log.action}</Badge>
                          </TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Showing 5 of 24 log entries</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export Logs
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

