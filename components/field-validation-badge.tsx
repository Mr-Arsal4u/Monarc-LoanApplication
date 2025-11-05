"use client"

import { motion } from "framer-motion"

interface FieldValidationBadgeProps {
  isValid: boolean
  isTouched: boolean
}

export default function FieldValidationBadge({ isValid, isTouched }: FieldValidationBadgeProps) {
  if (!isTouched) return null

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
        isValid ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
      }`}
    >
      {isValid ? (
        <>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            />
          </svg>
          Valid
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            />
          </svg>
          Invalid
        </>
      )}
    </motion.div>
  )
}
