"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Heart,
  Shield,
  Lightbulb,
  Rocket
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export default function AboutPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
      transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } 
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

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize the loan application process, making it fast, secure, and accessible for everyone."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We put our customers at the center of everything we do, ensuring exceptional service and support."
    },
    {
      icon: Shield,
      title: "Security & Trust",
      description: "Bank-level encryption and security measures to protect your sensitive information."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly evolving our platform with cutting-edge technology and user-friendly design."
    }
  ]

  const milestones = [
    { year: "2020", title: "Founded", description: "Monarc inc was established with a vision to transform lending" },
    { year: "2021", title: "10K Users", description: "Reached our first 10,000 satisfied customers" },
    { year: "2022", title: "Expansion", description: "Launched commercial loan services" },
    { year: "2023", title: "50K+ Users", description: "Milestone of 50,000+ successful applications" },
    { year: "2024", title: "Innovation", description: "Introduced AI-powered loan processing" }
  ]

  const team = [
    { 
      name: "Leadership Team", 
      role: "Vision & Strategy", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=90" 
    },
    { 
      name: "Tech Team", 
      role: "Innovation & Development", 
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=90" 
    },
    { 
      name: "Support Team", 
      role: "Customer Success", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=90" 
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.button 
              onClick={() => router.push("/about")}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => router.push("/contact")}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Contact
            </motion.button>
            <motion.button 
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <ThemeToggle />
          </motion.div>
        </div>
      </nav>

      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            About <span className="gradient-text">Monarc inc</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing the loan application experience with cutting-edge technology, 
            exceptional service, and a commitment to your financial success.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="glass-effect rounded-3xl p-12 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Founded in 2020, Monarc inc was born from a simple idea: loan applications 
                  shouldn't be complicated. We've built a platform that combines the power of 
                  modern technology with a human-centered approach to help thousands of people 
                  achieve their financial goals.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we're proud to be a trusted partner for both residential and commercial 
                  loan applicants, processing thousands of applications with speed, security, and 
                  exceptional service.
                </p>
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=90"
                  alt="Loan operators and real estate professionals"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={scrollFromUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const directions = [scrollFromLeft, scrollFromRight, scrollFromUp, scrollFromDown]
              const direction = directions[index % directions.length]
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isMounted ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                  variants={direction}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="inline-block p-4 rounded-xl bg-primary/10 mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={scrollFromDown}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our growth
            </p>
          </motion.div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {milestones.map((milestone, index) => {
              const direction = index % 2 === 0 ? scrollFromLeft : scrollFromRight
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isMounted ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                  variants={direction}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-effect rounded-2xl p-6 flex items-center gap-6"
                >
                  <div className="text-4xl font-bold gradient-text min-w-[100px]">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            variants={scrollFromUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => {
              const directions = [scrollFromLeft, scrollFromRight, scrollFromDown]
              const direction = directions[index % directions.length]
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isMounted ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                  variants={direction}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden"
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={scrollScale}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Join Us on Our Journey</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of loan applications with Monarc inc.
            </p>
            <motion.button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}

