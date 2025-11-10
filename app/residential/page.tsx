"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import BorrowerPersonalInfoForm from "@/components/residential/borrower-personal-info-form"
import BorrowerContactAddressForm from "@/components/residential/borrower-contact-address-form"
import CoApplicantForm from "@/components/residential/co-applicant-form"
import EmploymentForm from "@/components/residential/employment-form"
import AssetForm from "@/components/residential/asset-form"
import PropertyForm from "@/components/residential/property-form"
import DocumentUpload from "@/components/residential/document-upload"
import FormStepTransition from "@/components/form-step-transition"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CheckCircle2 } from "lucide-react"

export default function ResidentialPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("borrowerPersonal")
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    borrowerPersonal: {},
    borrowerContact: {},
    coApplicant: {},
    employment: {},
    assets: {},
    property: {},
    documents: [],
  })

  const steps = [
    { title: "Personal Information", id: "borrowerPersonal", shortTitle: "Personal" },
    { title: "Contact & Address", id: "borrowerContact", shortTitle: "Contact" },
    { title: "Co-Applicant (Optional)", id: "coApplicant", shortTitle: "Co-Applicant" },
    { title: "Employment", id: "employment", shortTitle: "Employment" },
    { title: "Assets & Liabilities", id: "assets", shortTitle: "Assets" },
    { title: "Property Details", id: "property", shortTitle: "Property" },
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
    console.log("Residential form submitted:", formData)
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
          <h1 className="gradient-text text-2xl font-bold">Residential Loan Application</h1>
          <div className="text-sm text-muted-foreground">
            {steps.findIndex(s => s.id === activeTab) + 1} of {steps.length}
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
                      isCompleted && !isActive ? 'text-primary' : ''
                    }`}
                  >
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                    <span className="hidden sm:inline whitespace-nowrap">{step.title}</span>
                    <span className="sm:hidden whitespace-nowrap">{step.shortTitle}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Form Content */}
            <div className="mt-6">
              <TabsContent value="borrowerPersonal" className="mt-0">
                <FormStepTransition key="borrowerPersonal" currentStep={0}>
                  <BorrowerPersonalInfoForm 
                    onComplete={(data) => handleStepComplete("borrowerPersonal", data)} 
                    initialData={formData.borrowerPersonal}
                  />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="borrowerContact" className="mt-0">
                <FormStepTransition key="borrowerContact" currentStep={1}>
                  <BorrowerContactAddressForm 
                    onComplete={(data) => handleStepComplete("borrowerContact", data)} 
                    initialData={{ ...formData.borrowerContact, ...formData.borrowerPersonal }}
                  />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="coApplicant" className="mt-0">
                <FormStepTransition key="coApplicant" currentStep={2}>
                  <CoApplicantForm onComplete={(data) => handleStepComplete("coApplicant", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="employment" className="mt-0">
                <FormStepTransition key="employment" currentStep={3}>
                  <EmploymentForm onComplete={(data) => handleStepComplete("employment", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="assets" className="mt-0">
                <FormStepTransition key="assets" currentStep={4}>
                  <AssetForm onComplete={(data) => handleStepComplete("assets", data)} />
                </FormStepTransition>
              </TabsContent>

              <TabsContent value="property" className="mt-0">
                <FormStepTransition key="property" currentStep={5}>
                  <PropertyForm onComplete={(data) => handleStepComplete("property", data)} />
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
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </motion.div>
      </main>
    </div>
  )
}
