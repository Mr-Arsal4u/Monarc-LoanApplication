"use client"

import { motion } from "framer-motion"

interface SuccessCheckmarkProps {
  size?: "sm" | "md" | "lg"
}

export default function SuccessCheckmark({ size = "md" }: SuccessCheckmarkProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const containerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className={`${sizes[size]} rounded-full bg-primary/20 flex items-center justify-center`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.svg
        className={`${sizes[size]} text-primary`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <motion.path d="M5 13l4 4L19 7" variants={checkVariants} />
      </motion.svg>
    </motion.div>
  )
}
