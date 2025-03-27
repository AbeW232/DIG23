import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Brain,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Globe,
  Lock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react"

export default function HomePage() {
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
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#publishing" className="text-sm font-medium hover:text-primary">
              Publishing
            </Link>
            <Link href="#ai" className="text-sm font-medium hover:text-primary">
              AI Tools
            </Link>
            <Link href="#preview" className="text-sm font-medium hover:text-primary">
              Preview
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
                    Preserve Your Legacy
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Tell Your Story, Share Your Legacy
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create, preserve, and share your life stories with future generations using our AI-enhanced digital
                    legacy platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Start Your Legacy
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#preview">
                    <Button size="lg" variant="outline" className="gap-1.5">
                      See Examples
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl opacity-50" />
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="Digital Legacy Platform Interface"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="outline">
                  Powerful Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Preserve Your Legacy
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to create, organize, and share your life stories.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Story Creation",
                  description: "Intuitive tools to write, edit, and organize your life stories.",
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Media Library",
                  description: "Upload and manage photos, videos, and audio recordings.",
                  icon: <FileText className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Family Tree",
                  description: "Create and visualize your family connections and relationships.",
                  icon: <Users className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Collaborative Editing",
                  description: "Invite family members to contribute to your stories.",
                  icon: <MessageSquare className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Privacy Controls",
                  description: "Decide who can view and interact with your content.",
                  icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                },
                {
                  title: "Multiple Export Formats",
                  description: "Export your stories as PDFs, digital books, and more.",
                  icon: <Download className="h-10 w-10 text-primary" />,
                },
              ].map((feature, index) => (
                <Card key={index} className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-primary/10 mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Tools Section */}
        <section id="ai" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="secondary">
                  AI-Powered
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Enhanced by Artificial Intelligence
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI tools help you create richer, more engaging content with less effort.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mt-12">
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl opacity-50" />
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="AI-Enhanced Content Creation"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid gap-6">
                  {[
                    {
                      title: "Smart Writing Assistant",
                      description:
                        "Get suggestions for improving your writing, fixing grammar, and enhancing your storytelling.",
                      icon: <Brain className="h-8 w-8 text-primary" />,
                    },
                    {
                      title: "Automatic Photo Enhancement",
                      description:
                        "Restore and enhance old photos with AI-powered tools that improve clarity and color.",
                      icon: <Sparkles className="h-8 w-8 text-primary" />,
                    },
                    {
                      title: "Memory Prompts",
                      description:
                        "Receive personalized prompts to help you recall and document important life events.",
                      icon: <Star className="h-8 w-8 text-primary" />,
                    },
                  ].map((feature, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="p-1 rounded-full bg-primary/10">{feature.icon}</div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center lg:justify-start">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Try AI Features
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publishing Options Section */}
        <section id="publishing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="outline">
                  Flexible Publishing
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Share Your Stories Your Way
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose how you want to share your legacy with multiple publishing options.
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

        {/* Preview Section */}
        <section id="preview" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="secondary">
                  Preview
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  See Your Stories Come to Life
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Preview how your stories will look in different formats.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12">
              <Tabs defaultValue="online" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="online">Online Reading</TabsTrigger>
                  <TabsTrigger value="pdf">PDF Export</TabsTrigger>
                  <TabsTrigger value="book">Digital Book</TabsTrigger>
                </TabsList>
                <TabsContent value="online" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Online Reading Experience</CardTitle>
                      <CardDescription>Interactive reading with media integration and commenting.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video overflow-hidden rounded-xl border bg-background">
                        <img
                          src="/placeholder.svg?height=450&width=800"
                          alt="Online Reading Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Learn More</Button>
                      <Button>Try It Now</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="pdf" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>PDF Export</CardTitle>
                      <CardDescription>Professional-quality PDFs for printing or digital sharing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video overflow-hidden rounded-xl border bg-background">
                        <img
                          src="/placeholder.svg?height=450&width=800"
                          alt="PDF Export Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Learn More</Button>
                      <Button>Try It Now</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="book" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Digital Book Format</CardTitle>
                      <CardDescription>
                        Interactive e-books with page-turning animations and multimedia.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video overflow-hidden rounded-xl border bg-background">
                        <img
                          src="/placeholder.svg?height=450&width=800"
                          alt="Digital Book Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Learn More</Button>
                      <Button>Try It Now</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="mb-2" variant="outline">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from people who have preserved their legacies with our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {[
                {
                  quote:
                    "I've been able to document my life story for my grandchildren in a way that feels authentic and engaging. The AI tools helped me find my voice.",
                  author: "Margaret J.",
                  role: "Retired Teacher",
                },
                {
                  quote:
                    "The digital book format is incredible. I created a family history that looks professional and my relatives love being able to flip through it online.",
                  author: "David T.",
                  role: "Family Historian",
                },
                {
                  quote:
                    "I was hesitant about using AI, but it actually helped me remember details I had forgotten. Now my life stories are richer and more complete.",
                  author: "Robert L.",
                  role: "Memoir Writer",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
                  Start Preserving Your Legacy Today
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of others who are creating lasting legacies for future generations.
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
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>Legacy Stories</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Preserving personal histories and family legacies through digital storytelling.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#publishing" className="text-muted-foreground hover:text-foreground">
                    Publishing
                  </Link>
                </li>
                <li>
                  <Link href="#ai" className="text-muted-foreground hover:text-foreground">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="#preview" className="text-muted-foreground hover:text-foreground">
                    Preview
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">© 2024 Legacy Stories. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.904 4.904 0 011.153-1.772A4.884 4.884 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

