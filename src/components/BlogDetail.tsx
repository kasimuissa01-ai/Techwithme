import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Clock, Calendar, ShieldCheck, Heart, Award, ArrowUpRight, Share2, Copy, Check, ExternalLink } from "lucide-react";
import { BLOG_POSTS, BlogPost, PRODUCTS, ProductItem } from "../data";

interface BlogDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export default function BlogDetail({ slug, onNavigate, onSelectProduct }: BlogDetailProps) {
  // Find the post representing this slug
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const [copiedClean, setCopiedClean] = useState(false);
  const [copiedBulletproof, setCopiedBulletproof] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pt-28">
        <h2 className="font-serif text-3xl font-extrabold text-[#1A1A2E] mb-4">
          Masterclass Not Found
        </h2>
        <p className="text-brand-text/75 mb-6 text-center">
          The requested strategy masterclass may have been updated or moved.
        </p>
        <button
          onClick={() => onNavigate("/")}
          className="px-6 py-3 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-primary/90 transition-all cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 selection:bg-brand-primary/10 select-none">
      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => onNavigate("/")}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Masterclasses</span>
          </button>
        </motion.div>

        {/* Title & Metadata Header */}
        <header className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3.5xl sm:text-4.5xl md:text-5xl font-extrabold text-brand-dark leading-tight tracking-tight mb-6"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-brand-text/60 border-y border-brand-primary/10 py-4"
          >
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-brand-primary" />
              <span>Published: {post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-brand-primary" />
              <span>Reading Time: {post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-4 h-4 text-brand-primary" />
              <span>Topic: Faceless System</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium ml-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified AI Strategy</span>
            </div>
          </motion.div>
        </header>

        {/* Large Aesthetic Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-md border border-brand-primary/5 mb-12 bg-brand-surface"
        >
          <img
            src={post.image.replace("w=400&h=250", "w=1200&h=600")}
            alt={post.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>

        {/* Main Body Contents */}
        <div className="prose max-w-none text-brand-text/85">
          {/* Article Introduction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl font-light text-brand-dark/95 leading-relaxed mb-8 border-l-4 border-brand-primary/30 pl-5 italic"
          >
            {post.intro}
          </motion.p>

          {/* Section Rendering Loop */}
          <div className="space-y-10">
            {post.sections.map((sec, idx) => {
              switch (sec.type) {
                case "h2":
                  return (
                    <h2
                      key={idx}
                      className="font-serif text-2.5xl sm:text-3xl font-bold text-brand-dark mt-12 mb-4 flex items-center gap-2.5 leading-snug"
                    >
                      <span className="h-7 w-1.5 bg-brand-primary rounded-full inline-block" />
                      {sec.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3
                      key={idx}
                      className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mt-8 mb-3"
                    >
                      {sec.text}
                    </h3>
                  );
                case "p":
                  return (
                    <p
                      key={idx}
                      className="text-base sm:text-lg text-brand-text/85 leading-relaxed font-light mb-6"
                    >
                      {sec.text}
                    </p>
                  );
                case "quote":
                  return (
                    <div
                      key={idx}
                      className="my-10 px-8 py-7 bg-brand-surface rounded-2.5xl border-l-[6px] border-brand-primary relative"
                    >
                      <span className="absolute top-2 left-3 font-serif text-6xl text-brand-primary/10 select-none">
                        “
                      </span>
                      <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-brand-dark italic leading-relaxed relative z-10">
                        {sec.text}
                      </p>
                    </div>
                  );
                case "list":
                  return (
                    <div key={idx} className="mb-6">
                      <p className="text-base sm:text-lg text-brand-dark font-medium mb-4">
                        {sec.text}
                      </p>
                      <ul className="space-y-3.5 pl-1">
                        {sec.items?.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-3.5 text-brand-text/80 text-sm sm:text-base font-light"
                          >
                            <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                              <Heart className="w-3 h-3 fill-current" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Pinterest & Link Sharing Companion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-14 p-6 sm:p-8 bg-[#FFF9FB] rounded-3xl border border-brand-primary/10 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-brand-primary/10 rounded-2xl hidden sm:block">
              <Share2 className="w-6 h-6 text-brand-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg sm:text-lg font-bold text-brand-dark mb-1 flex items-center gap-2">
                <span className="sm:hidden">📌</span> Pinterest Publishing Companion
              </h3>
              <p className="text-brand-text/75 text-xs sm:text-sm font-light leading-relaxed mb-6">
                Pinning this masterclass to Pinterest or sharing on social media? Use these optimized, pre-rendered links to guarantee rich imagery and prevent any broken clicks!
              </p>

              <div className="space-y-4">
                {/* Clean URL Option */}
                <div className="bg-white p-4 rounded-2xl border border-brand-primary/5 shadow-inner">
                  <div className="flex items-center justify-between gap-4 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-brand-secondary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Option A: Standard Clean Link (Pre-rendered for Pinterest Rich Pins)
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                      SEO Optimized
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-text/60 leading-tight mb-3">
                    Perfect for visual pins. Pinterest's crawl engines will automatically read this direct URL, fetch of our rich OpenGraph layout, and display your article title and metadata beautifully!
                  </p>
                  <div className="flex items-center gap-2 bg-brand-surface p-2 rounded-xl border border-brand-primary/5">
                    <span className="text-xs font-mono text-brand-dark/70 truncate flex-1 px-1">
                      {typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : `https://linkamarket.co.tz/blog/${post.slug}`}
                    </span>
                    <button
                      onClick={() => {
                        const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : `https://linkamarket.co.tz/blog/${post.slug}`;
                        navigator.clipboard.writeText(url);
                        setCopiedClean(true);
                        setTimeout(() => setCopiedClean(false), 2000);
                      }}
                      className="px-3 py-1.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      {copiedClean ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Bulletproof Redirect Option */}
                <div className="bg-white p-4 rounded-2xl border border-brand-primary/5 shadow-inner">
                  <div className="flex items-center justify-between gap-4 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-[#E67E22] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                      Option B: Universal Fallback Link (100% immune to 404 server errors)
                    </span>
                    <span className="text-[10px] text-brand-primary bg-[#FFF0F5] px-2.5 py-0.5 rounded-full font-semibold">
                      Bulletproof Redirect
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-text/60 leading-tight mb-3">
                    Recommended fallback. This accesses your primary home root with safe URL params to land people immediately on this article, bypassing any potential server configuration errors on customized platforms!
                  </p>
                  <div className="flex items-center gap-2 bg-brand-surface p-2 rounded-xl border border-brand-primary/5">
                    <span className="text-xs font-mono text-brand-dark/70 truncate flex-1 px-1">
                      {typeof window !== "undefined" ? `${window.location.origin}/?p=${post.slug}` : `https://linkamarket.co.tz/?p=${post.slug}`}
                    </span>
                    <button
                      onClick={() => {
                        const url = typeof window !== "undefined" ? `${window.location.origin}/?p=${post.slug}` : `https://linkamarket.co.tz/?p=${post.slug}`;
                        navigator.clipboard.writeText(url);
                        setCopiedBulletproof(true);
                        setTimeout(() => setCopiedBulletproof(false), 2000);
                      }}
                      className="px-3 py-1.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      {copiedBulletproof ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Pin-it trigger helper */}
              <div className="mt-5 flex justify-end gap-3">
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : `https://linkamarket.co.tz/blog/${post.slug}`
                  )}&media=${encodeURIComponent(post.image)}&description=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#BD081C] hover:bg-[#AD071A] text-white text-xs font-extrabold rounded-full transition-colors font-sans shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M12 0C5.372 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.17-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.992 3.993-.283 1.194.599 2.169 1.775 2.169 2.13 0 3.769-2.247 3.769-5.49 0-2.87-2.061-4.878-5.01-4.878-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.042-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.628 0 12-5.372 12-12 0-6.628-5.372-12-12-12z"/></svg>
                  <span>Publish Instant Pinterest Pin</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* High-Converting Product Callout Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 sm:p-10 bg-brand-dark rounded-3xl text-white relative overflow-hidden shadow-xl border border-white/5"
        >
          {/* Ambient visual background glow details */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-44 h-44 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-accent mb-4">
                <Award className="w-3.5 h-3.5" /> Stop Dreaming. Start Earning.
              </div>
              <h3 className="font-serif text-2.5xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                Grab the Official AI Faceless Starter Kit
              </h3>
              <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                Ready to turn these masterclass concepts into a reliable, automated platform? Our premium 30-day starter kit gives you the exact copy-paste prompts, beautiful pre-made Canva templates, and standard instructions.
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 text-xs text-brand-secondary">
                <span className="flex items-center gap-1 bg-white/5 py-1 px-3 rounded-full border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" /> Done-for-you Action Plan
                </span>
                <span className="flex items-center gap-1 bg-white/5 py-1 px-3 rounded-full border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" /> 50+ Custom Prompts
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 text-center md:text-right flex flex-col items-center">
              <div className="mb-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand-secondary">
                  Special Offer
                </span>
                <div className="flex items-end justify-center md:justify-end gap-2 mt-1">
                  <span className="text-3.5xl sm:text-4xl font-extrabold text-white">
                    $6
                  </span>
                  <span className="text-sm line-through text-white/40 mb-1">
                    $47
                  </span>
                </div>
              </div>

              <motion.button
                onClick={() => {
                  const kit = PRODUCTS.find((p) => p.id === "ai-income-kit");
                  if (kit) onSelectProduct(kit);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-brand-dark bg-white hover:bg-brand-secondary/90 hover:text-white font-bold shadow-lg transition-all cursor-pointer"
              >
                Join VIP Waitlist <ArrowUpRight className="ml-2 w-4.5 h-4.5" />
              </motion.button>
              <span className="text-[10px] text-white/50 mt-2 block italic">
                75% discount voucher included
              </span>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
