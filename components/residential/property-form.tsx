"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface PropertyFormProps {
  onComplete: (data: any) => void
}

export default function PropertyForm({ onComplete }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    propertyAddress: "",
    city: "",
    state: "",
    zipCode: "",
    propertyType: "",
    purchasePrice: "",
    downPayment: "",
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.propertyAddress.trim()) newErrors.propertyAddress = "Property address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required"
    if (!formData.propertyType) newErrors.propertyType = "Property type is required"
    if (!formData.purchasePrice) newErrors.purchasePrice = "Purchase price is required"
    if (!formData.downPayment) newErrors.downPayment = "Down payment is required"

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
      <FormSection title="Property Details" description="Provide information about the property you want to purchase">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FormInput
              label="Property Address"
              placeholder="123 Main St"
              value={formData.propertyAddress}
              onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
              error={errors.propertyAddress}
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
          <FormSelect
            label="Property Type"
            options={[
              { value: "single-family", label: "Single Family Home" },
              { value: "condo", label: "Condo" },
              { value: "townhouse", label: "Townhouse" },
              { value: "multi-family", label: "Multi-Family" },
            ]}
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            error={errors.propertyType}
          />
          <FormInput
            label="Purchase Price"
            type="number"
            placeholder="500000"
            value={formData.purchasePrice}
            onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
            error={errors.purchasePrice}
          />
          <FormInput
            label="Down Payment"
            type="number"
            placeholder="100000"
            value={formData.downPayment}
            onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
            error={errors.downPayment}
          />
          <FormInput
            label="Desired Loan Amount"
            type="number"
            placeholder="400000"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
          />
          <FormInput
            label="Expected Interest Rate (%)"
            type="number"
            placeholder="6.5"
            step="0.1"
            value={formData.interestRate}
            onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
          />
          <FormSelect
            label="Loan Term"
            options={[
              { value: "15", label: "15 years" },
              { value: "20", label: "20 years" },
              { value: "30", label: "30 years" },
            ]}
            value={formData.loanTerm}
            onChange={(e) => setFormData({ ...formData, loanTerm: e.target.value })}
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
