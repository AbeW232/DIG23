import { redirect } from "next/navigation"

export default function LoginPage() {
  // Redirect to dashboard immediately
  redirect("/dashboard")
}

