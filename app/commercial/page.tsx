"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import EntityBasicInfoForm from "@/components/commercial/entity-basic-info-form"
import EntityAddressContactForm from "@/components/commercial/entity-address-contact-form"
import LoanPurposeForm from "@/components/commercial/loan-purpose-form"
import FinancialInfoForm from "@/components/commercial/financial-info-form"
import CollateralForm from "@/components/commercial/collateral-form"
import AuthorizedSignerForm from "@/components/commercial/authorized-signer-form"
import DocumentUpload from "@/components/commercial/document-upload"
import FormStepTransition from "@/components/form-step-transition"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CommercialPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("entityBasic")
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    entityBasic: {},
    entityAddress: {},
    loanPurpose: {},
    financialInfo: {},
    collateral: {},
    signer: {},
    documents: [],
  })

  const steps = [
    { title: "Entity Basic Info", id: "entityBasic", shortTitle: "Basic Info" },
    { title: "Entity Address & Contact", id: "entityAddress", shortTitle: "Address" },
    { title: "Loan Purpose", id: "loanPurpose", shortTitle: "Loan Purpose" },
    { title: "Financial Information", id: "financialInfo", shortTitle: "Financial" },
    { title: "Collateral", id: "collateral", shortTitle: "Collateral" },
    { title: "Authorized Signer", id: "signer", shortTitle: "Signer" },
    { title: "Documents", id: "documents", shortTitle: "Documents" },
  ]

  const handleStepComplete = (stepId: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepId]: data,
    }))
    setCompletedSteps((prev) => new Set([...prev, stepId]))
    
    // Auto-advance to next step if not the last one
    const currentIndex = steps.findIndex((s) => s.id === stepId)
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].id)
    }
  }

  const handleSubmit = () => {
    console.log("Commercial form submitted:", formData)
    router.push("/confirmation")
  }

  const isStepCompleted = (stepId: string) => {
    return completedSteps.has(stepId) || Object.keys(formData[stepId as keyof typeof formData] || {}).length > 0
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
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {steps.findIndex(s => s.id === activeTab) + 1} of {steps.length}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-auto p-1 bg-muted/50 border border-border rounded-lg overflow-x-auto flex-wrap lg:flex-nowrap justify-start">
              {steps.map((step, index) => {
                const isCompleted = isStepCompleted(step.id)
                const isActive = activeTab === step.id
                
                return (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all flex-shrink-0 ${
                      isCompleted && !isActive ? 'text-accent' : ''
                    }`}
                  >
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    )}
                    <span className="hidden sm:inline whitespace-nowrap">{step.title}</span>
                    <span className="sm:hidden whitespace-nowrap">{step.shortTitle}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Form Content */}
            <div className="mt-6">
              <TabsContent value="entityBasic" className="mt-0">
                <FormStepTransition key="entityBasic" currentStep={0}>
                  <EntityBasicInfoForm 
                    onComplete={(data) => handleStepComplete("entityBasic", data)} 
                    initialData={formData.entityBasic}
                  />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="entityAddress" className="mt-0">
                <FormStepTransition key="entityAddress" currentStep={1}>
                  <EntityAddressContactForm 
                    onComplete={(data) => handleStepComplete("entityAddress", data)} 
                    initialData={{ ...formData.entityAddress, ...formData.entityBasic }}
                  />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="loanPurpose" className="mt-0">
                <FormStepTransition key="loanPurpose" currentStep={2}>
                  <LoanPurposeForm onComplete={(data) => handleStepComplete("loanPurpose", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="financialInfo" className="mt-0">
                <FormStepTransition key="financialInfo" currentStep={3}>
                  <FinancialInfoForm onComplete={(data) => handleStepComplete("financialInfo", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="collateral" className="mt-0">
                <FormStepTransition key="collateral" currentStep={4}>
                  <CollateralForm onComplete={(data) => handleStepComplete("collateral", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="signer" className="mt-0">
                <FormStepTransition key="signer" currentStep={5}>
                  <AuthorizedSignerForm onComplete={(data) => handleStepComplete("signer", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <FormStepTransition key="documents" currentStep={6}>
                  <DocumentUpload onComplete={(data) => handleStepComplete("documents", data)} onSubmit={handleSubmit} />
                </FormStepTransition>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between mt-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button
            onClick={() => {
              const currentIndex = steps.findIndex((s) => s.id === activeTab)
              if (currentIndex > 0) {
                setActiveTab(steps[currentIndex - 1].id)
              }
            }}
            disabled={activeTab === steps[0].id}
            className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => {
              const currentIndex = steps.findIndex((s) => s.id === activeTab)
              if (currentIndex < steps.length - 1) {
                setActiveTab(steps[currentIndex + 1].id)
              }
            }}
            disabled={activeTab === steps[steps.length - 1].id}
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </motion.div>
      </main>
    </div>
  )
}
