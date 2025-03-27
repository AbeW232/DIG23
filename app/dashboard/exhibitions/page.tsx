"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Plus, Search, Filter, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { ExhibitionsGallery } from "@/components/exhibitions/exhibitions-gallery"

export default function ExhibitionsPage() {
  const router = useRouter()

  const handleCreateExhibition = () => {
    router.push("/dashboard/exhibitions/create")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader
          title="Exhibitions"
          description="Showcase and curate your digital legacy content in beautiful exhibitions"
          breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Exhibitions" }]}
          actions={
            <Button size="default" className="gap-2" onClick={handleCreateExhibition}>
              <Plus className="h-4 w-4" />
              <span>Create Exhibition</span>
            </Button>
          }
        />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search exhibitions..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ExhibitionsGallery />
      </div>
    </DashboardLayout>
  )
}

