"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react"

export default function PrivacyPage() {
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

  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Personal identification information (name, email, phone number)",
        "Financial information necessary for loan processing",
        "Documentation required for loan applications",
        "Usage data and analytics to improve our services"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Process and evaluate your loan applications",
        "Communicate with you about your application status",
        "Improve our services and user experience",
        "Comply with legal and regulatory requirements"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Bank-level encryption for all data transmission",
        "Secure storage with industry-standard protocols",
        "Regular security audits and updates",
        "Access controls and authentication measures"
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access your personal information",
        "Request corrections to your data",
        "Request deletion of your information",
        "Opt-out of certain data processing activities"
      ]
    }
  ]

  const policies = [
    {
      title: "Data Collection",
      description: "We collect only the information necessary to process your loan application and provide our services. All data collection is done with your explicit consent."
    },
    {
      title: "Data Sharing",
      description: "We do not sell your personal information. We may share data with trusted partners and service providers only as necessary to process your application."
    },
    {
      title: "Data Retention",
      description: "We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion at any time."
    },
    {
      title: "Cookies & Tracking",
      description: "We use cookies and similar technologies to enhance your experience, analyze usage, and improve our services. You can manage cookie preferences in your browser."
    }
  ]

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
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            <motion.button 
              onClick={() => router.push("/about")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => router.push("/contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Contact
            </motion.button>
          </motion.div>
        </div>
      </nav>

      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollFromDown}
        >
          <div className="inline-block p-4 rounded-xl bg-primary/10 mb-6">
            <Shield className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          className="glass-effect rounded-3xl p-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollScale}
        >
          <h2 className="text-3xl font-bold mb-4">Introduction</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Monarc inc, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our loan 
            application platform. By using our services, you agree to the collection and use of information in accordance with 
            this policy.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {sections.map((section, index) => {
            const directions = [scrollFromLeft, scrollFromRight, scrollFromUp, scrollFromDown]
            const direction = directions[index % directions.length]
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={direction}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Policy Details */}
        <div className="space-y-6 mb-20">
          {policies.map((policy, index) => {
            const directions = [scrollFromLeft, scrollFromRight]
            const direction = directions[index % directions.length]
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={direction}
                className="glass-effect rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-3">{policy.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{policy.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          className="glass-effect rounded-3xl p-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollScale}
        >
          <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or our data practices, please contact us.
          </p>
          <motion.button
            onClick={() => router.push("/contact")}
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  )
}

