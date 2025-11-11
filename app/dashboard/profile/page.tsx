"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  ArrowLeft,
  Save,
  Edit
} from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    dateOfBirth: "1990-01-15"
  })
  const [isSaving, setIsSaving] = useState(false)

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

  const scrollScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
            <Image
              src="/white-logo.png"
              alt="Monarc inc"
              width={300}
              height={100}
              className="h-20 sm:h-24 w-auto"
              priority
            />
          </motion.button>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </motion.button>
          </div>
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
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={scrollFromLeft}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-3xl p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{formData.name}</h2>
              <p className="text-muted-foreground mb-6">{formData.email}</p>
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full px-4 py-2 rounded-lg glass-effect border border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit className="w-4 h-4" />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={scrollFromRight}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-effect rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg glass-effect border border-border">
                      {formData.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg glass-effect border border-border">
                      {formData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg glass-effect border border-border">
                      {formData.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg glass-effect border border-border">
                      {formData.address}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg glass-effect border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-lg glass-effect border border-border">
                      {formData.dateOfBirth}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <motion.button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

