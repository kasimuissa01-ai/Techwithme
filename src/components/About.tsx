import { motion } from "motion/react";
import { Check } from "lucide-react";

export default function About() {
  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
    },
  };

  const trustBadges = [
    "2 Ebooks Published",
    "1,200+ Students Worldwide",
    "Featured Faceless Creator"
  ];

  return (
    <section
      id="about"
      className="bg-brand-surface/40 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Left Column: Framed Portrait Image (5 columns) */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 relative flex justify-center lg:justify-start"
          >
            {/* The offset pink background frame border */}
            <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-6 w-[280px] sm:w-[320px] aspect-[4/5] rounded-3xl border-2 border-brand-primary/50 translate-x-2 translate-y-2 z-0 hidden sm:block" />

            {/* Main Picture Block */}
            <div className="relative w-[280px] sm:w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-brand-primary/10 bg-white z-10">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Kasimu Issa, Founder & creator behind TechWithKathim"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              {/* Overlay with subtle author credit */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-6 text-white text-left">
                <span className="text-xs uppercase tracking-widest text-brand-secondary font-semibold font-mono">Founder Profile</span>
                <h4 className="font-serif text-lg font-bold">Kasimu Issa</h4>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Copy & Badges (7 columns) */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Tag label */}
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-2">
              ✨ MEET THE FOUNDER
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-4.5xl font-extrabold text-[#1A1A2E] leading-tight mb-2">
              Kasimu Issa
            </h2>
            <p className="text-brand-primary text-sm sm:text-base font-semibold tracking-wide uppercase mb-6">
              Creator, Strategist & Digital Income Coach
            </p>

            <p className="text-brand-text/80 text-base leading-relaxed font-light mb-6">
              I built this system after years of questioning, analyzing, and testing what actually works for modern women who want substantial online income without the crushing overwhelm.
            </p>
            
            <p className="text-brand-text/80 text-base leading-relaxed font-light mb-8">
              Everything in these kits are the exact step-by-step systems, prompt sheets, and automated workflows I utilize myself on a daily basis. My goal is to save you the 100+ hours of trial-and-error roadblocks so you can head straight to your first checkout dollar.
            </p>

            {/* Simple Trust badges list */}
            <div className="w-full space-y-3.5 mb-2">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-brand-primary/10 text-brand-dark text-sm sm:text-base font-semibold w-full sm:w-auto sm:mr-3 shadow-sm hover:border-brand-primary/20 transition-all"
                >
                  <Check className="w-4.5 h-4.5 text-brand-primary flex-shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
