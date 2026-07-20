import React, { useState } from "react";
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Check, 
  Mail, 
  User, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  BookMarked,
  HelpCircle,
  MessageSquare,
  Compass,
  AlertTriangle,
  FileText
} from "lucide-react";
// @ts-ignore
import ebookCover from "../assets/images/relationship_ebook_cover_1784576586263.jpg";
import { addWaitlistSubscriber } from "../firebase";
import { gaTrackEvent } from "../lib/gtag";
import { mixpanelTrack } from "../lib/mixpanel";

export default function RelationshipEbook() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Email address is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const result = await addWaitlistSubscriber(email, name, "relationship_ebook");
      if (result.success) {
        setSubmitted(true);
        gaTrackEvent("download_ebook_success", { email, name });
        mixpanelTrack("Download EBook Success", { email, name });
      } else {
        setErrorMsg("Failed to submit. Please try again.");
        gaTrackEvent("download_ebook_failed", { email });
        mixpanelTrack("Download EBook Failed", { email });
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out] flex flex-col w-full pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-6xl mx-auto w-full px-6 pt-12 md:pt-16 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Pre-Headline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-xs font-mono font-semibold text-rose-600 uppercase tracking-wider max-w-max">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>RELATIONSHIP PSYCHOLOGY GUIDE</span>
          </div>

          <p className="text-sm md:text-base font-mono font-medium text-brand-secondary leading-relaxed tracking-tight">
            Stop playing guessing games and over-functioning in your relationship.
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-brand-dark leading-tight">
            How to Make a Man Fall in Love If He <span className="italic font-normal text-rose-600">Resists Commitment</span>
          </h1>

          {/* Sub-Headline */}
          <p className="text-base md:text-lg text-zinc-600 font-sans font-light leading-relaxed max-w-2xl">
            A Psychological-Based Blueprint for Women Ready to Reclaim Their Power, Eliminate the "Hot & Cold" Dynamic, and Secure True Alignment.
          </p>

          {/* Benefits Bullet quick list */}
          <div className="hidden sm:flex flex-col gap-3 mt-2 border-l-2 border-brand-primary/30 pl-4 py-1">
            <div className="flex items-center gap-2.5 text-xs text-zinc-500">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Understand the subconscious fortress keeping him emotionally distant</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-500">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Shift your mindset from anxious scarcity to high-value power</span>
            </div>
          </div>
        </div>

        {/* Right column: 3D Book Mockup & CTA Opt-In Box */}
        <div className="lg:col-span-5 flex flex-col gap-8 items-center">
          
          {/* 3D Book Mockup Display */}
          <div className="relative group">
            {/* Soft decorative ambient blur behind book */}
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-rose-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-white border border-brand-border/45 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] flex flex-col items-center">
              <img
                src={ebookCover}
                alt="E-book Cover Mockup: How to Make a Man Fall in Love If He Resists Commitment"
                referrerPolicy="no-referrer"
                className="w-56 md:w-64 h-auto rounded-lg shadow-md object-cover border border-brand-border block transform hover:rotate-1 transition-transform duration-300"
              />
              <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase mt-3 tracking-widest flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> DIGITAL EXCLUSIVE DOWNLOAD
              </span>
            </div>
          </div>

          {/* Primary CTA Opt-In Box */}
          <div id="ebook-optin" className="w-full max-w-md bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 to-brand-primary" />

            {!submitted ? (
              <form onSubmit={handleDownloadSubmit} className="flex flex-col gap-4 text-left">
                <div className="text-center pb-2">
                  <h3 className="text-lg font-serif font-bold text-brand-dark">Get the Free Guide Instantly</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enter your email below to download the psychological roadmap to decode his behavior and inspire lasting commitment.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-zinc-400 tracking-wider">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your First Name"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-light border border-brand-border/75 focus:border-brand-primary outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Best Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-light border border-brand-border/75 focus:border-brand-primary outline-none text-xs transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 bg-brand-secondary hover:bg-rose-600 text-brand-light hover:text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_4px_12px_rgba(143,117,83,0.15)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Preparing Download...</span>
                  ) : (
                    <>
                      <span>DOWNLOAD THE FREE BLUEPRINT NOW</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 text-center mt-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>🔒 100% Privacy. Zero Fluff. Pure Strategy.</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-brand-dark">Check Your Inbox!</h3>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-2 leading-relaxed">
                    Thank you <strong className="font-semibold text-brand-dark">{name || "there"}</strong>! Your copy of <em className="not-italic font-semibold">How to Make a Man Fall in Love If He Resists Commitment</em> is being delivered to <strong className="font-semibold text-brand-dark">{email}</strong> right now.
                  </p>
                  <p className="text-[11px] text-brand-secondary font-mono mt-4 p-3.5 bg-brand-light rounded-xl border border-brand-border inline-block">
                    💾 Status: Download Link Active
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-4 leading-relaxed">
                    If you don't receive it in 3 minutes, please check your spam folder or Promotions tab. Get ready to shift your paradigm!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="bg-white border-y border-brand-border py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <h2 className="text-3xl font-serif font-bold text-brand-dark">Does this sound familiar?</h2>
            <div className="w-16 h-1 bg-rose-500/30 mx-auto rounded mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            
            <div className="flex gap-4 p-5 rounded-2xl bg-brand-bg/50 border border-brand-border/60 hover:border-rose-200 transition-all">
              <span className="text-xl shrink-0 mt-0.5 select-none">💔</span>
              <div>
                <p className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono text-zinc-400">The Sudden Pullaway</p>
                <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
                  You are in a relationship where everything feels incredible, right until the moment it gets real—and then he suddenly pulls away.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-brand-bg/50 border border-brand-border/60 hover:border-rose-200 transition-all">
              <span className="text-xl shrink-0 mt-0.5 select-none">❓</span>
              <div>
                <p className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono text-zinc-400">Constant Self-Doubt</p>
                <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
                  You constantly ask yourself, "What am I doing wrong?" or "Will he ever truly commit?"
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-brand-bg/50 border border-brand-border/60 hover:border-rose-200 transition-all">
              <span className="text-xl shrink-0 mt-0.5 select-none">🔄</span>
              <div>
                <p className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono text-zinc-400">The Hot & Cold Cycle</p>
                <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
                  He goes through intense cycles of being hot one day, only to become emotionally shut down, quiet, or hyper-focused on your flaws the next.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-brand-bg/50 border border-brand-border/60 hover:border-rose-200 transition-all">
              <span className="text-xl shrink-0 mt-0.5 select-none">⚖️</span>
              <div>
                <p className="text-xs font-semibold text-brand-dark uppercase tracking-wider font-mono text-zinc-400">Anxious Over-Functioning</p>
                <p className="text-sm text-zinc-600 mt-1.5 leading-relaxed">
                  You find yourself over-functioning—trying harder, giving more, and sacrificing your own peace just to keep him close.
                </p>
              </div>
            </div>

          </div>

          {/* Psychological Hook Highlight Box */}
          <div className="bg-rose-50/50 border border-rose-100/80 rounded-3xl p-6 md:p-8 text-center max-w-3xl mx-auto shadow-sm mt-4">
            <AlertTriangle className="w-6 h-6 text-rose-500 mx-auto mb-3" />
            <p className="text-base text-zinc-700 italic font-light leading-relaxed">
              "If a man has one foot out the door, <strong className="font-semibold text-brand-dark">trying harder will only activate his psychological defense mechanisms</strong> and drive him further away. You don't need to chase him; you need to understand the hidden rules of male psychology."
            </p>
          </div>

        </div>
      </section>

      {/* 3. THE REVEAL SECTION */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16 text-center flex flex-col gap-8">
        <div className="max-w-xl mx-auto flex flex-col gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-secondary uppercase">THE PARADIGM SHIFT</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
            The Commitment Paradox: Why Chasing Fails
          </h2>
          <div className="w-12 h-0.5 bg-brand-primary mx-auto mt-2" />
        </div>

        <div className="text-left max-w-2xl mx-auto flex flex-col gap-6 text-zinc-600 font-light leading-relaxed">
          <p>
            When a man resists commitment, <strong className="font-semibold text-brand-dark">it is rarely a reflection of your worth</strong>. For many men, their subconscious brain views deep emotional intimacy as an absolute threat to their autonomy and freedom.
          </p>
          <div className="border-l-4 border-brand-primary pl-4 py-1 my-2 bg-brand-light/40 rounded-r-xl pr-3">
            <p className="text-zinc-700 italic">
              "They have built a psychological <strong>"fortress"</strong> to protect themselves. When you push for labels, you inadvertently tell his nervous system that a relationship equals containment and pressure."
            </p>
          </div>
          <p>
            To change his behavior, you must stop operating from scarcity and step into absolute personal power. This free e-book provides the exact behavioral blueprint to shift the dynamic entirely, moving you from anxious pursuit to steady, confident alignment.
          </p>
        </div>
      </section>

      {/* 4. WHAT'S INSIDE THE E-BOOK SECTION */}
      <section className="bg-brand-light border-y border-brand-border py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-rose-500 uppercase">THE ROADMAP</span>
            <h2 className="text-3xl font-serif font-bold text-brand-dark">
              What You Will Discover Inside This Strategic Guide
            </h2>
            <div className="w-16 h-1 bg-brand-primary/30 mx-auto rounded mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            
            {/* Benefit Card 1 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shrink-0 font-bold font-mono">
                01
              </div>
              <h3 className="text-base font-serif font-bold text-brand-dark mb-2">Avoidant Attachment Breakdown</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Learn exactly how his childhood survival lessons created a psychological fortress, and how his defenses activate at the predictable "Seven-Month Cliff".
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 shrink-0 font-bold font-mono">
                02
              </div>
              <h3 className="text-base font-serif font-bold text-brand-dark mb-2">Power Dynamic Mindset Shift</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                How to transition from a place of scarcity to absolute abundance, forcing him to recognize your high value instead of letting him leave you at the mercy of his indecision.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 shrink-0 font-bold font-mono">
                03
              </div>
              <h3 className="text-base font-serif font-bold text-brand-dark mb-2">Step-by-Step Intimacy Strategies</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Proven methods to establish a low-pressure environment where his threat response can safely disarm.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shrink-0 font-bold font-mono">
                04
              </div>
              <h3 className="text-base font-serif font-bold text-brand-dark mb-2">The Script Vault</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Exact, word-for-word communication templates to address excuses like "I'm just not ready" or "Let's go with the flow" without triggering defensiveness.
              </p>
            </div>

            {/* Benefit Card 5 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 shrink-0 font-bold font-mono">
                05
              </div>
              <h3 className="text-base font-serif font-bold text-brand-dark mb-2">The Bold Exclusivity Strategy</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                How to structurally remove exclusive access to your heart in a way that forces an avoidant man to confront the reality of losing you forever.
              </p>
            </div>

            {/* Benefit Card 6 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4 shrink-0 font-bold font-mono">
                06
              </div>
              <h3 className="text-base font-serif font-bold text-brand-dark mb-2">Signs of Real Readiness</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                The 4 definitive behavioral markers that prove he is genuinely shifting into true, reliable commitment.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16 flex flex-col items-center text-center gap-8">
        
        <div className="max-w-xl mx-auto flex flex-col gap-3">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
            Stop Guessing. Start Strategizing.
          </h2>
          <p className="text-sm md:text-base text-zinc-500 font-sans max-w-md mx-auto font-light leading-relaxed mt-1">
            You do not have to accept a relationship spent waiting in a gray area. Claim your clarity, step into your confidence, and discover what it takes to inspire a man to choose you completely on his own accord.
          </p>
        </div>

        {/* Dynamic scroll-to optin form at the bottom */}
        <div className="w-full max-w-md bg-white border-2 border-brand-secondary/20 rounded-3xl p-6 md:p-8 shadow-md mt-2 relative overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-1 bg-brand-secondary" />
          <h3 className="text-xl font-serif font-bold text-brand-dark mb-6">Download Your Free Copy Today</h3>
          
          <button
            onClick={() => {
              const element = document.getElementById("ebook-optin");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="w-full py-4 bg-brand-secondary hover:bg-rose-600 text-brand-light hover:text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>SECURE MY FREE COPY NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

    </div>
  );
}
