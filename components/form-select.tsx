import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
        <select
          ref={ref}
          className={cn(
            "w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
            error && "border-destructive focus:ring-destructive/50",
            className,
          )}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
)

FormSelect.displayName = "FormSelect"

export default FormSelect
