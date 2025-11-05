"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import EntityInfoForm from "@/components/commercial/entity-info-form"
import LoanPurposeForm from "@/components/commercial/loan-purpose-form"
import FinancialInfoForm from "@/components/commercial/financial-info-form"
import CollateralForm from "@/components/commercial/collateral-form"
import AuthorizedSignerForm from "@/components/commercial/authorized-signer-form"
import DocumentUpload from "@/components/commercial/document-upload"
import FormStepTransition from "@/components/form-step-transition"
import ProgressIndicator from "@/components/progress-indicator"

export default function CommercialPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    entity: {},
    loanPurpose: {},
    financialInfo: {},
    collateral: {},
    signer: {},
    documents: [],
  })

  const steps = [
    { title: "Entity Information", id: "entity" },
    { title: "Loan Purpose", id: "loanPurpose" },
    { title: "Financial Information", id: "financialInfo" },
    { title: "Collateral", id: "collateral" },
    { title: "Authorized Signer", id: "signer" },
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
    console.log("Commercial form submitted:", formData)
    router.push("/confirmation")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <EntityInfoForm onComplete={(data) => handleStepComplete("entity", data)} />
      case 1:
        return <LoanPurposeForm onComplete={(data) => handleStepComplete("loanPurpose", data)} />
      case 2:
        return <FinancialInfoForm onComplete={(data) => handleStepComplete("financialInfo", data)} />
      case 3:
        return <CollateralForm onComplete={(data) => handleStepComplete("collateral", data)} />
      case 4:
        return <AuthorizedSignerForm onComplete={(data) => handleStepComplete("signer", data)} />
      case 5:
        return <DocumentUpload onComplete={(data) => handleStepComplete("documents", data)} onSubmit={handleSubmit} />
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
          <h1 className="gradient-text text-2xl font-bold">Commercial Loan Application</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <ProgressIndicator currentStep={currentStep} steps={steps} />

        {/* Form Content */}
        <FormStepTransition key={currentStep} currentStep={currentStep}>
          {renderStep()}
        </FormStepTransition>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </motion.div>
      </main>
    </div>
  )
}
