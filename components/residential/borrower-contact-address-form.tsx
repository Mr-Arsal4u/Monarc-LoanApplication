"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface BorrowerContactAddressFormProps {
  onComplete: (data: any) => void
  initialData?: any
}

export default function BorrowerContactAddressForm({ onComplete, initialData = {} }: BorrowerContactAddressFormProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    homePhone: "",
    cellPhone: "",
    workPhone: "",
    workPhoneExt: "",
    email: "",
    // Address Information
    currentAddressStreet: "",
    currentAddressUnit: "",
    currentAddressCity: "",
    currentAddressState: "",
    currentAddressZip: "",
    currentAddressCountry: "",
    yearsAtCurrentAddress: "",
    monthsAtCurrentAddress: "",
    formerAddressStreet: "",
    formerAddressUnit: "",
    formerAddressCity: "",
    formerAddressState: "",
    formerAddressZip: "",
    formerAddressCountry: "",
    yearsAtFormerAddress: "",
    monthsAtFormerAddress: "",
    mailingAddressSame: true,
    mailingAddressStreet: "",
    mailingAddressUnit: "",
    mailingAddressCity: "",
    mailingAddressState: "",
    mailingAddressZip: "",
    mailingAddressCountry: "",
    ...initialData,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.homePhone.trim() && !formData.cellPhone.trim()) {
      newErrors.homePhone = "At least one phone number is required"
    }
    if (!formData.currentAddressStreet.trim()) {
      newErrors.currentAddressStreet = "Current address is required"
    }
    if (!formData.currentAddressCity.trim()) {
      newErrors.currentAddressCity = "City is required"
    }
    if (!formData.currentAddressState) {
      newErrors.currentAddressState = "State is required"
    }
    if (!formData.currentAddressZip.trim()) {
      newErrors.currentAddressZip = "ZIP code is required"
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

  const showFormerAddress = formData.yearsAtCurrentAddress && parseInt(formData.yearsAtCurrentAddress) < 2

  return (
    <form onSubmit={handleSubmit}>
      <FormSection title="Contact & Address Information" description="Provide your contact details and address information">
        {/* Contact Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <FormInput
              label="Home Phone"
              placeholder="(555) 123-4567"
              value={formData.homePhone}
              onChange={(e) => setFormData({ ...formData, homePhone: e.target.value })}
              error={errors.homePhone}
            />
            <FormInput
              label="Cell Phone"
              placeholder="(555) 123-4567"
              value={formData.cellPhone}
              onChange={(e) => setFormData({ ...formData, cellPhone: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormInput
                label="Work Phone"
                placeholder="(555) 123-4567"
                value={formData.workPhone}
                onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
              />
              <FormInput
                label="Ext."
                placeholder="1234"
                value={formData.workPhoneExt}
                onChange={(e) => setFormData({ ...formData, workPhoneExt: e.target.value })}
              />
            </div>
          </div>
          <FormInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />
        </div>

        {/* Current Address */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Current Address</h3>
          <FormInput
            label="Street Address"
            placeholder="123 Main St"
            value={formData.currentAddressStreet}
            onChange={(e) => setFormData({ ...formData, currentAddressStreet: e.target.value })}
            error={errors.currentAddressStreet}
            required
          />
          <div className="grid md:grid-cols-4 gap-6">
            <FormInput
              label="Unit #"
              placeholder="Apt 4B"
              value={formData.currentAddressUnit}
              onChange={(e) => setFormData({ ...formData, currentAddressUnit: e.target.value })}
            />
            <FormInput
              label="City"
              placeholder="New York"
              value={formData.currentAddressCity}
              onChange={(e) => setFormData({ ...formData, currentAddressCity: e.target.value })}
              error={errors.currentAddressCity}
              required
            />
            <FormSelect
              label="State"
              options={[
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
              ]}
              value={formData.currentAddressState}
              onChange={(e) => setFormData({ ...formData, currentAddressState: e.target.value })}
              error={errors.currentAddressState}
              required
            />
            <FormInput
              label="ZIP"
              placeholder="10001"
              value={formData.currentAddressZip}
              onChange={(e) => setFormData({ ...formData, currentAddressZip: e.target.value })}
              error={errors.currentAddressZip}
              required
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FormInput
              label="Country"
              placeholder="USA"
              value={formData.currentAddressCountry}
              onChange={(e) => setFormData({ ...formData, currentAddressCountry: e.target.value })}
            />
            <FormInput
              label="How Long at Current Address? (Years)"
              type="number"
              placeholder="5"
              value={formData.yearsAtCurrentAddress}
              onChange={(e) => setFormData({ ...formData, yearsAtCurrentAddress: e.target.value })}
            />
            <FormInput
              label="Months"
              type="number"
              placeholder="3"
              value={formData.monthsAtCurrentAddress}
              onChange={(e) => setFormData({ ...formData, monthsAtCurrentAddress: e.target.value })}
            />
          </div>
        </div>

        {/* Former Address */}
        {showFormerAddress && (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold">Former Address (Required if at current address less than 2 years)</h3>
            <FormInput
              label="Street Address"
              placeholder="123 Old St"
              value={formData.formerAddressStreet}
              onChange={(e) => setFormData({ ...formData, formerAddressStreet: e.target.value })}
            />
            <div className="grid md:grid-cols-4 gap-6">
              <FormInput
                label="Unit #"
                placeholder="Apt 2A"
                value={formData.formerAddressUnit}
                onChange={(e) => setFormData({ ...formData, formerAddressUnit: e.target.value })}
              />
              <FormInput
                label="City"
                placeholder="Boston"
                value={formData.formerAddressCity}
                onChange={(e) => setFormData({ ...formData, formerAddressCity: e.target.value })}
              />
              <FormSelect
                label="State"
                options={[
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
                ]}
                value={formData.formerAddressState}
                onChange={(e) => setFormData({ ...formData, formerAddressState: e.target.value })}
              />
              <FormInput
                label="ZIP"
                placeholder="02101"
                value={formData.formerAddressZip}
                onChange={(e) => setFormData({ ...formData, formerAddressZip: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FormInput
                label="Country"
                placeholder="USA"
                value={formData.formerAddressCountry}
                onChange={(e) => setFormData({ ...formData, formerAddressCountry: e.target.value })}
              />
              <FormInput
                label="How Long at Former Address? (Years)"
                type="number"
                placeholder="2"
                value={formData.yearsAtFormerAddress}
                onChange={(e) => setFormData({ ...formData, yearsAtFormerAddress: e.target.value })}
              />
              <FormInput
                label="Months"
                type="number"
                placeholder="6"
                value={formData.monthsAtFormerAddress}
                onChange={(e) => setFormData({ ...formData, monthsAtFormerAddress: e.target.value })}
              />
            </div>
          </div>
        )}

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
              Mailing address is the same as current address
            </label>
          </div>
          {!formData.mailingAddressSame && (
            <>
              <h3 className="text-lg font-semibold">Mailing Address (if different from Current Address)</h3>
              <FormInput
                label="Street Address"
                placeholder="P.O. Box 123"
                value={formData.mailingAddressStreet}
                onChange={(e) => setFormData({ ...formData, mailingAddressStreet: e.target.value })}
              />
              <div className="grid md:grid-cols-4 gap-6">
                <FormInput
                  label="Unit #"
                  placeholder=""
                  value={formData.mailingAddressUnit}
                  onChange={(e) => setFormData({ ...formData, mailingAddressUnit: e.target.value })}
                />
                <FormInput
                  label="City"
                  placeholder="New York"
                  value={formData.mailingAddressCity}
                  onChange={(e) => setFormData({ ...formData, mailingAddressCity: e.target.value })}
                />
                <FormSelect
                  label="State"
                  options={[
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
                  ]}
                  value={formData.mailingAddressState}
                  onChange={(e) => setFormData({ ...formData, mailingAddressState: e.target.value })}
                />
                <FormInput
                  label="ZIP"
                  placeholder="10001"
                  value={formData.mailingAddressZip}
                  onChange={(e) => setFormData({ ...formData, mailingAddressZip: e.target.value })}
                />
              </div>
              <FormInput
                label="Country"
                placeholder="USA"
                value={formData.mailingAddressCountry}
                onChange={(e) => setFormData({ ...formData, mailingAddressCountry: e.target.value })}
              />
            </>
          )}
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

