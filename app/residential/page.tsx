"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import BorrowerInfoForm from "@/components/residential/borrower-info-form"
import CoApplicantForm from "@/components/residential/co-applicant-form"
import EmploymentForm from "@/components/residential/employment-form"
import AssetForm from "@/components/residential/asset-form"
import PropertyForm from "@/components/residential/property-form"
import DocumentUpload from "@/components/residential/document-upload"
import FormStepTransition from "@/components/form-step-transition"
import ProgressIndicator from "@/components/progress-indicator"

export default function ResidentialPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    borrower: {},
    coApplicant: {},
    employment: {},
    assets: {},
    property: {},
    documents: [],
  })

  const steps = [
    { title: "Borrower Information", id: "borrower" },
    { title: "Co-Applicant (Optional)", id: "coApplicant" },
    { title: "Employment", id: "employment" },
    { title: "Assets & Liabilities", id: "assets" },
    { title: "Property Details", id: "property" },
    { title: "Documents", id: "documents" },
  ]

  const handleStepComplete = (stepId, data) => {
    setFormData((prev) => ({
      ...prev,
      [stepId]: data,
    }))
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    router.push("/confirmation")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormStepTransition direction="forward">
            <BorrowerInfoForm onComplete={(data) => handleStepComplete("borrower", data)} />
          </FormStepTransition>
        )
      case 1:
        return (
          <FormStepTransition direction="forward">
            <CoApplicantForm onComplete={(data) => handleStepComplete("coApplicant", data)} />
          </FormStepTransition>
        )
      case 2:
        return (
          <FormStepTransition direction="forward">
            <EmploymentForm onComplete={(data) => handleStepComplete("employment", data)} />
          </FormStepTransition>
        )
      case 3:
        return (
          <FormStepTransition direction="forward">
            <AssetForm onComplete={(data) => handleStepComplete("assets", data)} />
          </FormStepTransition>
        )
      case 4:
        return (
          <FormStepTransition direction="forward">
            <PropertyForm onComplete={(data) => handleStepComplete("property", data)} />
          </FormStepTransition>
        )
      case 5:
        return (
          <FormStepTransition direction="forward">
            <DocumentUpload onComplete={(data) => handleStepComplete("documents", data)} onSubmit={handleSubmit} />
          </FormStepTransition>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="gradient-text text-2xl font-bold">Residential Loan Application</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProgressIndicator current={currentStep + 1} total={steps.length} />
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground md:grid-cols-6 mt-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                className={`transition-colors ${idx === currentStep ? "text-primary font-semibold" : ""}`}
                animate={{ opacity: idx === currentStep ? 1 : 0.6 }}
              >
                {step.title}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.button
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </motion.button>
          <motion.button
            onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}
