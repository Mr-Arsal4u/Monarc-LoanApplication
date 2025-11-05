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
    certificateOfBusinessPurpose: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required"
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required"

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
      <FormSection title="Section A: Credit Requested" description="ARC Commercial Business Purpose Loan Application">
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>IMPORTANT:</strong> Read these instructions before completing this application.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Intended loan purpose and use of loan proceeds shall be set forth on a separate "Certificate of Business Purpose".
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormSelect
            label="Loan Purpose"
            options={[
              { value: "purchase-remodel-sell", label: "Purchase (to be remodeled and sold)" },
              { value: "refinance-remodel-sell", label: "Refinance (to be remodeled and sold)" },
              { value: "rental-income", label: "Financing of rental (income) property" },
              { value: "construction", label: "Construction" },
            ]}
            value={formData.loanPurpose}
            onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
            error={errors.loanPurpose}
            required
          />
          <FormInput
            label="Loan Amount"
            type="number"
            placeholder="500000"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
            error={errors.loanAmount}
            required
          />
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Borrower or Co-Borrower means an "applicant" for a potential loan. Even when this loan application is completed, it is not a loan commitment for a loan on the requested terms or on any other terms. Any "loan commitment" must expressly state that it is a commitment to make a loan on specified terms and it must be in writing signed by the lender or by the lenders' broker.
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Certificate of Business Purpose (Please attach or upload separately)
          </label>
          <textarea
            placeholder="Describe the intended loan purpose and use of loan proceeds. This information should be set forth on a separate Certificate of Business Purpose document..."
            value={formData.certificateOfBusinessPurpose}
            onChange={(e) => setFormData({ ...formData, certificateOfBusinessPurpose: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors h-32"
          />
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
