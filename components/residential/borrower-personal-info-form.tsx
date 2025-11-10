"use client"
import { useState } from "react"
import type React from "react"

import FormSection from "@/components/form-section"
import FormInput from "@/components/form-input"
import FormSelect from "@/components/form-select"

interface BorrowerPersonalInfoFormProps {
  onComplete: (data: any) => void
  initialData?: any
}

export default function BorrowerPersonalInfoForm({ onComplete, initialData = {} }: BorrowerPersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    // Section 1a: Personal Information
    firstName: initialData.firstName || "",
    middleName: initialData.middleName || "",
    lastName: initialData.lastName || "",
    suffix: initialData.suffix || "",
    ssn: initialData.ssn || "",
    itin: initialData.itin || "",
    alternateNames: initialData.alternateNames || "",
    dob: initialData.dob || "",
    creditType: initialData.creditType || "individual", // individual or joint
    totalBorrowers: initialData.totalBorrowers || "",
    otherBorrowerNames: initialData.otherBorrowerNames || "",
    maritalStatus: initialData.maritalStatus || "",
    dependentsNumber: initialData.dependentsNumber || "",
    dependentsAges: initialData.dependentsAges || "",
    citizenship: initialData.citizenship || "",
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
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required"
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

