"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoryEditor } from "@/components/story-management/story-editor"
import { StoryListView } from "@/components/story-management/story-list-view"
import { DraftManagement } from "@/components/story-management/draft-management"
import { PublishingWorkflow } from "@/components/story-management/publishing-workflow"
import { ContentOrganization } from "@/components/story-management/content-organization"
import { RevisionHistory } from "@/components/story-management/revision-history"

export function StoryDashboard() {
  const [activeTab, setActiveTab] = useState("story-list")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Story Management</h1>
        <p className="text-muted-foreground">Create, edit, organize, and publish your digital legacy stories.</p>
      </div>

      <Tabs defaultValue="story-list" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="story-list">Story List</TabsTrigger>
          <TabsTrigger value="story-editor">Story Editor</TabsTrigger>
          <TabsTrigger value="draft-management">Drafts</TabsTrigger>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="revision-history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="story-list">
          <StoryListView />
        </TabsContent>
        <TabsContent value="story-editor">
          <StoryEditor />
        </TabsContent>
        <TabsContent value="draft-management">
          <DraftManagement />
        </TabsContent>
        <TabsContent value="publishing">
          <PublishingWorkflow />
        </TabsContent>
        <TabsContent value="organization">
          <ContentOrganization />
        </TabsContent>
        <TabsContent value="revision-history">
          <RevisionHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

