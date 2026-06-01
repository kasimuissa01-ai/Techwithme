import { Twitter, Youtube, Mail, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export default function Footer() {
  const currentYear = 2026;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-primary/25 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">
          
          {/* Logo & Tagline column (4 cols on md) */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <span className="font-serif text-2.5xl font-bold tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
              TechWithKathim
            </span>
            <p className="text-white/70 text-xs sm:text-sm font-light max-w-sm leading-relaxed">
              Real Income. Real Women. Real Results. Scaling financial freedom through faceless systems.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="mailto:kasimuissa@gmail.com"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links structure (8 columns split into 3 blocks) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Products column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-secondary mb-4">
                Products
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-light text-white/70">
                <li>
                  <a href="#products" className="hover:text-brand-primary transition-colors">
                    AI Income Starter Kit
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-brand-primary transition-colors">
                    Faceless Playbook
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-brand-primary transition-colors">
                    Burnout Reset
                  </a>
                </li>
                <li>
                  <a href="#free-guide" className="hover:text-brand-primary transition-colors">
                    Free Prompt Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Content column */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-secondary mb-4">
                Content
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-light text-white/70">
                <li>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    AI Tool Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    Affiliate Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    Faceless Content
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    Growth Strategies
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact column */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-secondary mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-light text-white/70">
                <li>
                  <a
                    href="mailto:kasimuissa@gmail.com"
                    className="hover:text-brand-primary transition-colors break-all font-mono"
                  >
                    kasimuissa@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-primary transition-colors">
                    Affiliate Disclosure
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom copyright list */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-white/50">
          <p>© {currentYear} TechWithKathim by Kasimu Issa. All rights reserved.</p>
          
          {/* Scroll to top micro button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: "#F43F8F", color: "#FFFFFF" }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 shadow transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
