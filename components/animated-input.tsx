"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, helperText, required, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200",
              "hover:border-border/80",
              error && "border-destructive focus:ring-destructive/50",
              isFocused && "shadow-lg shadow-primary/10",
              className,
            )}
            {...props}
          />
          {/* Focus glow effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-lg bg-primary/5 pointer-events-none transition-opacity duration-200",
              isFocused ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        {error && <p className="text-sm text-destructive animate-in fade-in duration-200">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

AnimatedInput.displayName = "AnimatedInput"

export default AnimatedInput
