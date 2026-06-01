import { motion } from "motion/react";
import { Check } from "lucide-react";
import { TIMELINE_STEPS } from "../data";

export default function Solution() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const stepVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
      id="solution"
      className="bg-brand-dark text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Intro Section Headline */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Our Simple <span className="text-brand-secondary">4-Step Faceless System</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-white/70 max-w-xl mx-auto font-light text-base sm:text-lg"
          >
            How thousands of women worldwide are stepping into financial independence without stepping in front of a lens.
          </motion.p>
        </div>

        {/* Structured Timeline + Mockup Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          
          {/* Vertical Timeline Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 sm:space-y-12 relative"
          >
            {/* Thread line behind the steps */}
            <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-primary/40 via-brand-accent/45 to-emerald-500/10 hidden sm:block" />

            {TIMELINE_STEPS.map((step) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="flex items-start gap-4 sm:gap-6 relative group"
              >
                {/* Step Circle Counter Indicator */}
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold font-serif text-brand-dark text-base sm:text-lg shadow-lg ${step.circleColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.id}
                </div>

                {/* Step Details Column */}
                <div className="flex-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    {step.title}
                    <span className="h-px bg-white/10 flex-1 hidden md:block" />
                  </h3>
                  <p className="mt-2 text-white/75 text-sm sm:text-base leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Glowing Mockup Image Right Side */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative lg:ml-auto max-w-md w-full mx-auto"
          >
            {/* Warm Pink Visual Ambient Backdrop Pulse glow */}
            <div className="absolute -inset-1 sm:-inset-1.5 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-secondary opacity-30 blur-2xl animate-pulse" />

            <div className="relative bg-brand-dark/50 backdrop-blur-sm rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&q=80&w=600&h=500"
                alt="Digital product mockup planner, elegant warm flat lay representation"
                className="w-full h-auto object-cover border-b border-white/10"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">
                  <span>💎</span> INSTANT DIGITAL DOWNLOAD
                </div>
                <h4 className="font-serif text-xl font-bold text-white">
                  The Kathim Faceless Kit Mockup
                </h4>
                <p className="text-white/60 text-xs sm:text-sm font-light mt-2">
                  Access 50+ templates & step-by-step guides beautifully formatted for immediate offline editing & print output.
                </p>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/50">Release Edition: v2.4</span>
                  <span className="text-sm font-semibold text-brand-secondary flex items-center gap-1">
                    <Check className="w-4 h-4 text-brand-accent" /> Premium Quality Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
