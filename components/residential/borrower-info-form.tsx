"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface BorrowerInfoFormProps {
  onComplete: (data: any) => void
}

export default function BorrowerInfoForm({ onComplete }: BorrowerInfoFormProps) {
  const [formData, setFormData] = useState({
    // Section 1a: Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    ssn: "",
    itin: "",
    alternateNames: "",
    dob: "",
    creditType: "individual", // individual or joint
    totalBorrowers: "",
    otherBorrowerNames: "",
    maritalStatus: "",
    dependentsNumber: "",
    dependentsAges: "",
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
    hasFormerAddress: false,
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
    // Citizenship
    citizenship: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.ssn.trim() && !formData.itin.trim()) {
      newErrors.ssn = "SSN or ITIN is required"
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.homePhone.trim() && !formData.cellPhone.trim()) {
      newErrors.homePhone = "At least one phone number is required"
    }
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required"
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
    if (!formData.citizenship) newErrors.citizenship = "Citizenship status is required"

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
      <FormSection title="Section 1a: Personal Information" description="Uniform Residential Loan Application - Form 1003">
        {/* Name Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Name</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
              required
            />
            <FormInput
              label="Middle Name"
              placeholder="Middle"
              value={formData.middleName}
              onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
            />
            <FormInput
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
              required
            />
            <FormInput
              label="Suffix (Jr., Sr., III, etc.)"
              placeholder="Jr."
              value={formData.suffix}
              onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
            />
          </div>
        </div>

        {/* SSN/ITIN */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="Social Security Number (SSN)"
            placeholder="XXX-XX-XXXX"
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
            error={errors.ssn}
          />
          <FormInput
            label="Individual Taxpayer Identification Number (ITIN)"
            placeholder="XXX-XX-XXXX"
            value={formData.itin}
            onChange={(e) => setFormData({ ...formData, itin: e.target.value })}
          />
        </div>

        {/* Alternate Names */}
        <div className="mb-6">
          <FormInput
            label="Alternate Names - List any names by which you are known or any names under which credit was previously received"
            placeholder="First, Middle, Last, Suffix"
            value={formData.alternateNames}
            onChange={(e) => setFormData({ ...formData, alternateNames: e.target.value })}
          />
        </div>

        {/* DOB and Credit Type */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <FormInput
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            error={errors.dob}
            required
          />
          <FormSelect
            label="Type of Credit"
            options={[
              { value: "individual", label: "I am applying for individual credit" },
              { value: "joint", label: "I am applying for joint credit" },
            ]}
            value={formData.creditType}
            onChange={(e) => setFormData({ ...formData, creditType: e.target.value })}
          />
        </div>

        {formData.creditType === "joint" && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FormInput
              label="Total Number of Borrowers"
              type="number"
              placeholder="2"
              value={formData.totalBorrowers}
              onChange={(e) => setFormData({ ...formData, totalBorrowers: e.target.value })}
            />
            <FormInput
              label="List Name(s) of Other Borrower(s) Applying for this Loan"
              placeholder="First, Middle, Last, Suffix"
              value={formData.otherBorrowerNames}
              onChange={(e) => setFormData({ ...formData, otherBorrowerNames: e.target.value })}
            />
          </div>
        )}

        {/* Marital Status and Dependents */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <FormSelect
            label="Marital Status"
            options={[
              { value: "married", label: "Married" },
              { value: "separated", label: "Separated" },
              { value: "unmarried", label: "Unmarried (Single, Divorced, Widowed, Civil Union, Domestic Partnership)" },
            ]}
            value={formData.maritalStatus}
            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
            error={errors.maritalStatus}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Dependents (not listed by another Borrower) - Number"
              type="number"
              placeholder="0"
              value={formData.dependentsNumber}
              onChange={(e) => setFormData({ ...formData, dependentsNumber: e.target.value })}
            />
            <FormInput
              label="Dependents - Ages"
              placeholder="e.g., 5, 8, 12"
              value={formData.dependentsAges}
              onChange={(e) => setFormData({ ...formData, dependentsAges: e.target.value })}
            />
          </div>
        </div>

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
        {formData.yearsAtCurrentAddress && parseInt(formData.yearsAtCurrentAddress) < 2 && (
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

        {/* Citizenship */}
        <div className="mb-6">
          <FormSelect
            label="Citizenship"
            options={[
              { value: "us-citizen", label: "U.S. Citizen" },
              { value: "permanent-resident", label: "Permanent Resident Alien" },
              { value: "non-permanent-resident", label: "Non-Permanent Resident Alien" },
            ]}
            value={formData.citizenship}
            onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
            error={errors.citizenship}
            required
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
