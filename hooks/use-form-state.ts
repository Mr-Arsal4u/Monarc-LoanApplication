"use client"

import type React from "react"

import { useState, useCallback } from "react"
import type { FormErrors } from "@/lib/form-state"

interface UseFormStateProps<T> {
  initialValues: T
  onSubmit: (values: T) => void | Promise<void>
  validate?: (values: T) => FormErrors
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormStateProps<T>) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target
      const inputValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

      setValues((prev) => ({
        ...prev,
        [name]: inputValue,
      }))

      if (touched[name] && validate) {
        const newErrors = validate({ ...values, [name]: inputValue })
        setErrors(newErrors)
      }
    },
    [values, touched, validate],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name } = e.target
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }))

      if (validate) {
        const newErrors = validate(values)
        setErrors(newErrors)
      }
    },
    [values, validate],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (validate) {
        const newErrors = validate(values)
        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
          return
        }
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (error) {
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit],
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const setFieldValue = useCallback((field: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setErrors,
  }
}
