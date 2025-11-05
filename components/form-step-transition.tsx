"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FormStepTransitionProps {
  children: React.ReactNode
  direction?: "forward" | "backward"
}

export default function FormStepTransition({ children, direction = "forward" }: FormStepTransitionProps) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "forward" ? 100 : -100,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: direction === "forward" ? -100 : 100,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={variants}>
      {children}
    </motion.div>
  )
}
