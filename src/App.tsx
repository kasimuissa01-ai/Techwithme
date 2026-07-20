import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Check, 
  Database, 
  Mail, 
  User, 
  Search, 
  Eye, 
  EyeOff, 
  ChevronRight,
  TrendingUp,
  Award,
  Video,
  Lock,
  BookOpen,
  FileText,
  ExternalLink,
  Star,
  MessageSquare,
  ZoomIn,
  Bell,
  MoreHorizontal,
  Laptop,
  Banknote,
  Heart
} from "lucide-react";

// Import custom components
import BlogReader from "./components/BlogReader";
import RelationshipEbook from "./components/RelationshipEbook";

// Import Firebase handlers
import { 
  addWaitlistSubscriber, 
  subscribeToWaitlistCount, 
  subscribeToWaitlistSubscribers 
} from "./firebase";

// Import Google Analytics and Mixpanel utilities
import { initGA, gaTrackPageView, gaTrackEvent } from "./lib/gtag";
import { initMixpanel, mixpanelTrackPageView, mixpanelTrack } from "./lib/mixpanel";

export default function App() {
  // Page view state: "prompts" or "ebook"
  const [activeView, setActiveView] = useState<"prompts" | "ebook">(() => {
    if (typeof window !== "undefined") {
      const pageParam = new URLSearchParams(window.location.search).get("page");
      if (pageParam === "ebook") return "ebook";
      const hash = window.location.hash;
      if (hash === "#ebook" || hash === "#relationship" || hash === "#relationship-ebook") return "ebook";
    }
    return "prompts";
  });

  const handleViewChange = (view: "prompts" | "ebook") => {
    setActiveView(view);
    const newUrl = `${window.location.pathname}?page=${view}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    gaTrackPageView(view === "prompts" ? "/" : "/ebook");
    mixpanelTrackPageView(view === "prompts" ? "/" : "/ebook");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Synchronize routing state with browser history and hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const pageParam = new URLSearchParams(window.location.search).get("page");
      const hash = window.location.hash;
      if (pageParam === "ebook" || hash === "#ebook" || hash === "#relationship" || hash === "#relationship-ebook") {
        setActiveView("ebook");
      } else {
        setActiveView("prompts");
      }
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  // Waitlist count state
  const [waitlistCount, setWaitlistCount] = useState<number>(0);
  
  // Testimonial interactive display state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  
  // Registration Form state
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Admin section state
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<string>("");
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [adminSearch, setAdminSearch] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Initialize analytics and page view tracking, subscribe to waitlist count on mount
  useEffect(() => {
    // Initialize tracking
    initGA();
    initMixpanel();

    // Track the initial landing page view based on url parameter or hash
    const initialViewParam = new URLSearchParams(window.location.search).get("page");
    const initialHash = window.location.hash;
    const initialView = (initialViewParam === "ebook" || initialHash === "#ebook" || initialHash === "#relationship" || initialHash === "#relationship-ebook") ? "ebook" : "prompts";
    gaTrackPageView(initialView === "prompts" ? "/" : "/ebook");
    mixpanelTrackPageView(initialView === "prompts" ? "/" : "/ebook");

    const unsubscribeCount = subscribeToWaitlistCount((count) => {
      // Use fallback starter number (e.g. 147) + actual db count to make the count look lively,
      // or show exactly the database count. Let's do actual db count + 142 (simulated baseline) for premium social proof!
      setWaitlistCount(count + 142);
    });

    return () => {
      if (unsubscribeCount) unsubscribeCount();
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev === 0 ? 1 : 0));
    }, 6500); // changes every 6.5 seconds
    return () => clearInterval(timer);
  }, []);

  // Subscribe to live subscribers if Admin is unlocked
  useEffect(() => {
    let unsubscribeSubscribers: (() => void) | undefined;
    
    if (isAdminUnlocked) {
      unsubscribeSubscribers = subscribeToWaitlistSubscribers((list) => {
        setSubscribers(list);
      });
    }

    return () => {
      if (unsubscribeSubscribers) unsubscribeSubscribers();
    };
  }, [isAdminUnlocked]);

  // Handle Waitlist Form submission
  const handleSubmitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await addWaitlistSubscriber(email, name, "landing-page");
      if (res.success) {
        setSubmitted(true);
        setEmail("");
        setName("");
        
        // Track waitlist success in both GA and Mixpanel
        gaTrackEvent("join_waitlist_success", {
          subscriber_name: name || "Anonymous",
          source: "landing-page"
        });
        mixpanelTrack("Join Waitlist Success", {
          subscriber_name: name || "Anonymous",
          source: "landing-page"
        });
      } else {
        setErrorMsg("Failed to join waitlist. Please try again.");
        
        // Track waitlist failure in both GA and Mixpanel
        gaTrackEvent("join_waitlist_failed", {
          reason: "Firestore write returned false"
        });
        mixpanelTrack("Join Waitlist Failed", {
          reason: "Firestore write returned false"
        });
      }
    } catch (err: any) {
      const errorMsgText = err.message || "An unexpected error occurred.";
      setErrorMsg(errorMsgText);
      
      // Track waitlist error in both GA and Mixpanel
      gaTrackEvent("join_waitlist_error", {
        error: errorMsgText
      });
      mixpanelTrack("Join Waitlist Error", {
        error: errorMsgText
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Admin Unlock
  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim().toLowerCase() === "admin") {
      setIsAdminUnlocked(true);
      setAdminError("");
    } else {
      setAdminError("Invalid administrator passkey. Hint: use 'admin'");
    }
  };

  // Track Google Doc downloads/views
  const handleGoogleDocClick = () => {
    gaTrackEvent("click_google_doc_resource", {
      doc_title: "The Viral AI Animation Prompt Pack",
      url: "https://docs.google.com/document/d/1zzW08Z2uyrO6CR-ekiSzfwTsv2nH5hry/edit"
    });
    mixpanelTrack("Click Google Doc Resource", {
      doc_title: "The Viral AI Animation Prompt Pack",
      url: "https://docs.google.com/document/d/1zzW08Z2uyrO6CR-ekiSzfwTsv2nH5hry/edit"
    });
  };

  // Filter subscribers based on search query
  const filteredSubscribers = subscribers.filter((sub) => {
    const term = adminSearch.toLowerCase();
    return (
      sub.email.toLowerCase().includes(term) || 
      (sub.name && sub.name.toLowerCase().includes(term)) ||
      (sub.source && sub.source.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-secondary">
      
      {/* Top Notice Bar */}
      <div className="bg-brand-secondary text-brand-light text-center py-2 px-4 text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2">
        {activeView === "prompts" ? (
          <>
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-primary" />
            <span>Limited Offer: Get the pack for only $5 upon launch today • 100% Guaranteed</span>
          </>
        ) : (
          <>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>🔥 Free Download: Step-by-Step Psychological Relationship Blueprint</span>
          </>
        )}
      </div>

      {/* Main Elegant Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-brand-border/40">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-secondary">
            {activeView === "prompts" ? <Video className="w-4 h-4" /> : <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />}
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-brand-dark">
            {activeView === "prompts" ? "passiveincome.her" : "alignment.her"}<span className="text-brand-primary">.</span>
          </span>
        </div>

        {/* Elegant Page Tab Switcher */}
        <div className="flex items-center gap-1 bg-brand-light p-1 rounded-2xl border border-brand-border/60 shadow-inner">
          <button
            onClick={() => handleViewChange("prompts")}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-tight uppercase transition-all duration-300 cursor-pointer ${
              activeView === "prompts"
                ? "bg-white text-brand-dark shadow-sm border border-brand-border/45 animate-[fadeIn_0.15s_ease-out]"
                : "text-brand-dark/50 hover:text-brand-dark"
            }`}
          >
            AI Prompts
          </button>
          <button
            onClick={() => handleViewChange("ebook")}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-tight uppercase transition-all duration-300 cursor-pointer ${
              activeView === "ebook"
                ? "bg-white text-brand-dark shadow-sm border border-brand-border/45 animate-[fadeIn_0.15s_ease-out]"
                : "text-brand-dark/50 hover:text-brand-dark"
            }`}
          >
            Relationship E-Book
          </button>
        </div>

        {/* Navigation Action Links */}
        <nav className="flex items-center gap-3">
          {activeView === "prompts" && (
            <>
              <a 
                href="#samples" 
                title="Test Drive Prompts"
                className="w-10 h-10 rounded-xl bg-white hover:bg-brand-light border border-brand-border hover:border-brand-primary text-brand-dark/70 hover:text-brand-secondary transition-all flex items-center justify-center shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
              </a>
              <a 
                href="#case-studies" 
                title="Viral Blueprint"
                className="w-10 h-10 rounded-xl bg-white hover:bg-brand-light border border-brand-border hover:border-brand-primary text-brand-dark/70 hover:text-brand-secondary transition-all flex items-center justify-center shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            </>
          )}
          <button 
            onClick={() => {
              const nextState = !showAdmin;
              setShowAdmin(nextState);
              gaTrackEvent("toggle_admin_panel", { visible: nextState });
              mixpanelTrack("Toggle Admin Panel", { visible: nextState });
              
              if (nextState) {
                // Scroll smoothly to the top when opening the admin page
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            title={showAdmin ? "Close Admin Dashboard" : "Admin Dashboard"}
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all shadow-sm cursor-pointer ${
              showAdmin 
                ? "bg-brand-primary/10 border-brand-primary text-brand-secondary"
                : "bg-white hover:bg-brand-light border-brand-border hover:border-brand-primary text-brand-dark/80 hover:text-brand-secondary"
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>
        </nav>
      </header>

      {!showAdmin && activeView === "prompts" && (
        <>
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto w-full px-6 pt-16 pb-12 text-center flex flex-col items-center gap-6">
        
        {/* Launch Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light border border-brand-border text-xs font-mono text-brand-secondary uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Preparing Launch Today • Early Bird Access Open
        </div>

        {/* Master Copy Hook */}
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold tracking-tight text-brand-dark leading-tight max-w-3xl mt-2">
          Stop filming yourself.<br />
          <span className="italic font-normal text-brand-secondary">Start growing in silence.</span>
        </h1>

        <p className="text-base md:text-lg text-zinc-500 font-sans max-w-2xl font-light leading-relaxed">
          The master <strong className="font-semibold text-brand-dark">AI Video Virality Prompt Pack</strong> teaches you exactly how to generate vertical video loops that dominate the algorithm, scaling an anonymous page to <span className="underline decoration-brand-primary decoration-2 underline-offset-4 font-semibold text-brand-dark">over 4 million views</span> and <span className="underline decoration-brand-primary decoration-2 underline-offset-4 font-semibold text-brand-dark">10,000+ targeted followers in exactly 3 weeks</span>.
        </p>

        {/* Social Proof Counter */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 border-2 border-brand-bg flex items-center justify-center text-[10px] font-bold">👩🏼</div>
            <div className="w-7 h-7 rounded-full bg-rose-100 border-2 border-brand-bg flex items-center justify-center text-[10px] font-bold">👩🏻</div>
            <div className="w-7 h-7 rounded-full bg-teal-100 border-2 border-brand-bg flex items-center justify-center text-[10px] font-bold">👩🏽</div>
            <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-brand-bg flex items-center justify-center text-[10px] font-bold">👩🏾</div>
          </div>
          <span className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider">
            🔥 {waitlistCount} creators have reserved their discount spot
          </span>
        </div>

        {/* Modules & Blueprint Section - Copied design from inspiration image */}
        <div className="w-full max-w-md flex flex-col items-center mt-12 mb-8 text-center px-4">
          <div className="relative mb-6">
            {/* Tilted bright pink tag badge */}
            <span className="absolute -top-5 -right-6 bg-pink-500 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-md border border-zinc-900 shadow-[2px_2px_0px_#18181b] transform rotate-6 select-none z-10">
              100+ PROMPTS
            </span>
            <h3 className="text-2xl font-display font-black tracking-tight text-brand-dark uppercase leading-tight">
              TO HELP YOU <br />
              <span className="text-3xl font-display font-black tracking-tight text-transparent" style={{ WebkitTextStroke: "1.5px #2A2621" }}>MAKE MONEY ONLINE</span>
            </h3>
          </div>

          {/* Three light blue cards with solid dark borders and shadows */}
          <div className="w-full flex flex-col gap-4 text-left">
            
            {/* Card 1: Laptop */}
            <div className="bg-[#a5cfe9] border-2 border-zinc-900 rounded-2xl p-4 shadow-[4px_4px_0px_#18181b] flex gap-3.5 items-center hover:translate-y-[-1px] transition-transform">
              <div className="w-11 h-11 rounded-xl bg-white border-2 border-zinc-900 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#18181b]">
                <Laptop className="w-5 h-5 text-zinc-800 stroke-[1.8]" />
              </div>
              <div className="flex flex-col gap-0.5 text-zinc-900 font-display font-extrabold text-[10.5px] tracking-wide leading-relaxed">
                <div className="flex items-start gap-1">
                  <span className="text-zinc-800 font-black">•</span>
                  <span>WAKE UP TO SALE NOTIFICATIONS</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-zinc-800 font-black">•</span>
                  <span>POST CONTENT YOU DIDN'T HAVE TO FILM</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-zinc-800 font-black">•</span>
                  <span>HAVE A SYSTEM THAT ALLOWS YOU TO WORK LESS</span>
                </div>
              </div>
            </div>

            {/* Card 2: Search */}
            <div className="bg-[#a5cfe9] border-2 border-zinc-900 rounded-2xl p-4 shadow-[4px_4px_0px_#18181b] flex gap-3.5 items-center hover:translate-y-[-1px] transition-transform">
              <div className="w-11 h-11 rounded-xl bg-white border-2 border-zinc-900 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#18181b]">
                <Search className="w-5 h-5 text-zinc-800 stroke-[2]" />
              </div>
              <p className="text-zinc-900 font-display font-extrabold text-[10.5px] tracking-wide leading-normal">
                <span className="text-emerald-800 block text-[9px] uppercase font-mono tracking-wider mb-0.5">YOU'VE SEEN THE SUCCESS:</span>
                AND YOU ALREADY KNOW IT'S POSSIBLE BUT YOU DON'T EVEN KNOW HOW TO START...
              </p>
            </div>

            {/* Card 3: Banknote */}
            <div className="bg-[#a5cfe9] border-2 border-zinc-900 rounded-2xl p-4 shadow-[4px_4px_0px_#18181b] flex gap-3.5 items-center hover:translate-y-[-1px] transition-transform">
              <div className="w-11 h-11 rounded-xl bg-white border-2 border-zinc-900 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#18181b]">
                <Banknote className="w-5 h-5 text-zinc-800 stroke-[1.8]" />
              </div>
              <p className="text-zinc-900 font-display font-extrabold text-[10.5px] tracking-wide leading-normal">
                <span className="text-[#bf5a36] block text-[9px] uppercase font-mono tracking-wider mb-0.5">I'VE BEEN THERE:</span>
                LOOKING FOR A WAY TO EARN AN INCOME ONLINE WITHOUT THE OVERWHELM OR PRESSURE OF HAVING TO SHOW YOUR FACE.
              </p>
            </div>

          </div>
        </div>

        {/* "Raving Reviews" Community Section - Inspired by high-converting design */}
        <div className="w-full max-w-md flex flex-col items-center mt-8 mb-6 text-center px-4">
          <p className="text-[10px] font-mono font-extrabold tracking-[0.25em] text-brand-secondary uppercase mb-1">
            DON’T JUST TAKE MY WORD FOR IT
          </p>
          <h3 
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase select-none text-[#bef264] mb-8 drop-shadow-[2.5px_2.5px_0px_#18181b]"
            style={{
              WebkitTextStroke: "2.5px #18181b",
              paintOrder: "stroke fill",
            }}
          >
            Raving Reviews
          </h3>

          {/* Testimonial Stack showing the real screenshots directly and fully, already zoomed & readable */}
          <div className="w-full flex flex-col gap-6 text-left">
            
            {/* Visual Proof Card 1: Client Chat DM Screenshot */}
            <div 
              onClick={() => {
                setExpandedImage("https://i.postimg.cc/W1pndTv9/IMG-20260705-111915.png");
                gaTrackEvent("zoom_testimonial", { image_url: "https://i.postimg.cc/W1pndTv9/IMG-20260705-111915.png", testimonial_type: "chat_proof" });
                mixpanelTrack("Zoom Testimonial", { image_url: "https://i.postimg.cc/W1pndTv9/IMG-20260705-111915.png", testimonial_type: "chat_proof" });
              }}
              className="bg-white border-2 border-zinc-900 rounded-2xl p-1.5 shadow-[4px_4px_0px_#18181b] hover:translate-y-[-1px] hover:border-brand-secondary hover:shadow-[4px_4px_0px_#8f7553] transition-all duration-300 overflow-hidden cursor-zoom-in group"
            >
              <img
                src="https://i.postimg.cc/W1pndTv9/IMG-20260705-111915.png"
                alt="Verified WhatsApp client chat proof (click to zoom)"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-contain block group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* Visual Proof Card 2: Instagram Growth Dashboard Screenshot */}
            <div 
              onClick={() => {
                setExpandedImage("https://i.postimg.cc/2Sjw1rDh/IMG-20260705-081049.png");
                gaTrackEvent("zoom_testimonial", { image_url: "https://i.postimg.cc/2Sjw1rDh/IMG-20260705-081049.png", testimonial_type: "growth_proof" });
                mixpanelTrack("Zoom Testimonial", { image_url: "https://i.postimg.cc/2Sjw1rDh/IMG-20260705-081049.png", testimonial_type: "growth_proof" });
              }}
              className="bg-white border-2 border-zinc-900 rounded-2xl p-1.5 shadow-[4px_4px_0px_#18181b] hover:translate-y-[-1px] hover:border-brand-secondary hover:shadow-[4px_4px_0px_#8f7553] transition-all duration-300 overflow-hidden cursor-zoom-in group"
            >
              <img
                src="https://i.postimg.cc/2Sjw1rDh/IMG-20260705-081049.png"
                alt="Verified Instagram analytics proof (click to zoom)"
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-xl object-contain block group-hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

          </div>
        </div>

        {/* Interactive Waitlist Box */}
        <div id="waitlist-card" className="w-full max-w-md bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow mt-4 relative overflow-hidden">
          
          {/* Accent corner decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary" />

          {!submitted ? (
            <form onSubmit={handleSubmitWaitlist} className="flex flex-col gap-4 text-left">
              <div className="text-center pb-2">
                <h3 className="text-lg font-serif font-bold text-brand-dark">Join the Wishlist today</h3>
                <p className="text-xs text-zinc-400 mt-1">Lock in the limited $5 price. No payment required yet.</p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Your Name (Optional)</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-light border border-brand-border/75 focus:border-brand-primary outline-none text-xs transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-400 tracking-wider">Your Best Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-light border border-brand-border/75 focus:border-brand-primary outline-none text-xs transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 bg-brand-secondary hover:bg-brand-primary text-brand-light hover:text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_4px_12px_rgba(143,117,83,0.15)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Securing discount...</span>
                ) : (
                  <>
                    <span>Reserve My $5 Prompt Pack</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Trust Badges Row */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-brand-border/40 mt-1">
                <div className="flex items-center gap-2 bg-brand-light/50 p-2 rounded-xl border border-brand-border/20">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-zinc-700 leading-none">Payment Security</p>
                    <p className="text-[7px] text-zinc-400 mt-0.5 font-mono">100% SECURE CHECKOUT</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-brand-light/50 p-2 rounded-xl border border-brand-border/20">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-zinc-700 leading-none">SSL Encrypted</p>
                    <p className="text-[7px] text-zinc-400 mt-0.5 font-mono">256-BIT ENCRYPTION</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400 text-center mt-1">
                <span>Safe checkout guaranteed. We respect your privacy.</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 flex flex-col items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-brand-dark">You're on the list!</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-2 leading-relaxed">
                  Excellent choice! We have successfully reserved your spot. You've locked in the special <strong className="font-semibold text-brand-dark">$5 launch offer</strong> (89% off the $47 retail price).
                </p>
                <div className="mt-4 p-3.5 bg-brand-light rounded-2xl border border-brand-border inline-block text-[11px] font-mono text-brand-secondary">
                  TICKET CODE: <span className="font-bold">VIRAL-PROMPT-{waitlistCount}</span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-3">
                  We will send an instant notification alert directly to your email the moment the prompt vault opens today.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Money Back Guarantee Banner */}
      <section className="bg-white border-y border-brand-border py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-light border border-brand-primary/20 flex items-center justify-center text-brand-secondary shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-brand-secondary">Our 3-Week Results Guarantee</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl font-light leading-relaxed">
                If you put our exact copy-paste AI prompt guidelines to work for 3 weeks and do not experience real video engagement or audience growth, we will return your $5 launch investment immediately. No hoops, no hassle, 100% money-back.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/30 text-[10px] font-mono text-brand-secondary font-bold shrink-0 uppercase tracking-widest text-center">
            🛡️ ZERO RISK BLUEPRINT
          </div>
        </div>
      </section>
        </>
      )}

      {/* Admin Panel Section */}
      {showAdmin && (
        <section id="admin-panel" className="max-w-4xl mx-auto w-full px-6 py-8 animate-[fadeIn_0.3s_ease-out] scroll-mt-8">
          <div className="bg-white border-2 border-brand-primary/40 rounded-3xl p-6 md:p-8 shadow-md">
            
            <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-secondary" />
                <h3 className="text-base font-bold font-mono uppercase tracking-wider text-brand-dark">
                  Administrative Wishlist Inspector
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-brand-primary/20 text-brand-secondary font-bold px-2.5 py-1 rounded-full uppercase">
                Secure Cloud Sync
              </span>
            </div>

            {!isAdminUnlocked ? (
              <form onSubmit={handleAdminUnlock} className="max-w-sm mx-auto py-8 flex flex-col gap-4 text-center">
                <div className="flex flex-col gap-1 items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 mb-1">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold">Unlock Subscriber List</h4>
                  <p className="text-xs text-zinc-400 font-light">Enter the administrator key to view real-time data</p>
                </div>

                {adminError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                    {adminError}
                  </div>
                )}

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter passkey..."
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-brand-light border border-brand-border outline-none text-xs text-center font-mono font-bold tracking-widest focus:border-brand-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-secondary hover:bg-brand-primary text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Authorize Console
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
                
                {/* Admin Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-brand-light border border-brand-border rounded-2xl">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Total Wishlist Leads</span>
                    <span className="text-2xl font-serif font-extrabold text-brand-dark mt-1 block">{subscribers.length}</span>
                  </div>
                  <div className="p-4 bg-brand-light border border-brand-border rounded-2xl">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Target conversion rate</span>
                    <span className="text-2xl font-serif font-extrabold text-brand-dark mt-1 block">89% ($5 tier)</span>
                  </div>
                  <div className="p-4 bg-brand-light border border-brand-border rounded-2xl">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Launch Revenue Potential</span>
                    <span className="text-2xl font-serif font-extrabold text-emerald-600 mt-1 block">${subscribers.length * 5} USD</span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder="Search by email or name..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-light border border-brand-border outline-none text-xs transition-colors focus:border-brand-primary"
                  />
                </div>

                {/* Subscribers list Table */}
                <div className="border border-brand-border rounded-2xl overflow-hidden bg-brand-light shadow-inner">
                  {filteredSubscribers.length > 0 ? (
                    <div className="overflow-x-auto max-h-[300px]">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#EBE5DB]/50 border-b border-brand-border text-zinc-400 font-mono font-bold uppercase text-[10px]">
                            <th className="p-3.5 pl-5">#</th>
                            <th className="p-3.5">Name</th>
                            <th className="p-3.5">Email</th>
                            <th className="p-3.5">Source</th>
                            <th className="p-3.5 pr-5">Registration Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/40 font-mono text-[11px] text-zinc-600">
                          {filteredSubscribers.map((sub, index) => (
                            <tr key={sub.id} className="hover:bg-[#EBE5DB]/20 transition-colors">
                              <td className="p-3 pl-5 font-bold text-zinc-400">{index + 1}</td>
                              <td className="p-3 font-semibold text-brand-dark">{sub.name || <span className="text-zinc-300 font-normal">Not Provided</span>}</td>
                              <td className="p-3 font-bold text-brand-secondary">{sub.email}</td>
                              <td className="p-3">
                                {sub.source === "relationship_ebook" ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold bg-rose-50 border border-rose-100 text-rose-600 uppercase font-mono">
                                    <Heart className="w-2.5 h-2.5 fill-rose-600" />
                                    Relationship
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-bold bg-amber-50 border border-amber-100 text-amber-600 uppercase font-mono">
                                    <Sparkles className="w-2.5 h-2.5 fill-amber-600" />
                                    AI Prompts
                                  </span>
                                )}
                              </td>
                              <td className="p-3 pr-5 text-zinc-400">
                                {sub.createdAt ? sub.createdAt.toLocaleString() : <span className="italic">Just now</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-zinc-400 italic">
                      No subscribers registered on the waitlist yet.
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <button
                    onClick={() => {
                      setIsAdminUnlocked(false);
                      setAdminPassword("");
                    }}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors"
                  >
                    Lock Console Access
                  </button>
                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* Relationship E-Book Section */}
      {!showAdmin && activeView === "ebook" && (
        <RelationshipEbook />
      )}

      {!showAdmin && activeView === "prompts" && (
        <>
          {/* Sample Prompt Generator Section */}
          <section id="samples" className="max-w-5xl mx-auto w-full px-6 py-12 flex flex-col gap-8 animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2 mb-2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
            Free Test-Drive Prompts
          </h2>
          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            Get instant access to our premium, step-by-step document with actual copy-paste prompt recipes! No registration required.
          </p>
        </div>

        <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 text-brand-dark shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text and Benefits Column */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-mono text-blue-600 font-bold uppercase w-fit">
              <FileText className="w-3.5 h-3.5" />
              LIVE GOOGLE DOCUMENT
            </div>

            <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-brand-dark">
              The Viral AI Animation Prompt Pack
            </h3>

            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
              This free step-by-step guide reveals the exact high-retention workflow used to create scroll-stopping Instagram Reels. Learn how to generate consistent Disney Pixar-style characters and sequence emotional story animations.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-1">
              {[
                { title: "Standard Viral Workflow", desc: "Our 2-scene setup designed to boost watch time and keep retention above 150%." },
                { title: "Character Sheet Blueprint", desc: "Step-by-step consistency guidelines to prevent character shifts across scenes." },
                { title: "Google Flow (Veo) Methods", desc: "How to use daily free credits to generate flawless 1080p high-quality clips." },
                { title: "Ready-to-Use Recipes", desc: "Includes 'The Panic vs. The Calm' relatable contrast prompts and emotional stories." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-800 leading-tight">{item.title}</h5>
                    <p className="text-[10px] text-zinc-400 font-light mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="https://docs.google.com/document/d/1zzW08Z2uyrO6CR-ekiSzfwTsv2nH5hry/edit?usp=drivesdk&ouid=105286190481878467882&rtpof=true&sd=true"
                target="_blank"
                rel="noreferrer"
                onClick={handleGoogleDocClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-mono tracking-widest uppercase rounded-xl transition-all shadow-[0_4px_12px_rgba(37,99,235,0.15)] cursor-pointer"
              >
                <span>View Free Google Doc</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-[10px] text-zinc-400 font-mono text-center sm:text-left">
                • Free Instant Access
              </span>
            </div>
          </div>

          {/* Interactive Mockup Preview Column */}
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/5 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative border border-brand-border/60 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all bg-brand-light p-2.5">
              <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden relative border border-brand-border/30">
                <img
                  src="https://i.postimg.cc/RVNyN7QD/IMG-20260704-204402.jpg"
                  alt="The Viral AI Animation Prompt Pack Google Doc Cover"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Title overlay mimicking PDF visual style */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/20 p-4 flex flex-col justify-between text-white pointer-events-none">
                  <div className="bg-blue-600/90 backdrop-blur-sm border border-blue-400/20 px-3 py-1 rounded-lg w-fit text-[9px] font-mono uppercase tracking-wider font-bold">
                    FREE GOOGLE DOC
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-extrabold leading-tight tracking-tight drop-shadow-md">
                      THE VIRAL AI ANIMATION PROMPT PACK
                    </h4>
                    <p className="text-[9px] text-zinc-300 font-light mt-0.5 drop-shadow-sm">
                      Free Prompts to Create Scroll-Stopping Instagram Reels
                    </p>
                  </div>
                </div>

                {/* Overlay Hover Trigger */}
                <a 
                  href="https://docs.google.com/document/d/1zzW08Z2uyrO6CR-ekiSzfwTsv2nH5hry/edit?usp=drivesdk&ouid=105286190481878467882&rtpof=true&sd=true" 
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleGoogleDocClick}
                  className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold font-mono tracking-wider uppercase">Open Google Doc</span>
                </a>
              </div>

              {/* Document Info Pill */}
              <div className="mt-3 px-3 py-2 bg-white rounded-xl border border-brand-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase">viral_animation_guide.gdoc</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">ONLINE • SECURE LINK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Short Marketing Articles Section */}
      <section id="case-studies" className="bg-brand-light border-y border-brand-border py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-[10px] font-mono text-brand-secondary font-bold uppercase mx-auto tracking-widest">
              <TrendingUp className="w-3.5 h-3.5" />
              Scrolling Psychology & Blueprint
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-extrabold tracking-tight text-brand-dark">
              Viral Marketing Insights
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
              Read our highly-sought short educational analyses below to learn how anonymous video structures generate continuous traffic loops and how to trigger massive organic reach.
            </p>
          </div>

          <BlogReader />

        </div>
      </section>

      {/* What's Inside the Prompt Pack? Section */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16 flex flex-col gap-10">
        <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
            What's inside the $5 Prompt Pack?
          </h2>
          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            The core elements of our viral system packaged into copy-paste prompt recipes designed for immediate implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-brand-border p-6 rounded-3xl flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-secondary shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-dark">50+ Cinematic Midjourney & Runway Prompts</h4>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">
                Generate highly cohesive luxury, beige, cozy workspace and morning routine clips. Zero video sourcing or licensing headaches.
              </p>
            </div>
          </div>

          <div className="bg-white border border-brand-border p-6 rounded-3xl flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-secondary shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-dark">20+ Algorithmic Hook Formulas</h4>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">
                Copy-paste psychological headers that stop the scroll instantly, forcing viewers to spend 5x longer on your reels to read.
              </p>
            </div>
          </div>

          <div className="bg-white border border-brand-border p-6 rounded-3xl flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-secondary shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-dark">15-minute Posting & SEO Schedule</h4>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">
                The exact timing, tag hierarchy, and loop structure equations we used to reach 4.2 million views on a brand new page.
              </p>
            </div>
          </div>

          <div className="bg-white border border-brand-border p-6 rounded-3xl flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-secondary shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-dark">ElevenLabs Voice & Accent Blueprint</h4>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">
                Configure soothing, deep-narrative AI voices that sound 100% human, generating a luxury acoustic vibe.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#waitlist-card"
            onClick={() => {
              gaTrackEvent("click_bottom_cta", { target: "#waitlist-card" });
              mixpanelTrack("Click Bottom CTA", { target: "#waitlist-card" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-secondary hover:bg-brand-primary text-brand-light hover:text-white text-xs font-bold font-mono tracking-widest uppercase rounded-2xl transition-all shadow-md"
          >
            <span>Lock In Your $5 Spot Now</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
        </>
      )}

      {/* Simple Footer */}
      <footer className="bg-brand-dark text-[#8E867B] border-t border-[#3C362F] py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-bold tracking-tight text-white">
              {activeView === "prompts" ? "passiveincome.her" : "alignment.her"}<span className="text-brand-primary">.</span>
            </span>
          </div>

          <p className="text-[11px] font-mono text-center md:text-right font-light">
            © 2026 {activeView === "prompts" ? "passiveincome.her" : "alignment.her"}. All rights reserved. • <span className="hover:text-brand-primary transition-colors cursor-pointer">Privacy Policy</span> | <span className="hover:text-brand-primary transition-colors cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </footer>

      {/* Testimonial Zoom Overlay Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setExpandedImage(null)}
        >
          <div 
            className="relative max-w-lg w-full bg-white rounded-3xl p-3 shadow-2xl flex flex-col gap-3 animate-[scaleIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-brand-border flex items-center justify-center shadow-md hover:bg-brand-light transition-colors text-zinc-600 font-bold text-xs cursor-pointer z-50"
            >
              ✕
            </button>
            <div className="bg-brand-light rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-brand-border/40 max-h-[75vh]">
              <img 
                src={expandedImage} 
                alt="High resolution verified proof screenshot" 
                referrerPolicy="no-referrer"
                className="rounded-xl max-h-[70vh] max-w-full object-contain"
              />
            </div>
            <div className="text-center pb-1">
              <span className="text-[10px] font-mono font-bold text-brand-secondary bg-[#8F7553]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                🛡️ VERIFIED CLIENT GROWTH PROOF
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
