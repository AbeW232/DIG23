"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordError, setPasswordError] = useState("")

  // Simple password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
    return strength
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
    setPasswordError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")

    // Validate password
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (checkPasswordStrength(password) < 3) {
      setPasswordError("Password is not strong enough")
      return
    }

    setIsLoading(true)

    // Simulate password reset API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    }, 1500)
  }

  // Get password strength label and color
  const getPasswordStrengthInfo = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { label: "Very Weak", color: "bg-red-500" }
      case 2:
        return { label: "Weak", color: "bg-orange-500" }
      case 3:
        return { label: "Medium", color: "bg-yellow-500" }
      case 4:
        return { label: "Strong", color: "bg-green-500" }
      case 5:
        return { label: "Very Strong", color: "bg-green-600" }
      default:
        return { label: "Very Weak", color: "bg-red-500" }
    }
  }

  const strengthInfo = getPasswordStrengthInfo()

  // If no token is provided, show an error
  if (!token && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Invalid Reset Link</CardTitle>
            <CardDescription className="text-center">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
              <AlertDescription>
                Please request a new password reset link from the forgot password page.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/forgot-password">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Forgot Password
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">
            {isSuccess ? "Password Reset Successful" : "Reset Your Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSuccess ? "Your password has been successfully reset." : "Please enter a new password for your account"}
          </CardDescription>
        </CardHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>

                {password && (
                  <div className="space-y-1 mt-2">
                    <div className="text-xs flex justify-between">
                      <span>Password strength:</span>
                      <span>{strengthInfo.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strengthInfo.color}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs">
                        <div
                          className={`w-3 h-3 rounded-full ${/[A-Z]/.test(password) ? "bg-green-500" : "bg-muted"}`}
                        ></div>
                        <span>Uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div
                          className={`w-3 h-3 rounded-full ${/[a-z]/.test(password) ? "bg-green-500" : "bg-muted"}`}
                        ></div>
                        <span>Lowercase letter</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div
                          className={`w-3 h-3 rounded-full ${/[0-9]/.test(password) ? "bg-green-500" : "bg-muted"}`}
                        ></div>
                        <span>Number</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            /[^A-Za-z0-9]/.test(password) ? "bg-green-500" : "bg-muted"
                          }`}
                        ></div>
                        <span>Special character</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <div
                          className={`w-3 h-3 rounded-full ${password.length >= 8 ? "bg-green-500" : "bg-muted"}`}
                        ></div>
                        <span>8+ characters</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              {passwordError && (
                <Alert variant="destructive">
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-primary hover:underline inline-flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-medium">Password Reset Successful</h3>
              <p className="text-muted-foreground mt-2">
                Your password has been successfully reset. You will be redirected to the login page shortly.
              </p>
            </div>
            <Button asChild className="w-full mt-4">
              <Link href="/login">Return to Login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

