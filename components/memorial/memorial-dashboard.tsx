"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  Clock,
  Heart,
  Eye,
  Settings,
  Archive,
  Calendar,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  MoreHorizontal,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Mock data for demonstration
const memorials = [
  {
    id: "mem1",
    name: "John Smith",
    birthYear: "1945",
    deathYear: "2023",
    coverImage: "/placeholder.svg?height=200&width=400",
    profileImage: "/placeholder.svg?height=100&width=100",
    status: "public",
    views: 248,
    tributes: 24,
    lastUpdated: "2023-04-15T10:30:00Z",
    timeline: [
      { year: "1945", event: "Born in Chicago, Illinois", date: "January 15, 1945" },
      { year: "1967", event: "Graduated from University of Washington", date: "June 5, 1967" },
      { year: "1970", event: "Married to Sarah Johnson", date: "June 12, 1970" },
      { year: "1972", event: "First child born", date: "March 3, 1972" },
      { year: "1975", event: "Second child born", date: "July 22, 1975" },
      { year: "1990", event: "Celebrated 20th wedding anniversary", date: "June 12, 1990" },
      { year: "2010", event: "Retirement after 38 years of teaching", date: "May 30, 2010" },
      { year: "2023", event: "Passed away peacefully surrounded by family", date: "March 20, 2023" },
    ],
    gallery: [
      { id: "img1", src: "/placeholder.svg?height=400&width=600", caption: "Family reunion, summer 1995" },
      { id: "img2", src: "/placeholder.svg?height=400&width=600", caption: "Wedding day, June 12, 1970" },
      { id: "img3", src: "/placeholder.svg?height=400&width=600", caption: "Graduation ceremony, 1967" },
      { id: "img4", src: "/placeholder.svg?height=400&width=600", caption: "Retirement party, 2010" },
      { id: "img5", src: "/placeholder.svg?height=400&width=600", caption: "50th wedding anniversary, 2020" },
      { id: "img6", src: "/placeholder.svg?height=400&width=600", caption: "Family vacation in Hawaii, 2015" },
    ],
  },
  {
    id: "mem2",
    name: "Mary Johnson",
    birthYear: "1950",
    deathYear: "2022",
    coverImage: "/placeholder.svg?height=200&width=400",
    profileImage: "/placeholder.svg?height=100&width=100",
    status: "public",
    views: 186,
    tributes: 18,
    lastUpdated: "2023-03-22T14:45:00Z",
    timeline: [
      { year: "1950", event: "Born in Seattle, Washington", date: "March 12, 1950" },
      { year: "1972", event: "Graduated from Stanford University", date: "May 28, 1972" },
      { year: "1975", event: "Married to Robert Johnson", date: "September 8, 1975" },
      { year: "2022", event: "Passed away after a long illness", date: "December 5, 2022" },
    ],
    gallery: [
      { id: "img1", src: "/placeholder.svg?height=400&width=600", caption: "College graduation, 1972" },
      { id: "img2", src: "/placeholder.svg?height=400&width=600", caption: "Wedding day, 1975" },
      { id: "img3", src: "/placeholder.svg?height=400&width=600", caption: "Family portrait, 1985" },
    ],
  },
  {
    id: "mem3",
    name: "Robert Williams",
    birthYear: "1938",
    deathYear: "2021",
    coverImage: "/placeholder.svg?height=200&width=400",
    profileImage: "/placeholder.svg?height=100&width=100",
    status: "private",
    views: 42,
    tributes: 8,
    lastUpdated: "2023-02-10T09:15:00Z",
    timeline: [
      { year: "1938", event: "Born in Boston, Massachusetts", date: "July 4, 1938" },
      { year: "1960", event: "Graduated from Harvard University", date: "June 10, 1960" },
      { year: "1962", event: "Married to Elizabeth Taylor", date: "August 15, 1962" },
      { year: "2021", event: "Passed away peacefully at home", date: "November 12, 2021" },
    ],
    gallery: [
      { id: "img1", src: "/placeholder.svg?height=400&width=600", caption: "Harvard graduation, 1960" },
      { id: "img2", src: "/placeholder.svg?height=400&width=600", caption: "Wedding day, 1962" },
    ],
  },
]

