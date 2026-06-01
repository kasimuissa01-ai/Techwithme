import { motion } from "motion/react";
import { BookOpen, Calendar, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "../data";

export default function Blog() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="blog"
      className="bg-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-20 scroll-mt-[70px]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          >
            📚 Free Resources & Strategies
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1A2E] leading-tight mb-4 animate-fade-in">
            Faceless Content & Automated Income Strategies
          </h2>
          <p className="text-[#4E4E4E] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Step-by-step masterclasses on launching anonymous brands, designing templates, and converting organic Pinterest traffic.
          </p>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="h-1.5 w-12 bg-brand-primary rounded-full mx-auto mt-6"
          />
        </div>

        {/* Blog Post Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-brand-surface/30 rounded-2.5xl border border-brand-primary/5 shadow-sm overflow-hidden flex flex-col justify-between group h-full"
            >
              {/* Image Container with Dynamic Scale hover */}
              <div className="relative aspect-[1.6/1] overflow-hidden bg-brand-surface">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-brand-dark/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold uppercase px-3.5 py-1.5 rounded-full tracking-wider">
                  {post.readTime}
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-brand-primary/80 font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-dark leading-snug mb-3 group-hover:text-brand-primary transition-colors">
                    <a href={`#blog-${post.slug}`} className="hover:underline focus:outline-none focus:underline">
                      {post.title}
                    </a>
                  </h3>

                  <p className="text-brand-text/75 text-sm font-light leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-primary/5 flex items-center justify-between mt-auto">
                  <span className="text-xs sm:text-sm font-semibold text-brand-primary group-hover:text-brand-primary/80 transition-colors flex items-center gap-1.5">
                    Read Masterclass <BookOpen className="w-4 h-4" />
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
