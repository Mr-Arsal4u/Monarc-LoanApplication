"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"

interface AssetFormProps {
  onComplete: (data: any) => void
}

export default function AssetForm({ onComplete }: AssetFormProps) {
  const [formData, setFormData] = useState({
    bankAccount: "",
    savingsAccount: "",
    retirementAccount: "",
    stocks: "",
    otherAssets: "",
    mortgageDebt: "",
    carLoans: "",
    creditCards: "",
    otherDebts: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.bankAccount && !formData.savingsAccount && !formData.retirementAccount) {
      newErrors.assets = "Please provide at least one asset"
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
      <FormSection title="Assets & Liabilities" description="List your financial assets and debts">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Assets</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Checking Account Balance"
                type="number"
                placeholder="0.00"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
              />
              <FormInput
                label="Savings Account Balance"
                type="number"
                placeholder="0.00"
                value={formData.savingsAccount}
                onChange={(e) => setFormData({ ...formData, savingsAccount: e.target.value })}
              />
              <FormInput
                label="Retirement Account (401k, IRA)"
                type="number"
                placeholder="0.00"
                value={formData.retirementAccount}
                onChange={(e) => setFormData({ ...formData, retirementAccount: e.target.value })}
              />
              <FormInput
                label="Stocks & Investment Value"
                type="number"
                placeholder="0.00"
                value={formData.stocks}
                onChange={(e) => setFormData({ ...formData, stocks: e.target.value })}
              />
              <FormInput
                label="Other Assets"
                type="number"
                placeholder="0.00"
                value={formData.otherAssets}
                onChange={(e) => setFormData({ ...formData, otherAssets: e.target.value })}
              />
            </div>
            {errors.assets && <p className="text-sm text-destructive mt-2">{errors.assets}</p>}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Existing Mortgage Debt"
                type="number"
                placeholder="0.00"
                value={formData.mortgageDebt}
                onChange={(e) => setFormData({ ...formData, mortgageDebt: e.target.value })}
              />
              <FormInput
                label="Car Loans"
                type="number"
                placeholder="0.00"
                value={formData.carLoans}
                onChange={(e) => setFormData({ ...formData, carLoans: e.target.value })}
              />
              <FormInput
                label="Credit Card Debt"
                type="number"
                placeholder="0.00"
                value={formData.creditCards}
                onChange={(e) => setFormData({ ...formData, creditCards: e.target.value })}
              />
              <FormInput
                label="Other Debts"
                type="number"
                placeholder="0.00"
                value={formData.otherDebts}
                onChange={(e) => setFormData({ ...formData, otherDebts: e.target.value })}
              />
            </div>
          </div>
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
