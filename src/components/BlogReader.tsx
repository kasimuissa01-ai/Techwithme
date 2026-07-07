import React, { useState } from "react";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "../data";

// Import Google Analytics and Mixpanel trackers
import { gaTrackPageView, gaTrackEvent } from "../lib/gtag";
import { mixpanelTrackPageView, mixpanelTrack } from "../lib/mixpanel";

export default function BlogReader() {
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find(p => p.id === activePostId);

  const handlePostClick = (postId: string) => {
    setActivePostId(postId);
    window.scrollTo({ top: 350, behavior: "smooth" });

    // Track the read action and individual article page views
    const post = BLOG_POSTS.find(p => p.id === postId);
    if (post) {
      const blogPath = `/blog/${post.slug}`;
      gaTrackPageView(blogPath);
      mixpanelTrackPageView(blogPath);

      gaTrackEvent("read_blog_post", {
        post_id: postId,
        post_title: post.title,
        post_slug: post.slug
      });
      mixpanelTrack("Read Blog Post", {
        post_id: postId,
        post_title: post.title,
        post_slug: post.slug
      });
    }
  };

  const handleBack = () => {
    setActivePostId(null);
    window.scrollTo({ top: 350, behavior: "smooth" });

    // Track return back to home directory view
    gaTrackPageView("/");
    mixpanelTrackPageView("/");
  };

  if (activePost) {
    return (
      <div className="bg-white border border-[#E9E2D5] rounded-3xl p-6 md:p-8 text-[#2D2A26] max-w-4xl mx-auto flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out] shadow-sm">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FCFAF7] hover:bg-white border border-[#E9E2D5] hover:border-[#C5A880]/50 transition-colors text-xs font-bold uppercase tracking-wider text-[#8F7553] hover:text-[#C5A880]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </button>

        {/* Article Metadata Header */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-400 uppercase font-bold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              {activePost.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              {activePost.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="text-[#8F7553]">Creator Blueprint</span>
          </div>

          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-[#2D2A26] leading-tight">
            {activePost.title}
          </h2>
          
          <p className="text-xs md:text-sm text-zinc-500 font-sans italic leading-relaxed pl-4 border-l-2 border-[#C5A880] font-light">
            {activePost.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#E9E2D5] shadow-sm relative">
          <img
            src={activePost.image}
            alt={activePost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Intro Paragraph */}
        <div className="font-sans text-xs md:text-sm text-zinc-600 leading-relaxed font-light mt-2">
          {activePost.intro}
        </div>

        {/* Render sections dynamically */}
        <div className="flex flex-col gap-6 mt-2">
          {activePost.sections.map((sec, i) => {
            if (sec.type === "h2") {
              return (
                <h3 key={i} className="text-base md:text-lg font-bold tracking-tight text-[#2D2A26] border-b border-[#F2ECE2] pb-2 mt-4">
                  {sec.text}
                </h3>
              );
            }
            if (sec.type === "h3") {
              return (
                <h4 key={i} className="text-xs md:text-sm font-bold tracking-tight text-[#8F7553] mt-2">
                  {sec.text}
                </h4>
              );
            }
            if (sec.type === "quote") {
              return (
                <blockquote key={i} className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#E9E2D5] border-l-4 border-l-[#C5A880] font-serif italic text-xs md:text-sm text-zinc-600 leading-relaxed">
                  "{sec.text}"
                </blockquote>
              );
            }
            if (sec.type === "list" && sec.items) {
              return (
                <div key={i} className="flex flex-col gap-3">
                  <p className="text-xs font-bold text-zinc-700">{sec.text}</p>
                  <ul className="flex flex-col gap-2 pl-4">
                    {sec.items.map((item, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-zinc-500 font-sans font-light leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return (
              <p key={i} className="text-xs text-zinc-500 leading-relaxed font-sans font-light">
                {sec.text}
              </p>
            );
          })}
        </div>

        {/* Footer info in active reader */}
        <div className="flex justify-between items-center border-t border-[#F2ECE2] pt-6 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 text-[#8F7553] flex items-center justify-center font-bold text-xs border border-[#E9E2D5]">
              K
            </div>
            <span className="text-xs text-zinc-500 font-bold">Written by Coach Kathim</span>
          </div>

          <button
            onClick={handleBack}
            className="text-xs font-bold uppercase tracking-wider text-[#8F7553] hover:text-[#C5A880] transition-colors"
          >
            Return to Index
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {BLOG_POSTS.map((post) => (
        <div
          key={post.id}
          onClick={() => handlePostClick(post.id)}
          className="group rounded-3xl bg-white border border-[#E9E2D5] hover:border-[#C5A880] cursor-pointer overflow-hidden flex flex-col h-full transition-all shadow-sm hover:shadow-md"
        >
          {/* Post Image Banner */}
          <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#FAF8F5]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-500 bg-white/90 px-2 py-1 rounded-md border border-[#E9E2D5]">
                <Clock className="w-3 h-3 text-[#C5A880]" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Post Body */}
          <div className="p-5 flex-1 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono text-[#8F7553] font-bold uppercase tracking-wider">
                {post.date}
              </span>
              <h3 className="text-sm font-extrabold tracking-tight text-[#2D2A26] group-hover:text-[#8F7553] leading-snug transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans font-light line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#8F7553] uppercase tracking-widest group-hover:text-[#C5A880] transition-colors">
              Read Insights <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
