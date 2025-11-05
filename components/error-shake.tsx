"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ErrorShakeProps {
  children: ReactNode
  trigger: boolean
}

export default function ErrorShake({ children, trigger }: ErrorShakeProps) {
  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    still: {
      x: 0,
    },
  }

  return (
    <motion.div variants={shakeVariants} animate={trigger ? "shake" : "still"}>
      {children}
    </motion.div>
  )
}
