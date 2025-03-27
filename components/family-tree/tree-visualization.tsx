"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Download,
  Share2,
  Printer,
  Search,
  Grid,
  List,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Maximize,
  Minimize,
} from "lucide-react"
import type { FamilyTreeData, FamilyMember } from "./family-tree"
import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { HelpTooltip } from "@/components/ui/help-tooltip"

interface TreeVisualizationProps {
  familyTreeData: FamilyTreeData
}

// Node dimensions and spacing
const NODE_WIDTH = 180
const NODE_HEIGHT = 80
const LEVEL_HEIGHT = 160
const SIBLING_SPACING = 200

export function TreeVisualization({ familyTreeData }: TreeVisualizationProps) {
  // This is the original visualization component. We'll keep it as a fallback but update the ModernTreeVisualization to be the primary component.
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null)
  const [viewMode, setViewMode] = useState("tree")
  const [layout, setLayout] = useState("vertical")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Find the root member or use the first member if no root is specified
  const rootMember = familyTreeData.rootMemberId
    ? familyTreeData.members.find((m) => m.id === familyTreeData.rootMemberId)
    : familyTreeData.members[0]

  // Calculate tree dimensions
  const calculateTreeDimensions = () => {
    // For a family tree, we need more width and height
    const maxDepth = calculateMaxDepth(rootMember?.id || "", familyTreeData.members, new Set())
    const maxWidth = Math.max(1200, familyTreeData.members.length * (NODE_WIDTH + 100))
    const maxHeight = Math.max(800, (maxDepth + 1) * (NODE_HEIGHT + 100))

    return { width: maxWidth, height: maxHeight }
  }

  // Calculate the maximum depth of the tree
  const calculateMaxDepth = (
    memberId: string,
    members: FamilyMember[],
    visited: Set<string>,
    currentDepth = 0,
  ): number => {
    if (visited.has(memberId)) return currentDepth
    visited.add(memberId)

    const member = members.find((m) => m.id === memberId)
    if (!member) return currentDepth

    let maxChildDepth = currentDepth
    for (const childId of member.children) {
      const childDepth = calculateMaxDepth(childId, members, new Set([...visited]), currentDepth + 1)
      maxChildDepth = Math.max(maxChildDepth, childDepth)
    }

    return maxChildDepth
  }

  const treeDimensions = calculateTreeDimensions()

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y

    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Reset view
  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Handle zoom
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  // Handle pan controls
  const handlePan = (direction: "left" | "right" | "up" | "down") => {
    const panAmount = 50
    switch (direction) {
      case "left":
        setPan((prev) => ({ ...prev, x: prev.x + panAmount }))
        break
      case "right":
        setPan((prev) => ({ ...prev, x: prev.x - panAmount }))
        break
      case "up":
        setPan((prev) => ({ ...prev, y: prev.y + panAmount }))
        break
      case "down":
        setPan((prev) => ({ ...prev, y: prev.y - panAmount }))
        break
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Export as SVG
  const exportSVG = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${familyTreeData.name.replace(/\s+/g, "_")}_family_tree.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter members based on search
  const filteredMembers = searchQuery
    ? familyTreeData.members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (member.bio && member.bio.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : familyTreeData.members

  // Update the renderFamilyTree function to create a proper hierarchical tree layout
  const renderFamilyTree = () => {
    if (!rootMember) return null

    // Create a proper hierarchical tree layout
    return (
      <g transform={`translate(50, 50)`}>
        {/* Render the root generation first */}
        {renderFamilyHierarchy(rootMember, treeDimensions.width / 2, 0, 0)}
      </g>
    )
  }

  // Add this new function to render the family hierarchy properly
  const renderFamilyHierarchy = (member: FamilyMember, x: number, y: number, level: number) => {
    const elements: React.ReactNode[] = []

    // Add the current member node
    elements.push(renderMemberNode(member, x - NODE_WIDTH / 2, y))

    // Find spouse/partner if exists
    const partners = member.partners
      .map((id) => familyTreeData.members.find((m) => m.id === id))
      .filter(Boolean) as FamilyMember[]

    // If there's a partner, render them and connect with a heart line
    if (partners.length > 0) {
      const partner = partners[0] // For simplicity, just show the first partner
      const partnerX = x + NODE_WIDTH + 50

      elements.push(renderMemberNode(partner, partnerX - NODE_WIDTH / 2, y))

      // Add partnership connection
      elements.push(
        <g key={`partnership-${member.id}-${partner.id}`}>
          <line
            x1={x + NODE_WIDTH / 2}
            y1={y + NODE_HEIGHT / 2}
            x2={partnerX - NODE_WIDTH / 2}
            y2={y + NODE_HEIGHT / 2}
            stroke="#d58c8c"
            strokeWidth="2"
          />
          <circle
            cx={(x + partnerX) / 2}
            cy={y + NODE_HEIGHT / 2}
            r="10"
            fill="#ffd1dc"
            stroke="#d58c8c"
            strokeWidth="1"
          />
          <path
            d={`M${(x + partnerX) / 2 - 5},${y + NODE_HEIGHT / 2 - 3} L${(x + partnerX) / 2},${y + NODE_HEIGHT / 2 + 3} L${(x + partnerX) / 2 + 5},${y + NODE_HEIGHT / 2 - 3}`}
            fill="#d58c8c"
            stroke="#d58c8c"
            strokeWidth="1"
          />
        </g>,
      )

      // Find children
      const children = member.children
        .map((id) => familyTreeData.members.find((m) => m.id === id))
        .filter(Boolean) as FamilyMember[]

      if (children.length > 0) {
        // Add vertical line down from the partnership
        elements.push(
          <line
            key={`vertical-${member.id}`}
            x1={(x + partnerX) / 2}
            y1={y + NODE_HEIGHT}
            x2={(x + partnerX) / 2}
            y2={y + NODE_HEIGHT + 50}
            stroke="#888"
            strokeWidth="2"
          />,
        )

        // Calculate positions for children
        const childrenWidth = children.length * (NODE_WIDTH + 50) - 50
        const startX = (x + partnerX) / 2 - childrenWidth / 2

        // Add horizontal line connecting all children
        elements.push(
          <line
            key={`horizontal-${member.id}`}
            x1={startX + NODE_WIDTH / 2}
            y1={y + NODE_HEIGHT + 50}
            x2={startX + childrenWidth + NODE_WIDTH / 2}
            y2={y + NODE_HEIGHT + 50}
            stroke="#888"
            strokeWidth="2"
          />,
        )

        // Render each child and their descendants
        children.forEach((child, index) => {
          const childX = startX + index * (NODE_WIDTH + 50) + NODE_WIDTH / 2

          // Add vertical line to each child
          elements.push(
            <line
              key={`child-line-${child.id}`}
              x1={childX}
              y1={y + NODE_HEIGHT + 50}
              x2={childX}
              y2={y + NODE_HEIGHT + 80}
              stroke="#888"
              strokeWidth="2"
            />,
          )

          // Recursively render the child and their descendants
          elements.push(...renderFamilyHierarchy(child, childX, y + NODE_HEIGHT + 80, level + 1))
        })
      }
    } else {
      // If no partner but has children (single parent)
      const children = member.children
        .map((id) => familyTreeData.members.find((m) => m.id === id))
        .filter(Boolean) as FamilyMember[]

      if (children.length > 0) {
        // Add vertical line down from the member
        elements.push(
          <line
            key={`vertical-${member.id}`}
            x1={x}
            y1={y + NODE_HEIGHT}
            x2={x}
            y2={y + NODE_HEIGHT + 50}
            stroke="#888"
            strokeWidth="2"
          />,
        )

        // Calculate positions for children
        const childrenWidth = children.length * (NODE_WIDTH + 50) - 50
        const startX = x - childrenWidth / 2

        // Add horizontal line connecting all children
        elements.push(
          <line
            key={`horizontal-${member.id}`}
            x1={startX + NODE_WIDTH / 2}
            y1={y + NODE_HEIGHT + 50}
            x2={startX + childrenWidth + NODE_WIDTH / 2}
            y2={y + NODE_HEIGHT + 50}
            stroke="#888"
            strokeWidth="2"
          />,
        )

        // Render each child and their descendants
        children.forEach((child, index) => {
          const childX = startX + index * (NODE_WIDTH + 50) + NODE_WIDTH / 2

          // Add vertical line to each child
          elements.push(
            <line
              key={`child-line-${child.id}`}
              x1={childX}
              y1={y + NODE_HEIGHT + 50}
              x2={childX}
              y2={y + NODE_HEIGHT + 80}
              stroke="#888"
              strokeWidth="2"
            />,
          )

          // Recursively render the child and their descendants
          elements.push(...renderFamilyHierarchy(child, childX, y + NODE_HEIGHT + 80, level + 1))
        })
      }
    }

    return elements
  }

  // Update the renderMemberNode function to enhance the visual appearance
  const renderMemberNode = (member: FamilyMember, x: number, y: number) => {
    const isSelected = selectedMember?.id === member.id
    const genderGradient =
      member.gender === "male"
        ? "url(#maleGradient)"
        : member.gender === "female"
          ? "url(#femaleGradient)"
          : "url(#otherGradient)"

    return (
      <g
        key={member.id}
        transform={`translate(${x}, ${y})`}
        onClick={() => setSelectedMember(member)}
        style={{ cursor: "pointer" }}
        className="member-node"
      >
        <rect
          x="0"
          y="0"
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          rx="8"
          ry="8"
          fill={genderGradient}
          stroke={isSelected ? "#000" : "#ccc"}
          strokeWidth={isSelected ? "3" : "1"}
          filter="url(#dropShadow)"
        />
        <circle
          cx="20"
          cy="20"
          r="15"
          fill="white"
          stroke={member.gender === "male" ? "#4299e1" : member.gender === "female" ? "#ed64a6" : "#68d391"}
          strokeWidth="1"
        />
        <image
          x="5"
          y="5"
          width="30"
          height="30"
          href={member.imageUrl || "/placeholder.svg?height=30&width=30"}
          clipPath="url(#circleClip)"
        />
        <text x="45" y="25" fontWeight="bold" fontSize="14" fill="#333">
          {member.name}
        </text>
        <text x="45" y="45" fontSize="12" fill="#666">
          {member.birthDate ? new Date(member.birthDate).getFullYear() : "Unknown"}
          {member.deathDate ? ` - ${new Date(member.deathDate).getFullYear()}` : ""}
        </text>
        <text x="45" y="65" fontSize="12" fontStyle="italic" fill="#666">
          {member.bio
            ? member.bio.length > 25
              ? member.bio.substring(0, 25) + "..."
              : member.bio
            : "No bio available"}
        </text>
      </g>
    )
  }

  // Render list view
  const renderListView = () => {
    return (
      <div className="space-y-2 p-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`border rounded-lg p-3 transition-colors ${
              selectedMember?.id === member.id ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedMember(member)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    member.gender === "male"
                      ? "bg-blue-100 text-blue-600"
                      : member.gender === "female"
                        ? "bg-pink-100 text-pink-600"
                        : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    {member.birthDate && <span>Born: {new Date(member.birthDate).toLocaleDateString()}</span>}
                    {member.children.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {member.children.length} {member.children.length === 1 ? "child" : "children"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Render member details
  const renderMemberDetails = () => {
    if (!selectedMember) return null

    const parents = selectedMember.parents
      .map((id) => familyTreeData.members.find((m) => m.id === id))
      .filter(Boolean) as FamilyMember[]

    const children = selectedMember.children
      .map((id) => familyTreeData.members.find((m) => m.id === id))
      .filter(Boolean) as FamilyMember[]

    const partners = selectedMember.partners
      .map((id) => familyTreeData.members.find((m) => m.id === id))
      .filter(Boolean) as FamilyMember[]

    const siblings = selectedMember.siblings
      .map((id) => familyTreeData.members.find((m) => m.id === id))
      .filter(Boolean) as FamilyMember[]

    return (
      <Card className="mt-4 border-primary/20 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  selectedMember.gender === "male"
                    ? "bg-blue-100 text-blue-600"
                    : selectedMember.gender === "female"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-purple-100 text-purple-600"
                }`}
              >
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                </svg>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {selectedMember.birthDate && (
                    <span className="text-muted-foreground text-sm">
                      Born: {new Date(selectedMember.birthDate).toLocaleDateString()}
                    </span>
                  )}
                  {selectedMember.deathDate && (
                    <span className="text-muted-foreground text-sm">
                      Died: {new Date(selectedMember.deathDate).toLocaleDateString()}
                    </span>
                  )}
                  <Badge
                    variant="outline"
                    className={`
                    ${
                      selectedMember.gender === "male"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : selectedMember.gender === "female"
                          ? "bg-pink-50 text-pink-700 border-pink-200"
                          : "bg-purple-50 text-purple-700 border-purple-200"
                    }
                  `}
                  >
                    {selectedMember.gender.charAt(0).toUpperCase() + selectedMember.gender.slice(1)}
                  </Badge>
                </div>
                {selectedMember.bio && <p className="mt-2 text-sm">{selectedMember.bio}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {parents.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v12" />
                        <circle cx="12" cy="20" r="3" />
                        <path d="M18 9a6 6 0 0 0-12 0" />
                      </svg>
                      Parents
                    </h3>
                    {parents.map((parent) => (
                      <div
                        key={parent.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted"
                        onClick={() => setSelectedMember(parent)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            parent.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                          }`}
                        >
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                          </svg>
                        </div>
                        <span>{parent.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {partners.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      Partners
                    </h3>
                    {partners.map((partner) => (
                      <div
                        key={partner.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted"
                        onClick={() => setSelectedMember(partner)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            partner.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                          }`}
                        >
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                          </svg>
                        </div>
                        <span>{partner.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {children.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v12" />
                        <circle cx="12" cy="3" r="3" />
                        <path d="M6 20h12" />
                        <path d="M6 16v4" />
                        <path d="M18 16v4" />
                      </svg>
                      Children
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted"
                          onClick={() => setSelectedMember(child)}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              child.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                            }`}
                          >
                            <svg
                              className="h-3 w-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="8" r="5" />
                              <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                            </svg>
                          </div>
                          <span>{child.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {siblings.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-1">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="12" r="3" />
                        <path d="M3 12h3" />
                        <path d="M18 12h3" />
                        <path d="M6 15v3" />
                        <path d="M18 15v3" />
                      </svg>
                      Siblings
                    </h3>
                    {siblings.map((sibling) => (
                      <div
                        key={sibling.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted"
                        onClick={() => setSelectedMember(sibling)}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            sibling.gender === "male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
                          }`}
                        >
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
                          </svg>
                        </div>
                        <span>{sibling.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  View Timeline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Enhance the tree visualization with better visual design
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-[200px]">
            <TabsList>
              <TabsTrigger value="tree" className="flex items-center gap-1">
                <Grid className="h-4 w-4" />
                Tree View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                List View
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <HelpTooltip
            content="Tree view shows family relationships visually. List view shows all members in a list format."
            side="bottom"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {viewMode === "tree" && (
            <>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vertical">Vertical</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center text-sm">{Math.round(zoom * 100)}%</div>
                <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 2}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card shadow-sm" ref={containerRef}>
        {viewMode === "tree" ? (
          <div className="relative p-8 min-h-[500px] overflow-auto">
            <div className="flex justify-center mb-4 gap-2">
              <Button variant="outline" size="sm" onClick={() => handlePan("left")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handlePan("up")}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handlePan("down")}>
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handlePan("right")}>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={resetView}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <svg
              ref={svgRef}
              width={treeDimensions.width}
              height={treeDimensions.height}
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "0 0",
                transition: "transform 0.1s ease-out",
              }}
            >
              <defs>
                <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                  <feOffset dx="1" dy="1" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="maleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d1e8ff" />
                  <stop offset="100%" stopColor="#b1d8ff" />
                </linearGradient>
                <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffd1dc" />
                  <stop offset="100%" stopColor="#ffb1c1" />
                </linearGradient>
                <linearGradient id="otherGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d1ffd1" />
                  <stop offset="100%" stopColor="#b1ffb1" />
                </linearGradient>
                <clipPath id="circleClip">
                  <circle cx="15" cy="15" r="15" />
                </clipPath>
              </defs>
              {renderFamilyTree()}
            </svg>
          </div>
        ) : (
          renderListView()
        )}
      </div>

      {selectedMember && renderMemberDetails()}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={exportSVG}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}

