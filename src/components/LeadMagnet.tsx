import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    // Simulate standard capture success state
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="free-guide"
      className="bg-gradient-to-br from-brand-surface via-[#FFF6FA] to-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px] overflow-hidden border-y border-brand-primary/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center"
        >
          
          {/* Left Text Capture form column (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              🎁 Free Digital Download
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight mb-4">
              Get 50+ AI Prompts — <br />
              <span className="text-brand-primary bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Completely Free
              </span>
            </h2>

            <p className="text-[#4F4F4F] text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl">
              Subscribe and instantly receive the complete prompt library, 3 high-converting Pinterest templates, and our 30-day faceless launch path sheet.
            </p>

            {/* Email Form with Local Interactive Success Feedback */}
            <div className="w-full max-w-lg mb-4">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-brand-primary/10 border border-brand-primary/30 rounded-2xl p-6 text-brand-primary flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand-primary" />
                  <div>
                    <h4 className="font-bold text-base">Check Your Inbox! 🎀</h4>
                    <p className="text-xs sm:text-sm text-brand-text/80 mt-1">
                      We've dispatched the <strong>50+ AI Prompts Guide</strong> to your address. Check spam or promo tab if you don't receive it in 2 minutes!
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 px-5 py-4 rounded-2xl border border-brand-primary/15 bg-white text-brand-dark placeholder-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 shadow-[0_4px_16px_0_rgba(244,63,143,0.02)] transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-2xl text-sm font-bold text-white bg-brand-dark hover:bg-brand-primary hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                  >
                    Send Me the Guide <Send className="ml-2 w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </div>

            {/* Micro Trust badges subtext */}
            <p className="text-[11px] sm:text-xs text-brand-text/60 font-light flex items-center flex-wrap gap-x-2 gap-y-1">
              <span>🔒 No spam. Unsubscribe anytime.</span>
              <span className="text-brand-primary/50 hidden sm:inline">•</span>
              <span>💝 Join 1,200+ women entrepreneurs worldwide.</span>
            </p>
          </div>

          {/* Right Phone mockup preview columns (5 cols on Desktop) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Soft decorative glow backdrops */}
            <div className="absolute w-64 h-64 rounded-full bg-brand-secondary/20 blur-3xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />

            <div className="relative max-w-[280px] w-full bg-brand-dark rounded-[40px] p-3 shadow-2xl border-4 border-brand-dark">
              {/* Phone ear speaker notch decoration */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-brand-dark rounded-full z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-[#2C2C2C] rounded-full" />
              </div>
              
              {/* Phone Glass inside image */}
              <div className="rounded-[32px] overflow-hidden aspect-[9/19] relative bg-brand-surface border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700"
                  alt="Aesthetic layout representation showing faceless prompt guide visual mock"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Simulated notification banner on mockup screen */}
                <div className="absolute bottom-6 left-3 right-3 bg-brand-dark/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg text-white text-left text-xs">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-brand-secondary uppercase tracking-wider mb-1">
                    📖 NEW FILE ADDED
                  </div>
                  <div className="font-bold">50+ AI Prompts Pack.zip</div>
                  <div className="text-white/60 text-[10px] mt-0.5">Ready to download • 4.2 MB</div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
