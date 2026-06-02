import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Award, Clock, Sparkles } from "lucide-react";
import { addWaitlistSubscriber } from "../firebase";
import { ProductItem } from "../data";

interface WaitlistModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function WaitlistModal({ product, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Clean form states on product change
  useEffect(() => {
    if (product) {
      setEmail("");
      setName("");
      setSubmitted(false);
      setErrorMsg("");
    }
  }, [product]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await addWaitlistSubscriber(cleanEmail, name, `waitlist-${product.id}`);
      if (response.success) {
        setSubmitted(true);
      } else {
        setErrorMsg("Failed to join the waitlist. Please verify your connection and try again.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="waitlist-modal-container">
        {/* Soft dark elegant background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
          id="waitlist-modal-backdrop"
        />

        {/* Modal Sheet Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="relative bg-white rounded-3.5xl overflow-hidden max-w-4xl w-full shadow-2xl z-10 border border-brand-primary/10 flex flex-col md:flex-row h-auto max-h-[90vh]"
          id="waitlist-modal-dialog"
        >
          {/* Left Decorative Image Column (Hidden on tiny mobile) */}
          <div className="w-full md:w-[42%] bg-brand-surface relative overflow-hidden flex flex-col justify-between p-8 text-brand-dark md:border-r border-brand-primary/5 min-h-[160px] md:min-h-full">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800&h=1000"
                alt="Aesthetic workspace with smartphone, cup of coffee, and notebooks"
                className="w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/70 to-transparent" />
            </div>

            {/* Left Top Brand Details */}
            <div className="relative z-10 flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full mb-3">
                🔒 Private Waitlist
              </span>
              <h4 className="font-serif text-2xl font-extrabold text-[#1A1A2E] leading-tight">
                Perfecting The {product.title}
              </h4>
            </div>

            {/* Bottom features indicators (Desktop only) */}
            <div className="relative z-10 hidden md:block space-y-4">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-brand-primary/5">
                <Clock className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <div className="text-left">
                  <span className="block text-xs font-semibold text-brand-dark">Releasing In Days</span>
                  <span className="block text-[10px] text-brand-text/75">Finalizing step-by-step videos</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-brand-primary/5">
                <Award className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                <div className="text-left">
                  <span className="block text-xs font-semibold text-brand-dark">Massive VIP Price Voucher</span>
                  <span className="block text-[10px] text-brand-text/75">Pay just $6 instead of $47</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Core Details Column */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center relative overflow-y-auto">
            {/* Upper Right Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-brand-surface text-brand-dark/50 hover:text-brand-dark rounded-full hover:bg-brand-primary/10 transition-colors cursor-pointer"
              id="close-waitlist-modal-btn"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Verification/Registration Success Block */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
                id="waitlist-success-view"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm animate-bounce">
                  <CheckCircle2 className="w-8 h-8 fill-current text-white bg-emerald-500 rounded-full" />
                </div>
                
                <h3 className="font-serif text-2.5xl font-extrabold text-brand-dark mb-3">
                  You're in, Sister! 🎉
                </h3>
                
                <p className="text-[#4F4F4F] text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto mb-6">
                  We've safely registered <strong>{email}</strong> for the exclusive launch waitlist of the <strong>{product.title}</strong>.
                </p>

                <div className="bg-brand-surface rounded-2.5xl p-5 border border-brand-primary/5 max-w-md mx-auto mb-8 text-left text-xs sm:text-sm text-brand-text space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-brand-dark text-sm border-b border-brand-primary/5 pb-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand-accent" /> Your VIP Ticket Benefits:
                  </div>
                  <p>💝 <strong>Guaranteed Launch Pricing</strong>: Save on release. You will pay $6 rather than $47.</p>
                  <p>📱 <strong>Smartphone Done-for-You Guide</strong>: Straightforward copy-paste walkthrough files.</p>
                  <p>🚀 <strong>First-Class Queue</strong>: Be the first woman notified the absolute second your guide is ready to download.</p>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-brand-dark text-white rounded-full font-bold text-sm tracking-wide hover:bg-brand-primary transition-all cursor-pointer shadow-md shadow-brand-dark/5"
                  id="success-back-btn"
                >
                  Continue Browsing Masterclasses
                </button>
              </motion.div>
            ) : (
              /* Signup Waitlist Form */
              <div id="waitlist-form-view">
                <div className="mb-8 text-left">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-secondary bg-brand-secondary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                    🔥 Highly Requested Guide
                  </div>
                  <h3 className="font-serif text-2.5xl sm:text-3.5xl font-extrabold text-brand-dark leading-tight">
                    Join the VIP Wishlist
                  </h3>
                  <p className="text-[#4F4F4F] text-xs sm:text-sm font-light mt-2 leading-relaxed">
                    This guide book is currently being finalized with step-by-step smartphone tutorials. Enter your email to wishlist it and lock in your <strong>massive early-bird discount</strong> (Only $6 on release instead of $47).
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm px-4 py-3 rounded-2xl mb-6 text-left" id="waitlist-error-banner">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name field (optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-name" className="text-xs font-bold uppercase tracking-wider text-brand-dark/75">
                      Your First Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="waitlist-name"
                      placeholder="e.g. Amina"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      maxLength={100}
                      className="w-full px-4 py-3.5 rounded-2xl border border-brand-primary/10 bg-brand-surface text-brand-dark placeholder-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-sm transition-all"
                    />
                  </div>

                  {/* Email field (required) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="waitlist-email" className="text-xs font-bold uppercase tracking-wider text-brand-dark/75">
                      Your Best Email Address *
                    </label>
                    <input
                      type="email"
                      id="waitlist-email"
                      required
                      placeholder="e.g. name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      maxLength={200}
                      className="w-full px-4 py-3.5 rounded-2xl border border-brand-primary/10 bg-brand-surface text-brand-dark placeholder-brand-text/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 text-sm transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center py-4 px-6 gap-2 rounded-2xl text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
                      id="submit-waitlist-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-y-transparent rounded-full animate-spin" />
                          <span>Securing Your Spot...</span>
                        </>
                      ) : (
                        <>
                          <span>Secure My 75% Off Ticket</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* Secure checkout or platform privacy subtext */}
                <p className="text-[10px] text-brand-text/50 font-light mt-4 text-center">
                  🔒 We respect your absolute privacy. No spam. You will only receive early-bird book updates.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
