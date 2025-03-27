"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Eye, EyeOff, Lock, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PasswordSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [password, setPassword] = useState("")

  // Simple password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Settings</CardTitle>
          <CardDescription>Update your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
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
                        className={`w-3 h-3 rounded-full ${/[^A-Za-z0-9]/.test(password) ? "bg-green-500" : "bg-muted"}`}
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
                  placeholder="Confirm your new password"
                />
                <Button
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
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Security Settings</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch id="two-factor" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="password-expiry">Password Expiry</Label>
                <p className="text-xs text-muted-foreground">Require password change every 90 days</p>
              </div>
              <Switch id="password-expiry" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="login-notifications">Login Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive email notifications for new logins</p>
              </div>
              <Switch id="login-notifications" defaultChecked />
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Password Security</AlertTitle>
            <AlertDescription>
              For maximum security, use a unique password that you don't use for other websites or applications.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Lock className="h-4 w-4 mr-2" />
            Update Password
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Recovery</CardTitle>
          <CardDescription>Set up recovery options for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recovery-email">Recovery Email</Label>
            <Input
              id="recovery-email"
              type="email"
              placeholder="Enter a recovery email address"
              defaultValue="backup@example.com"
            />
            <p className="text-xs text-muted-foreground">
              This email will be used to recover your account if you forget your password
            </p>
          </div>

          <div className="space-y-2">
            <Label>Recovery Questions</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-1" className="text-sm">
                  Question 1
                </Label>
                <Select>
                  <SelectTrigger id="question-1">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pet">What was your first pet's name?</SelectItem>
                    <SelectItem value="school">What was the name of your first school?</SelectItem>
                    <SelectItem value="city">In what city were you born?</SelectItem>
                    <SelectItem value="mother">What is your mother's maiden name?</SelectItem>
                    <SelectItem value="book">What is your favorite book?</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="text" placeholder="Enter your answer" className="mt-2" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question-2" className="text-sm">
                  Question 2
                </Label>
                <Select>
                  <SelectTrigger id="question-2">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="street">What street did you grow up on?</SelectItem>
                    <SelectItem value="car">What was your first car?</SelectItem>
                    <SelectItem value="job">What was your first job?</SelectItem>
                    <SelectItem value="teacher">Who was your favorite teacher?</SelectItem>
                    <SelectItem value="friend">What is the name of your best childhood friend?</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="text" placeholder="Enter your answer" className="mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            <Shield className="h-4 w-4 mr-2" />
            Save Recovery Options
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

