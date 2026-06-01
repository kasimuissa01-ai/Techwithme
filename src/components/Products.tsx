import { motion } from "motion/react";
import { Check, Flame } from "lucide-react";
import { PRODUCTS, ProductItem } from "../data";

export default function Products() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="products"
      className="bg-[#FFFFFF]/95 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          >
            🔥 Starter Kits
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3.5xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary"
          >
            Choose Your AI Faceless Starter Kit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 text-brand-text/70 max-w-lg mx-auto font-light text-sm sm:text-base"
          >
            Affordable digital tools with standard license parameters. Grab them instantly and launch within hours.
          </motion.p>
        </div>

        {/* 3 Product Cards Responsive Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto"
        >
          {PRODUCTS.map((pkg: ProductItem) => {
            const isFeatured = pkg.featured;
            
            // Build dynamic class parameters depending on product style configuration
            let cardBg = "bg-white border border-brand-primary/10 text-brand-text shadow-sm";
            let priceText = "text-brand-dark";
            let descText = "text-brand-text/80";
            let bulletColor = "text-brand-primary";
            let badgeBg = "bg-brand-primary text-white";
            let actionBtn = "bg-brand-dark hover:bg-brand-dark/95 text-white active:bg-brand-dark";

            if (pkg.theme === "pink") {
              cardBg = "bg-gradient-to-br from-brand-primary via-[#E02D7A] to-[#C91F67] text-white shadow-xl shadow-brand-primary/20 scale-100 sm:scale-[1.03]";
              priceText = "text-white";
              descText = "text-white/90";
              bulletColor = "text-brand-accent";
              actionBtn = "bg-white text-brand-primary hover:bg-brand-surface hover:text-brand-primary font-bold shadow-md";
            } else if (pkg.theme === "navy") {
              cardBg = "bg-brand-dark text-white shadow-lg border border-white/5";
              priceText = "text-white";
              descText = "text-white/80";
              bulletColor = "text-brand-secondary";
              actionBtn = "bg-brand-primary hover:bg-brand-primary/95 text-white shadow-brand-primary/20";
            } else if (pkg.theme === "white") {
              bulletColor = "text-brand-accent";
              badgeBg = "bg-brand-accent text-brand-dark";
              actionBtn = "bg-brand-primary hover:bg-brand-primary/95 text-white";
            }

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`rounded-3.5xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden h-full group ${cardBg}`}
              >
                {/* Floating shine animation effect for Featured */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-accent via-brand-secondary to-brand-primary" />
                )}

                {/* Card Top Block */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {/* Badge */}
                    {isFeatured ? (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-accent text-brand-dark font-sans text-xs font-bold rounded-full tracking-wide uppercase shadow"
                      >
                        <Flame className="w-3.5 h-3.5 fill-brand-dark" /> POPULAR KIT
                      </motion.div>
                    ) : (
                      <span className="h-6" /> // spacer
                    )}
                  </div>

                  {/* Header Title */}
                  <h3 className="font-serif text-2.5xl font-extrabold leading-tight mb-2">
                    {pkg.title}
                  </h3>

                  {/* Pricing Frame */}
                  <div className="flex items-baseline gap-2.5 mb-6">
                    <span className={`text-3.5xl font-serif font-extrabold ${priceText}`}>
                      {pkg.price}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm font-medium line-through opacity-70">
                        {pkg.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Description text */}
                  <p className={`text-sm sm:text-base font-light leading-relaxed mb-8 ${descText}`}>
                    {pkg.description}
                  </p>
                </div>

                {/* Card Bottom Block */}
                <div className="mt-auto">
                  {/* Features Bullet List */}
                  <ul className="space-y-4 mb-8 border-t border-current/10 pt-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm font-medium gap-3">
                        <Check className={`w-4.5 h-4.5 flex-shrink-0 mt-0.5 ${bulletColor}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Call to action button */}
                  <motion.a
                    href={pkg.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block w-full py-4 px-6 rounded-2xl text-center text-sm font-bold tracking-wide transition-all ${actionBtn}`}
                  >
                    {pkg.buttonText}
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
