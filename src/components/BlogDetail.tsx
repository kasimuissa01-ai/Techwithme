import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Clock, Calendar, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, BlogPost, PRODUCTS, ProductItem } from "../data";

interface BlogDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export default function BlogDetail({ slug, onNavigate, onSelectProduct }: BlogDetailProps) {
  // Find the post representing this slug
  const post = BLOG_POSTS.find((p) => p.slug === slug);

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
