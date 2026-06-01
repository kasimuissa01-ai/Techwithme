import { motion } from "motion/react";
import { Star } from "lucide-react";
import { TESTIMONIALS, TestimonialItem } from "../data";

export default function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Helper to extract initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section
      id="reviews"
      className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          >
            💬 Real Proof
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3.5xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A2E]"
          >
            Real Women. Real Results.
          </motion.h2>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="h-1.5 w-12 bg-brand-primary rounded-full mx-auto mt-4"
          />
        </div>

        {/* Testimonials Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((review: TestimonialItem) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-brand-surface rounded-2.5xl p-8 sm:p-10 shadow-sm border border-brand-primary/5 flex flex-col justify-between relative relative"
            >
              {/* Massive stylish Pink Quote Mark */}
              <div className="absolute top-5 right-6 text-7xl font-serif text-brand-primary/15 select-none leading-none">
                “
              </div>

              {/* Review Text */}
              <div className="relative z-10">
                {/* 5 Stars Rating indicators */}
                <div className="flex items-center gap-1 text-brand-accent mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                
                <p className="font-sans text-brand-text/90 italic text-base leading-relaxed font-light">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Info footer */}
              <div className="mt-8 pt-6 border-t border-brand-primary/10 flex items-center gap-4 relative z-10">
                {/* Avatar with initials */}
                <div className="w-11 h-11 rounded-full bg-brand-dark flex items-center justify-center font-bold text-sm text-brand-secondary">
                  {getInitials(review.author)}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-brand-dark">
                    {review.author}
                  </h4>
                  <p className="text-xs text-brand-primary font-medium mt-0.5">
                    {review.location}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
