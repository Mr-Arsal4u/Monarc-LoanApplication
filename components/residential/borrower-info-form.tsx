"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface BorrowerInfoFormProps {
  onComplete: (data: any) => void
}

export default function BorrowerInfoForm({ onComplete }: BorrowerInfoFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
    dob: "",
    email: "",
    phone: "",
    maritalStatus: "",
    dependents: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.ssn.trim()) newErrors.ssn = "SSN is required"
    if (!formData.dob) newErrors.dob = "Date of birth is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required"

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
      <FormSection title="Borrower Information" description="Please provide your personal details">
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
          />
          <FormInput
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            error={errors.lastName}
          />
          <FormInput
            label="Social Security Number"
            placeholder="XXX-XX-XXXX"
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
            error={errors.ssn}
          />
          <FormInput
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            error={errors.dob}
          />
          <FormInput
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />
          <FormInput
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
          />
          <FormSelect
            label="Marital Status"
            options={[
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
            ]}
            value={formData.maritalStatus}
            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
            error={errors.maritalStatus}
          />
          <FormInput
            label="Number of Dependents"
            type="number"
            placeholder="0"
            value={formData.dependents}
            onChange={(e) => setFormData({ ...formData, dependents: e.target.value })}
          />
        </div>
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
