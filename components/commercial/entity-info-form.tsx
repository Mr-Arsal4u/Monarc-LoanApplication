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
    // Borrower Type
    borrowerType: "",
    // Borrower Information
    borrowerLegalName: "",
    borrowerFirstName: "",
    borrowerDbaName: "",
    // Co-Borrower Information
    hasCoBorrower: false,
    coBorrowerLegalName: "",
    coBorrowerFirstName: "",
    coBorrowerDbaName: "",
    // Entity Information (if applicable)
    stateOfOrganization: "",
    dateOfFiling: "",
    filingLocations: "",
    // Address Information
    principalAddress: "",
    principalCity: "",
    principalState: "",
    principalZipCode: "",
    mailingAddressSame: true,
    mailingAddress: "",
    mailingCity: "",
    mailingState: "",
    mailingZipCode: "",
    // Contact Information
    mainContactPhone: "",
    secondaryContactPhone: "",
    cellPhone: "",
    fax: "",
    borrowerEmail: "",
    coBorrowerEmail: "",
    // Experience
    yearsExperienceRealEstate: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.borrowerType) newErrors.borrowerType = "Borrower type is required"
    if (!formData.borrowerLegalName.trim()) {
      newErrors.borrowerLegalName = "Legal name of Borrower is required"
    }
    if (formData.borrowerType === "individual" && !formData.borrowerFirstName.trim()) {
      newErrors.borrowerFirstName = "First name is required for individual borrowers"
    }
    if (formData.borrowerType !== "individual" && !formData.stateOfOrganization) {
      newErrors.stateOfOrganization = "State of Organization is required for entities"
    }
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
      <FormSection title="Section B: Borrower Information and Completion Instructions" description="ARC Commercial Business Purpose Loan Application">
        {/* Borrower Type */}
        <div className="mb-6">
          <FormSelect
            label="Borrower is a/an"
            options={[
              { value: "individual", label: "Individual(s)" },
              { value: "govt-entity", label: "Gov't Entity" },
              { value: "trust", label: "Trust" },
              { value: "corporation", label: "Corporation" },
              { value: "llc", label: "LLC" },
              { value: "partnership", label: "Partnership" },
              { value: "limited-partnership", label: "Limited Partnership" },
              { value: "nonprofit", label: "Nonprofit entity" },
              { value: "other", label: "Other" },
            ]}
            value={formData.borrowerType}
            onChange={(e) => setFormData({ ...formData, borrowerType: e.target.value })}
            error={errors.borrowerType}
            required
          />
        </div>

        {/* Borrower Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Borrower Information</h3>
          <FormInput
            label={formData.borrowerType === "individual" ? "Legal Name of Borrower (Last Name, if Individual)" : "Legal Name of Borrower (Entity Name)"}
            placeholder={formData.borrowerType === "individual" ? "Doe" : "ABC Corporation"}
            value={formData.borrowerLegalName}
            onChange={(e) => setFormData({ ...formData, borrowerLegalName: e.target.value })}
            error={errors.borrowerLegalName}
            required
          />
          {formData.borrowerType === "individual" && (
            <FormInput
              label="First Name (If Individual)"
              placeholder="John"
              value={formData.borrowerFirstName}
              onChange={(e) => setFormData({ ...formData, borrowerFirstName: e.target.value })}
              error={errors.borrowerFirstName}
              required
            />
          )}
          <FormInput
            label="DBA Name (where applicable)"
            placeholder="Doing Business As"
            value={formData.borrowerDbaName}
            onChange={(e) => setFormData({ ...formData, borrowerDbaName: e.target.value })}
          />
        </div>

        {/* Entity Information (if not individual) */}
        {formData.borrowerType !== "individual" && (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold">Entity Information</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <FormSelect
                label="If Entity, State of Organization"
                options={allStates}
                value={formData.stateOfOrganization}
                onChange={(e) => setFormData({ ...formData, stateOfOrganization: e.target.value })}
                error={errors.stateOfOrganization}
                required
              />
              <FormInput
                label="Date of Filing to Organize"
                type="date"
                value={formData.dateOfFiling}
                onChange={(e) => setFormData({ ...formData, dateOfFiling: e.target.value })}
              />
              <FormInput
                label="Filing Locations"
                placeholder="County, State"
                value={formData.filingLocations}
                onChange={(e) => setFormData({ ...formData, filingLocations: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Co-Borrower Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasCoBorrower"
              checked={formData.hasCoBorrower}
              onChange={(e) => setFormData({ ...formData, hasCoBorrower: e.target.checked })}
              className="w-4 h-4 rounded border-border bg-input cursor-pointer"
            />
            <label htmlFor="hasCoBorrower" className="text-sm font-medium cursor-pointer">
              I have a Co-Borrower
            </label>
          </div>
          {formData.hasCoBorrower && (
            <>
              <h3 className="text-lg font-semibold">Co-Borrower Information</h3>
              <FormInput
                label={formData.borrowerType === "individual" ? "Legal Name of Co-Borrower (Last Name, if Individual)" : "Legal Name of Co-Borrower (Entity Name)"}
                placeholder={formData.borrowerType === "individual" ? "Smith" : "XYZ LLC"}
                value={formData.coBorrowerLegalName}
                onChange={(e) => setFormData({ ...formData, coBorrowerLegalName: e.target.value })}
              />
              {formData.borrowerType === "individual" && (
                <FormInput
                  label="First Name (If Individual)"
                  placeholder="Jane"
                  value={formData.coBorrowerFirstName}
                  onChange={(e) => setFormData({ ...formData, coBorrowerFirstName: e.target.value })}
                />
              )}
              <FormInput
                label="DBA Name (where applicable)"
                placeholder="Doing Business As"
                value={formData.coBorrowerDbaName}
                onChange={(e) => setFormData({ ...formData, coBorrowerDbaName: e.target.value })}
              />
            </>
          )}
        </div>

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
            {formData.hasCoBorrower && (
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
