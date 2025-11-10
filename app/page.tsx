"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { 
  Home as HomeIcon, 
  Building2, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Star,
  ArrowRight,
  TrendingUp,
  FileText,
  Award
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const router = useRouter()
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })
  const [residentialPosition, setResidentialPosition] = useState({ x: 0, y: 0 })
  const [commercialPosition, setCommercialPosition] = useState({ x: 0, y: 0 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  }

  // Scroll animation variants for different directions
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

  // 3D card effect handlers
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    
    setHeroPosition({ x: rotateY, y: rotateX })
  }

  const handleResidentialMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 12
    const rotateY = (centerX - x) / 12
    
    setResidentialPosition({ x: rotateY, y: rotateX })
  }

  const handleCommercialMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 12
    const rotateY = (centerX - x) / 12
    
    setCommercialPosition({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = (setter: (pos: { x: number; y: number }) => void) => {
    setter({ x: 0, y: 0 })
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "The application process was incredibly smooth and fast. I got approved in just 3 days!",
      rating: 5,
      avatar: "/placeholder-user.jpg"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "Best loan application experience I've ever had. The commercial loan process was straightforward and professional.",
      rating: 5,
      avatar: "/placeholder-user.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Investor",
      content: "I've used this portal for multiple properties. The interface is intuitive and saves me so much time.",
      rating: 5,
      avatar: "/placeholder-user.jpg"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level encryption protects your sensitive information"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get approved in as little as 24-48 hours with our streamlined process"
    },
    {
      icon: CheckCircle2,
      title: "Easy Application",
      description: "Simple, step-by-step forms that guide you through the entire process"
    },
    {
      icon: FileText,
      title: "Digital Documents",
      description: "Upload and manage all your documents in one secure place"
    }
  ]

  const stats = [
    { value: "50K+", label: "Applications Processed", icon: TrendingUp },
    { value: "98%", label: "Customer Satisfaction", icon: Award },
    { value: "24hrs", label: "Average Processing Time", icon: Clock },
    { value: "4.9/5", label: "Average Rating", icon: Star }
  ]

  const steps = [
    { number: "01", title: "Choose Loan Type", description: "Select residential or commercial loan application" },
    { number: "02", title: "Fill Application", description: "Complete the form with your information" },
    { number: "03", title: "Upload Documents", description: "Submit required documents securely" },
    { number: "04", title: "Get Approved", description: "Receive fast approval and funding" }
  ]

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.h1
            className="gradient-text text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Monarc inc
          </motion.h1>
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
            <motion.button 
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section with 3D Effect */}
      <motion.section
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            className="text-center lg:text-left"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-primary/20"
            >
              <span className="text-sm text-primary font-semibold">Fast • Secure • Reliable</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight">
              Your Dream
              <span className="gradient-text block">Loan Awaits</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mb-8">
              Experience the future of loan applications. Fast, secure, and designed with you in mind. 
              Get approved in days, not weeks.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.button
                onClick={() => router.push("/residential")}
                className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                className="px-8 py-4 rounded-lg glass-effect border border-border font-semibold hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Image Card */}
          <motion.div
            className="relative"
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={() => handleMouseLeave(setHeroPosition)}
          >
            <motion.div
              style={{
                rotateX: heroPosition.y,
                rotateY: heroPosition.x,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              <div className="glass-effect rounded-3xl p-8 shadow-2xl transform-gpu">
                <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/placeholder.jpg"
                    alt="Modern home"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Modern Living</h3>
                    <p className="text-sm opacity-90">Your perfect home is just one application away</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-effect rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">24hrs</div>
                    <div className="text-xs text-muted-foreground">Fast Approval</div>
                  </div>
                  <div className="glass-effect rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">98%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
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
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Features Section */}
        <motion.div className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={scrollFromDown}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a seamless loan application experience
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
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
                  className="glass-effect rounded-2xl p-6 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="relative h-32 w-full mb-4">
                      <Image
                        src={index % 2 === 0 ? "/placeholder.jpg" : "/placeholder.svg"}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="inline-block p-3 rounded-xl bg-primary/10 mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Image Gallery Section */}
        <motion.div className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={scrollFromDown}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how we've helped thousands achieve their dreams
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              const directions = [scrollFromLeft, scrollFromRight, scrollFromUp, scrollFromDown, scrollFromLeft, scrollFromRight]
              const direction = directions[index % directions.length]
              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={direction}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-2xl overflow-hidden relative group cursor-pointer"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={index % 3 === 0 ? "/placeholder.jpg" : index % 3 === 1 ? "/placeholder.svg" : "/placeholder-logo.png"}
                      alt={`Success story ${item}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-xl font-bold mb-1">Project {item}</h3>
                      <p className="text-sm opacity-90">Successfully funded and completed</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Loan Type Cards with 3D Effect */}
        <motion.div className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={scrollFromUp}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Choose Your Loan Type</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select between residential or commercial loan applications
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Residential Card with 3D */}
            <motion.div
              className="cursor-pointer group relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={scrollFromLeft}
              onMouseMove={handleResidentialMouseMove}
              onMouseLeave={() => handleMouseLeave(setResidentialPosition)}
              onClick={() => router.push("/residential")}
            >
              <motion.div
                style={{
                  rotateX: residentialPosition.y,
                  rotateY: residentialPosition.x,
                  transformStyle: "preserve-3d",
                }}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="glass-effect rounded-2xl p-8 h-full flex flex-col justify-between hover:border-primary/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 rounded-xl bg-primary/20 backdrop-blur-sm">
                    <HomeIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Residential Loan</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete Form 1003 for mortgage applications. Includes borrower info, employment, assets, and property details.
                  </p>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/placeholder.jpg"
                      alt="Residential home"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <motion.button
                  className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors group-hover:shadow-lg group-hover:shadow-primary/20 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Application
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Commercial Card with 3D */}
            <motion.div
              className="cursor-pointer group relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={scrollFromRight}
              onMouseMove={handleCommercialMouseMove}
              onMouseLeave={() => handleMouseLeave(setCommercialPosition)}
              onClick={() => router.push("/commercial")}
            >
              <motion.div
                style={{
                  rotateX: commercialPosition.y,
                  rotateY: commercialPosition.x,
                  transformStyle: "preserve-3d",
                }}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="glass-effect rounded-2xl p-8 h-full flex flex-col justify-between hover:border-accent/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 rounded-xl bg-accent/20 backdrop-blur-sm">
                    <Building2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Commercial Loan</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete ARC Form for business loans. Includes entity info, loan purpose, collateral, and authorized signers.
                  </p>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/placeholder.jpg"
                      alt="Commercial building"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <motion.button
                  className="w-full py-3 px-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors group-hover:shadow-lg group-hover:shadow-accent/20 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Application
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={scrollFromDown}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your loan approved
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => {
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
                  className="glass-effect rounded-2xl p-6 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-20 hover:opacity-30 transition-opacity">
                    <div className="relative h-full w-full">
                      <Image
                        src={index % 2 === 0 ? "/placeholder.jpg" : "/placeholder.svg"}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-6xl font-bold gradient-text opacity-20 absolute top-4 right-4 z-10">
                    {step.number}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{step.number.split("0")[1]}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={scrollFromUp}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
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
                  className="glass-effect rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <Image
                      src="/placeholder-logo.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="glass-effect rounded-3xl p-12 text-center mb-20 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={scrollScale}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50" />
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/placeholder.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the future of loan applications today.
            </p>
            <motion.button
              onClick={() => router.push("/residential")}
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="border-t border-border pt-12 pb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={scrollFromUp}
        >
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 gradient-text">Monarc inc</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for fast and secure loan applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Residential Loans</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Commercial Loans</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Refinancing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="/faqs" className="hover:text-foreground transition-colors">FAQs</a></li>
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
            © {new Date().getFullYear()} Monarc inc. All rights reserved. — For demo purposes only.
          </div>
        </motion.footer>
      </motion.section>
    </div>
  )
}
