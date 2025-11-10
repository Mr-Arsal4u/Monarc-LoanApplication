"use client"
import { useState, useMemo } from "react"
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
    // Employer/Business Address
    employerStreet: "",
    employerUnit: "",
    employerCity: "",
    employerState: "",
    employerZip: "",
    employerCountry: "",
    // Dates and Duration
    startDate: "",
    yearsEmployed: "",
    monthsEmployed: "",
    yearsInLineOfWork: "",
    monthsInLineOfWork: "",
    // Checkboxes
    isBusinessOwner: false,
    isSelfEmployed: false,
    isEmployedByFamilyMember: false,
    // Income Breakdown (Monthly)
    baseIncome: "",
    overtimeIncome: "",
    bonusIncome: "",
    commissionIncome: "",
    militaryEntitlements: "",
    otherIncome: "",
    // Ownership
    ownershipShare: "",
    workPhone: "",
    industry: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Calculate total monthly income
  const totalMonthlyIncome = useMemo(() => {
    const base = parseFloat(formData.baseIncome) || 0
    const overtime = parseFloat(formData.overtimeIncome) || 0
    const bonus = parseFloat(formData.bonusIncome) || 0
    const commission = parseFloat(formData.commissionIncome) || 0
    const military = parseFloat(formData.militaryEntitlements) || 0
    const other = parseFloat(formData.otherIncome) || 0
    return base + overtime + bonus + commission + military + other
  }, [
    formData.baseIncome,
    formData.overtimeIncome,
    formData.bonusIncome,
    formData.commissionIncome,
    formData.militaryEntitlements,
    formData.otherIncome,
  ])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required"
    }

    if (formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") {
      if (!formData.employerName.trim()) {
        newErrors.employerName = "Employer/Business name is required"
      }
      if (!formData.jobTitle.trim()) {
        newErrors.jobTitle = "Job title is required"
      }
      if (!formData.startDate) {
        newErrors.startDate = "Start date is required"
      }
      if (!formData.employerStreet.trim()) {
        newErrors.employerStreet = "Employer/Business address is required"
      }
      if (!formData.employerCity.trim()) {
        newErrors.employerCity = "City is required"
      }
      if (!formData.employerState) {
        newErrors.employerState = "State is required"
      }
      if (!formData.employerZip.trim()) {
        newErrors.employerZip = "ZIP code is required"
      }
      if (totalMonthlyIncome === 0) {
        newErrors.baseIncome = "At least one income source is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete({
        ...formData,
        totalMonthlyIncome,
      })
    }
  }

  const showEmploymentFields = formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed"

  return (
    <form onSubmit={handleSubmit}>
      <FormSection title="Section 1b: Current Employment/Self-Employment and Income" description="Uniform Residential Loan Application - Form 1003">
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
          required
        />

        {showEmploymentFields && (
          <>
            {/* Employer/Business Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Employer/Business Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Employer/Business Name"
                  placeholder="ABC Corporation"
                  value={formData.employerName}
                  onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                  error={errors.employerName}
                  required
                />
                <FormInput
                  label="Job Title"
                  placeholder="Senior Developer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  error={errors.jobTitle}
                  required
                />
              </div>

              {/* Employer/Business Address */}
              <div className="space-y-4">
                <FormInput
                  label="Employer/Business Address (Street)"
                  placeholder="123 Business St"
                  value={formData.employerStreet}
                  onChange={(e) => setFormData({ ...formData, employerStreet: e.target.value })}
                  error={errors.employerStreet}
                  required
                />
                <div className="grid md:grid-cols-4 gap-6">
                  <FormInput
                    label="Unit #"
                    placeholder="Suite 100"
                    value={formData.employerUnit}
                    onChange={(e) => setFormData({ ...formData, employerUnit: e.target.value })}
                  />
                  <FormInput
                    label="City"
                    placeholder="New York"
                    value={formData.employerCity}
                    onChange={(e) => setFormData({ ...formData, employerCity: e.target.value })}
                    error={errors.employerCity}
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
                    value={formData.employerState}
                    onChange={(e) => setFormData({ ...formData, employerState: e.target.value })}
                    error={errors.employerState}
                    required
                  />
                  <FormInput
                    label="ZIP"
                    placeholder="10001"
                    value={formData.employerZip}
                    onChange={(e) => setFormData({ ...formData, employerZip: e.target.value })}
                    error={errors.employerZip}
                    required
                  />
                </div>
                <FormInput
                  label="Country"
                  placeholder="USA"
                  value={formData.employerCountry}
                  onChange={(e) => setFormData({ ...formData, employerCountry: e.target.value })}
                />
              </div>

              {/* Dates and Duration */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  error={errors.startDate}
                  required
                />
                <FormInput
                  label="Work Phone"
                  placeholder="(555) 123-4567"
                  value={formData.workPhone}
                  onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Years Employed"
                    type="number"
                    placeholder="5"
                    value={formData.yearsEmployed}
                    onChange={(e) => setFormData({ ...formData, yearsEmployed: e.target.value })}
                  />
                  <FormInput
                    label="Months"
                    type="number"
                    placeholder="3"
                    value={formData.monthsEmployed}
                    onChange={(e) => setFormData({ ...formData, monthsEmployed: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="How long in this line of work? (Years)"
                    type="number"
                    placeholder="10"
                    value={formData.yearsInLineOfWork}
                    onChange={(e) => setFormData({ ...formData, yearsInLineOfWork: e.target.value })}
                  />
                  <FormInput
                    label="Months"
                    type="number"
                    placeholder="6"
                    value={formData.monthsInLineOfWork}
                    onChange={(e) => setFormData({ ...formData, monthsInLineOfWork: e.target.value })}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isBusinessOwner"
                    checked={formData.isBusinessOwner}
                    onChange={(e) => setFormData({ ...formData, isBusinessOwner: e.target.checked })}
                    className="w-4 h-4 rounded border-border bg-input cursor-pointer"
                  />
                  <label htmlFor="isBusinessOwner" className="text-sm font-medium cursor-pointer">
                    Business Owner/Self-Employed
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isEmployedByFamilyMember"
                    checked={formData.isEmployedByFamilyMember}
                    onChange={(e) => setFormData({ ...formData, isEmployedByFamilyMember: e.target.checked })}
                    className="w-4 h-4 rounded border-border bg-input cursor-pointer"
                  />
                  <label htmlFor="isEmployedByFamilyMember" className="text-sm font-medium cursor-pointer">
                    I am employed by a family member, property seller, real estate agent, or other party to the transaction
                  </label>
                </div>
              </div>

              {/* Ownership Share (if business owner) */}
              {formData.isBusinessOwner && (
                <FormSelect
                  label="Ownership Share"
                  options={[
                    { value: "less-than-25", label: "Less than 25%" },
                    { value: "25-or-more", label: "25% or more" },
                  ]}
                  value={formData.ownershipShare}
                  onChange={(e) => setFormData({ ...formData, ownershipShare: e.target.value })}
                />
              )}

              {/* Industry */}
              <FormSelect
                label="Industry"
                options={[
                  { value: "tech", label: "Technology" },
                  { value: "finance", label: "Finance" },
                  { value: "healthcare", label: "Healthcare" },
                  { value: "retail", label: "Retail" },
                  { value: "construction", label: "Construction" },
                  { value: "education", label: "Education" },
                  { value: "manufacturing", label: "Manufacturing" },
                  { value: "other", label: "Other" },
                ]}
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>

            {/* Gross Monthly Income Breakdown */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Gross Monthly Income ($/month)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Base"
                  type="number"
                  placeholder="5000"
                  value={formData.baseIncome}
                  onChange={(e) => setFormData({ ...formData, baseIncome: e.target.value })}
                  error={errors.baseIncome}
                />
                <FormInput
                  label="Overtime"
                  type="number"
                  placeholder="500"
                  value={formData.overtimeIncome}
                  onChange={(e) => setFormData({ ...formData, overtimeIncome: e.target.value })}
                />
                <FormInput
                  label="Bonus"
                  type="number"
                  placeholder="1000"
                  value={formData.bonusIncome}
                  onChange={(e) => setFormData({ ...formData, bonusIncome: e.target.value })}
                />
                <FormInput
                  label="Commission"
                  type="number"
                  placeholder="800"
                  value={formData.commissionIncome}
                  onChange={(e) => setFormData({ ...formData, commissionIncome: e.target.value })}
                />
                <FormInput
                  label="Military Entitlements"
                  type="number"
                  placeholder="0"
                  value={formData.militaryEntitlements}
                  onChange={(e) => setFormData({ ...formData, militaryEntitlements: e.target.value })}
                />
                <FormInput
                  label="Other"
                  type="number"
                  placeholder="0"
                  value={formData.otherIncome}
                  onChange={(e) => setFormData({ ...formData, otherIncome: e.target.value })}
                />
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Monthly Income (or Loss) TOTAL:</span>
                  <span className="text-lg font-bold">${totalMonthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </>
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
