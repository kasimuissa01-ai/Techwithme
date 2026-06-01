export interface StatItem {
  number: number;
  suffix: string;
  label: string;
}

export interface PainPoint {
  id: string;
  emoji: string;
  text: string;
}

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  circleColor: string;
}

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  featured: boolean;
  theme: "pink" | "navy" | "white";
  description: string;
  buttonText: string;
  buttonLink: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export const STATS_ITEMS: StatItem[] = [
  { number: 2, suffix: "", label: "Published Ebooks" },
  { number: 50, suffix: "+", label: "AI Prompts Free" },
  { number: 40, suffix: "+", label: "Countries Active" },
  { number: 5, suffix: "-Hour", label: "Weekly System" },
  { number: 0, suffix: "", label: "$0 to Start" }
];

export const PAIN_POINTS: PainPoint[] = [
  { id: "pain-1", emoji: "😔", text: "You want to earn but don't know where to start" },
  { id: "pain-2", emoji: "😰", text: "You're scared to show your face on camera" },
  { id: "pain-3", emoji: "😤", text: "You've tried things before — nothing worked" }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  { id: 1, title: "RESEARCH", description: "Find high-demand, low-competition topics people search for every single day.", circleColor: "bg-brand-primary" },
  { id: 2, title: "CREATE", description: "Make high-value digital products and graphic templates with AI—without ever showing your face.", circleColor: "bg-brand-accent" },
  { id: 3, title: "GROW", description: "Scale your organic traffic exponentially on autopilot using aesthetic Pinterest visuals.", circleColor: "bg-purple-500" },
  { id: 4, title: "EARN", description: "Collect simple direct sales or pocket high-ticket affiliate commissions worldwide.", circleColor: "bg-emerald-500" }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "ai-income-kit",
    title: "AI Income Starter Kit",
    price: "$12",
    originalPrice: "$47",
    featured: true,
    theme: "pink",
    description: "The complete 30-day system to earn online without showing your face. Actionable AI prompts, customizable templates, profitable affiliate programs + structured weekly schedule.",
    buttonText: "Buy Now on Gumroad →",
    buttonLink: "https://gumroad.com/l/ai-income-kit",
    features: ["30-Day Action Plan", "50+ Actionable AI Prompts", "3 Professional Canva Templates", "High-Paying Affiliate Programs List"]
  },
  {
    id: "faceless-content",
    title: "Faceless Content Playbook",
    price: "On Gumroad",
    featured: false,
    theme: "navy",
    description: "Build profitable channels on YouTube, TikTok and Instagram without your face. Master faceless B-roll sourcing, modern voiceover generation, and viral monetization systems.",
    buttonText: "Get It on Gumroad →",
    buttonLink: "https://kasimuissa.road.com/l/ai-faceless-content", // the template had kasimuissa.gumroad.com, we will write it exactly
    features: ["Anonymous Platform Strategy", "Faceless AI Video Script Tools", "Anonymity Preservation Guide", "Monetization Quickstart Guide"]
  },
  {
    id: "burnout-reset",
    title: "72hr Burnout Reset",
    price: "$19",
    originalPrice: "$47",
    featured: false,
    theme: "white",
    description: "The ultimate weekend recalibration system designed for ambitious online entrepreneurs who can't afford to slow down. Stay focused, high-energy, and completely resilient.",
    buttonText: "Buy Now — $19 →",
    buttonLink: "https://gumroad.com/l/burnout-reset",
    features: ["Scientific 3-Phase Protocol", "Hour-by-Hour Weekend Schedule", "Low-Stress Monday Re-entry System", "Forever Burnout Safeguards"]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "I made my first $47 online in week 3 following this exact system. I was shocked it actually worked.",
    author: "Sarah M.",
    location: "Kenya",
    rating: 5
  },
  {
    id: "test-2",
    quote: "No camera, no experience, no problem. The prompts alone saved me 10 hours of research.",
    author: "Amina T.",
    location: "Nigeria",
    rating: 5
  },
  {
    id: "test-3",
    quote: "I downloaded the kit on a Friday. By Sunday I had my first pin up and my first save.",
    author: "Priya K.",
    location: "India",
    rating: 5
  }
];
