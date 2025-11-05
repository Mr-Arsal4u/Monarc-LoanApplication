export interface FormState {
  borrower?: Record<string, any>
  coApplicant?: Record<string, any>
  employment?: Record<string, any>
  assets?: Record<string, any>
  property?: Record<string, any>
  documents?: string[]
  entity?: Record<string, any>
  loanPurpose?: Record<string, any>
  financialInfo?: Record<string, any>
  collateral?: Record<string, any>
  signer?: Record<string, any>
}

export interface FormErrors {
  [key: string]: string
}

// Save form state to sessionStorage
export const saveFormState = (applicationId: string, state: FormState) => {
  try {
    sessionStorage.setItem(`form-${applicationId}`, JSON.stringify(state))
  } catch (e) {
    console.error("Failed to save form state:", e)
  }
}

// Retrieve form state from sessionStorage
export const getFormState = (applicationId: string): FormState | null => {
  try {
    const state = sessionStorage.getItem(`form-${applicationId}`)
    return state ? JSON.parse(state) : null
  } catch (e) {
    console.error("Failed to retrieve form state:", e)
    return null
  }
}

// Clear form state
export const clearFormState = (applicationId: string) => {
  try {
    sessionStorage.removeItem(`form-${applicationId}`)
  } catch (e) {
    console.error("Failed to clear form state:", e)
  }
}

// Generate a unique application ID
export const generateApplicationId = (): string => {
  return `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
