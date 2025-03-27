import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Download, FileText, Globe, Lock, Tablet } from "lucide-react"

export default function PublishingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Legacy Stories</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/ai-tools" className="text-sm font-medium hover:text-primary">
              AI Tools
            </Link>
            <Link href="/publishing" className="text-sm font-medium text-primary">
              Publishing
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="mb-2" variant="outline">
                    Publishing Options
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Share Your Stories Your Way
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Choose from multiple publishing formats and access levels to share your legacy exactly how you want.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Start Publishing
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#formats">
                    <Button size="lg" variant="outline" className="gap-1.5">
                      See All Formats
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl opacity-50" />
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="Publishing Options"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Publishing Formats Section */}
        <section id="formats" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="outline">
                  Publishing Formats
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Multiple Ways to Share Your Stories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the format that best suits your content and audience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {[
                {
                  title: "Digital Book",
                  description: "Interactive e-books with page-turning animations and multimedia integration.",
                  icon: <Tablet className="h-10 w-10 text-primary" />,
                  features: ["Interactive page turning", "Embedded media", "Responsive design", "Offline reading"],
                },
                {
                  title: "PDF Export",
                  description: "Professional-quality PDFs for printing or digital sharing.",
                  icon: <FileText className="h-10 w-10 text-primary" />,
                  features: ["Print-ready quality", "Custom layouts", "Table of contents", "Bookmarks and links"],
                },
                {
                  title: "Online Reading",
                  description: "Web-based reading experience with social features and commenting.",
                  icon: <Globe className="h-10 w-10 text-primary" />,
                  features: ["Interactive elements", "Comment sections", "Social sharing", "Analytics tracking"],
                },
              ].map((format, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-4">{format.icon}</div>
                    <CardTitle>{format.title}</CardTitle>
                    <CardDescription>{format.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {format.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Try {format.title}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Access Levels Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="secondary">
                  Access Levels
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Control Who Sees Your Content
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the right level of privacy and access for your stories.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              {[
                {
                  title: "Free",
                  description: "Share basic stories with limited features.",
                  icon: <Globe className="h-10 w-10 text-primary" />,
                  features: ["Basic story creation", "Limited media storage", "Public sharing"],
                  recommended: false,
                },
                {
                  title: "Public",
                  description: "Share your stories with the world.",
                  icon: <Globe className="h-10 w-10 text-primary" />,
                  features: ["Enhanced story creation", "More media storage", "Public profile", "Community features"],
                  recommended: false,
                },
                {
                  title: "Private",
                  description: "Share only with selected individuals.",
                  icon: <Lock className="h-10 w-10 text-primary" />,
                  features: [
                    "Full story creation tools",
                    "Expanded media storage",
                    "Invite-only access",
                    "Password protection",
                  ],
                  recommended: true,
                },
                {
                  title: "Paid",
                  description: "Monetize your premium content.",
                  icon: <Download className="h-10 w-10 text-primary" />,
                  features: [
                    "Professional publishing tools",
                    "Unlimited media storage",
                    "Subscription management",
                    "Revenue tracking",
                  ],
                  recommended: false,
                },
              ].map((option, index) => (
                <Card key={index} className="flex flex-col relative">
                  {option.recommended && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                      <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                    </div>
                  )}
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-primary/10 mb-4">{option.icon}</div>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={option.recommended ? "default" : "outline"}>
                      Choose {option.title}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Publish Your Legacy?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start sharing your stories with the world today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1.5 bg-background text-primary hover:bg-background/90">
                    Get Started for Free
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-1.5 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-xl mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary" />
              <span>Legacy Stories</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Legacy Stories. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

