"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface CollateralFormProps {
  onComplete: (data: any) => void
}

export default function CollateralForm({ onComplete }: CollateralFormProps) {
  const [formData, setFormData] = useState({
    collateralType: "",
    collateralDescription: "",
    collateralValue: "",
    liensAgainstCollateral: "",
    propertyAddress: "",
    estimatedMarketValue: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.collateralType) newErrors.collateralType = "Collateral type is required"
    if (!formData.collateralValue) newErrors.collateralValue = "Collateral value is required"

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
      <FormSection title="Collateral" description="Describe the collateral to secure this loan">
        <div className="grid md:grid-cols-2 gap-6">
          <FormSelect
            label="Collateral Type"
            options={[
              { value: "real-estate", label: "Real Estate" },
              { value: "equipment", label: "Equipment" },
              { value: "inventory", label: "Inventory" },
              { value: "accounts-receivable", label: "Accounts Receivable" },
              { value: "vehicles", label: "Vehicles" },
              { value: "mixed", label: "Mixed Assets" },
              { value: "unsecured", label: "Unsecured" },
            ]}
            value={formData.collateralType}
            onChange={(e) => setFormData({ ...formData, collateralType: e.target.value })}
            error={errors.collateralType}
          />
          <FormInput
            label="Estimated Collateral Value"
            type="number"
            placeholder="600000"
            value={formData.collateralValue}
            onChange={(e) => setFormData({ ...formData, collateralValue: e.target.value })}
            error={errors.collateralValue}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Collateral Description</label>
            <textarea
              placeholder="Describe the collateral in detail..."
              value={formData.collateralDescription}
              onChange={(e) => setFormData({ ...formData, collateralDescription: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors h-20"
            />
          </div>
          <FormInput
            label="Existing Liens/Mortgages Against Collateral"
            type="number"
            placeholder="0"
            value={formData.liensAgainstCollateral}
            onChange={(e) => setFormData({ ...formData, liensAgainstCollateral: e.target.value })}
          />
          <FormInput
            label="Estimated Market Value"
            type="number"
            placeholder="600000"
            value={formData.estimatedMarketValue}
            onChange={(e) => setFormData({ ...formData, estimatedMarketValue: e.target.value })}
          />
          <div className="md:col-span-2">
            <FormInput
              label="Property Address (if applicable)"
              placeholder="123 Business Ave, City, State 12345"
              value={formData.propertyAddress}
              onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
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
