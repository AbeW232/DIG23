"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StorageSettings } from "@/components/admin/settings/storage-settings"
import { RetentionPolicies } from "@/components/admin/settings/retention-policies"
import { NotificationTemplates } from "@/components/admin/settings/notification-templates"
import { Database, Clock, Bell, Shield, Users, SettingsIcon } from "lucide-react"

export function AdminSettingsManagement() {
  const [activeTab, setActiveTab] = useState("storage")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Configure global settings for the Digital Legacy platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
          <TabsTrigger value="storage" className="flex flex-col py-2 h-auto">
            <Database className="h-4 w-4 mb-1" />
            <span>Storage</span>
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex flex-col py-2 h-auto">
            <Clock className="h-4 w-4 mb-1" />
            <span>Retention</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col py-2 h-auto">
            <Bell className="h-4 w-4 mb-1" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col py-2 h-auto">
            <Shield className="h-4 w-4 mb-1" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex flex-col py-2 h-auto">
            <Users className="h-4 w-4 mb-1" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex flex-col py-2 h-auto">
            <SettingsIcon className="h-4 w-4 mb-1" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>Configure how digital legacy assets are stored and managed</CardDescription>
            </CardHeader>
            <CardContent>
              <StorageSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention">
          <Card>
            <CardHeader>
              <CardTitle>Retention Policies</CardTitle>
              <CardDescription>Configure how long digital legacy assets are retained</CardDescription>
            </CardHeader>
            <CardContent>
              <RetentionPolicies />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Configure templates for digital legacy notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationTemplates />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for digital legacy</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Security settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>Configure default user settings for digital legacy</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User settings content will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings for digital legacy</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="storage" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                  <TabsTrigger value="backup">Backup</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="storage">
                  <StorageSettings />
                </TabsContent>
                <TabsContent value="backup">
                  <p>Backup settings content will go here.</p>
                </TabsContent>
                <TabsContent value="performance">
                  <p>Performance settings content will go here.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

