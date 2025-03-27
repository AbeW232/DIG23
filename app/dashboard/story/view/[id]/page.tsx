import { DashboardLayout } from "@/components/dashboard-layout"
import { StoryViewer } from "@/components/story-management/story-viewer"

export default function StoryViewPage({ params }) {
  return (
    <DashboardLayout>
      <StoryViewer storyId={params.id} />
    </DashboardLayout>
  )
}

