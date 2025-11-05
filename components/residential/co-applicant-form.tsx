"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface CoApplicantFormProps {
  onComplete: (data: any) => void
}

export default function CoApplicantForm({ onComplete }: CoApplicantFormProps) {
  const [hasCoApplicant, setHasCoApplicant] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
    dob: "",
    email: "",
    phone: "",
    relationship: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(hasCoApplicant ? formData : {})
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormSection title="Co-Applicant Information" description="Add a co-applicant if applicable">
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            id="hasCoApplicant"
            checked={hasCoApplicant}
            onChange={(e) => setHasCoApplicant(e.target.checked)}
            className="w-4 h-4 rounded border-border bg-input cursor-pointer"
          />
          <label htmlFor="hasCoApplicant" className="text-sm font-medium cursor-pointer">
            I have a co-applicant
          </label>
        </div>

        {hasCoApplicant && (
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="First Name"
              placeholder="Jane"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <FormInput
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <FormInput
              label="Social Security Number"
              placeholder="XXX-XX-XXXX"
              value={formData.ssn}
              onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
            />
            <FormInput
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
            <FormInput
              label="Email Address"
              type="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormInput
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <FormSelect
              label="Relationship"
              options={[
                { value: "spouse", label: "Spouse" },
                { value: "partner", label: "Domestic Partner" },
                { value: "other", label: "Other" },
              ]}
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
            />
          </div>
        )}
      </FormSection>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
      >
        Continue
      </button>
    </form>
  )
}
