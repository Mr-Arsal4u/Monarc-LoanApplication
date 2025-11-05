"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

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
            Loan Portal
          </motion.h1>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.main
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl sm:text-6xl font-bold text-balance mb-6">Choose Your Loan Type</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Select between residential or commercial loan applications. Our streamlined process makes it easy to apply.
          </p>
        </motion.div>

        {/* Loan Type Cards */}
        <motion.div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={containerVariants}>
          {/* Residential Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            onClick={() => router.push("/residential")}
            className="cursor-pointer group"
          >
            <div className="glass-effect rounded-2xl p-8 h-full flex flex-col justify-between hover:border-primary/50 transition-colors">
              <div>
                <div className="mb-6 inline-block p-3 rounded-xl bg-primary/10">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4 2m-8-4l4-2"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Residential Loan</h3>
                <p className="text-muted-foreground mb-4">
                  Complete Form 1003 for mortgage applications. Includes borrower info, employment, assets, and property
                  details.
                </p>
              </div>
              <motion.button
                className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors group-hover:shadow-lg group-hover:shadow-primary/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Application
              </motion.button>
            </div>
          </motion.div>

          {/* Commercial Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            onClick={() => router.push("/commercial")}
            className="cursor-pointer group"
          >
            <div className="glass-effect rounded-2xl p-8 h-full flex flex-col justify-between hover:border-accent/50 transition-colors">
              <div>
                <div className="mb-6 inline-block p-3 rounded-xl bg-accent/10">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Commercial Loan</h3>
                <p className="text-muted-foreground mb-4">
                  Complete ARC Form for business loans. Includes entity info, loan purpose, collateral, and authorized
                  signers.
                </p>
              </div>
              <motion.button
                className="w-full py-3 px-4 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors group-hover:shadow-lg group-hover:shadow-accent/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Application
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer className="text-center mt-20 text-muted-foreground text-sm" variants={itemVariants}>
          © Loan Portal v0 — For demo purposes only.
        </motion.footer>
      </motion.main>
    </div>
  )
}
