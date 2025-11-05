"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface LoanPurposeFormProps {
  onComplete: (data: any) => void
}

export default function LoanPurposeForm({ onComplete }: LoanPurposeFormProps) {
  const [formData, setFormData] = useState({
    loanPurpose: "",
    loanAmount: "",
    desiredTermMonths: "",
    useOfProceeds: "",
    projectDescription: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required"
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required"
    if (!formData.desiredTermMonths) newErrors.desiredTermMonths = "Desired term is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormSection title="Loan Purpose" description="Describe the purpose and intended use of the loan">
        <div className="grid md:grid-cols-2 gap-6">
          <FormSelect
            label="Primary Loan Purpose"
            options={[
              { value: "expansion", label: "Business Expansion" },
              { value: "equipment", label: "Equipment Purchase" },
              { value: "working-capital", label: "Working Capital" },
              { value: "real-estate", label: "Real Estate" },
              { value: "refinance", label: "Refinancing" },
              { value: "other", label: "Other" },
            ]}
            value={formData.loanPurpose}
            onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
            error={errors.loanPurpose}
          />
          <FormInput
            label="Requested Loan Amount"
            type="number"
            placeholder="500000"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
            error={errors.loanAmount}
          />
          <FormSelect
            label="Desired Loan Term"
            options={[
              { value: "12", label: "12 months" },
              { value: "24", label: "24 months" },
              { value: "36", label: "36 months" },
              { value: "48", label: "48 months" },
              { value: "60", label: "60 months" },
              { value: "84", label: "84 months" },
            ]}
            value={formData.desiredTermMonths}
            onChange={(e) => setFormData({ ...formData, desiredTermMonths: e.target.value })}
            error={errors.desiredTermMonths}
          />
          <div />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Describe Use of Proceeds</label>
            <textarea
              placeholder="Explain how the loan proceeds will be used..."
              value={formData.useOfProceeds}
              onChange={(e) => setFormData({ ...formData, useOfProceeds: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors h-24"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Project Description</label>
            <textarea
              placeholder="Provide any additional details about the project..."
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors h-24"
            />
          </div>
        </div>
      </FormSection>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
      >
        Continue
      </button>
    </form>
  )
}
