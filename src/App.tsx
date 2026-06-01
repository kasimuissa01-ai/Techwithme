/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
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

export default function App() {
  useEffect(() => {
    // Set official page document title as requested in design parameters
    document.title = "AI Income for Women — Earn Online Without Showing Your Face | TechWithKathim";
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-text selection:bg-brand-primary/15 selection:text-brand-primary overflow-x-hidden antialiased">
      {/* 1. STICKY NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <Hero />

      {/* 3. SOCIAL PROOF BAR */}
      <SocialProof />

      {/* 4. PROBLEM SECTION */}
      <Problem />

      {/* 5. SOLUTION SECTION */}
      <Solution />

      {/* 6. PRODUCTS SECTION */}
      <Products />

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

      {/* 11. FOOTER */}
      <Footer />
    </div>
  );
}

