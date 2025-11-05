"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface AuthorizedSignerFormProps {
  onComplete: (data: any) => void
}

export default function AuthorizedSignerForm({ onComplete }: AuthorizedSignerFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    ssn: "",
    dob: "",
    email: "",
    phone: "",
    ownership: "",
    yearsWithCompany: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.title) newErrors.title = "Title is required"
    if (!formData.ssn.trim()) newErrors.ssn = "SSN is required"
    if (!formData.dob) newErrors.dob = "Date of birth is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.ownership) newErrors.ownership = "Ownership percentage is required"

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
      <FormSection
        title="Authorized Signer"
        description="Provide information about the authorized signer for this application"
      >
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
          <FormSelect
            label="Title/Position"
            options={[
              { value: "ceo", label: "CEO/President" },
              { value: "cfo", label: "CFO/Finance Director" },
              { value: "owner", label: "Owner" },
              { value: "partner", label: "Partner" },
              { value: "treasurer", label: "Treasurer" },
              { value: "manager", label: "Manager" },
            ]}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
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
            label="Email"
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
          />
          <FormInput
            label="Ownership Percentage (%)"
            type="number"
            placeholder="50"
            min="0"
            max="100"
            value={formData.ownership}
            onChange={(e) => setFormData({ ...formData, ownership: e.target.value })}
            error={errors.ownership}
          />
          <FormInput
            label="Years With Company"
            type="number"
            placeholder="10"
            value={formData.yearsWithCompany}
            onChange={(e) => setFormData({ ...formData, yearsWithCompany: e.target.value })}
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
