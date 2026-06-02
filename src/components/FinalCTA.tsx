import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function FinalCTA() {
  const hearts = [
    { id: 1, left: "8%", delay: 0, scale: 0.9 },
    { id: 2, left: "22%", delay: 1.8, scale: 1.4 },
    { id: 3, left: "38%", delay: 0.6, scale: 0.7 },
    { id: 4, left: "64%", delay: 2.2, scale: 1.2 },
    { id: 5, left: "78%", delay: 1.1, scale: 0.8 },
    { id: 6, left: "91%", delay: 3.4, scale: 1.5 },
  ];

  const bounceContainer = {
    hidden: { scale: 0.92, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="cta"
      className="bg-brand-dark relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden z-20"
    >
      {/* Pink Radial Overlay Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,143,0.18)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Infinitive Floating Hearts Loop Animation */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110%", opacity: 0, x: 0 }}
          animate={{
            y: "-110%",
            opacity: [0, 0.45, 0.45, 0],
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
          style={{
            left: heart.left,
            fontSize: `${heart.scale * 16}px`,
          }}
          className="absolute bottom-0 text-brand-secondary/25 pointer-events-none select-none z-10"
        >
          <Heart className="fill-current w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
      ))}

      {/* Main CTA Core Layout */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={bounceContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center"
        >
          <h2 className="font-serif text-3.5xl sm:text-4.5xl md:text-5.5xl font-extrabold text-white leading-tight mb-6">
            Your First Dollar Online Is <br />
            <span className="bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent bg-clip-text text-transparent">
              Closer Than You Think
            </span>
          </h2>

          <p className="text-white/80 text-base sm:text-lg max-w-xl font-light mb-10 leading-relaxed">
            Everything you need is curated inside our templates & guide kits. The only step left is yours to take.
          </p>

          <div className="w-full sm:w-auto">
            {/* Big Pink Button */}
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-2.5xl text-base sm:text-lg font-bold text-white bg-brand-primary shadow-xl hover:bg-brand-primary/95 hover:shadow-brand-primary/30 transition-all cursor-pointer"
            >
              Get the AI Income Starter Kit — $6 <ArrowRight className="ml-2 w-5.5 h-5.5" />
            </motion.a>
          </div>

          {/* Guarantee stamp info */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-brand-secondary/80 font-medium">
            <ShieldCheck className="w-4.5 h-4.5 text-brand-accent" />
            <span>30-day money-back guarantee. No questions asked.</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
