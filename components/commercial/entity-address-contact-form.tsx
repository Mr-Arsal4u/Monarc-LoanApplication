"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface EntityAddressContactFormProps {
  onComplete: (data: any) => void
  initialData?: any
}

export default function EntityAddressContactForm({ onComplete, initialData = {} }: EntityAddressContactFormProps) {
  const [formData, setFormData] = useState({
    // Address Information
    principalAddress: initialData.principalAddress || "",
    principalCity: initialData.principalCity || "",
    principalState: initialData.principalState || "",
    principalZipCode: initialData.principalZipCode || "",
    mailingAddressSame: initialData.mailingAddressSame !== undefined ? initialData.mailingAddressSame : true,
    mailingAddress: initialData.mailingAddress || "",
    mailingCity: initialData.mailingCity || "",
    mailingState: initialData.mailingState || "",
    mailingZipCode: initialData.mailingZipCode || "",
    // Contact Information
    mainContactPhone: initialData.mainContactPhone || "",
    secondaryContactPhone: initialData.secondaryContactPhone || "",
    cellPhone: initialData.cellPhone || "",
    fax: initialData.fax || "",
    borrowerEmail: initialData.borrowerEmail || "",
    coBorrowerEmail: initialData.coBorrowerEmail || "",
    // Experience
    yearsExperienceRealEstate: initialData.yearsExperienceRealEstate || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.principalAddress.trim()) {
      newErrors.principalAddress = "Principal place of business address is required"
    }
    if (!formData.principalCity.trim()) {
      newErrors.principalCity = "City is required"
    }
    if (!formData.principalState) {
      newErrors.principalState = "State is required"
    }
    if (!formData.principalZipCode.trim()) {
      newErrors.principalZipCode = "ZIP code is required"
    }
    if (!formData.mainContactPhone.trim() && !formData.cellPhone.trim()) {
      newErrors.mainContactPhone = "At least one phone number is required"
    }
    if (!formData.borrowerEmail.trim()) {
      newErrors.borrowerEmail = "Email address is required"
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

  const allStates = [
    { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
  ]

  return (
    <form onSubmit={handleSubmit}>
      <FormSection title="Section B: Borrower Address & Contact Information" description="ARC Commercial Business Purpose Loan Application - Part 2">
        {/* Principal Place of Business Address */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Principal Place of Business Address (not a P.O. Box)</h3>
          <FormInput
            label="Street Address"
            placeholder="123 Business Ave"
            value={formData.principalAddress}
            onChange={(e) => setFormData({ ...formData, principalAddress: e.target.value })}
            error={errors.principalAddress}
            required
          />
          <div className="grid md:grid-cols-3 gap-6">
            <FormInput
              label="City"
              placeholder="New York"
              value={formData.principalCity}
              onChange={(e) => setFormData({ ...formData, principalCity: e.target.value })}
              error={errors.principalCity}
              required
            />
            <FormSelect
              label="State"
              options={allStates}
              value={formData.principalState}
              onChange={(e) => setFormData({ ...formData, principalState: e.target.value })}
              error={errors.principalState}
              required
            />
            <FormInput
              label="ZIP Code"
              placeholder="10001"
              value={formData.principalZipCode}
              onChange={(e) => setFormData({ ...formData, principalZipCode: e.target.value })}
              error={errors.principalZipCode}
              required
            />
          </div>
        </div>

        {/* Mailing Address */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="mailingAddressSame"
              checked={formData.mailingAddressSame}
              onChange={(e) => setFormData({ ...formData, mailingAddressSame: e.target.checked })}
              className="w-4 h-4 rounded border-border bg-input cursor-pointer"
            />
            <label htmlFor="mailingAddressSame" className="text-sm font-medium cursor-pointer">
              Mailing address is the same as principal address
            </label>
          </div>
          {!formData.mailingAddressSame && (
            <>
              <h3 className="text-lg font-semibold">Mailing Address (if different from above)</h3>
              <FormInput
                label="Street Address"
                placeholder="P.O. Box 123"
                value={formData.mailingAddress}
                onChange={(e) => setFormData({ ...formData, mailingAddress: e.target.value })}
              />
              <div className="grid md:grid-cols-3 gap-6">
                <FormInput
                  label="City"
                  placeholder="New York"
                  value={formData.mailingCity}
                  onChange={(e) => setFormData({ ...formData, mailingCity: e.target.value })}
                />
                <FormSelect
                  label="State"
                  options={allStates}
                  value={formData.mailingState}
                  onChange={(e) => setFormData({ ...formData, mailingState: e.target.value })}
                />
                <FormInput
                  label="ZIP Code"
                  placeholder="10001"
                  value={formData.mailingZipCode}
                  onChange={(e) => setFormData({ ...formData, mailingZipCode: e.target.value })}
                />
              </div>
            </>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="Main Contact Phone Number"
              placeholder="(555) 123-4567"
              value={formData.mainContactPhone}
              onChange={(e) => setFormData({ ...formData, mainContactPhone: e.target.value })}
              error={errors.mainContactPhone}
            />
            <FormInput
              label="Secondary Contact Phone Number"
              placeholder="(555) 123-4567"
              value={formData.secondaryContactPhone}
              onChange={(e) => setFormData({ ...formData, secondaryContactPhone: e.target.value })}
            />
            <FormInput
              label="Cell Phone"
              placeholder="(555) 123-4567"
              value={formData.cellPhone}
              onChange={(e) => setFormData({ ...formData, cellPhone: e.target.value })}
            />
            <FormInput
              label="Fax"
              placeholder="(555) 123-4567"
              value={formData.fax}
              onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
            />
            <FormInput
              label="E-mail address (Borrower)"
              type="email"
              placeholder="borrower@example.com"
              value={formData.borrowerEmail}
              onChange={(e) => setFormData({ ...formData, borrowerEmail: e.target.value })}
              error={errors.borrowerEmail}
              required
            />
            {initialData?.hasCoBorrower && (
              <FormInput
                label="E-mail address (Co-Borrower)"
                type="email"
                placeholder="coborrower@example.com"
                value={formData.coBorrowerEmail}
                onChange={(e) => setFormData({ ...formData, coBorrowerEmail: e.target.value })}
              />
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <FormInput
            label="How many years of experience do you have buying and selling real estate?"
            type="number"
            placeholder="0"
            value={formData.yearsExperienceRealEstate}
            onChange={(e) => setFormData({ ...formData, yearsExperienceRealEstate: e.target.value })}
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

