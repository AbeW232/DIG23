"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Archive, Clock, FileText, Save } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RetentionPolicies() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Retention Policies</CardTitle>
                <CardDescription>Configure how long digital legacy assets are retained</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="retention-enabled" className="cursor-pointer">
                  Enable Retention Policies
                </Label>
                <div className="text-sm text-muted-foreground">Apply retention policies to digital legacy assets</div>
              </div>
              <Switch id="retention-enabled" defaultChecked className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="space-y-2">
              <Label>Default Retention Period</Label>
              <Select defaultValue="forever">
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 year after access</SelectItem>
                  <SelectItem value="3">3 years after access</SelectItem>
                  <SelectItem value="5">5 years after access</SelectItem>
                  <SelectItem value="10">10 years after access</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Retention Action</Label>
              <Select defaultValue="archive">
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delete">Delete Permanently</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                  <SelectItem value="notify">Notify Contacts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="retention-override" className="cursor-pointer">
                  Allow User Override
                </Label>
                <div className="text-sm text-muted-foreground">Let users set custom retention periods</div>
              </div>
              <Switch id="retention-override" defaultChecked className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="retention-notification" className="cursor-pointer">
                  Retention Notifications
                </Label>
                <div className="text-sm text-muted-foreground">Notify contacts before assets are removed</div>
              </div>
              <Switch id="retention-notification" defaultChecked className="data-[state=checked]:bg-green-500" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Retention Settings
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Archive className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Archiving Settings</CardTitle>
                <CardDescription>Configure how digital legacy assets are archived</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="archiving-enabled" className="cursor-pointer">
                  Enable Archiving
                </Label>
                <div className="text-sm text-muted-foreground">Archive digital legacy assets instead of deleting</div>
              </div>
              <Switch id="archiving-enabled" defaultChecked className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="space-y-2">
              <Label>Archive Storage Location</Label>
              <Select defaultValue="cold-storage">
                <SelectTrigger>
                  <SelectValue placeholder="Select storage location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-storage">Standard Storage</SelectItem>
                  <SelectItem value="cold-storage">Cold Storage</SelectItem>
                  <SelectItem value="glacier">Glacier Storage</SelectItem>
                  <SelectItem value="external">External Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Archive Format</Label>
              <Select defaultValue="zip">
                <SelectTrigger>
                  <SelectValue placeholder="Select archive format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zip">ZIP Archive</SelectItem>
                  <SelectItem value="tar">TAR Archive</SelectItem>
                  <SelectItem value="7z">7z Archive</SelectItem>
                  <SelectItem value="custom">Custom Format</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="archive-compression" className="cursor-pointer">
                  Archive Compression
                </Label>
                <div className="text-sm text-muted-foreground">Compress archives to save storage space</div>
              </div>
              <Switch id="archive-compression" defaultChecked className="data-[state=checked]:bg-green-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="archive-encryption" className="cursor-pointer">
                  Archive Encryption
                </Label>
                <div className="text-sm text-muted-foreground">Encrypt archives for additional security</div>
              </div>
              <Switch id="archive-encryption" defaultChecked className="data-[state=checked]:bg-green-500" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Archive Settings
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Content Type Retention</CardTitle>
              <CardDescription>Configure retention policies by content type</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content Type</TableHead>
                <TableHead>Retention Period</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Custom Settings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Photos</TableCell>
                <TableCell>
                  <Select defaultValue="forever">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue="archive">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                      <SelectItem value="notify">Notify</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Videos</TableCell>
                <TableCell>
                  <Select defaultValue="10">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue="archive">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                      <SelectItem value="notify">Notify</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Documents</TableCell>
                <TableCell>
                  <Select defaultValue="forever">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue="archive">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                      <SelectItem value="notify">Notify</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Audio</TableCell>
                <TableCell>
                  <Select defaultValue="5">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue="archive">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                      <SelectItem value="notify">Notify</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Checkbox defaultChecked />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Messages</TableCell>
                <TableCell>
                  <Select defaultValue="3">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select defaultValue="delete">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                      <SelectItem value="notify">Notify</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Retention Policies
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

