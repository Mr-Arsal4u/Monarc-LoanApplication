"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Form Progress</span>
        <span className="font-semibold text-primary">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-border">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
