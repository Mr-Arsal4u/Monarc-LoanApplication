"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({ width = 300, height = 100, className = "h-20 sm:h-24 w-auto", priority = false }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use black SVG logo for light mode, white logo for dark mode
  // Use resolvedTheme to handle system theme preference
  const currentTheme = mounted ? (resolvedTheme || theme) : "dark"
  const logoSrc = currentTheme === "light" ? "/brown-logo.png" : "/white-logo.png"

  return (
    <Image
      src={logoSrc}
      alt="Monarc inc"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}

