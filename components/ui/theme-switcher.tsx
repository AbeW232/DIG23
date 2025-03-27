"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Laptop, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeSwitcherProps {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  iconOnly?: boolean
  className?: string
}

export function ThemeSwitcher({ align = "end", side = "bottom", iconOnly = false, className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  const themes = [
    {
      id: "light",
      name: "Light",
      icon: Sun,
    },
    {
      id: "dark",
      name: "Dark",
      icon: Moon,
    },
    {
      id: "system",
      name: "System",
      icon: Laptop,
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={iconOnly ? "icon" : "default"} className={cn("gap-2", className)}>
          {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {theme === "system" && <Laptop className="h-[1.2rem] w-[1.2rem]" />}
          {!iconOnly && <span>Theme</span>}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side}>
        {themes.map((t) => (
          <DropdownMenuItem key={t.id} onClick={() => setTheme(t.id)} className="flex items-center gap-2">
            <t.icon className="h-4 w-4" />
            <span>{t.name}</span>
            {theme === t.id && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

