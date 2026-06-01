import { motion } from "motion/react";
import { PAIN_POINTS } from "../data";

export default function Problem() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="problem"
      className="bg-brand-surface py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark"
          >
            Does This Sound Like You?
          </motion.h2>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="h-1.5 w-16 bg-brand-primary rounded-full mx-auto mt-4"
          />
        </div>

        {/* Pain Point Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16"
        >
          {PAIN_POINTS.map((card, index) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_0_rgba(244,63,143,0.05)] border-l-4 border-brand-primary flex flex-col items-start relative overflow-hidden"
            >
              <div className="text-4xl mb-4 bg-brand-surface/50 w-12 h-12 rounded-full flex items-center justify-center">
                {card.emoji}
              </div>
              <p className="text-brand-text md:text-lg font-medium leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Concluding Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-brand-primary text-xl sm:text-2xl font-bold tracking-tight bg-white inline-block px-8 py-4 rounded-full shadow-sm border border-brand-primary/10">
            If you nodded at even ONE — keep reading. 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
