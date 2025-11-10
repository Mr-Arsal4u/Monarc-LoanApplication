"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
  FileText, 
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Eye
} from "lucide-react"

export default function RequestsPage() {
  const router = useRouter()
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)

  // Scroll animation variants
  const scrollFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const scrollFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const scrollFromDown = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  // Static data
  const requests = [
    {
      id: 1,
      type: "Residential",
      amount: "$250,000",
      status: "Approved",
      date: "2024-01-15",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
      statusIcon: CheckCircle2,
      propertyAddress: "123 Main Street, New York, NY 10001",
      loanPurpose: "Purchase",
      interestRate: "4.5%"
    },
    {
      id: 2,
      type: "Commercial",
      amount: "$500,000",
      status: "Pending",
      date: "2024-01-20",
      statusColor: "text-yellow-500",
      statusBg: "bg-yellow-500/10",
      statusIcon: Clock,
      propertyAddress: "456 Business Ave, Los Angeles, CA 90001",
      loanPurpose: "Refinance",
      interestRate: "5.2%"
    },
    {
      id: 3,
      type: "Residential",
      amount: "$180,000",
      status: "Pending",
      date: "2024-01-22",
      statusColor: "text-yellow-500",
      statusBg: "bg-yellow-500/10",
      statusIcon: Clock,
      propertyAddress: "789 Home Lane, Chicago, IL 60601",
      loanPurpose: "Purchase",
      interestRate: "4.8%"
    },
    {
      id: 4,
      type: "Commercial",
      amount: "$750,000",
      status: "Rejected",
      date: "2024-01-10",
      statusColor: "text-red-500",
      statusBg: "bg-red-500/10",
      statusIcon: XCircle,
      propertyAddress: "321 Office Plaza, Miami, FL 33101",
      loanPurpose: "Purchase",
      interestRate: "N/A"
    },
    {
      id: 5,
      type: "Residential",
      amount: "$320,000",
      status: "Approved",
      date: "2024-01-18",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
      statusIcon: CheckCircle2,
      propertyAddress: "654 Suburban Drive, Seattle, WA 98101",
      loanPurpose: "Refinance",
      interestRate: "4.3%"
    }
  ]

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this request?")) {
      console.log("Delete request:", id)
      // In real app, this would call an API
    }
  }

  const getStatusBadge = (request: typeof requests[0]) => {
    const Icon = request.statusIcon
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${request.statusColor} ${request.statusBg}`}>
        <Icon className="w-4 h-4" />
        {request.status}
      </span>
    )
  }

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => router.push("/")}
            className="gradient-text text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Monarc inc
          </motion.button>
          <motion.button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </motion.button>
        </div>
      </nav>

      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Your <span className="gradient-text">Requests</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            View and manage all your loan applications
          </p>
        </motion.div>

        {/* Requests Table */}
        <motion.div
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollFromDown}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold">ID</th>
                <th className="text-left py-4 px-4 font-semibold">Type</th>
                <th className="text-left py-4 px-4 font-semibold">Amount</th>
                <th className="text-left py-4 px-4 font-semibold">Property</th>
                <th className="text-left py-4 px-4 font-semibold">Date</th>
                <th className="text-left py-4 px-4 font-semibold">Status</th>
                <th className="text-left py-4 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                const directions = [scrollFromLeft, scrollFromRight, scrollFromDown]
                const direction = directions[index % directions.length]
                return (
                  <motion.tr
                    key={request.id}
                    initial="hidden"
                    animate="visible"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={direction}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-4 px-4">{request.id}</td>
                    <td className="py-4 px-4 font-medium">{request.type}</td>
                    <td className="py-4 px-4 font-bold">{request.amount}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground max-w-xs truncate">
                      {request.propertyAddress}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{request.date}</td>
                    <td className="py-4 px-4">
                      {getStatusBadge(request)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => setSelectedRequest(request.id)}
                          className="p-2 rounded-lg glass-effect border border-border hover:border-primary/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => router.push(`/dashboard/requests/${request.id}/edit`)}
                          className="p-2 rounded-lg glass-effect border border-border hover:border-primary/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(request.id)}
                          className="p-2 rounded-lg glass-effect border border-border hover:border-red-500/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Request Details Modal */}
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {(() => {
                const request = requests.find(r => r.id === selectedRequest)
                if (!request) return null
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Request Details</h2>
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Request ID</label>
                        <p className="font-semibold">#{request.id}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Loan Type</label>
                        <p className="font-semibold">{request.type}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Amount</label>
                        <p className="font-semibold">{request.amount}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Property Address</label>
                        <p className="font-semibold">{request.propertyAddress}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Loan Purpose</label>
                        <p className="font-semibold">{request.loanPurpose}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Interest Rate</label>
                        <p className="font-semibold">{request.interestRate}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Status</label>
                        <div className="mt-2">{getStatusBadge(request)}</div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Date</label>
                        <p className="font-semibold">{request.date}</p>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </motion.section>
    </div>
  )
}

