"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, ZoomIn, ZoomOut } from "lucide-react"
import Link from "next/link"

// Create a client-side only Mermaid component
const MermaidDiagram = ({ chart, className = "", style = {} }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && typeof window !== "undefined") {
      // Dynamically import mermaid
      import("mermaid").then((mermaid) => {
        // Configure and initialize mermaid
        mermaid.default.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
          },
        })

        // Clear the element before rendering
        if (ref.current) {
          ref.current.innerHTML = chart
          mermaid.default.init(undefined, ref.current)
        }
      })
    }
  }, [chart])

  return (
    <div ref={ref} className={className} style={style}>
      {chart}
    </div>
  )
}

export default function DiagramPage() {
  const [zoom, setZoom] = useState(1)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Define all the diagram charts
  const overviewChart = `
  graph TD;
      A["Landing Page"] --> B["Authentication"]
      B --> B1["Login"]
      B --> B2["Register"]
      B --> B3["Forgot Password"]
      B --> B4["Reset Password"]
      B1 --> C["Dashboard"]
      B2 --> D["Account Setup"]
      
      C --> F["Story Management"]
      C --> G["Media Library"]
      C --> H["Analytics"]
      C --> I["Profile"]
      C --> J["Exhibitions"]
      C --> L["User Management"]
      C --> N["Settings"]
      C --> FT["Family Tree"]
      C --> AI["AI Tools"]
      C --> MP["Marketplace"]
      C --> SB["Subscription"]
      C --> MM["Memorial"]
      C --> CM["Comments"]
      C --> PB["Publishing"]
      C --> ED["Enhanced Dashboard"]
      C --> HM["Home"]
      
      F --> F1["Story Editor"]
      F --> F2["Story List View"]
      F --> F3["Draft Management"]
      F --> F4["Publishing Workflow"]
      F --> F5["Content Organization"]
      F --> F6["Revision History"]
      
      G --> G1["Media Library Tabs"]
      G --> G2["Asset Grid View"]
      G --> G3["Upload Interface"]
      G --> G4["Tags Management"]
      G --> G5["Collections Management"]
      G --> G6["Search Filters"]
      
      H --> H1["Analytics Tabs"]
      H --> H2["Analytics Dashboard"]
      H --> H3["Key Metrics"]
      H --> H4["Performance Data"]
      H --> H5["User Analytics"]
      H --> H6["Content Insights"]
      H --> H7["Engagement Analysis"]
      
      I --> I1["Profile Settings"]
      I --> I2["Email Settings"]
      I --> I3["Password Settings"]
      I --> I4["Notification Preferences"]
      
      J --> J1["Exhibition Tabs"]
      J --> J2["Exhibition Features"]
      J --> J3["Gallery Grid"]
      J --> J4["Curation Tools"]
      J --> J5["Exhibition Flow"]
      
      L --> L1["User Management"]
      L --> L2["User List"]
      L --> L3["User Roles"]
      L --> L4["Permissions"]
      
      N --> N1["Settings Tabs"]
      N --> N2["Settings Management"]
      N --> N3["System Settings"]
      N --> N4["User Defaults"]
      N --> N5["Content Settings"]
      N --> N6["Notification Settings"]
      N --> N7["Privacy Security Settings"]
      N --> N8["Settings Search"]
      
      FT --> FT1["Family Tree Tabs"]
      FT --> FT2["Family Tree"]
      FT --> FT3["Tree Visualization"]
      FT --> FT4["Member Management"]
      FT --> FT5["Relationship Editor"]
      FT --> FT6["Tree Settings"]
      FT --> FT7["Import Export"]
      
      AI --> AI1["Content Assistant"]
      AI --> AI2["Image Enhancer"]
      AI --> AI3["AI Assistant"]
      
      MP --> MP1["Marketplace Listings"]
      MP --> MP2["Marketplace Item Detail"]
      MP --> MP3["Marketplace Cart"]
      MP --> MP4["Marketplace Checkout"]
      MP --> MP5["Marketplace Filters"]
      MP --> MP6["Marketplace Categories"]
      
      SB --> SB1["Subscription Tabs"]
      SB --> SB2["Subscription Plans"]
      SB --> SB3["Subscription Details"]
      SB --> SB4["Payment Methods"]
      SB --> SB5["Billing History"]
      SB --> SB6["Payment Form"]
      
      MM --> MM1["Memorial Display"]
      MM --> MM2["Memorial Editor"]
      MM --> MM3["Memorial Gallery"]
      MM --> MM4["Memorial Tributes"]
      MM --> MM5["Memorial Sharing"]
      MM --> MM6["Memorial Templates"]
      
      CM --> CM1["Comments Tabs"]
      CM --> CM2["Comments Management"]
      CM --> CM3["Comment Moderation"]
      CM --> CM4["Comment Settings"]
      CM --> CM5["Comment Reporting"]
      
      PB --> PB1["Access Control"]
      PB --> PB2["Publication Options"]
      PB --> PB3["Digital Book Creator"]
      PB --> PB4["Export Options"]
      PB --> PB5["Book Preview"]
      
      ED --> ED1["Overview Dashboard"]
      ED --> ED2["Story Dashboard"]
      ED --> ED3["Media Dashboard"]
      ED --> ED4["Analytics Dashboard"]
      ED --> ED5["Settings Dashboard"]
      
      HM --> HM1["Home Page"]
  `

  const storyManagementChart = `
  graph TD;
      F["Story Management"] --> F1["Story Editor"]
      F --> F2["Story List View"]
      F --> F3["Draft Management"]
      F --> F4["Publishing Workflow"]
      F --> F5["Content Organization"]
      F --> F6["Revision History"]
      
      F1 --> F1A["Rich Text Editor"]
      F1 --> F1B["Media Integration"]
      F1 --> F1C["Template Selection"]
      
      F2 --> F2A["Grid View"]
      F2 --> F2B["List View"]
      F2 --> F2C["Search & Filter"]
      
      F3 --> F3A["Auto-save System"]
      F3 --> F3B["Version Control"]
      F3 --> F3C["Draft Preview"]
      
      F4 --> F4A["Review Process"]
      F4 --> F4B["Schedule Options"]
      F4 --> F4C["Distribution"]
      
      F5 --> F5A["Categories"]
      F5 --> F5B["Tags"]
      F5 --> F5C["Collections"]
      
      F6 --> F6A["Timeline View"]
      F6 --> F6B["Change Logs"]
      F6 --> F6C["Rollback Options"]
  `

  const mediaLibraryChart = `
  graph TD;
      G["Media Library"] --> G1["Media Library Tabs"]
      G --> G2["Asset Grid View"]
      G --> G3["Upload Interface"]
      G --> G4["Tags Management"]
      G --> G5["Collections Management"]
      G --> G6["Search Filters"]
      
      G1 --> G1A["Browse Tab"]
      G1 --> G1B["Upload Tab"]
      G1 --> G1C["Tags Tab"]
      G1 --> G1D["Collections Tab"]
      
      G2 --> G2A["Gallery View"]
      G2 --> G2B["List View"]
      G2 --> G2C["Metadata Display"]
      
      G3 --> G3A["Drag & Drop Zone"]
      G3 --> G3B["Batch Upload"]
      G3 --> G3C["Progress Tracking"]
      
      G4 --> G4A["Tag Creation"]
      G4 --> G4B["Tag Assignment"]
      G4 --> G4C["Tag Management"]
      
      G5 --> G5A["Collection Creator"]
      G5 --> G5B["Collection Editor"]
      G5 --> G5C["Collection Sharing"]
      
      G6 --> G6A["Advanced Filters"]
      G6 --> G6B["Sort Options"]
      G6 --> G6C["Search History"]
  `

  const publishingChart = `
  graph TD;
      PB["Publishing"] --> PB1["Access Control"]
      PB --> PB2["Publication Options"]
      PB --> PB3["Digital Book Creator"]
      PB --> PB4["Export Options"]
      PB --> PB5["Book Preview"]
      
      PB1 --> PB1A["Permission Settings"]
      PB1 --> PB1B["Visibility Controls"]
      PB1 --> PB1C["Access Logs"]
      
      PB2 --> PB2A["Publishing Channels"]
      PB2 --> PB2B["Schedule Settings"]
      PB2 --> PB2C["Distribution Options"]
      
      PB3 --> PB3A["Layout Editor"]
      PB3 --> PB3B["Chapter Management"]
      PB3 --> PB3C["Cover Designer"]
      
      PB4 --> PB4A["PDF Export"]
      PB4 --> PB4B["eBook Formats"]
      PB4 --> PB4C["Print Options"]
      
      PB5 --> PB5A["Interactive Preview"]
      PB5 --> PB5B["Device Simulation"]
      PB5 --> PB5C["Quality Check"]
  `

  const commentsChart = `
  graph TD;
      CM["Comments"] --> CM1["Comments Tabs"]
      CM --> CM2["Comments Management"]
      CM --> CM3["Comment Moderation"]
      CM --> CM4["Comment Settings"]
      CM --> CM5["Comment Reporting"]
      
      CM1 --> CM1A["All Comments"]
      CM1 --> CM1B["Pending"]
      CM1 --> CM1C["Approved"]
      CM1 --> CM1D["Spam"]
      
      CM2 --> CM2A["Comment List"]
      CM2 --> CM2B["Bulk Actions"]
      CM2 --> CM2C["Search & Filter"]
      
      CM3 --> CM3A["Approval Workflow"]
      CM3 --> CM3B["Spam Detection"]
      CM3 --> CM3C["Content Filtering"]
      
      CM4 --> CM4A["Comment Rules"]
      CM4 --> CM4B["Notification Settings"]
      CM4 --> CM4C["Display Options"]
      
      CM5 --> CM5A["Report Management"]
      CM5 --> CM5B["Abuse Detection"]
      CM5 --> CM5C["User Warnings"]
  `

  const userManagementChart = `
  graph TD;
      L["User Management"] --> L1["User Management"]
      L --> L2["User List"]
      L --> L3["User Roles"]
      L --> L4["Permissions"]
      
      L1 --> L1A["User Administration"]
      L1 --> L1B["User Metrics"]
      L1 --> L1C["User Actions"]
      
      L2 --> L2A["User Directory"]
      L2 --> L2B["Search & Filter"]
      L2 --> L2C["Bulk Actions"]
      
      L3 --> L3A["Role Definition"]
      L3 --> L3B["Role Assignment"]
      L3 --> L3C["Role Hierarchy"]
      
      L4 --> L4A["Permission Matrix"]
      L4 --> L4B["Access Controls"]
      L4 --> L4C["Permission Groups"]
  `

  const profileChart = `
  graph TD;
      I["Profile"] --> I1["Profile Settings"]
      I --> I2["Email Settings"]
      I --> I3["Password Settings"]
      I --> I4["Notification Preferences"]
      
      I1 --> I1A["Personal Information"]
      I1 --> I1B["Profile Picture"]
      I1 --> I1C["Bio & Details"]
      
      I2 --> I2A["Email Address"]
      I2 --> I2B["Email Verification"]
      I2 --> I2C["Communication Preferences"]
      
      I3 --> I3A["Password Change"]
      I3 --> I3B["Security Questions"]
      I3 --> I3C["Two-Factor Authentication"]
      
      I4 --> I4A["Email Notifications"]
      I4 --> I4B["System Alerts"]
      I4 --> I4C["Activity Notifications"]
  `

  const authChart = `
  graph TD;
      B["Authentication"] --> B1["Login"]
      B --> B2["Register"]
      B --> B3["Forgot Password"]
      B --> B4["Reset Password"]
      B1 --> C["Dashboard"]
      B2 --> D["Account Setup"]
      
      B1 --> B1A["Credentials Login"]
      B1 --> B1B["Social Login"]
      B1 --> B1C["2FA Verification"]
      
      B2 --> B2A["Registration Form"]
      B2 --> B2B["Email Verification"]
      B2 --> B2C["Profile Creation"]
      
      B3 --> B3A["Email Request"]
      B3 --> B3B["Security Questions"]
      B3 --> B3C["Reset Link"]
      
      B4 --> B4A["Token Validation"]
      B4 --> B4B["New Password Form"]
      B4 --> B4C["Confirmation"]
      
      D --> D1["Profile Setup"]
      D --> D2["Preferences"]
      D --> D3["Onboarding Tour"]
  `

  const subscriptionChart = `
  graph TD;
      SB["Subscription"] --> SB1["Subscription Tabs"]
      SB --> SB2["Subscription Plans"]
      SB --> SB3["Subscription Details"]
      SB --> SB4["Payment Methods"]
      SB --> SB5["Billing History"]
      SB --> SB6["Payment Form"]
      
      SB1 --> SB1A["Plans Tab"]
      SB1 --> SB1B["Details Tab"]
      SB1 --> SB1C["Billing Tab"]
      
      SB2 --> SB2A["Plan Comparison"]
      SB2 --> SB2B["Feature Matrix"]
      SB2 --> SB2C["Pricing Options"]
      
      SB3 --> SB3A["Current Plan"]
      SB3 --> SB3B["Usage Statistics"]
      SB3 --> SB3C["Renewal Information"]
      
      SB4 --> SB4A["Card Management"]
      SB4 --> SB4B["Alternative Methods"]
      SB4 --> SB4C["Default Payment"]
      
      SB5 --> SB5A["Invoice History"]
      SB5 --> SB5B["Payment Records"]
      SB5 --> SB5C["Receipt Download"]
      
      SB6 --> SB6A["Payment Details"]
      SB6 --> SB6B["Billing Address"]
      SB6 --> SB6C["Payment Confirmation"]
  `

  const familyTreeChart = `
  graph TD;
      FT["Family Tree"] --> FT1["Family Tree Tabs"]
      FT --> FT2["Family Tree"]
      FT --> FT3["Tree Visualization"]
      FT --> FT4["Member Management"]
      FT --> FT5["Relationship Editor"]
      FT --> FT6["Tree Settings"]
      FT --> FT7["Import Export"]
      
      FT1 --> FT1A["Visualization Tab"]
      FT1 --> FT1B["Members Tab"]
      FT1 --> FT1C["Settings Tab"]
      
      FT2 --> FT2A["Tree Overview"]
      FT2 --> FT2B["Navigation Controls"]
      FT2 --> FT2C["Search & Filter"]
      
      FT3 --> FT3A["Interactive Tree"]
      FT3 --> FT3B["Timeline View"]
      FT3 --> FT3C["Map View"]
      
      FT4 --> FT4A["Member Creation"]
      FT4 --> FT4B["Member Editing"]
      FT4 --> FT4C["Member Details"]
      
      FT5 --> FT5A["Relationship Types"]
      FT5 --> FT5B["Connection Editor"]
      FT5 --> FT5C["Relationship History"]
      
      FT6 --> FT6A["Display Options"]
      FT6 --> FT6B["Privacy Settings"]
      FT6 --> FT6C["Sharing Controls"]
      
      FT7 --> FT7A["GEDCOM Import"]
      FT7 --> FT7B["Tree Export"]
      FT7 --> FT7C["Backup & Restore"]
  `

  const memorialChart = `
  graph TD;
      MM["Memorial"] --> MM1["Memorial Display"]
      MM --> MM2["Memorial Editor"]
      MM --> MM3["Memorial Gallery"]
      MM --> MM4["Memorial Tributes"]
      MM --> MM5["Memorial Sharing"]
      MM --> MM6["Memorial Templates"]
      
      MM1 --> MM1A["Public View"]
      MM1 --> MM1B["Timeline Display"]
      MM1 --> MM1C["Interactive Elements"]
      
      MM2 --> MM2A["Content Editor"]
      MM2 --> MM2B["Layout Options"]
      MM2 --> MM2C["Media Integration"]
      
      MM3 --> MM3A["Photo Gallery"]
      MM3 --> MM3B["Video Collection"]
      MM3 --> MM3C["Audio Memories"]
      
      MM4 --> MM4A["Tribute Creation"]
      MM4 --> MM4B["Tribute Display"]
      MM4 --> MM4C["Tribute Management"]
      
      MM5 --> MM5A["Share Options"]
      MM5 --> MM5B["Privacy Controls"]
      MM5 --> MM5C["Invitation System"]
      
      MM6 --> MM6A["Template Selection"]
      MM6 --> MM6B["Template Customization"]
      MM6 --> MM6C["Template Preview"]
  `

  const exhibitionsChart = `
  graph TD;
      J["Exhibitions"] --> J1["Exhibition Tabs"]
      J --> J2["Exhibition Features"]
      J --> J3["Gallery Grid"]
      J --> J4["Curation Tools"]
      J --> J5["Exhibition Flow"]
      
      J1 --> J1A["Features Tab"]
      J1 --> J1B["Curation Tab"]
      J1 --> J1C["Flow Tab"]
      
      J2 --> J2A["Exhibition Overview"]
      J2 --> J2B["Feature List"]
      J2 --> J2C["Settings"]
      
      J3 --> J3A["Grid Layout"]
      J3 --> J3B["Item Display"]
      J3 --> J3C["Arrangement Tools"]
      
      J4 --> J4A["Content Selection"]
      J4 --> J4B["Layout Editor"]
      J4 --> J4C["Theme Options"]
      
      J5 --> J5A["Visitor Path"]
      J5 --> J5B["Navigation Design"]
      J5 --> J5C["Interactive Elements"]
  `

  const aiToolsChart = `
  graph TD;
      AI["AI Tools"] --> AI1["Content Assistant"]
      AI --> AI2["Image Enhancer"]
      AI --> AI3["AI Assistant"]
      
      AI1 --> AI1A["Grammar Correction"]
      AI1 --> AI1B["Content Generation"]
      AI1 --> AI1C["Style Enhancement"]
      
      AI2 --> AI2A["Photo Restoration"]
      AI2 --> AI2B["Colorization"]
      AI2 --> AI2C["Quality Improvement"]
      
      AI3 --> AI3A["Smart Suggestions"]
      AI3 --> AI3B["Voice Transcription"]
      AI3 --> AI3C["Automated Tagging"]
  `

  const analyticsChart = `
  graph TD;
      H["Analytics"] --> H1["Analytics Tabs"]
      H --> H2["Analytics Dashboard"]
      H --> H3["Key Metrics"]
      H --> H4["Performance Data"]
      H --> H5["User Analytics"]
      H --> H6["Content Insights"]
      H --> H7["Engagement Analysis"]
      
      H1 --> H1A["Metrics Tab"]
      H1 --> H1B["Performance Tab"]
      H1 --> H1C["Users Tab"]
      H1 --> H1D["Content Tab"]
      H1 --> H1E["Engagement Tab"]
      
      H2 --> H2A["Overview"]
      H2 --> H2B["Reports"]
      H2 --> H2C["Data Export"]
      
      H3 --> H3A["Visitor Count"]
      H3 --> H3B["Engagement Rate"]
      H3 --> H3C["Growth Metrics"]
      
      H4 --> H4A["System Performance"]
      H4 --> H4B["Content Performance"]
      H4 --> H4C["Response Times"]
      
      H5 --> H5A["User Behavior"]
      H5 --> H5B["Demographics"]
      H5 --> H5C["User Journey"]
      
      H6 --> H6A["Popular Content"]
      H6 --> H6B["Content Trends"]
      H6 --> H6C["Content Gaps"]
      
      H7 --> H7A["Interaction Analysis"]
      H7 --> H7B["Sharing Metrics"]
      H7 --> H7C["Feedback Analysis"]
  `

  const settingsChart = `
  graph TD;
      N["Settings"] --> N1["Settings Tabs"]
      N --> N2["Settings Management"]
      N --> N3["System Settings"]
      N --> N4["User Defaults"]
      N --> N5["Content Settings"]
      N --> N6["Notification Settings"]
      N --> N7["Privacy Security Settings"]
      N --> N8["Settings Search"]
      
      N1 --> N1A["System Tab"]
      N1 --> N1B["User Tab"]
      N1 --> N1C["Content Tab"]
      N1 --> N1D["Notifications Tab"]
      N1 --> N1E["Privacy Tab"]
      
      N2 --> N2A["Settings Overview"]
      N2 --> N2B["Settings History"]
      N2 --> N2C["Import/Export"]
      
      N3 --> N3A["General Settings"]
      N3 --> N3B["Performance Options"]
      N3 --> N3C["Integration Settings"]
      
      N4 --> N4A["Default Preferences"]
      N4 --> N4B["Default Permissions"]
      N4 --> N4C["Default Views"]
      
      N5 --> N5A["Content Types"]
      N5 --> N5B["Content Rules"]
      N5 --> N5C["Content Workflow"]
      
      N6 --> N6A["Email Settings"]
      N6 --> N6B["Push Notifications"]
      N6 --> N6C["Alert Preferences"]
      
      N7 --> N7A["Privacy Controls"]
      N7 --> N7B["Security Options"]
      N7 --> N7C["Data Management"]
      
      N8 --> N8A["Search Interface"]
      N8 --> N8B["Search Results"]
      N8 --> N8C["Quick Settings"]
  `

  const marketplaceChart = `
  graph TD;
      MP["Marketplace"] --> MP1["Marketplace Listings"]
      MP --> MP2["Marketplace Item Detail"]
      MP --> MP3["Marketplace Cart"]
      MP --> MP4["Marketplace Checkout"]
      MP --> MP5["Marketplace Filters"]
      MP --> MP6["Marketplace Categories"]
      
      MP1 --> MP1A["Product Grid"]
      MP1 --> MP1B["List View"]
      MP1 --> MP1C["Featured Items"]
      
      MP2 --> MP2A["Product Details"]
      MP2 --> MP2B["Image Gallery"]
      MP2 --> MP2C["Related Items"]
      
      MP3 --> MP3A["Cart Items"]
      MP3 --> MP3B["Price Summary"]
      MP3 --> MP3C["Cart Actions"]
      
      MP4 --> MP4A["Shipping Info"]
      MP4 --> MP4B["Payment Options"]
      MP4 --> MP4C["Order Review"]
      
      MP5 --> MP5A["Price Filter"]
      MP5 --> MP5B["Category Filter"]
      MP5 --> MP5C["Sort Options"]
      
      MP6 --> MP6A["Category List"]
      MP6 --> MP6B["Category Navigation"]
      MP6 --> MP6C["Featured Categories"]
  `

  const enhancedDashboardChart = `
  graph TD;
      ED["Enhanced Dashboard"] --> ED1["Overview Dashboard"]
      ED --> ED2["Story Dashboard"]
      ED --> ED3["Media Dashboard"]
      ED --> ED4["Analytics Dashboard"]
      ED --> ED5["Settings Dashboard"]
      
      ED1 --> ED1A["Activity Summary"]
      ED1 --> ED1B["Quick Actions"]
      ED1 --> ED1C["System Status"]
      
      ED2 --> ED2A["Story Metrics"]
      ED2 --> ED2B["Recent Stories"]
      ED2 --> ED2C["Story Actions"]
      
      ED3 --> ED3A["Media Stats"]
      ED3 --> ED3B["Recent Uploads"]
      ED3 --> ED3C["Storage Usage"]
      
      ED4 --> ED4A["Key Performance"]
      ED4 --> ED4B["User Growth"]
      ED4 --> ED4C["Engagement Trends"]
      
      ED5 --> ED5A["System Health"]
      ED5 --> ED5B["Recent Changes"]
      ED5 --> ED5C["Quick Settings"]
  `

  // Only render content if client-side
  if (!isMounted) {
    return <div className="container mx-auto py-8">Loading diagrams...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">System Architecture Diagrams</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6 w-full max-w-4xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="user">User & Profile</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Complete System Architecture</CardTitle>
              <CardDescription>
                Overview of all 16 modules and their relationships in the Digital Legacy Platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="overflow-auto border rounded-lg p-4 bg-white"
                style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
              >
                <MermaidDiagram chart={overviewChart} className="min-w-[1000px]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Story Management</CardTitle>
                <CardDescription>Components for creating, editing, and managing stories</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={storyManagementChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>Components for managing media assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={mediaLibraryChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
                <CardDescription>Components for publishing and distributing content</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={publishingChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Components for managing user comments and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={commentsChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Components for managing users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={userManagementChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Components for user profile management</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={profileChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Components for user authentication and access</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={authChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Components for managing user subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={subscriptionChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Family Tree</CardTitle>
                <CardDescription>Components for managing family relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={familyTreeChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memorial</CardTitle>
                <CardDescription>Components for creating and managing memorials</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={memorialChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exhibitions</CardTitle>
                <CardDescription>Components for creating and managing exhibitions</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={exhibitionsChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Tools</CardTitle>
                <CardDescription>Components for AI-powered features</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={aiToolsChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Components for analytics and reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={analyticsChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Components for system and user settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={settingsChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>Components for marketplace functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={marketplaceChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enhanced Dashboard</CardTitle>
                <CardDescription>Components for specialized dashboards</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="overflow-auto border rounded-lg p-4 bg-white"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                >
                  <MermaidDiagram chart={enhancedDashboardChart} className="min-w-[500px]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

