"use client"

import { useState } from "react"
import { Copy, Check, ChevronDown, X, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Badge } from "@/components/ui/badge"

export function BrandGuidelines() {
  const [activeTab, setActiveTab] = useState("colors")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string | null>("typography")

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(colorName)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const colorPalette = [
    {
      name: "Primary",
      description: "Used for primary actions, links, and emphasis",
      colors: [
        { name: "primary-50", value: "hsl(var(--primary-50))" },
        { name: "primary-100", value: "hsl(var(--primary-100))" },
        { name: "primary-200", value: "hsl(var(--primary-200))" },
        { name: "primary-300", value: "hsl(var(--primary-300))" },
        { name: "primary-400", value: "hsl(var(--primary-400))" },
        { name: "primary-500", value: "hsl(var(--primary-500))" },
        { name: "primary-600", value: "hsl(var(--primary-600))" },
        { name: "primary-700", value: "hsl(var(--primary-700))" },
        { name: "primary-800", value: "hsl(var(--primary-800))" },
        { name: "primary-900", value: "hsl(var(--primary-900))" },
      ],
    },
    {
      name: "Secondary",
      description: "Used for secondary actions and accents",
      colors: [
        { name: "secondary-50", value: "hsl(var(--secondary-50))" },
        { name: "secondary-100", value: "hsl(var(--secondary-100))" },
        { name: "secondary-200", value: "hsl(var(--secondary-200))" },
        { name: "secondary-300", value: "hsl(var(--secondary-300))" },
        { name: "secondary-400", value: "hsl(var(--secondary-400))" },
        { name: "secondary-500", value: "hsl(var(--secondary-500))" },
        { name: "secondary-600", value: "hsl(var(--secondary-600))" },
        { name: "secondary-700", value: "hsl(var(--secondary-700))" },
        { name: "secondary-800", value: "hsl(var(--secondary-800))" },
        { name: "secondary-900", value: "hsl(var(--secondary-900))" },
      ],
    },
    {
      name: "Semantic",
      description: "Used for status indicators and feedback",
      colors: [
        { name: "success", value: "hsl(var(--success))" },
        { name: "warning", value: "hsl(var(--warning))" },
        { name: "destructive", value: "hsl(var(--destructive))" },
        { name: "info", value: "hsl(var(--info))" },
      ],
    },
    {
      name: "Surface",
      description: "Used for backgrounds and surfaces",
      colors: [
        { name: "background", value: "hsl(var(--background))" },
        { name: "foreground", value: "hsl(var(--foreground))" },
        { name: "card", value: "hsl(var(--card))" },
        { name: "card-foreground", value: "hsl(var(--card-foreground))" },
        { name: "muted", value: "hsl(var(--muted))" },
        { name: "muted-foreground", value: "hsl(var(--muted-foreground))" },
        { name: "accent", value: "hsl(var(--accent))" },
        { name: "accent-foreground", value: "hsl(var(--accent-foreground))" },
      ],
    },
  ]

  const typographyExamples = [
    { name: "Display", className: "text-5xl font-bold", text: "Digital Legacy" },
    { name: "Heading 1", className: "text-4xl font-bold", text: "Preserve Your Stories" },
    { name: "Heading 2", className: "text-3xl font-semibold", text: "Family Memories" },
    { name: "Heading 3", className: "text-2xl font-semibold", text: "Photo Collections" },
    { name: "Heading 4", className: "text-xl font-medium", text: "Timeline Events" },
    { name: "Body Large", className: "text-lg", text: "Share your family history with future generations." },
    { name: "Body", className: "text-base", text: "Create meaningful digital legacies that last forever." },
    { name: "Body Small", className: "text-sm", text: "Organize and preserve your most precious memories." },
    { name: "Caption", className: "text-xs text-muted-foreground", text: "Securely stored and easily accessible." },
  ]

  const spacingExamples = [
    { name: "xs", value: "0.25rem", className: "w-1 h-6 bg-primary" },
    { name: "sm", value: "0.5rem", className: "w-2 h-6 bg-primary" },
    { name: "md", value: "1rem", className: "w-4 h-6 bg-primary" },
    { name: "lg", value: "1.5rem", className: "w-6 h-6 bg-primary" },
    { name: "xl", value: "2rem", className: "w-8 h-6 bg-primary" },
    { name: "2xl", value: "3rem", className: "w-12 h-6 bg-primary" },
    { name: "3xl", value: "4rem", className: "w-16 h-6 bg-primary" },
    { name: "4xl", value: "6rem", className: "w-24 h-6 bg-primary" },
  ]

  const componentExamples = [
    {
      name: "Buttons",
      description: "Interactive elements for user actions",
      examples: (
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      ),
    },
    {
      name: "Cards",
      description: "Containers for related content",
      examples: (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <EnhancedCard title="Standard Card" description="Basic card with title and description" variant="default">
            <p className="text-sm">Card content goes here</p>
          </EnhancedCard>
          <EnhancedCard title="Interactive Card" description="Hover to see the effect" variant="interactive">
            <p className="text-sm">Hover over this card</p>
          </EnhancedCard>
        </div>
      ),
    },
    {
      name: "Brand Elements",
      description: "Core brand identity components",
      examples: (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <BrandLogo size="sm" />
            <BrandLogo size="md" />
            <BrandLogo size="lg" />
          </div>
        </div>
      ),
    },
  ]

  // New examples section
  const brandExamples = [
    {
      title: "Logo Usage",
      description: "How to properly use the Digital Legacy logo in different contexts",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base text-green-700 dark:text-green-400">
                  <Check className="mr-2 h-4 w-4" /> Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-white p-4 dark:bg-gray-950">
                    <div className="flex justify-center">
                      <BrandLogo size="md" />
                    </div>
                  </div>
                  <ul className="ml-5 list-disc text-sm text-muted-foreground">
                    <li>Maintain clear space around the logo</li>
                    <li>Use the logo at appropriate sizes for legibility</li>
                    <li>Use the full-color logo on light or white backgrounds</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base text-red-700 dark:text-red-400">
                  <X className="mr-2 h-4 w-4" /> Don't
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-white p-4 dark:bg-gray-950">
                    <div className="flex justify-center">
                      <div className="rotate-45 scale-75 opacity-50">
                        <BrandLogo size="md" />
                      </div>
                    </div>
                  </div>
                  <ul className="ml-5 list-disc text-sm text-muted-foreground">
                    <li>Rotate, distort, or alter the logo proportions</li>
                    <li>Change the logo colors outside of approved variations</li>
                    <li>Place the logo on busy backgrounds that reduce visibility</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Color Application",
      description: "Examples of proper color usage across the platform",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dashboard Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Stories</span>
                        <Badge variant="default">12 New</Badge>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-3/4 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">75% Complete</span>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          View All
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Primary colors are used for progress indicators and important actions, while muted colors provide
                    context without overwhelming the interface.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Status Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                        <span className="text-sm">Published</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-warning"></div>
                        <span className="text-sm">Draft</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive"></div>
                        <span className="text-sm">Archived</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-info"></div>
                        <span className="text-sm">In Review</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Semantic colors provide consistent status indicators across the platform, helping users quickly
                    understand content state.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Layout Examples",
      description: "Consistent layout patterns across the platform",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Content Page Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="h-6 w-3/4 rounded bg-muted"></div>
                      <div className="h-4 w-1/2 rounded bg-muted"></div>
                      <div className="h-px w-full bg-border"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2 space-y-2">
                          <div className="h-4 rounded bg-muted"></div>
                          <div className="h-4 rounded bg-muted"></div>
                          <div className="h-4 rounded bg-muted"></div>
                          <div className="h-4 w-2/3 rounded bg-muted"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-20 rounded bg-muted"></div>
                          <div className="h-4 rounded bg-muted"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Content pages use a consistent layout with clear hierarchy, with the main content taking priority
                    and supporting elements positioned appropriately.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dashboard Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-1/3 rounded bg-muted"></div>
                        <div className="h-5 w-1/4 rounded bg-muted"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 rounded bg-muted"></div>
                        <div className="h-16 rounded bg-muted"></div>
                      </div>
                      <div className="h-32 rounded bg-muted"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-12 rounded bg-muted"></div>
                        <div className="h-12 rounded bg-muted"></div>
                        <div className="h-12 rounded bg-muted"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dashboard layouts prioritize data visualization and quick access to key information, with consistent
                    spacing and alignment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Voice & Tone",
      description: "Guidelines for written communication",
      content: (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Brand Voice Attributes</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium text-primary">Compassionate</h4>
                      <p className="text-sm text-muted-foreground">
                        We speak with empathy and understanding about personal memories and legacies.
                      </p>
                    </div>
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium text-primary">Trustworthy</h4>
                      <p className="text-sm text-muted-foreground">
                        We communicate with clarity and honesty, building confidence in our platform.
                      </p>
                    </div>
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium text-primary">Respectful</h4>
                      <p className="text-sm text-muted-foreground">
                        We honor the significance of personal stories and family histories.
                      </p>
                    </div>
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium text-primary">Guiding</h4>
                      <p className="text-sm text-muted-foreground">
                        We provide clear direction without being overly technical or complicated.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Tone Examples</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-base text-green-700 dark:text-green-400">
                          <Check className="mr-2 h-4 w-4" /> Preferred
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="rounded-md bg-white p-3 dark:bg-gray-950">
                            <p className="text-sm">
                              "Your story has been saved. You can continue editing or publish it when you're ready to
                              share with your family."
                            </p>
                          </div>
                          <div className="rounded-md bg-white p-3 dark:bg-gray-950">
                            <p className="text-sm">
                              "We've securely stored your photos. They're organized in your collection and ready to be
                              included in your family's legacy."
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-base text-red-700 dark:text-red-400">
                          <X className="mr-2 h-4 w-4" /> Avoid
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="rounded-md bg-white p-3 dark:bg-gray-950">
                            <p className="text-sm">
                              "Story saved to database. Click publish to make the content visible to users with access
                              permissions."
                            </p>
                          </div>
                          <div className="rounded-md bg-white p-3 dark:bg-gray-950">
                            <p className="text-sm">
                              "Upload complete. Files stored in cloud storage and indexed for retrieval. Check media
                              library to confirm."
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "UI Patterns",
      description: "Common interface patterns and their applications",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Form Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Story Title</label>
                        <div className="h-9 rounded-md border bg-background px-3 py-1">
                          <span className="text-sm">Grandmother's Journey</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Category</label>
                        <div className="h-9 rounded-md border bg-background px-3 py-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Family History</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Description</label>
                        <div className="h-20 rounded-md border bg-background p-3">
                          <span className="text-sm">The story of my grandmother's immigration journey...</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm">Save Story</Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Forms use consistent labeling, spacing, and action placement to create a predictable experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Notification Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/50">
                        <Check className="mt-0.5 h-4 w-4 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">Story Published</p>
                          <p className="text-xs text-green-700 dark:text-green-400">
                            Your story is now visible to your family members.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/50">
                        <AlertCircle className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Draft Saved</p>
                          <p className="text-xs text-amber-700 dark:text-amber-400">
                            Your changes have been saved as a draft.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950/50">
                        <Info className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">New Comment</p>
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            Sarah left a comment on your story.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Notifications use consistent styling with semantic colors to indicate different types of messages.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Responsive Design",
      description: "How layouts adapt across different screen sizes",
      content: (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Responsive Principles</h3>
                  <p className="text-sm text-muted-foreground">
                    Our platform is designed to provide an optimal experience across all devices, from mobile phones to
                    large desktop screens.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-md border p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="16" height="20" x="4" y="2" rx="2" />
                          <line x1="12" x2="12.01" y1="18" y2="18" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">Mobile First</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        We design for mobile screens first, then enhance the experience for larger screens.
                      </p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9h18" />
                          <path d="M9 21V9" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">Flexible Layouts</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Our grid system adapts to provide optimal content organization on any screen size.
                      </p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">Touch-Friendly</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Interactive elements are sized and spaced appropriately for touch interaction on all devices.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Breakpoint Examples</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-8 items-center justify-center rounded border">
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
                              className="text-muted-foreground"
                            >
                              <rect width="16" height="20" x="4" y="2" rx="2" />
                              <line x1="12" x2="12.01" y1="18" y2="18" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Mobile (up to 640px)</p>
                            <p className="text-xs text-muted-foreground">Single column layout, stacked elements</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded border">
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
                              className="text-muted-foreground"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Tablet (641px to 1024px)</p>
                            <p className="text-xs text-muted-foreground">Two-column layouts, simplified navigation</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-16 items-center justify-center rounded border">
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
                              className="text-muted-foreground"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium">Desktop (1025px and above)</p>
                            <p className="text-xs text-muted-foreground">Multi-column layouts, full feature set</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Brand Guidelines</h2>
        <p className="text-muted-foreground">
          Comprehensive guidelines for maintaining consistent visual identity across the Digital Legacy platform.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 h-auto">
          <TabsTrigger value="colors" className="py-2 h-auto">
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="py-2 h-auto">
            Typography
          </TabsTrigger>
          <TabsTrigger value="spacing" className="py-2 h-auto">
            Spacing
          </TabsTrigger>
          <TabsTrigger value="components" className="py-2 h-auto">
            Components
          </TabsTrigger>
          <TabsTrigger value="examples" className="py-2 h-auto">
            Examples
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <p className="text-muted-foreground">
            Our color system is designed to create a warm, trustworthy experience while ensuring accessibility and
            readability across the platform.
          </p>

          <div className="space-y-6">
            {colorPalette.map((category) => (
              <div key={category.name} className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {category.colors.map((color) => (
                    <Card
                      key={color.name}
                      className="overflow-hidden transition-all hover:shadow-md"
                      onClick={() => copyToClipboard(color.value, color.name)}
                    >
                      <div
                        className="h-16 w-full"
                        style={{
                          backgroundColor: color.value,
                          border: color.name === "background" ? "1px solid hsl(var(--border))" : "none",
                        }}
                      />
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-medium">{color.name}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(color.value, color.name)
                            }}
                          >
                            {copiedColor === color.name ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            <span className="sr-only">Copy color value</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <p className="text-muted-foreground">
            Our typography system is designed to be clear, readable, and hierarchical, helping users navigate and
            understand content easily.
          </p>

          <Collapsible
            open={openSection === "typography"}
            onOpenChange={() => setOpenSection(openSection === "typography" ? null : "typography")}
            className="space-y-2"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex w-full items-center justify-between">
                <span>Typography Scale</span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", openSection === "typography" ? "rotate-180" : "")}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    {typographyExamples.map((example) => (
                      <div key={example.name} className="grid grid-cols-3 items-center gap-4">
                        <div>
                          <p className="text-sm font-medium">{example.name}</p>
                          <p className="text-xs text-muted-foreground">{example.className}</p>
                        </div>
                        <div className="col-span-2">
                          <p className={example.className}>{example.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSection === "fonts"}
            onOpenChange={() => setOpenSection(openSection === "fonts" ? null : "fonts")}
            className="space-y-2"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex w-full items-center justify-between">
                <span>Font Families</span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", openSection === "fonts" ? "rotate-180" : "")}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Primary Font: Inter</h4>
                      <p className="font-sans">
                        Inter is a versatile sans-serif typeface designed for high legibility on screens. It features a
                        tall x-height and open forms, making it excellent for interfaces and long-form reading.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Weights</h4>
                      <div className="space-y-2">
                        <p className="font-normal">Regular (400): Primary text weight</p>
                        <p className="font-medium">Medium (500): Emphasis and subheadings</p>
                        <p className="font-semibold">Semibold (600): Section headings</p>
                        <p className="font-bold">Bold (700): Primary headings and strong emphasis</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-6">
          <p className="text-muted-foreground">
            Our spacing system creates consistent rhythm and hierarchy throughout the interface, improving readability
            and visual organization.
          </p>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Spacing Scale</h3>
                <div className="space-y-4">
                  {spacingExamples.map((space) => (
                    <div key={space.name} className="grid grid-cols-3 items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">{space.name}</p>
                        <p className="text-xs text-muted-foreground">{space.value}</p>
                      </div>
                      <div className="col-span-2">
                        <div className={space.className} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Spacing Principles</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Consistency</h4>
                    <p className="text-sm text-muted-foreground">
                      Use consistent spacing values throughout the interface to create visual harmony.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Hierarchy</h4>
                    <p className="text-sm text-muted-foreground">
                      Use larger spacing to separate major sections and smaller spacing for related elements.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Breathing Room</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide adequate white space to improve readability and focus.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <p className="text-muted-foreground">
            Our component system provides consistent, accessible, and reusable building blocks for the Digital Legacy
            platform.
          </p>

          <div className="space-y-6">
            {componentExamples.map((component) => (
              <Card key={component.name} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">{component.name}</h3>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                    </div>
                    <div className="rounded-md border p-4">{component.examples}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <p className="text-muted-foreground">
            These examples demonstrate how our brand guidelines are applied across the Digital Legacy platform to create
            a consistent and cohesive user experience.
          </p>

          <div className="space-y-6">
            {brandExamples.map((example) => (
              <Card key={example.title} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>{example.content}</CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

