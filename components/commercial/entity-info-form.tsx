"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface EntityInfoFormProps {
  onComplete: (data: any) => void
}

export default function EntityInfoForm({ onComplete }: EntityInfoFormProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    ein: "",
    yearsInBusiness: "",
    businessPhone: "",
    businessEmail: "",
    principalAddress: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required"
    if (!formData.businessType) newErrors.businessType = "Business type is required"
    if (!formData.ein.trim()) newErrors.ein = "EIN is required"
    if (!formData.yearsInBusiness) newErrors.yearsInBusiness = "Years in business is required"
    if (!formData.businessEmail.trim()) newErrors.businessEmail = "Business email is required"
    if (!formData.principalAddress.trim()) newErrors.principalAddress = "Principal address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required"

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
      <FormSection title="Entity Information" description="Provide details about your business entity">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              label="Business Name"
              placeholder="ABC Corporation"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              error={errors.businessName}
            />
          </div>
          <FormSelect
            label="Business Type"
            options={[
              { value: "llc", label: "LLC" },
              { value: "corporation", label: "Corporation" },
              { value: "partnership", label: "Partnership" },
              { value: "sole-proprietor", label: "Sole Proprietor" },
              { value: "nonprofit", label: "Non-Profit" },
            ]}
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            error={errors.businessType}
          />
          <FormInput
            label="EIN (Employer Identification Number)"
            placeholder="XX-XXXXXXX"
            value={formData.ein}
            onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
            error={errors.ein}
          />
          <FormInput
            label="Years in Business"
            type="number"
            placeholder="5"
            value={formData.yearsInBusiness}
            onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
            error={errors.yearsInBusiness}
          />
          <FormInput
            label="Business Phone"
            placeholder="+1 (555) 123-4567"
            value={formData.businessPhone}
            onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
          />
          <FormInput
            label="Business Email"
            type="email"
            placeholder="info@business.com"
            value={formData.businessEmail}
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            error={errors.businessEmail}
          />
          <div className="md:col-span-2">
            <FormInput
              label="Principal Business Address"
              placeholder="123 Business Ave"
              value={formData.principalAddress}
              onChange={(e) => setFormData({ ...formData, principalAddress: e.target.value })}
              error={errors.principalAddress}
            />
          </div>
          <FormInput
            label="City"
            placeholder="New York"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            error={errors.city}
          />
          <FormSelect
            label="State"
            options={[
              { value: "CA", label: "California" },
              { value: "TX", label: "Texas" },
              { value: "NY", label: "New York" },
              { value: "FL", label: "Florida" },
              { value: "other", label: "Other" },
            ]}
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            error={errors.state}
          />
          <FormInput
            label="Zip Code"
            placeholder="10001"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            error={errors.zipCode}
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
