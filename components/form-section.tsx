"use client"

import type React from "react"
import { motion } from "framer-motion"

interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 className="text-xl font-bold mb-2" variants={itemVariants}>
        {title}
      </motion.h2>
      {description && (
        <motion.p className="text-sm text-muted-foreground mb-4" variants={itemVariants}>
          {description}
        </motion.p>
      )}
      <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
        {children}
      </motion.div>
    </motion.div>
  )
}
