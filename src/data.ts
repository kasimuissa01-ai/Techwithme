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
    price: "$6",
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogSection {
  type: "p" | "h2" | "h3" | "quote" | "list";
  text: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime: string;
  image: string;
  date: string;
  intro: string;
  sections: BlogSection[];
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Do I really not have to show my face?",
    answer: "Yes, exactly! This system is 100% designed for faceless creators. You will learn how to use aesthetic stock footage, AI-generated voices, text-on-screen overlays, and Pinterest visuals to drive massive traffic without ever turning the camera on yourself."
  },
  {
    question: "How much money do I need to get started?",
    answer: "You can start with $0. We focus exclusively on organic, free traffic platforms like Pinterest and search engines, and teach you how to use free tiers of AI content creation tools. Your direct start-off cost can literally be zero."
  },
  {
    question: "Is this beginner friendly if I have no experience?",
    answer: "Absolutely. We don't assume you have any coding, graphic design, or online marketing experience. We give you the exact copy-paste prompts, beautiful pre-made Canva templates, and standard instructions designed to take you from absolute zero to launch."
  },
  {
    question: "How soon can I expect my first results?",
    answer: "While results vary based on effort and niche, our structured 30-day plan is designed to help you launch your platform and start earning affiliate saves or sales within the first 3 or 4 weeks."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "How to Build a Faceless Brand on Pinterest in 2026",
    slug: "faceless-pinterest-brand",
    excerpt: "Stop overcomplicating traffic. Discover how aesthetic Pinterest visual boards can generate thousands of automated visitors without showing your face.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&q=80&w=400&h=250",
    date: "May 25, 2026",
    intro: "Pinterest is one of the most misunderstood platforms on the internet today. While most creators treat it as another social feed, top earners know it is actually a visual search engine. Users don't visit Pinterest to see your face—they visit to discover ideas, solutions, and digital resources.",
    sections: [
      {
        type: "h2",
        text: "The Power of Visual Intent"
      },
      {
        type: "p",
        text: "Unlike platforms like Instagram or TikTok, which rely heavily on personality-driven video and algorithm interest-graphs, Pinterest caters directly to active search intent. When someone types 'how to earn online' or 'faceless content templates' into the Pinterest search bar, they are literally raising their hand for your solutions. This means you have zero need to show your face; your content is judged purely on the utility and aesthetic appeal of your pins."
      },
      {
        type: "h2",
        text: "Step 1: Optimize Your Profile Search Performance"
      },
      {
        type: "p",
        text: "To capture high-quality organic traffic, your profile needs to act as a keyword magnet. Instead of a vague handle, use clear, keyword-optimised names such as 'LinkaMarket | Passive AI Systems' or 'Aesthetic Wealth with Kath'. This ensures Pinterest indexes your profile under high-value niches."
      },
      {
        type: "h2",
        text: "Step 2: Create Aesthetic, High-Click Pins in Canva"
      },
      {
        type: "p",
        text: "Pinterest users are highly receptive to beautiful typography, harmonious color palettes, and elegant layouts. High-converting pins typically feature soft rose, off-white, or luxurious deep charcoal backgrounds paired with bold, clean typography."
      },
      {
        type: "list",
        text: "Make sure all your pins include these high-converting visual triggers:",
        items: [
          "High-contrast, bold headlines that trigger immediate curiosity",
          "Soft aesthetic stock imagery or beautiful b-roll overlays",
          "A small, elegant call-to-action bar (e.g., 'Free Starter Guide in Bio')",
          "Clean margins and spacious padding for maximum premium feel"
        ]
      },
      {
        type: "quote",
        text: "The secret to scaling Pinterest isn't virality—it's high-intent discovery. One well-designed pin can generate targeted, high-converting clicks for months or even years."
      }
    ]
  },
  {
    id: "blog-2",
    title: "Top 7 AI Tools for Headless Content Creation",
    slug: "top-ai-tools-headless-content",
    excerpt: "We tested 30+ tools. Here are the precise AI text-to-speech, transcription, scriptwriting, and visual editors designed to save you 20 hours a week.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=250",
    date: "May 28, 2026",
    intro: "The rise of generative AI has completely eliminated the traditional barriers to media production. Today, a single creator can research, write, narrate, edit, and publish high-converting content in a fraction of the time, all while maintaining absolute personal anonymity.",
    sections: [
      {
        type: "h2",
        text: "The Headless Content Creator's Stack"
      },
      {
        type: "p",
        text: "Creating premium, headless content requires a suite of reliable tools that integrate seamlessly. Based on extensive real-world testing, these seven tools stand out for their efficiency, high output quality, and beginner-friendly user interfaces."
      },
      {
        type: "h2",
        text: "1. ElevenLabs (Ultra-Realistic Text-to-Speech)"
      },
      {
        type: "p",
        text: "In faceless video marketing, audio quality can make or break your audience retention. ElevenLabs offers incredibly real, authentic, warm voiceovers that sound completely human. You can choose from thousands of synthetic or cloned voices to matches your brand's specific tone and vibe."
      },
      {
        type: "h2",
        text: "2. Canva (Graphic Designs & Slide Layouts)"
      },
      {
        type: "p",
        text: "Canva is an indispensable powerhouse for creating viral Pinterest carousels, aesthetic cover mockups, and neat social feeds. Our AI Income Starter Kit includes fully customizable, pre-made Canva templates to give you a head start."
      },
      {
        type: "list",
        text: "Other core components of our high-velocity AI publishing stack:",
        items: [
          "Claude - Best-in-class conversational model for writing organic educational hooks and pins",
          "CapCut Desktop - The absolute gold standard for auto-captions and slick visual animations",
          "Loom / Screenity - For recording quick, anonymous digital walkthroughs and template tutorials",
          "ChatGPT - For brainstorming limitless high-intent content keywords and niches"
        ]
      },
      {
        type: "quote",
        text: "By mastering these tools, you can automate up to 80% of your production pipeline, turning content creation into a high-leverage 5-hour-a-week system."
      }
    ]
  },
  {
    id: "blog-3",
    title: "From $0 to $3,000/Month: The Passive Affiliate Blueprint",
    slug: "monthly-passive-affiliate-blueprint",
    excerpt: "The exact scaling framework. Learn which niches convert best, how to select premium affiliate offers, and the simple way to place links anonymously.",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=250",
    date: "May 30, 2026",
    intro: "Building an online income is not about working harder—it is about implementing low-stress, automated, high-converting funnels. This guide details the exact blueprint to take your faceless platform from absolute zero to $3,000 per month.",
    sections: [
      {
        type: "h2",
        text: "Phase 1: Choose Your Core Monetization Niche"
      },
      {
        type: "p",
        text: "Not all niches are created equal. The highest-converting and most profitable areas for anonymous publishers are centered around Wealth (budgeting, side hustles, investing), Relationships (advice, mindfulness, family), and Personal Growth (time management, mental resilience)."
      },
      {
        type: "h2",
        text: "Phase 2: Source High-Value Digital Products"
      },
      {
        type: "p",
        text: "Rather than building complex software from scratch, you can partner with existing brands under affiliate models. Alternatively, distribute high-converting digital templates or starter guides (like our own AI Income Starter Kit) that require zero inventory and deliver 100% net margins instantly."
      },
      {
        type: "h2",
        text: "Phase 3: The 30-Day Conversion Funnel"
      },
      {
        type: "p",
        text: "To scale your revenue to a steady $3,000/month, you need of system that automatically captures warm traffic and guides them to your product offerings. Use our free faceless guide to collect emails, then supply valuable, automated email newsletters containing high-converting links."
      },
      {
        type: "list",
        text: "The three core principles to maintain anonymous success:",
        items: [
          "Never link directly to messy unbranded affiliate pages—use clean redirects or landing pages instead",
          "Focus on delivering high-value digital guides before presenting a checkout button",
          "Automate your lead caputuring with secure tools like Gumroad or standard opt-in systems"
        ]
      },
      {
        type: "quote",
        text: "Consistency over complexity. By publishing 5 high-intent visual pins or short educational formats a week, you build a durable digital asset that earns passive income on autopilot."
      }
    ]
  },
  {
    id: "blog-4",
    title: "How to Earn Online Without Showing Your Face: The Smart Woman's Guide",
    slug: "how-to-earn-online-without-showing-face",
    excerpt: "The complete step-by-step roadmap for women to build steady digital income streams anonymously. Turn your standard browser and smartphone into an income engine.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=400&h=250",
    date: "June 2, 2026",
    intro: "Many women dream of starting an online side-hustle but feel completely blocked by one major issue: the pressure to put their personal life, body, and face on camera. Thankfully, in 2026, the digital landscape is going through a massive shift. Using simple, free smartphone apps and a standard web browser, you can establish an anonymous digital brand that collects passive payouts while you remain 100% behind the scenes.",
    sections: [
      {
        type: "h2",
        text: "Why 'Faceless' is the Perfect Strategy for Busy Women"
      },
      {
        type: "p",
        text: "Whether you are a busy mother managing a household, a full-time professional wishing to keep your side projects private from your employer, or simply an introverted woman who values her peace of mind, faceless creator systems are the ultimate solution. By separating your personal identity from your business, you unlock incredible freedom. You do not need to style your hair, buy expensive cameras, or worry about online judgment. Your business is judged solely on the value it provides, not on who you are."
      },
      {
        type: "h2",
        text: "Your Smartphone is Your Complete Business Command Center"
      },
      {
        type: "p",
        text: "You do not need a fancy, high-end laptop or a professional studio setup to get started. In fact, most of our successful students run their entire automated systems directly from their smartphones. By downloading three simple, free apps, you can construct a high-converting digital storefront in your spare moments."
      },
      {
        type: "list",
        text: "Download these three vital tools on your phone to start immediately:",
        items: [
          "Canva Mobile App - To edit gorgeous, pre-made aesthetic templates, guides, and visual pins on the go",
          "Pinterest Client - To research what high-intent keywords other women are searching for and post visual cards",
          "CapCut Mobile or standard phone video editors - To layer aesthetic, free stock video clips with short, high-value text overlays"
        ]
      },
      {
        type: "h2",
        text: "Step 1: Choose a Highly Profitable Visual Niche"
      },
      {
        type: "p",
        text: "The golden rule of anonymous earning is to speak to topics that other women already search for. The absolute highest converting subjects on search engines and Pinterest include positive mental habits, saving and budgeting secrets, home organization hacks, and digital templates. Pick one topic that resonates with you and align it with simple affiliate programs or done-for-you digital downloads."
      },
      {
        type: "h2",
        text: "Step 2: Package Value into Simple Digital Products"
      },
      {
        type: "p",
        text: "You do not need to write a massive 200-page academic textbook to make money. Instead, focus on small, highly actionable resources like a '30-Day Aesthetic Savings Tracker' or a bundle of '20 Ready-to-use Social Media Graphic Prompts'. Our AI Income Starter Kit teaches you how to use free AI writing assistants and Canva layouts to cook up these high-demand helpers in just single afternoon."
      },
      {
        type: "h2",
        text: "Step 3: Collect Anonymous Payouts on Autopilot"
      },
      {
        type: "p",
        text: "Once your digital guide or tracker is ready, host it on a secure, beginner-friendly payment platform like Gumroad. It is free to list your products, and they handle everything—including global security checks, customer delivery, and sending your earnings directly to your bank account or PayPal. All you have to do is place your free Gumroad link in your Pinterest profile biography."
      },
      {
        type: "quote",
        text: "You are only one simple, automated funnel away from financial peace of mind. By spending just 30 to 45 minutes a day crafting beautiful visual pins with your phone, you build an automated system that earns while you sleep."
      }
    ]
  }
];

