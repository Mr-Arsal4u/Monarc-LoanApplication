"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ x: -4 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>

        <h1 className="gradient-text text-xl font-bold">{title}</h1>

        <div className="w-12" />
      </div>
    </nav>
  )
}
