import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Free Guide", href: "#free-guide" },
    { name: "Reviews", href: "#reviews" },
    { name: "Blog", href: "#blog" },
    { name: "FAQ", href: "#faq" },
    { name: "About", href: "#about" },
  ];

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/90 backdrop-blur-md shadow-lg border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                LinkaMarket
              </span>
            </a>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-brand-secondary text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-brand-primary shadow-md hover:bg-brand-primary/90 hover:shadow-lg transition-all"
            >
              Get the Kit <ArrowRight className="ml-2 w-4 h-4" />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-secondary p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-brand-dark border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-3 shadow-inner">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white/90 hover:text-brand-secondary px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3">
                <motion.a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center px-5 py-3 rounded-full text-base font-semibold text-white bg-brand-primary shadow-md"
                >
                  Get the Kit <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
