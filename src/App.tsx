/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Products from "./components/Products";
import LeadMagnet from "./components/LeadMagnet";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import About from "./components/About";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BlogDetail from "./components/BlogDetail";
import { ProductItem } from "./data";
import WaitlistModal from "./components/WaitlistModal";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const blogParam = searchParams.get("blog") || searchParams.get("p");
    if (blogParam) {
      return `/blog/${blogParam}`;
    }
    return window.location.pathname;
  });
  const [selectedWaitlistProduct, setSelectedWaitlistProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    // Set official page document title as requested in design parameters
    document.title = "AI Income for Women — Earn Online Without Showing Your Face | TechWithKathim";
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const blogParam = searchParams.get("blog") || searchParams.get("p");
      if (blogParam) {
        setCurrentPath(`/blog/${blogParam}`);
      } else {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Intercept local anchors & paths to route them client-side cleanly
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Handle custom blog links or home path
      if (href.startsWith("/blog/") || href === "/") {
        e.preventDefault();
        window.history.pushState(null, "", href);
        window.dispatchEvent(new Event("popstate"));
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Handle anchor hash links from sub-pages
      if (href.startsWith("#")) {
        if (window.location.pathname !== "/") {
          e.preventDefault();
          window.history.pushState(null, "", "/" + href);
          window.dispatchEvent(new Event("popstate"));
        } else {
          // If on home, let browser or scroll handle it
          e.preventDefault();
          const id = href.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Handle scrolling when hash updates or lands on hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && currentPath === "/") {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    } else if (currentPath === "/") {
      // Just loaded root without hashes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPath]);

  const navigate = (to: string) => {
    window.history.pushState(null, "", to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine if reading a detailed blog post
  const isBlogDetail = currentPath.startsWith("/blog/") && currentPath !== "/blog" && currentPath !== "/blog/";
  const blogSlug = isBlogDetail ? currentPath.replace("/blog/", "") : "";

  return (
    <div className="min-h-screen bg-white text-brand-text selection:bg-brand-primary/15 selection:text-brand-primary overflow-x-hidden antialiased">
      {/* 1. GLOBAL STICKY NAVBAR */}
      <Navbar />

      {isBlogDetail ? (
        /* Renders Detailed Article Masterclass Route */
        <BlogDetail slug={blogSlug} onNavigate={navigate} onSelectProduct={setSelectedWaitlistProduct} />
      ) : (
        /* Renders Standard Main Homepage Layout */
        <>
          {/* 2. HERO SECTION */}
          <Hero />

          {/* 3. SOCIAL PROOF BAR */}
          <SocialProof />

          {/* 4. PROBLEM SECTION */}
          <Problem />

          {/* 5. SOLUTION SECTION */}
          <Solution />

          {/* 6. PRODUCTS SECTION */}
          <Products onSelectProduct={setSelectedWaitlistProduct} />

          {/* 7. FREE LEAD MAGNET SECTION */}
          <LeadMagnet />

          {/* 8. TESTIMONIAL SECTION */}
          <Testimonials />

          {/* 8.5. STRATEGY BLOG MASTERCLASSES */}
          <Blog />

          {/* 8.6. FAQ ACCORDION */}
          <FAQ />

          {/* 9. ABOUT SECTION */}
          <About />

          {/* 10. FINAL CTA SECTION */}
          <FinalCTA />
        </>
      )}

      {/* 11. FOOTER */}
      <Footer />

      {/* 12. WISHLIST / WAITLIST SUBSCRIPTION MODAL */}
      <WaitlistModal product={selectedWaitlistProduct} onClose={() => setSelectedWaitlistProduct(null)} />
    </div>
  );
}