const draftMemorials = [
  {
    id: "draft1",
    name: "James Wilson",
    createdAt: "2023-03-15T10:30:00Z",
    lastEdited: "2023-03-17T14:20:00Z",
    coverImage: "/placeholder.svg?height=200&width=400",
    completionPercentage: 65,
  },
  {
    id: "draft2",
    name: "Elizabeth Brown",
    createdAt: "2023-04-22T08:15:00Z",
    lastEdited: "2023-04-23T16:45:00Z",
    coverImage: "/placeholder.svg?height=200&width=400",
    completionPercentage: 30,
  },
]

const templates = [
  {
    id: "template1",
    name: "Classic",
    description: "A timeless design with elegant typography",
    bgClass: "bg-gradient-to-r from-gray-100 to-gray-200",
    textClass: "text-gray-500",
    popular: true,
  },
  {
    id: "template2",
    name: "Modern",
    description: "Clean, minimalist design with contemporary styling",
    bgClass: "bg-gradient-to-r from-blue-50 to-indigo-100",
    textClass: "text-indigo-500",
    popular: false,
  },
  {
    id: "template3",
    name: "Nature",
    description: "Peaceful design with natural elements",
    bgClass: "bg-gradient-to-r from-amber-50 to-amber-100",
    textClass: "text-amber-600",
    popular: true,
  },
  {
    id: "template4",
    name: "Elegant",
    description: "Sophisticated design with refined details",
    bgClass: "bg-gradient-to-r from-purple-50 to-pink-100",
    textClass: "text-purple-600",
    popular: false,
  },
]

// Component for interactive timeline
const InteractiveTimeline = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const timelineRef = useRef(null)

  return (
    <div className="relative py-4">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 ml-6 md:ml-8"></div>
      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn("relative flex items-start gap-4", selectedEvent === index ? "z-10" : "z-0")}
          >
            <button
              onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
              className={cn(
                "relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full transition-all duration-300",
                selectedEvent === index ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted hover:bg-muted/80",
              )}
            >
              <span className="text-sm font-medium">{event.year}</span>
            </button>

            <div
              className={cn(
                "flex-1 bg-card rounded-lg p-4 transition-all duration-300",
                selectedEvent === index ? "shadow-md border-primary/20" : "border",
              )}
            >
              <h4 className="font-medium">{event.event}</h4>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Component for interactive photo gallery
const InteractiveGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsZoomed(false)
    setPosition({ x: 0, y: 0 })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setIsZoomed(false)
    setPosition({ x: 0, y: 0 })
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    if (!isZoomed) return
    setIsDragging(true)
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDragging, startPos])

  return (
    <div className="relative overflow-hidden rounded-lg bg-black/90 h-[400px] flex items-center justify-center">
      <div
        className={cn(
          "relative w-full h-full flex items-center justify-center transition-transform duration-300",
          isZoomed ? "cursor-grab" : "",
        )}
        onMouseDown={handleMouseDown}
      >
        <img
          ref={imageRef}
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].caption}
          className={cn(
            "max-h-full max-w-full object-contain transition-all duration-300",
            isZoomed ? "scale-200" : "scale-100",
          )}
          style={isZoomed ? { transform: `scale(2) translate(${position.x / 100}px, ${position.y / 100}px)` } : {}}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-center">
        <p>{images[currentIndex].caption}</p>
        <div className="flex justify-center mt-2 gap-2">
          <span className="text-xs text-white/70">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <button
        onClick={toggleZoom}
        className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
      >
        {isZoomed ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </button>
    </div>
  )
}

