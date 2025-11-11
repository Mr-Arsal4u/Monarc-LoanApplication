"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
  HelpCircle, 
  ChevronDown,
  Search
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function FAQsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I start a loan application?",
          answer: "To start a loan application, click on 'Get Started' on our homepage and choose between Residential or Commercial loan types. You'll be guided through a step-by-step process to complete your application."
        },
        {
          question: "What documents do I need to prepare?",
          answer: "For residential loans, you'll need identification, proof of income, employment verification, bank statements, and property information. For commercial loans, you'll need business documents, financial statements, and entity information. The application will guide you through all required documents."
        },
        {
          question: "Is there a fee to apply?",
          answer: "No, there is no fee to submit your loan application through our platform. Any fees associated with the loan will be clearly disclosed during the application process."
        }
      ]
    },
    {
      category: "Application Process",
      questions: [
        {
          question: "How long does the application process take?",
          answer: "The initial application can be completed in 15-30 minutes. After submission, our team typically reviews and processes applications within 24-48 hours. You'll receive updates via email throughout the process."
        },
        {
          question: "Can I save my application and continue later?",
          answer: "Yes, you can save your progress at any time and return to complete your application later. Your information will be securely stored and you can access it by logging back into your account."
        },
        {
          question: "What happens after I submit my application?",
          answer: "After submission, you'll receive a confirmation email. Our team will review your application, verify documents, and may contact you for additional information. You'll be notified of the decision via email and can check your application status in your account dashboard."
        },
        {
          question: "Can I edit my application after submission?",
          answer: "Once submitted, you cannot directly edit your application. However, you can contact our support team to request changes or provide additional information. We'll work with you to update your application as needed."
        }
      ]
    },
    {
      category: "Loan Types",
      questions: [
        {
          question: "What's the difference between residential and commercial loans?",
          answer: "Residential loans are for personal property purchases (homes, condos) and follow Form 1003 standards. Commercial loans are for business purposes, investment properties, or commercial real estate and follow ARC form standards. Each has different requirements and documentation needs."
        },
        {
          question: "What loan amounts are available?",
          answer: "Loan amounts vary based on your qualifications, property type, and loan program. Our platform supports a wide range of loan amounts. After you complete your application, we'll provide personalized loan options based on your financial profile."
        },
        {
          question: "What interest rates can I expect?",
          answer: "Interest rates depend on various factors including your credit score, loan amount, property type, and market conditions. Rates are determined during the application review process and will be clearly communicated before you commit to the loan."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How secure is my personal information?",
          answer: "We use bank-level encryption and security measures to protect your information. All data is transmitted securely and stored in compliance with industry standards. Please review our Privacy Policy for detailed information about our security practices."
        },
        {
          question: "How do I reset my password?",
          answer: "If you've forgotten your password, click on 'Forgot Password' on the login page. You'll receive an email with instructions to reset your password securely."
        },
        {
          question: "Can I have multiple applications?",
          answer: "Yes, you can submit multiple loan applications. Each application is processed independently. You can manage all your applications from your account dashboard."
        }
      ]
    },
    {
      category: "Support & Contact",
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our support team via email at contact@monarcinc.com, phone at +1 (555) 123-4567, or through the contact form on our website. Our support hours are Monday-Friday, 9 AM - 6 PM EST."
        },
        {
          question: "What if I have technical issues with the application?",
          answer: "If you encounter any technical issues, please contact our support team immediately. We're available to help troubleshoot and ensure you can complete your application successfully."
        },
        {
          question: "Do you offer application assistance?",
          answer: "Yes, our support team is available to help guide you through the application process. Don't hesitate to reach out if you have questions or need assistance at any step."
        }
      ]
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  let questionIndex = 0

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
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to the most common questions about our loan application process
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
                placeholder="Search FAQs..."
                className="w-full pl-12 pr-4 py-4 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8 mb-20">
          {filteredFAQs.map((category, categoryIndex) => {
            const direction = categoryIndex % 2 === 0 ? scrollFromLeft : scrollFromRight
            return (
              <motion.div
                key={categoryIndex}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={direction}
                className="glass-effect rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const currentIndex = questionIndex++
                    const isOpen = openIndex === currentIndex
                    return (
                      <motion.div
                        key={faqIndex}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.1 }}
                        variants={scrollFromDown}
                        className="border border-border rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFAQ(currentIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                        >
                          <span className="font-semibold pr-4">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          </motion.div>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? "auto" : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 text-muted-foreground border-t border-border">
                            {faq.answer}
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          className="glass-effect rounded-3xl p-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={scrollScale}
        >
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
            <motion.button
              onClick={() => router.push("/help")}
              className="px-8 py-4 rounded-lg glass-effect border border-border font-semibold hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Help Center
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}

