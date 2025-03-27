"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
} from "lucide-react"
import { motion } from "framer-motion"

// Define member type
interface FamilyMember {
  id: string
  name: string
  birthDate?: string
  deathDate?: string
  gender: "male" | "female" | "other"
  bio?: string
  imageUrl?: string
  parentIds: string[]
  spouseIds: string[]
  childrenIds: string[]
}

interface EnhancedTreeVisualizationProps {
  members: FamilyMember[]
}

// Node dimensions and spacing constants
const NODE_WIDTH = 200
const NODE_HEIGHT = 100
const HORIZONTAL_SPACING = 60 // Increased horizontal spacing between siblings
const VERTICAL_SPACING = 100 // Increased vertical spacing between generations
const SPOUSE_SPACING = 40 // Spacing between spouses

export function EnhancedTreeVisualization({ members }: EnhancedTreeVisualizationProps) {
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

  // Find root members (those without parents)
  const rootMembers = members.filter((member) => member.parentIds.length === 0)

  // Calculate positions for all nodes
  const calculateNodePositions = () => {
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
      const spouses = member.spouseIds.map((id) => members.find((m) => m.id === id)).filter(Boolean) as FamilyMember[]

      // Calculate width needed for this node and its spouses
      const spouseCount = spouses.length
      const nodeWithSpousesWidth = NODE_WIDTH + spouseCount * (NODE_WIDTH + SPOUSE_SPACING)

      // Get children
      const children = isCollapsed
        ? []
        : (member.childrenIds.map((id) => members.find((m) => m.id === id)).filter(Boolean) as FamilyMember[])

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
  }

  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number; width: number }>>({})

  useEffect(() => {
    setNodePositions(calculateNodePositions())
  }, [members, collapsedNodes, treeWidth, treeHeight])

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

  // Render a member node
  const renderMemberNode = (member: FamilyMember) => {
    const position = nodePositions[member.id]
    if (!position) return null

    const isSelected = selectedMember === member.id
    const isHovered = hoveredMember === member.id
    const hasChildren = member.childrenIds.length > 0
    const isCollapsed = collapsedNodes.has(member.id)

    // Determine gender-based styling
    const genderColors = {
      male: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
      female: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-700" },
      other: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
    }

    const colors = genderColors[member.gender]

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
          rx="8"
          ry="8"
          className={`${colors.bg} stroke-2 ${isSelected ? "stroke-primary" : colors.border} 
                      ${isHovered ? "stroke-primary stroke-[3px]" : ""}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setHoveredMember(member.id)}
          onMouseLeave={() => setHoveredMember(null)}
          onClick={() => setSelectedMember(member.id)}
          style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))" }}
        />

        {/* Avatar circle */}
        <circle
          cx="25"
          cy="25"
          r="15"
          className="fill-white stroke-1"
          stroke={member.gender === "male" ? "#4299e1" : member.gender === "female" ? "#ed64a6" : "#9f7aea"}
        />

        {/* User icon */}
        <svg
          x="15"
          y="15"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={colors.text}
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21v-2a7 7 0 0 0-14 0v2" />
        </svg>

        {/* Name */}
        <text x="50" y="25" className={`text-sm font-medium ${colors.text}`} dominantBaseline="middle">
          {member.name.length > 18 ? `${member.name.substring(0, 16)}...` : member.name}
        </text>

        {/* Birth year */}
        <text x="50" y="45" className="text-xs text-gray-500" dominantBaseline="middle">
          {member.birthDate ? new Date(member.birthDate).getFullYear() : ""}
          {member.deathDate ? ` - ${new Date(member.deathDate).getFullYear()}` : ""}
        </text>

        {/* Bio */}
        <text x="50" y="65" className="text-xs text-gray-500 italic" dominantBaseline="middle">
          {member.bio && member.bio.length > 25 ? `${member.bio.substring(0, 23)}...` : member.bio || ""}
        </text>

        {/* Expand/collapse button for nodes with children */}
        {hasChildren && (
          <g
            transform={`translate(${NODE_WIDTH - 25}, ${NODE_HEIGHT - 25})`}
            onClick={(e) => {
              e.stopPropagation()
              toggleNodeCollapse(member.id)
            }}
            className="cursor-pointer"
          >
            <circle r="12" className="fill-primary-foreground stroke-primary" />
            {isCollapsed ? (
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                transform="translate(-12, -12)"
                className="text-primary"
              />
            ) : (
              <path
                d="M17 14L12 9L7 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                transform="translate(-12, -12)"
                className="text-primary"
              />
            )}
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
              {/* Connection line */}
              <line x1={startX} y1={startY} x2={endX} y2={endY} className="stroke-pink-300" strokeWidth="2" />

              {/* Heart symbol */}
              <circle
                cx={(startX + endX) / 2}
                cy={(startY + endY) / 2}
                r="8"
                className="fill-pink-100 stroke-pink-300"
                strokeWidth="1"
              />
              <path
                d={`M${(startX + endX) / 2 - 4},${(startY + endY) / 2 - 2} 
                    L${(startX + endX) / 2},${(startY + endY) / 2 + 2} 
                    L${(startX + endX) / 2 + 4},${(startY + endY) / 2 - 2}`}
                className="fill-pink-300 stroke-pink-300"
                strokeWidth="1"
              />
            </g>,
          )

          // If they have children, draw connections to children
          const children = member.childrenIds.filter((id) =>
            members.find((m) => m.id === id)?.parentIds.includes(spouseId),
          )

          if (children.length > 0) {
            // Calculate the center point between the member and spouse
            const centerX = (startX + endX) / 2
            const centerY = (startY + endY) / 2

            // Draw vertical line down from the center
            const verticalLineY = centerY + 30
            connections.push(
              <line
                key={`vertical-${member.id}-${spouseId}`}
                x1={centerX}
                y1={centerY + 8} // Start below the heart
                x2={centerX}
                y2={verticalLineY}
                className="stroke-gray-300"
                strokeWidth="2"
              />,
            )

            // Find the leftmost and rightmost child
            const childPositions = children.map((id) => nodePositions[id]).filter(Boolean)

            if (childPositions.length > 0) {
              const leftmostChild = childPositions.reduce((min, pos) => (pos.x < min.x ? pos : min), childPositions[0])

              const rightmostChild = childPositions.reduce((max, pos) => (pos.x > max.x ? pos : max), childPositions[0])

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
                  className="stroke-gray-300"
                  strokeWidth="2"
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
                    className="stroke-gray-300"
                    strokeWidth="2"
                  />,
                )
              })
            }
          }
        }
      })

      // For single parents, draw connections to their children
      if (member.spouseIds.length === 0 && member.childrenIds.length > 0) {
        const startX = memberPos.x + NODE_WIDTH / 2
        const startY = memberPos.y + NODE_HEIGHT

        // Draw vertical line down from the member
        const verticalLineY = startY + 30
        connections.push(
          <line
            key={`vertical-single-${member.id}`}
            x1={startX}
            y1={startY}
            x2={startX}
            y2={verticalLineY}
            className="stroke-gray-300"
            strokeWidth="2"
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
              className="stroke-gray-300"
              strokeWidth="2"
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
                className="stroke-gray-300"
                strokeWidth="2"
              />,
            )
          })
        }
      }
    })

    return connections
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "vertical" ? "horizontal" : "vertical")}
          >
            {viewMode === "vertical" ? <LayoutGrid className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            <span className="ml-2">{viewMode === "vertical" ? "Vertical" : "Horizontal"}</span>
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="ml-2">
                  {members.length} Members
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total family members in tree</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          </defs>

          {/* Render connections first (so they appear behind nodes) */}
          {renderConnections()}

          {/* Render all member nodes */}
          {members.map((member) => renderMemberNode(member))}
        </svg>
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

