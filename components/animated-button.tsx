"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export default function AnimatedButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-accent text-accent-foreground hover:bg-accent/90",
    outline: "border border-border text-foreground hover:bg-muted",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}
