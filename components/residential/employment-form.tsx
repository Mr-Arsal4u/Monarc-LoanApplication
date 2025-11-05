"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface EmploymentFormProps {
  onComplete: (data: any) => void
}

export default function EmploymentForm({ onComplete }: EmploymentFormProps) {
  const [formData, setFormData] = useState({
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    yearsEmployed: "",
    annualIncome: "",
    workPhone: "",
    industry: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.employmentStatus) newErrors.employmentStatus = "Employment status is required"
    if (formData.employmentStatus === "employed") {
      if (!formData.employerName.trim()) newErrors.employerName = "Employer name is required"
      if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
      if (!formData.yearsEmployed) newErrors.yearsEmployed = "Years employed is required"
      if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required"
    }

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
      <FormSection title="Employment Information" description="Provide details about your employment">
        <FormSelect
          label="Employment Status"
          options={[
            { value: "employed", label: "Employed" },
            { value: "self-employed", label: "Self-Employed" },
            { value: "retired", label: "Retired" },
            { value: "unemployed", label: "Unemployed" },
          ]}
          value={formData.employmentStatus}
          onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
          error={errors.employmentStatus}
        />

        {formData.employmentStatus === "employed" && (
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="Employer Name"
              placeholder="ABC Corporation"
              value={formData.employerName}
              onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
              error={errors.employerName}
            />
            <FormInput
              label="Job Title"
              placeholder="Senior Developer"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              error={errors.jobTitle}
            />
            <FormInput
              label="Years Employed"
              type="number"
              placeholder="5"
              value={formData.yearsEmployed}
              onChange={(e) => setFormData({ ...formData, yearsEmployed: e.target.value })}
              error={errors.yearsEmployed}
            />
            <FormInput
              label="Annual Income"
              type="number"
              placeholder="100000"
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              error={errors.annualIncome}
            />
            <FormInput
              label="Work Phone"
              placeholder="+1 (555) 123-4567"
              value={formData.workPhone}
              onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
            />
            <FormSelect
              label="Industry"
              options={[
                { value: "tech", label: "Technology" },
                { value: "finance", label: "Finance" },
                { value: "healthcare", label: "Healthcare" },
                { value: "retail", label: "Retail" },
                { value: "other", label: "Other" },
              ]}
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
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
