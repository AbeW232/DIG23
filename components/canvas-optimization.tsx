"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCw, Download, Zap } from "lucide-react"

export function CanvasOptimization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [particleCount, setParticleCount] = useState(50)
  const [fps, setFps] = useState(0)
  const [renderTime, setRenderTime] = useState(0)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }>>(
    [],
  )
  const lastFrameTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const lastFpsUpdateRef = useRef<number>(0)

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Create particles
    createParticles()

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = canvasRef.current.clientWidth
      canvasRef.current.height = canvasRef.current.clientHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update particles when count changes
  useEffect(() => {
    createParticles()
  }, [particleCount])

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      lastFrameTimeRef.current = performance.now()
      frameCountRef.current = 0
      lastFpsUpdateRef.current = performance.now()
      animationRef.current = requestAnimationFrame(animate)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating])

  const createParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const particles = []

    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    particlesRef.current = particles
  }

  const animate = (timestamp: number) => {
    if (!canvasRef.current) return

    const startTime = performance.now()

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off walls
      if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
        particle.vx *= -1
      }

      if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
        particle.vy *= -1
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })

    // Calculate render time
    const endTime = performance.now()
    setRenderTime(endTime - startTime)

    // Calculate FPS
    const elapsed = timestamp - lastFpsUpdateRef.current
    frameCountRef.current++

    if (elapsed > 1000) {
      setFps(Math.round((frameCountRef.current * 1000) / elapsed))
      lastFpsUpdateRef.current = timestamp
      frameCountRef.current = 0
    }

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate)
  }

  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev)
  }

  const resetCanvas = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      setIsAnimating(false)
    }

    createParticles()

    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw particles in their initial state
    particlesRef.current.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })
  }

  const handleParticleCountChange = (value: number[]) => {
    setParticleCount(value[0])
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Canvas Optimization
        </CardTitle>
        <CardDescription>Optimize canvas rendering performance for animations.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demo">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demo">Demo</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="demo" className="space-y-4 pt-4">
            <div className="rounded-lg border bg-card">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <canvas ref={canvasRef} className="h-full w-full bg-background"></canvas>
                <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                  {fps} FPS | {renderTime.toFixed(2)}ms
                </div>
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={toggleAnimation}>
                    {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={resetCanvas}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Particles: {particleCount}</span>
                  <Slider
                    value={[particleCount]}
                    min={10}
                    max={200}
                    step={10}
                    onValueChange={handleParticleCountChange}
                    className="w-[100px]"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Canvas Demo Information</h4>
              <p className="text-sm text-muted-foreground">
                This demo shows a particle animation rendered on HTML Canvas. Adjust the particle count to see how it
                affects performance. Higher particle counts will require more processing power.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rendering Mode</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rendering mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="optimized">Optimized</SelectItem>
                    <SelectItem value="webgl">WebGL Accelerated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Animation Speed</Label>
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={10} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Use RequestAnimationFrame</Label>
                  <p className="text-sm text-muted-foreground">Optimize animation timing</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Double Buffering</Label>
                  <p className="text-sm text-muted-foreground">Reduce flickering during animation</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hardware Acceleration</Label>
                  <p className="text-sm text-muted-foreground">Use GPU for rendering when available</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4 pt-4">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Performance Metrics</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current FPS</span>
                    <span className="text-sm font-medium">{fps} fps</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Render Time</span>
                    <span className="text-sm font-medium">{renderTime.toFixed(2)} ms</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min((renderTime / 16) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Memory Usage</span>
                    <span className="text-sm font-medium">~{(particleCount * 0.1).toFixed(1)} MB</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min((particleCount / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">Optimization Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Use object pooling to reduce garbage collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Implement spatial partitioning for collision detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Consider using WebGL for complex animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Reduce draw calls by batching similar objects</span>
                </li>
              </ul>
            </div>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Performance Report
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

