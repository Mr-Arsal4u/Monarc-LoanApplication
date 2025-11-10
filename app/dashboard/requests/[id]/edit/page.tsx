"use client"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { 
  ArrowLeft,
  Save,
  FileText,
  DollarSign,
  MapPin,
  Calendar
} from "lucide-react"

export default function EditRequestPage() {
  const router = useRouter()
  const params = useParams()
  const requestId = params?.id as string
  
  const [formData, setFormData] = useState({
    type: "Residential",
    amount: "250000",
    propertyAddress: "123 Main Street, New York, NY 10001",
    loanPurpose: "Purchase",
    interestRate: "4.5",
    date: "2024-01-15"
  })
  const [isSaving, setIsSaving] = useState(false)

  // Scroll animation variants
  const scrollFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const scrollFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const scrollScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push("/dashboard/requests")
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => router.push("/")}
            className="gradient-text text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Monarc inc
          </motion.button>
          <motion.button
            onClick={() => router.push("/dashboard/requests")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Requests
          </motion.button>
        </div>
      </nav>

      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Edit <span className="gradient-text">Request</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Update your loan application details
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSave}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollScale}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Loan Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Loan Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="250000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Property Address
            </label>
            <textarea
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Enter property address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Purpose
            </label>
            <select
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Purchase">Purchase</option>
              <option value="Refinance">Refinance</option>
              <option value="Home Improvement">Home Improvement</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              step="0.1"
              className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="4.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Application Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <motion.button
              type="button"
              onClick={() => router.push("/dashboard/requests")}
              className="flex-1 px-6 py-3 rounded-lg glass-effect border border-border hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.section>
    </div>
  )
}

