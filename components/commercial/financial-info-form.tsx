"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"

interface FinancialInfoFormProps {
  onComplete: (data: any) => void
}

export default function FinancialInfoForm({ onComplete }: FinancialInfoFormProps) {
  const [formData, setFormData] = useState({
    annualRevenue: "",
    netIncome: "",
    totalAssets: "",
    totalLiabilities: "",
    workingCapital: "",
    accountsReceivable: "",
    accountsPayable: "",
    existingDebt: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.annualRevenue) newErrors.annualRevenue = "Annual revenue is required"
    if (!formData.netIncome) newErrors.netIncome = "Net income is required"
    if (!formData.totalAssets) newErrors.totalAssets = "Total assets is required"
    if (!formData.totalLiabilities) newErrors.totalLiabilities = "Total liabilities is required"

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
      <FormSection title="Financial Information" description="Provide your business financial details (last 12 months)">
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="Annual Revenue"
            type="number"
            placeholder="1000000"
            value={formData.annualRevenue}
            onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
            error={errors.annualRevenue}
          />
          <FormInput
            label="Net Income"
            type="number"
            placeholder="250000"
            value={formData.netIncome}
            onChange={(e) => setFormData({ ...formData, netIncome: e.target.value })}
            error={errors.netIncome}
          />
          <FormInput
            label="Total Business Assets"
            type="number"
            placeholder="500000"
            value={formData.totalAssets}
            onChange={(e) => setFormData({ ...formData, totalAssets: e.target.value })}
            error={errors.totalAssets}
          />
          <FormInput
            label="Total Business Liabilities"
            type="number"
            placeholder="200000"
            value={formData.totalLiabilities}
            onChange={(e) => setFormData({ ...formData, totalLiabilities: e.target.value })}
            error={errors.totalLiabilities}
          />
          <FormInput
            label="Working Capital"
            type="number"
            placeholder="100000"
            value={formData.workingCapital}
            onChange={(e) => setFormData({ ...formData, workingCapital: e.target.value })}
          />
          <FormInput
            label="Accounts Receivable"
            type="number"
            placeholder="50000"
            value={formData.accountsReceivable}
            onChange={(e) => setFormData({ ...formData, accountsReceivable: e.target.value })}
          />
          <FormInput
            label="Accounts Payable"
            type="number"
            placeholder="30000"
            value={formData.accountsPayable}
            onChange={(e) => setFormData({ ...formData, accountsPayable: e.target.value })}
          />
          <FormInput
            label="Existing Debt Outstanding"
            type="number"
            placeholder="200000"
            value={formData.existingDebt}
            onChange={(e) => setFormData({ ...formData, existingDebt: e.target.value })}
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
