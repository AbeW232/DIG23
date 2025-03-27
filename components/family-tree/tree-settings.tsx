"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import type { FamilyTreeData } from "./family-tree"

interface TreeSettingsProps {
  familyTreeData: FamilyTreeData
  onUpdateSettings: (name: string, description: string, rootMemberId: string) => void
}

interface SettingsFormValues {
  name: string
  description: string
  rootMemberId: string
}

export function TreeSettings({ familyTreeData, onUpdateSettings }: TreeSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      name: familyTreeData.name,
      description: familyTreeData.description || "",
      rootMemberId: familyTreeData.rootMemberId || "",
    },
  })

  const handleSubmit = (data: SettingsFormValues) => {
    onUpdateSettings(data.name, data.description, data.rootMemberId)
    setIsEditing(false)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Family Tree Settings</CardTitle>
          <CardDescription>Configure the settings for your family tree</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Tree Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>The name of your family tree</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a description for your family tree"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>A brief description of your family tree</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rootMemberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Root Member</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the root member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {familyTreeData.members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The person who will be at the top of your family tree</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Family Tree Name</h3>
                  <p className="mt-1">{familyTreeData.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Root Member</h3>
                  <p className="mt-1">
                    {familyTreeData.rootMemberId
                      ? familyTreeData.members.find((m) => m.id === familyTreeData.rootMemberId)?.name || "Not set"
                      : "Not set"}
                  </p>
                </div>

                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{familyTreeData.description || "No description"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                  <p className="mt-1">{familyTreeData.createdAt}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Modified</h3>
                  <p className="mt-1">{familyTreeData.lastModified}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Members</h3>
                  <p className="mt-1">{familyTreeData.members.length}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsEditing(true)}>Edit Settings</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

