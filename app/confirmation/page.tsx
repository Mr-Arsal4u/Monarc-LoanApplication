"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const router = useRouter()
  const [applicationId, setApplicationId] = useState("")

  useEffect(() => {
    const id = `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setApplicationId(id)
  }, [])

  return (
    <div className="min-h-screen gradient-bg overflow-hidden flex items-center justify-center">
      <motion.main
        className="max-w-md w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-effect rounded-2xl p-12 text-center">
          {/* Success Icon */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold mb-2 text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Application Submitted
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for submitting your loan application. We'll review it and contact you shortly.
          </motion.p>

          <motion.div
            className="bg-muted/50 rounded-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-2">Your Application ID</p>
            <p className="text-lg font-mono font-semibold text-primary">{applicationId}</p>
            <p className="text-xs text-muted-foreground mt-4">Please save this ID for your records</p>
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Return Home
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-4 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Submit Another Application
            </button>
          </motion.div>

          <motion.p
            className="text-xs text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            A confirmation email has been sent to your email address.
          </motion.p>
        </div>
      </motion.main>
    </div>
  )
}
