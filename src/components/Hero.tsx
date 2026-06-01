import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600"
          alt="Woman working on laptop, warm aesthetic"
          className="w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 via-transparent to-brand-dark/50" />
      </div>

      {/* Main Hero Contents */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated Pulsing Trust Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: 1,
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              },
              opacity: { duration: 0.5 },
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-secondary text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm mb-6 sm:mb-8"
          >
            <span>✨</span> Trusted by Women in 40+ Countries
          </motion.div>

          {/* Headline (Playfair Display) */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.12] mb-6"
          >
            Build Your Online Income{" "}
            <span className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent bg-clip-text text-transparent block sm:inline">
              Without Showing Your Face
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 text-brand-surface/90"
          >
            Step-by-step AI-powered system for women who want real results — <span className="text-brand-accent font-medium">not theory</span>. Start in 30 days.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <motion.a
              href="#products"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white bg-brand-primary shadow-lg hover:bg-brand-primary/90 hover:shadow-brand-primary/20 hover:shadow-2xl transition-all"
            >
              Get the Starter Kit — $12 <ArrowRight className="ml-2 w-5 h-5" />
            </motion.a>

            <motion.a
              href="#free-guide"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, borderColor: "#FF8FAB" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Download Free Guide
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <a href="#social-proof" className="group flex flex-col items-center text-white/50 hover:text-brand-secondary transition-colors">
          <span className="text-xs uppercase tracking-widest font-mono mb-1">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
