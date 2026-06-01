import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-brand-surface py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading with SEO-optimized terms in markup */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          >
            💡 Got Questions?
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A2E] leading-tight mb-4">
            Faceless AI Income: Frequently Asked Questions
          </h2>
          <p className="text-[#4F4F4F] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Everything you need to know about setting up automated, faceless digital systems to build real online income safely.
          </p>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="h-1.5 w-12 bg-brand-primary rounded-full mx-auto mt-6"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-brand-primary/10 overflow-hidden shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-brand-dark pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-brand-primary"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-brand-surface text-brand-text/80 text-sm sm:text-base leading-relaxed font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
