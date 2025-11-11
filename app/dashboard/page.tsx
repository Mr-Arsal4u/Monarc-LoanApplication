"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
  User, 
  FileText, 
  LogOut, 
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export default function DashboardPage() {
  const router = useRouter()
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

  const scrollFromUp = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0, 
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

  const scrollScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  // Static data
  const stats = [
    { label: "Total Requests", value: "5", icon: FileText, color: "text-primary" },
    { label: "Pending", value: "2", icon: Clock, color: "text-yellow-500" },
    { label: "Approved", value: "2", icon: CheckCircle2, color: "text-green-500" },
    { label: "Rejected", value: "1", icon: XCircle, color: "text-red-500" }
  ]

  const recentRequests = [
    {
      id: 1,
      type: "Residential",
      amount: "$250,000",
      status: "Approved",
      date: "2024-01-15",
      statusColor: "text-green-500"
    },
    {
      id: 2,
      type: "Commercial",
      amount: "$500,000",
      status: "Pending",
      date: "2024-01-20",
      statusColor: "text-yellow-500"
    },
    {
      id: 3,
      type: "Residential",
      amount: "$180,000",
      status: "Pending",
      date: "2024-01-22",
      statusColor: "text-yellow-500"
    }
  ]

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between relative">
          <motion.button
            onClick={() => router.push("/")}
            className="flex items-center flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo priority />
          </motion.button>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => router.push("/dashboard/requests")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="w-4 h-4" />
              Your Requests
            </motion.button>
            <motion.button
              onClick={() => router.push("/dashboard/profile")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <User className="w-4 h-4" />
              Profile
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Section */}
        <motion.div
          className="mb-12"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome back, <span className="gradient-text">John Doe</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your loan applications and track your progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const directions = [scrollFromLeft, scrollFromRight, scrollFromUp, scrollFromDown]
            const direction = directions[index % directions.length]
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={direction}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollFromDown}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-effect rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.button
                onClick={() => router.push("/residential")}
                className="glass-effect rounded-xl p-6 text-left hover:border-primary/50 transition-colors flex items-center justify-between group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">New Residential Loan</h3>
                  <p className="text-sm text-muted-foreground">Start a new residential loan application</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => router.push("/commercial")}
                className="glass-effect rounded-xl p-6 text-left hover:border-primary/50 transition-colors flex items-center justify-between group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">New Commercial Loan</h3>
                  <p className="text-sm text-muted-foreground">Start a new commercial loan application</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Recent Requests */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollFromUp}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-effect rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Requests</h2>
              <motion.button
                onClick={() => router.push("/dashboard/requests")}
                className="text-sm text-primary hover:underline flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="space-y-4">
              {recentRequests.map((request, index) => {
                const directions = [scrollFromLeft, scrollFromRight, scrollFromDown]
                const direction = directions[index % directions.length]
                return (
                  <motion.div
                    key={request.id}
                    initial="hidden"
                    animate="visible"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={direction}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass-effect rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">{request.type} Loan</h3>
                        <p className="text-sm text-muted-foreground">{request.amount} • {request.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${request.statusColor}`}>{request.status}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Info Card - Need Help Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollScale}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="glass-effect rounded-3xl p-8 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=90"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our support team is here to assist you with any questions about your loan applications.
                </p>
                <motion.button
                  onClick={() => router.push("/contact")}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Support
                </motion.button>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=90"
                  alt="Customer support and assistance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}