// Component for memorial card with animations
const MemorialCard = ({ memorial, onView, onEdit, onShowTimeline, onShowGallery }) => {
  const cardRef = useRef(null)
  const entry = useIntersectionObserver(cardRef, { threshold: 0.1 })
  const isVisible = !!entry?.isIntersecting

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={memorial.coverImage || "/placeholder.svg"}
            alt={`${memorial.name} memorial cover`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant={memorial.status === "public" ? "default" : "secondary"} className="capitalize">
              {memorial.status}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end gap-3">
              <div className="relative">
                <img
                  src={memorial.profileImage || "/placeholder.svg"}
                  alt={memorial.name}
                  className="w-14 h-14 rounded-full border-2 border-white object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <Heart className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{memorial.name}</h3>
                <p className="text-sm text-white/80">
                  {memorial.birthYear} - {memorial.deathYear}
                </p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                <span>{memorial.views}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{memorial.tributes}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Updated {formatDate(memorial.lastUpdated)}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => onShowTimeline(memorial)}>
              <Calendar className="h-3 w-3 mr-1" />
              Timeline
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => onShowGallery(memorial)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              Gallery
            </Button>
          </div>

          <div className="mt-auto flex gap-2">
            <Button variant="default" size="sm" className="flex-1" onClick={() => onView(memorial)}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(memorial)}>
              <Settings className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save as Template
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Component for draft memorial card
const DraftMemorialCard = ({ draft, onContinueEditing }) => {
  const cardRef = useRef(null)
  const entry = useIntersectionObserver(cardRef, { threshold: 0.1 })
  const isVisible = !!entry?.isIntersecting

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/placeholder.svg?height=80&width=80" alt="Draft memorial" className="opacity-30" />
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-amber-500/20 text-amber-600 border-amber-200">
              Draft
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold">{draft.name}</h3>
            <p className="text-sm text-muted-foreground">Last edited {formatDate(draft.lastEdited)}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Completion</span>
              <span className="text-sm font-medium">{draft.completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${draft.completionPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Created on {formatDate(draft.createdAt)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1" onClick={() => onContinueEditing(draft)}>
              <Settings className="h-4 w-4 mr-2" />
              Continue Editing
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Component for template card
const TemplateCard = ({ template, onSelect }) => {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 h-full">
        <div
          className={cn(
            "h-32 flex items-center justify-center transition-all duration-500 group-hover:brightness-110 relative",
            template.bgClass,
          )}
        >
          {template.popular && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-primary/90">
                Popular
              </Badge>
            </div>
          )}
          <span className={cn("text-lg font-medium", template.textClass)}>{template.name}</span>
        </div>
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{template.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <Button variant="link" size="sm" asChild className="px-0">
              <Link href="/memorial/templates">View</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => onSelect(template)}>
              Use
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main dashboard component
export function MemorialDashboard() {
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMemorial, setSelectedMemorial] = useState(null)
  const [showTimelineDialog, setShowTimelineDialog] = useState(false)
  const [showGalleryDialog, setShowGalleryDialog] = useState(false)
  const [sortOrder, setSortOrder] = useState("recent")
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort memorials based on search query and sort order
  const filteredMemorials = useMemo(() => {
    let filtered = memorials.filter((memorial) => memorial.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (sortOrder === "recent") {
      filtered = [...filtered].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    } else if (sortOrder === "alphabetical") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOrder === "views") {
      filtered = [...filtered].sort((a, b) => b.views - a.views)
    } else if (sortOrder === "tributes") {
      filtered = [...filtered].sort((a, b) => b.tributes - a.tributes)
    }

    return filtered
  }, [searchQuery, sortOrder])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleViewMemorial = (memorial) => {
    window.location.href = "/memorial"
  }

  const handleEditMemorial = (memorial) => {
    window.location.href = "/memorial/create"
  }

  const handleShowTimeline = (memorial) => {
    setSelectedMemorial(memorial)
    setShowTimelineDialog(true)
  }

  const handleShowGallery = (memorial) => {
    setSelectedMemorial(memorial)
    setShowGalleryDialog(true)
  }

  const handleContinueEditing = (draft) => {
    window.location.href = "/memorial/create"
  }

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    setTemplateDialogOpen(true)
  }

  const handleUseTemplate = () => {
    setTemplateDialogOpen(false)
    window.location.href = "/memorial/create"
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Memorial Dashboard"
        description="Create and manage memorial pages for your loved ones"
        actions={
          <Button asChild>
            <Link href="/memorial/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Memorial
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Memorial Pages</h3>
                  <p className="text-sm text-muted-foreground">Create lasting tributes for your loved ones</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        {isLoading ? (
                          <Skeleton className="h-7 w-12" />
                        ) : (
                          <p className="text-xl font-semibold">{memorials.length}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Drafts</p>
                        {isLoading ? (
                          <Skeleton className="h-7 w-12" />
                        ) : (
                          <p className="text-xl font-semibold">{draftMemorials.length}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Visitors</p>
                        {isLoading ? (
                          <Skeleton className="h-7 w-12" />
                        ) : (
                          <motion.p
                            className="text-xl font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <CountUp end={476} duration={2} />
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                <p className="text-sm text-muted-foreground mb-4">Common tasks for memorial management</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/memorial/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Memorial
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/memorial/templates">
                    <Calendar className="mr-2 h-4 w-4" />
                    Browse Templates
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard/media/upload">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Manage Tributes
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search memorials..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setSortOrder("recent")}>Most Recent</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("alphabetical")}>Alphabetical (A-Z)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("views")}>Most Viewed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("tributes")}>Most Tributes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="active" className="relative">
            Active Memorials
            {memorials.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
              >
                {memorials.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="drafts" className="relative">
            Drafts
            {draftMemorials.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
              >
                {draftMemorials.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between pt-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredMemorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredMemorials.map((memorial) => (
                  <MemorialCard
                    key={memorial.id}
                    memorial={memorial}
                    onView={handleViewMemorial}
                    onEdit={handleEditMemorial}
                    onShowTimeline={handleShowTimeline}
                    onShowGallery={handleShowGallery}
                  />
                ))}
              </AnimatePresence>

              {/* Create New Memorial Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-dashed bg-muted/30 hover:bg-muted/50 transition-colors duration-300 h-full">
                  <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Create New Memorial</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Honor and remember your loved ones with a beautiful memorial page
                    </p>
                    <Button asChild>
                      <Link href="/memorial/create">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            <EmptyState
              icon={<Search className="h-10 w-10" />}
              title="No memorials found"
              description={
                searchQuery ? `No results for "${searchQuery}"` : "Create your first memorial to get started"
              }
              action={{
                label: "Create Memorial",
                onClick: () => (window.location.href = "/memorial/create"),
              }}
              variant="card"
            />
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex justify-between pt-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {draftMemorials.map((draft) => (
                <DraftMemorialCard key={draft.id} draft={draft} onContinueEditing={handleContinueEditing} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4 mt-6">
          <EmptyState
            icon={<Archive className="h-10 w-10" />}
            title="No Archived Memorials"
            description="Archived memorials will appear here. You can archive memorials that you want to keep but not display publicly."
            variant="card"
          />
        </TabsContent>
      </Tabs>

      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/50">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Memorial Templates</h2>
          <p className="text-muted-foreground mt-1">
            Choose from a variety of beautiful templates for your memorial pages
          </p>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={handleSelectTemplate} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/memorial/templates">Browse All Templates</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Dialog */}
      <Dialog open={showTimelineDialog} onOpenChange={setShowTimelineDialog}>
        <DialogContent className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{selectedMemorial?.name} - Timeline</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowTimelineDialog(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            {selectedMemorial && <InteractiveTimeline events={selectedMemorial.timeline} />}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Gallery Dialog */}
      <Dialog open={showGalleryDialog} onOpenChange={setShowGalleryDialog}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="p-4 bg-background flex items-center justify-between">
            <h2 className="text-xl font-semibold">{selectedMemorial?.name} - Photo Gallery</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowGalleryDialog(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {selectedMemorial && <InteractiveGallery images={selectedMemorial.gallery} />}
        </DialogContent>
      </Dialog>

      {/* Template Selection Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Use Template</h2>
            <Button variant="ghost" size="icon" onClick={() => setTemplateDialogOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {selectedTemplate && (
            <div className="space-y-4">
              <div className={cn("h-40 rounded-lg flex items-center justify-center", selectedTemplate.bgClass)}>
                <span className={cn("text-2xl font-medium", selectedTemplate.textClass)}>{selectedTemplate.name}</span>
              </div>

              <p className="text-muted-foreground">{selectedTemplate.description}</p>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUseTemplate}>Use Template</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// CountUp component for animated number counting
function CountUp({ end, duration }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const progress = Math.min(elapsed / (duration * 1000), 1)
      countRef.current = Math.floor(progress * end)
      setCount(countRef.current)

      if (progress === 1) {
        clearInterval(interval)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [end, duration])

  return count
}

