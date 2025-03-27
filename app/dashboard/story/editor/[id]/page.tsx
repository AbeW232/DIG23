import { DashboardLayout } from "@/components/dashboard-layout"
import { StoryEditor } from "@/components/story-management/story-editor"

export default function StoryEditorWithIdPage({ params }) {
  return (
    <DashboardLayout>
      <StoryEditor storyId={params.id} />
    </DashboardLayout>
  )
}

