"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CanvasOptimizer } from "@/components/optimized/canvas-optimizer"
import { memoize } from "@/lib/utils"

// Sample family data
const sampleFamilyData = {
  nodes: [
    { id: "1", name: "John Smith", birth: "1950", death: "2020" },
    { id: "2", name: "Mary Smith", birth: "1952", death: "" },
    { id: "3", name: "James Smith", birth: "1975", death: "" },
    { id: "4", name: "Sarah Johnson", birth: "1978", death: "" },
    { id: "5", name: "Emily Smith", birth: "2000", death: "" },
    { id: "6", name: "Michael Smith", birth: "2002", death: "" },
  ],
  links: [
    { source: "1", target: "2", relationship: "spouse" },
    { source: "1", target: "3", relationship: "parent" },
    { source: "2", target: "3", relationship: "parent" },
    { source: "3", target: "4", relationship: "spouse" },
    { source: "3", target: "5", relationship: "parent" },
    { source: "4", target: "5", relationship: "parent" },
    { source: "3", target: "6", relationship: "parent" },
    { source: "4", target: "6", relationship: "parent" },
  ],
}

export function FamilyTreeVisualization() {
  const [zoom, setZoom] = useState(100)
  const [viewMode, setViewMode] = useState("tree")

  // Memoized drawing functions to prevent unnecessary recalculations
  const drawTreeView = useCallback(
    memoize(
      (ctx: CanvasRenderingContext2D, width: number, height: number, data: typeof sampleFamilyData, scale: number) => {
        const centerX = width / 2
        const centerY = 100
        const nodeWidth = 120 * scale
        const nodeHeight = 60 * scale
        const levelHeight = 120 * scale

        // Draw nodes
        const nodePositions: Record<string, { x: number; y: number }> = {}

        // First generation (root)
        const rootNode = data.nodes[0]
        const rootSpouse = data.nodes[1]

        nodePositions[rootNode.id] = { x: centerX - nodeWidth - 10, y: centerY }
        nodePositions[rootSpouse.id] = { x: centerX + 10, y: centerY }

        drawPersonNode(ctx, rootNode, nodePositions[rootNode.id].x, nodePositions[rootNode.id].y, nodeWidth, nodeHeight)
        drawPersonNode(
          ctx,
          rootSpouse,
          nodePositions[rootSpouse.id].x,
          nodePositions[rootSpouse.id].y,
          nodeWidth,
          nodeHeight,
        )

        // Draw spouse line
        ctx.beginPath()
        ctx.moveTo(nodePositions[rootNode.id].x + nodeWidth, nodePositions[rootNode.id].y + nodeHeight / 2)
        ctx.lineTo(nodePositions[rootSpouse.id].x, nodePositions[rootSpouse.id].y + nodeHeight / 2)
        ctx.strokeStyle = "#888"
        ctx.stroke()

        // Second generation (children)
        const children = data.nodes.slice(2, 4)
        const childX = centerX - nodeWidth / 2
        const childY = centerY + levelHeight

        nodePositions[children[0].id] = { x: childX, y: childY }
        drawPersonNode(ctx, children[0], childX, childY, nodeWidth, nodeHeight)

        // Draw parent-child lines
        ctx.beginPath()
        ctx.moveTo(centerX, centerY + nodeHeight)
        ctx.lineTo(centerX, childY)
        ctx.strokeStyle = "#888"
        ctx.stroke()

        // Third generation (grandchildren)
        const grandchildren = data.nodes.slice(4)
        const gcX1 = centerX - nodeWidth - 20
        const gcX2 = centerX + 20
        const gcY = childY + levelHeight

        nodePositions[grandchildren[0].id] = { x: gcX1, y: gcY }
        nodePositions[grandchildren[1].id] = { x: gcX2, y: gcY }

        drawPersonNode(ctx, grandchildren[0], gcX1, gcY, nodeWidth, nodeHeight)
        drawPersonNode(ctx, grandchildren[1], gcX2, gcY, nodeWidth, nodeHeight)

        // Draw parent-child lines
        ctx.beginPath()
        ctx.moveTo(childX + nodeWidth / 2, childY + nodeHeight)
        ctx.lineTo(childX + nodeWidth / 2, gcY - 20)
        ctx.lineTo(gcX1 + nodeWidth / 2, gcY - 20)
        ctx.lineTo(gcX1 + nodeWidth / 2, gcY)
        ctx.strokeStyle = "#888"
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(childX + nodeWidth / 2, gcY - 20)
        ctx.lineTo(gcX2 + nodeWidth / 2, gcY - 20)
        ctx.lineTo(gcX2 + nodeWidth / 2, gcY)
        ctx.strokeStyle = "#888"
        ctx.stroke()
      },
    ),
    [],
  )

  const drawTimelineView = useCallback(
    memoize(
      (ctx: CanvasRenderingContext2D, width: number, height: number, data: typeof sampleFamilyData, scale: number) => {
        const startYear = 1940
        const endYear = 2025
        const yearSpan = endYear - startYear
        const timelineTop = 50
        const timelineBottom = height - 50
        const timelineLength = timelineBottom - timelineTop

        // Draw timeline
        ctx.beginPath()
        ctx.moveTo(width / 2, timelineTop)
        ctx.lineTo(width / 2, timelineBottom)
        ctx.strokeStyle = "#888"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw year markers
        ctx.textAlign = "right"
        ctx.font = "12px Arial"
        ctx.fillStyle = "#666"

        for (let year = startYear; year <= endYear; year += 10) {
          const y = timelineTop + (timelineLength * (year - startYear)) / yearSpan

          ctx.beginPath()
          ctx.moveTo(width / 2 - 5, y)
          ctx.lineTo(width / 2 + 5, y)
          ctx.stroke()

          ctx.fillText(year.toString(), width / 2 - 10, y + 4)
        }

        // Draw people on timeline
        data.nodes.forEach((person, index) => {
          if (!person.birth) return

          const birthYear = Number.parseInt(person.birth)
          const birthY = timelineTop + (timelineLength * (birthYear - startYear)) / yearSpan

          const deathYear = person.death ? Number.parseInt(person.death) : null
          const deathY = deathYear ? timelineTop + (timelineLength * (deathYear - startYear)) / yearSpan : null

          // Draw person marker
          const x = width / 2 + (index % 2 === 0 ? 50 : -150) * scale

          ctx.beginPath()
          ctx.arc(x, birthY, 5, 0, Math.PI * 2)
          ctx.fillStyle = "#3b82f6"
          ctx.fill()

          // Draw life line if death date exists
          if (deathY) {
            ctx.beginPath()
            ctx.moveTo(x, birthY)
            ctx.lineTo(x, deathY)
            ctx.strokeStyle = "#3b82f6"
            ctx.lineWidth = 2
            ctx.stroke()

            ctx.beginPath()
            ctx.arc(x, deathY, 5, 0, Math.PI * 2)
            ctx.fillStyle = "#ef4444"
            ctx.fill()
          }

          // Draw name and dates
          ctx.fillStyle = "#000"
          ctx.textAlign = index % 2 === 0 ? "left" : "right"
          ctx.font = `${14 * scale}px Arial`
          ctx.fillText(person.name, index % 2 === 0 ? x + 10 : x - 10, birthY - 10)

          ctx.font = `${12 * scale}px Arial`
          ctx.fillText(
            `${person.birth}${person.death ? ` - ${person.death}` : ""}`,
            index % 2 === 0 ? x + 10 : x - 10,
            birthY + 15,
          )
        })
      },
    ),
    [],
  )

  const drawPersonNode = (
    ctx: CanvasRenderingContext2D,
    person: { name: string; birth: string; death: string },
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    // Draw node background
    ctx.fillStyle = "#f8fafc"
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(x, y, width, height, 8)
    ctx.fill()
    ctx.stroke()

    // Draw person details
    ctx.fillStyle = "#000"
    ctx.font = "bold 12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(person.name, x + width / 2, y + 20)

    ctx.font = "10px Arial"
    ctx.fillText(`${person.birth}${person.death ? ` - ${person.death}` : ""}`, x + width / 2, y + 40)
  }

  // Optimized draw function for the canvas
  const drawFamilyTree = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, timestamp: number) => {
      const scale = zoom / 100

      if (viewMode === "tree") {
        drawTreeView(ctx, width, height, sampleFamilyData, scale)
      } else {
        drawTimelineView(ctx, width, height, sampleFamilyData, scale)
      }
    },
    [zoom, viewMode, drawTreeView, drawTimelineView],
  )

  return (
    <Card className="h-[600px] flex flex-col">
      <Tabs defaultValue="tree" className="w-full" onValueChange={setViewMode}>
        <div className="flex justify-between items-center p-4 border-b">
          <TabsList>
            <TabsTrigger value="tree">Tree View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <ZoomOut className="h-4 w-4 text-muted-foreground" />
            <Slider
              className="w-24"
              value={[zoom]}
              min={50}
              max={150}
              step={10}
              onValueChange={(value) => setZoom(value[0])}
            />
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
            <Button variant="ghost" size="icon" className="ml-2">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="tree" className="flex-1 p-0 m-0">
          <CanvasOptimizer draw={drawFamilyTree} className="w-full h-full" isResponsive={true} fps={30} />
        </TabsContent>
        <TabsContent value="timeline" className="flex-1 p-0 m-0">
          <CanvasOptimizer draw={drawFamilyTree} className="w-full h-full" isResponsive={true} fps={30} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}

