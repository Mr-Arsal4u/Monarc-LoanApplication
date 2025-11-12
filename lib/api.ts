/**
 * API Configuration and Utilities
 */

// Get API base URL from environment variable or use default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
  error?: string
}

/**
 * Make an API request
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
        error: data.error,
      }
    }

    return {
      success: true,
      ...data,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
      error: 'Network error',
    }
  }
}

/**
 * API methods for Contact Queries
 */
export const contactApi = {
  /**
   * Submit a contact query
   */
  submit: async (data: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
  }) => {
    return apiRequest<{ id: number }>('/contact-queries', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

export default apiRequest

