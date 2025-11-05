"use client"
import { useState } from "react"
import FormSection from "@/components/form-section"

interface DocumentUploadProps {
  onComplete: (data: any) => void
  onSubmit: () => void
}

export default function DocumentUpload({ onComplete, onSubmit }: DocumentUploadProps) {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])

  const requiredDocuments = [
    "Business License/Registration",
    "Financial Statements (Last 2 Years)",
    "Tax Returns (Last 2-3 Years)",
    "Bank Statements (Last 3 Months)",
    "Articles of Incorporation/Organization",
    "Personal Financial Statement (Authorized Signer)",
    "Business Plan or Project Description",
    "Collateral Documentation",
  ]

  const handleFileSelect = (docName: string) => {
    if (!uploadedDocs.includes(docName)) {
      setUploadedDocs([...uploadedDocs, docName])
    }
  }

  const handleSubmitApplication = () => {
    onComplete(uploadedDocs)
    onSubmit()
  }

  return (
    <FormSection title="Document Upload" description="Upload required documents to complete your application">
      <div className="space-y-4">
        {requiredDocuments.map((doc) => (
          <div key={doc} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={doc}
                checked={uploadedDocs.includes(doc)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleFileSelect(doc)
                  } else {
                    setUploadedDocs(uploadedDocs.filter((d) => d !== doc))
                  }
                }}
                className="w-4 h-4 rounded border-border bg-input cursor-pointer"
              />
              <label htmlFor={doc} className="cursor-pointer flex-1">
                {doc}
              </label>
            </div>
            <span className={uploadedDocs.includes(doc) ? "text-accent text-sm" : "text-muted-foreground text-sm"}>
              {uploadedDocs.includes(doc) ? "✓ Uploaded" : "Pending"}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmitApplication}
        className="w-full mt-8 py-3 px-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploadedDocs.length < requiredDocuments.length}
      >
        Submit Application
      </button>
      <p className="text-sm text-muted-foreground text-center mt-4">
        {uploadedDocs.length}/{requiredDocuments.length} documents uploaded
      </p>
    </FormSection>
  )
}
