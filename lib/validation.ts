export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address"
  }
  return null
}

export const validateSSN = (ssn: string): string | null => {
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/
  if (!ssnRegex.test(ssn)) {
    return "SSN must be in format XXX-XX-XXXX"
  }
  return null
}

export const validateEIN = (ein: string): string | null => {
  const einRegex = /^\d{2}-\d{7}$/
  if (!einRegex.test(ein)) {
    return "EIN must be in format XX-XXXXXXX"
  }
  return null
}

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^[\d\s\-+$$$$]{10,}$/
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number"
  }
  return null
}

export const validateCurrency = (amount: string): string | null => {
  const value = Number.parseFloat(amount)
  if (isNaN(value) || value < 0) {
    return "Please enter a valid amount"
  }
  return null
}

export const validateDateOfBirth = (dob: string): string | null => {
  const birthDate = new Date(dob)
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()

  if (age < 18) {
    return "Applicant must be at least 18 years old"
  }
  if (age > 120) {
    return "Please enter a valid date of birth"
  }
  return null
}

export const validatePercentage = (percentage: string): string | null => {
  const value = Number.parseFloat(percentage)
  if (isNaN(value) || value < 0 || value > 100) {
    return "Percentage must be between 0 and 100"
  }
  return null
}

export const validateRequiredField = (value: string, fieldName: string): string | null => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`
  }
  return null
}

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`
  }
  return null
}
