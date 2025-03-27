"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Download,
  Share2,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Grid3X3,
  LayoutGrid,
  Heart,
  User,
  Calendar,
  X,
  Sparkles,
  Sun,
  Minus,
  Edit,
} from "lucide-react"
import type { ModernFamilyMember } from "./family-tree"

interface ModernTreeVisualizationProps {
  members: ModernFamilyMember[]
}

// Node dimensions and spacing constants
const NODE_WIDTH = 220
const NODE_HEIGHT = 120
const HORIZONTAL_SPACING = 70 // Increased horizontal spacing between siblings
const VERTICAL_SPACING = 120 // Increased vertical spacing between generations
const SPOUSE_SPACING = 50 // Spacing between spouses

export function ModernTreeVisualization({ members }: ModernTreeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<"vertical" | "horizontal">("vertical")
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set())
  const [treeWidth, setTreeWidth] = useState(2000)
  const [treeHeight, setTreeHeight] = useState(1200)
  const [showMemberDetails, setShowMemberDetails] = useState(false)
  const [detailsMember, setDetailsMember] = useState<ModernFamilyMember | null>(null)
  const [theme, setTheme] = useState<"light" | "modern" | "minimal">("modern")

  // Find root members (those without parents)
  const rootMembers = members.filter((member) => member.parentIds.length === 0)

  // Calculate positions for all nodes
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number; width: number }>>({})

  useEffect(() => {
    setNodePositions(calculateNodePositions())
  }, [members, collapsedNodes, treeWidth, treeHeight])

  const calculateNodePositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number; width: number }> = {}
    const processedNodes = new Set<string>()

    // Process a node and its descendants
    const processNode = (
      memberId: string,
      x: number,
      y: number,
      level: number,
      parentWidth = 0,
    ): { width: number; height: number } => {
      if (processedNodes.has(memberId)) {
        return { width: 0, height: 0 }
      }

      processedNodes.add(memberId)
      const member = members.find((m) => m.id === memberId)
      if (!member) return { width: 0, height: 0 }

      // Skip processing children if node is collapsed
      const isCollapsed = collapsedNodes.has(memberId)

      // Find spouse if exists
      const spouses = member.spouseIds
        .map((id) => members.find((m) => m.id === id))
        .filter(Boolean) as ModernFamilyMember[]

      // Calculate width needed for this node and its spouses
      const spouseCount = spouses.length
      const nodeWithSpousesWidth = NODE_WIDTH + spouseCount * (NODE_WIDTH + SPOUSE_SPACING)

      // Get children
      const children = isCollapsed
        ? []
        : (member.childrenIds.map((id) => members.find((m) => m.id === id)).filter(Boolean) as ModernFamilyMember[])

      // Process children recursively to calculate their total width
      let totalChildrenWidth = 0
      let maxChildHeight = 0

      if (children.length > 0) {
        let childX = 0

        for (const child of children) {
          const childResult = processNode(
            child.id,
            x + childX,
            y + VERTICAL_SPACING + NODE_HEIGHT,
            level + 1,
            nodeWithSpousesWidth,
          )

          childX += childResult.width + HORIZONTAL_SPACING
          totalChildrenWidth += childResult.width

          if (children.length > 1 && child !== children[children.length - 1]) {
            totalChildrenWidth += HORIZONTAL_SPACING
          }

          maxChildHeight = Math.max(maxChildHeight, childResult.height)
        }
      }

      // Determine the width this node and its descendants need
      const nodeWidth = Math.max(nodeWithSpousesWidth, totalChildrenWidth)

      // Calculate the x position, centering the node above its children
      let nodeX = x
      if (totalChildrenWidth > nodeWithSpousesWidth) {
        nodeX = x + (totalChildrenWidth - nodeWithSpousesWidth) / 2
      }

      // Store the position
      positions[memberId] = { x: nodeX, y, width: nodeWidth }

      // Position spouses
      let spouseX = nodeX + NODE_WIDTH + SPOUSE_SPACING
      for (const spouse of spouses) {
        positions[spouse.id] = { x: spouseX, y, width: NODE_WIDTH }
        spouseX += NODE_WIDTH + SPOUSE_SPACING
        processedNodes.add(spouse.id)
      }

      return {
        width: nodeWidth,
        height: NODE_HEIGHT + (children.length > 0 ? VERTICAL_SPACING + maxChildHeight : 0),
      }
    }

    // Process all root members
    let rootX = 50
    let maxHeight = 0

    for (const rootMember of rootMembers) {
      const result = processNode(rootMember.id, rootX, 50, 0)
      rootX += result.width + HORIZONTAL_SPACING * 2 // Extra spacing between root families
      maxHeight = Math.max(maxHeight, result.height)
    }

    // Update tree dimensions
    setTreeWidth(rootX + 100)
    setTreeHeight(maxHeight + 100)

    return positions
  }, [members, collapsedNodes, rootMembers])

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left mouse button
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

  // Handle pan controls
  const handlePan = (direction: "up" | "down" | "left" | "right") => {
    const panAmount = 50
    switch (direction) {
      case "up":
        setPan((prev) => ({ ...prev, y: prev.y + panAmount }))
        break
      case "down":
        setPan((prev) => ({ ...prev, y: prev.y - panAmount }))
        break
      case "left":
        setPan((prev) => ({ ...prev, x: prev.x + panAmount }))
        break
      case "right":
        setPan((prev) => ({ ...prev, x: prev.x - panAmount }))
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

  // Toggle node collapse
  const toggleNodeCollapse = (memberId: string) => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(memberId)) {
        newSet.delete(memberId)
      } else {
        newSet.add(memberId)
      }
      return newSet
    })
  }

  // Export as SVG
  const exportSVG = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "family-tree.svg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Show member details
  const handleShowDetails = (member: ModernFamilyMember) => {
    setDetailsMember(member)
    setShowMemberDetails(true)
  }

  // Get theme-specific styles
  const getThemeStyles = (member: ModernFamilyMember) => {
    const genderBaseColors = {
      male: {
        light: { bg: "#e6f2ff", border: "#99ccff", text: "#0066cc" },
        modern: { bg: "#e0f2fe", border: "#7dd3fc", text: "#0284c7" },
        minimal: { bg: "#f8fafc", border: "#cbd5e1", text: "#334155" },
      },
      female: {
        light: { bg: "#ffebf5", border: "#ffb3d9", text: "#cc0066" },
        modern: { bg: "#fce7f3", border: "#f9a8d4", text: "#db2777" },
        minimal: { bg: "#f8fafc", border: "#cbd5e1", text: "#334155" },
      },
      other: {
        light: { bg: "#f5ebff", border: "#d9b3ff", text: "#6600cc" },
        modern: { bg: "#f3e8ff", border: "#d8b4fe", text: "#9333ea" },
        minimal: { bg: "#f8fafc", border: "#cbd5e1", text: "#334155" },
      },
    }

    const colors = genderBaseColors[member.gender][theme]

    return {
      card: {
        background: colors.bg,
        border: colors.border,
        text: colors.text,
        shadow: theme === "minimal" ? "0 1px 2px rgba(0,0,0,0.05)" : "0 4px 12px rgba(0,0,0,0.08)",
      },
    }
  }

  // Render a member node
  const renderMemberNode = (member: ModernFamilyMember) => {
    const position = nodePositions[member.id]
    if (!position) return null

    const isSelected = selectedMember === member.id
    const isHovered = hoveredMember === member.id
    const hasChildren = member.childrenIds.length > 0
    const isCollapsed = collapsedNodes.has(member.id)

    const styles = getThemeStyles(member)

    return (
      <g
        key={member.id}
        transform={`translate(${position.x}, ${position.y})`}
        className="transition-transform duration-300 ease-in-out"
      >
        {/* Card background */}
        <motion.rect
          x="0"
          y="0"
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          rx="12"
          ry="12"
          fill={styles.card.background}
          stroke={isSelected ? "#3b82f6" : styles.card.border}
          strokeWidth={isSelected ? 3 : 1.5}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: `drop-shadow(${styles.card.shadow})`,
            strokeWidth: isHovered && !isSelected ? 2 : isSelected ? 3 : 1.5,
          }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setHoveredMember(member.id)}
          onMouseLeave={() => setHoveredMember(null)}
          onClick={() => setSelectedMember(member.id)}
          style={{ cursor: "pointer" }}
        />

        {/* Avatar circle */}
        <circle cx="30" cy="30" r="20" fill="white" stroke={styles.card.border} strokeWidth="1.5" />

        {/* User icon */}
        <svg
          x="18"
          y="18"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={styles.card.text}
          strokeWidth="2"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
        </svg>

        {/* Name */}
        <text
          x="65"
          y="30"
          fill={styles.card.text}
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          dominantBaseline="middle"
        >
          {member.name.length > 18 ? `${member.name.substring(0, 16)}...` : member.name}
        </text>

        {/* Birth year */}
        <svg x="65" y="40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <text x="85" y="48" fill="#64748b" fontFamily="system-ui, sans-serif" fontSize="14" dominantBaseline="middle">
          {member.birthYear}
          {member.deathYear ? ` - ${member.deathYear}` : ""}
        </text>

        {/* Bio */}
        <text x="65" y="70" fill="#64748b" fontFamily="system-ui, sans-serif" fontSize="13" dominantBaseline="middle">
          {member.bio && member.bio.length > 25 ? `${member.bio.substring(0, 23)}...` : member.bio || ""}
        </text>

        {/* Info button */}
        <g
          transform={`translate(${NODE_WIDTH - 30}, 30)`}
          onClick={(e) => {
            e.stopPropagation()
            handleShowDetails(member)
          }}
          style={{ cursor: "pointer" }}
        >
          <circle r="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </g>

        {/* Expand/collapse button for nodes with children */}
        {hasChildren && (
          <g
            transform={`translate(${NODE_WIDTH - 30}, ${NODE_HEIGHT - 25})`}
            onClick={(e) => {
              e.stopPropagation()
              toggleNodeCollapse(member.id)
            }}
            style={{ cursor: "pointer" }}
          >
            <circle r="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
            {isCollapsed ? (
              <svg
                x="-8"
                y="-8"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            ) : (
              <svg
                x="-8"
                y="-8"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            )}
          </g>
        )}

        {/* Children count badge */}
        {member.childrenIds.length > 0 && (
          <g transform={`translate(65, ${NODE_HEIGHT - 25})`}>
            <rect
              x="0"
              y="-10"
              width="40"
              height="20"
              rx="10"
              ry="10"
              fill="#f1f5f9"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            <svg x="2" y="-8" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <text
              x="22"
              y="0"
              fill="#64748b"
              fontFamily="system-ui, sans-serif"
              fontSize="12"
              fontWeight="500"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {member.childrenIds.length}
            </text>
          </g>
        )}
      </g>
    )
  }

  // Render connections between family members
  const renderConnections = () => {
    const connections: React.JSX.Element[] = []

    // Process each member
    members.forEach((member) => {
      const memberPos = nodePositions[member.id]
      if (!memberPos) return

      // Skip rendering children connections if node is collapsed
      if (collapsedNodes.has(member.id)) return

      // Spouse connections
      member.spouseIds.forEach((spouseId) => {
        const spousePos = nodePositions[spouseId]
        if (!spousePos) return

        // Only draw connection if this member's ID is less than spouse's ID
        // to avoid drawing the same connection twice
        if (member.id < spouseId) {
          const startX = memberPos.x + NODE_WIDTH
          const startY = memberPos.y + NODE_HEIGHT / 2
          const endX = spousePos.x
          const endY = spousePos.y + NODE_HEIGHT / 2

          connections.push(
            <g key={`spouse-${member.id}-${spouseId}`} className="spouse-connection">
              {/* Connection line with gradient */}
              <defs>
                <linearGradient id={`spouse-gradient-${member.id}-${spouseId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={theme === "minimal" ? "#cbd5e1" : "#f9a8d4"} />
                  <stop offset="100%" stopColor={theme === "minimal" ? "#cbd5e1" : "#f9a8d4"} />
                </linearGradient>
              </defs>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={`url(#spouse-gradient-${member.id}-${spouseId})`}
                strokeWidth="2"
                strokeDasharray={theme === "minimal" ? "4 2" : "none"}
              />

              {/* Heart symbol */}
              <circle
                cx={(startX + endX) / 2}
                cy={(startY + endY) / 2}
                r="10"
                fill={theme === "minimal" ? "#f8fafc" : "#fce7f3"}
                stroke={theme === "minimal" ? "#cbd5e1" : "#f9a8d4"}
                strokeWidth="1.5"
              />
              <svg
                x={(startX + endX) / 2 - 8}
                y={(startY + endY) / 2 - 8}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme === "minimal" ? "#64748b" : "#db2777"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              {/* If they have children, draw connections to children */}
              {(() => {
                const children = member.childrenIds.filter((id) =>
                  members.find((m) => m.id === id)?.parentIds.includes(spouseId),
                )

                if (children.length > 0) {
                  // Calculate the center point between the member and spouse
                  const centerX = (startX + endX) / 2
                  const centerY = (startY + endY) / 2

                  // Draw vertical line down from the center
                  const verticalLineY = centerY + 40
                  connections.push(
                    <line
                      key={`vertical-${member.id}-${spouseId}`}
                      x1={centerX}
                      y1={centerY + 10} // Start below the heart
                      x2={centerX}
                      y2={verticalLineY}
                      stroke={theme === "minimal" ? "#cbd5e1" : "#e2e8f0"}
                      strokeWidth="2"
                      strokeDasharray={theme === "minimal" ? "4 2" : "none"}
                    />,
                  )

                  // Find the leftmost and rightmost child
                  const childPositions = children.map((id) => nodePositions[id]).filter(Boolean)

                  if (childPositions.length > 0) {
                    const leftmostChild = childPositions.reduce(
                      (min, pos) => (pos.x < min.x ? pos : min),
                      childPositions[0],
                    )

                    const rightmostChild = childPositions.reduce(
                      (max, pos) => (pos.x > max.x ? pos : max),
                      childPositions[0],
                    )

                    // Draw horizontal line connecting all children
                    const horizontalLineX1 = leftmostChild.x + NODE_WIDTH / 2
                    const horizontalLineX2 = rightmostChild.x + NODE_WIDTH / 2

                    connections.push(
                      <line
                        key={`horizontal-${member.id}-${spouseId}`}
                        x1={horizontalLineX1}
                        y1={verticalLineY}
                        x2={horizontalLineX2}
                        y2={verticalLineY}
                        stroke={theme === "minimal" ? "#cbd5e1" : "#e2e8f0"}
                        strokeWidth="2"
                        strokeDasharray={theme === "minimal" ? "4 2" : "none"}
                      />,
                    )

                    // Draw vertical lines to each child
                    children.forEach((childId) => {
                      const childPos = nodePositions[childId]
                      if (!childPos) return

                      connections.push(
                        <line
                          key={`child-${member.id}-${spouseId}-${childId}`}
                          x1={childPos.x + NODE_WIDTH / 2}
                          y1={verticalLineY}
                          x2={childPos.x + NODE_WIDTH / 2}
                          y2={childPos.y}
                          stroke={theme === "minimal" ? "#cbd5e1" : "#e2e8f0"}
                          strokeWidth="2"
                          strokeDasharray={theme === "minimal" ? "4 2" : "none"}
                        />,
                      )
                    })
                  }
                }
                return null
              })()}
            </g>,
          )
        }
      })

      // For single parents, draw connections to their children
      if (member.spouseIds.length === 0 && member.childrenIds.length > 0) {
        const startX = memberPos.x + NODE_WIDTH / 2
        const startY = memberPos.y + NODE_HEIGHT

        // Draw vertical line down from the member
        const verticalLineY = startY + 40
        connections.push(
          <line
            key={`vertical-single-${member.id}`}
            x1={startX}
            y1={startY}
            x2={startX}
            y2={verticalLineY}
            stroke={theme === "minimal" ? "#cbd5e1" : "#e2e8f0"}
            strokeWidth="2"
            strokeDasharray={theme === "minimal" ? "4 2" : "none"}
          />,
        )

        // Find the leftmost and rightmost child
        const childPositions = member.childrenIds.map((id) => nodePositions[id]).filter(Boolean)

        if (childPositions.length > 0) {
          const leftmostChild = childPositions.reduce((min, pos) => (pos.x < min.x ? pos : min), childPositions[0])

          const rightmostChild = childPositions.reduce((max, pos) => (pos.x > max.x ? pos : max), childPositions[0])

          // Draw horizontal line connecting all children
          const horizontalLineX1 = leftmostChild.x + NODE_WIDTH / 2
          const horizontalLineX2 = rightmostChild.x + NODE_WIDTH / 2

          connections.push(
            <line
              key={`horizontal-single-${member.id}`}
              x1={horizontalLineX1}
              y1={verticalLineY}
              x2={horizontalLineX2}
              y2={verticalLineY}
              stroke={theme === "minimal" ? "#cbd5e1" : "#e2e8f0"}
              strokeWidth="2"
              strokeDasharray={theme === "minimal" ? "4 2" : "none"}
            />,
          )

          // Draw vertical lines to each child
          member.childrenIds.forEach((childId) => {
            const childPos = nodePositions[childId]
            if (!childPos) return

            connections.push(
              <line
                key={`child-single-${member.id}-${childId}`}
                x1={childPos.x + NODE_WIDTH / 2}
                y1={verticalLineY}
                x2={childPos.x + NODE_WIDTH / 2}
                y2={childPos.y}
                stroke={theme === "minimal" ? "#cbd5e1" : "#e2e8f0"}
                strokeWidth="2"
                strokeDasharray={theme === "minimal" ? "4 2" : "none"}
              />,
            )
          })
        }
      }
    })

    return connections
  }

  // Render member details panel
  const renderMemberDetailsPanel = () => {
    if (!detailsMember) return null

    const member = detailsMember
    const styles = getThemeStyles(member)

    // Find parents, spouses, and children
    const parents = member.parentIds
      .map((id) => members.find((m) => m.id === id))
      .filter(Boolean) as ModernFamilyMember[]

    const spouses = member.spouseIds
      .map((id) => members.find((m) => m.id === id))
      .filter(Boolean) as ModernFamilyMember[]

    const children = member.childrenIds
      .map((id) => members.find((m) => m.id === id))
      .filter(Boolean) as ModernFamilyMember[]

    return (
      <motion.div
        className="absolute top-0 right-0 w-80 h-full bg-white border-l border-gray-200 shadow-lg z-10 overflow-y-auto"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Member Details</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowMemberDetails(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Member header */}
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: styles.card.background,
                  border: `1.5px solid ${styles.card.border}`,
                }}
              >
                <User className="h-6 w-6" style={{ color: styles.card.text }} />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {member.birthYear || "Unknown"}
                  {member.deathYear ? ` - ${member.deathYear}` : ""}
                </div>
              </div>
            </div>

            {/* Bio */}
            {member.bio && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{member.bio}</p>
              </div>
            )}

            {/* Relationships */}
            <div className="space-y-4">
              {/* Parents */}
              {parents.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v12" />
                      <circle cx="12" cy="20" r="3" />
                      <path d="M18 9a6 6 0 0 0-12 0" />
                    </svg>
                    Parents
                  </h5>
                  <div className="space-y-2">
                    {parents.map((parent) => (
                      <div
                        key={parent.id}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDetailsMember(parent)
                          setSelectedMember(parent.id)
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: getThemeStyles(parent).card.background,
                            border: `1px solid ${getThemeStyles(parent).card.border}`,
                          }}
                        >
                          <User className="h-4 w-4" style={{ color: getThemeStyles(parent).card.text }} />
                        </div>
                        <span className="text-sm">{parent.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Spouses */}
              {spouses.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {spouses.length === 1 ? "Spouse" : "Spouses"}
                  </h5>
                  <div className="space-y-2">
                    {spouses.map((spouse) => (
                      <div
                        key={spouse.id}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDetailsMember(spouse)
                          setSelectedMember(spouse.id)
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: getThemeStyles(spouse).card.background,
                            border: `1px solid ${getThemeStyles(spouse).card.border}`,
                          }}
                        >
                          <User className="h-4 w-4" style={{ color: getThemeStyles(spouse).card.text }} />
                        </div>
                        <span className="text-sm">{spouse.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Children */}
              {children.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v12" />
                      <circle cx="12" cy="3" r="3" />
                      <path d="M6 20h12" />
                      <path d="M6 16v4" />
                      <path d="M18 16v4" />
                    </svg>
                    Children
                  </h5>
                  <div className="space-y-2">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDetailsMember(child)
                          setSelectedMember(child.id)
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: getThemeStyles(child).card.background,
                            border: `1px solid ${getThemeStyles(child).card.border}`,
                          }}
                        >
                          <User className="h-4 w-4" style={{ color: getThemeStyles(child).card.text }} />
                        </div>
                        <span className="text-sm">{child.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex items-center gap-2">
          <Tabs
            value={theme}
            onValueChange={(value) => setTheme(value as "light" | "modern" | "minimal")}
            className="w-[300px]"
          >
            <TabsList>
              <TabsTrigger value="modern" className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Modern
              </TabsTrigger>
              <TabsTrigger value="light" className="flex items-center gap-1">
                <Sun className="h-3.5 w-3.5" />
                Colorful
              </TabsTrigger>
              <TabsTrigger value="minimal" className="flex items-center gap-1">
                <Minus className="h-3.5 w-3.5" />
                Minimal
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "vertical" ? "horizontal" : "vertical")}
          >
            {viewMode === "vertical" ? <LayoutGrid className="h-4 w-4 mr-2" /> : <Grid3X3 className="h-4 w-4 mr-2" />}
            {viewMode === "vertical" ? "Vertical" : "Horizontal"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-12 text-center text-sm">{Math.round(zoom * 100)}%</div>
            <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 2}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={resetView}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-4 px-2">
        <Button variant="outline" size="sm" onClick={() => handlePan("left")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePan("up")}>
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePan("down")}>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePan("right")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="flex-1 border rounded-md overflow-hidden relative bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          width={treeWidth}
          height={treeHeight}
          className="family-tree-svg"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: "0 0",
            transition: isDragging ? "none" : "transform 0.3s ease-out",
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
            <clipPath id="avatarClip">
              <circle cx="20" cy="20" r="20" />
            </clipPath>
          </defs>

          {/* Render connections first (so they appear behind nodes) */}
          {renderConnections()}

          {/* Render all member nodes */}
          {members.map((member) => renderMemberNode(member))}
        </svg>

        {/* Member details panel */}
        <AnimatePresence>{showMemberDetails && renderMemberDetailsPanel()}</AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-4 px-2">
        <div>
          <Button variant="outline" size="sm" onClick={exportSVG}>
            <Download className="h-4 w-4 mr-2" />
            Export SVG
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

