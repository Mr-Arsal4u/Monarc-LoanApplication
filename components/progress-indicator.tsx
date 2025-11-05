"use client"

import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  current: number
  total: number
  showLabel?: boolean
}

export default function ProgressIndicator({ current, total, showLabel = true }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100

  return (
    <div className="space-y-2">
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
      {showLabel && (
        <motion.p
          className="text-sm text-muted-foreground text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {current} of {total}
        </motion.p>
      )}
    </div>
  )
}
