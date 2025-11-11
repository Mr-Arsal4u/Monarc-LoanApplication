"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
  HelpCircle, 
  Book, 
  Video, 
  MessageCircle,
  Search,
  FileText,
  Phone,
  Mail
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

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

  const helpCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn how to begin your loan application",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: FileText,
      title: "Application Process",
      description: "Step-by-step guide to completing your application",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch helpful videos and walkthroughs",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: MessageCircle,
      title: "Live Support",
      description: "Chat with our support team in real-time",
      color: "bg-accent/10 text-accent"
    }
  ]

  const quickLinks = [
    { title: "How to start an application", link: "/faqs" },
    { title: "Required documents", link: "/faqs" },
    { title: "Application status", link: "/faqs" },
    { title: "Payment options", link: "/faqs" },
    { title: "Account management", link: "/faqs" },
    { title: "Technical support", link: "/contact" }
  ]

  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "Send Email",
      link: "/contact"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us Monday-Friday, 9 AM - 6 PM EST",
      action: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      action: "Start Chat",
      link: "/contact"
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
            <ThemeToggle />
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
            <HelpCircle className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Help <span className="gradient-text">Center</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions and get the support you need
          </p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={scrollScale}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {helpCategories.map((category, index) => {
            const directions = [scrollFromLeft, scrollFromRight, scrollFromUp, scrollFromDown]
            const direction = directions[index % directions.length]
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={direction}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-2xl p-6 text-center cursor-pointer"
                onClick={() => router.push("/faqs")}
              >
                <div className={`inline-block p-4 rounded-xl ${category.color} mb-4`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Links */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollFromUp}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => {
              const directions = [scrollFromLeft, scrollFromRight, scrollFromDown]
              const direction = directions[index % directions.length]
              return (
                <motion.a
                  key={index}
                  href={link.link}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={direction}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="glass-effect rounded-xl p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm">{link.title}</span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Support Options */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollFromDown}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Get Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => {
              const directions = [scrollFromLeft, scrollFromRight, scrollFromDown]
              const direction = directions[index % directions.length]
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={direction}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="inline-block p-4 rounded-xl bg-primary/10 mb-4">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <motion.a
                    href={option.link}
                    className="text-primary font-semibold hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    {option.action}
                  </motion.a>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass-effect rounded-3xl p-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollScale}
        >
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <motion.button
            onClick={() => router.push("/contact")}
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  )
}

