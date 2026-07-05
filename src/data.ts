export interface StatItem {
  number: string;
  suffix: string;
  label: string;
}

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

export const STATS_ITEMS: StatItem[] = [
  { number: "4.2M+", suffix: "Views", label: "Gained in 3 Weeks" },
  { number: "10K+", suffix: "Followers", label: "Organic Growth" },
  { number: "100%", suffix: "Private", label: "Faceless & Anonymous" },
  { number: "$5", suffix: "Promo", label: "Limited Time Offer" }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the AI Video Virality Prompt Pack?",
    answer: "It is our premium, secret vault of highly engineered text-to-video prompt recipes, visual hook frameworks, and aesthetic audio-sync guidelines. It teaches you step-by-step how to generate hyper-viral vertical videos for Instagram and TikTok without ever showing your face or speaking on camera."
  },
  {
    question: "How did you reach 4 million views and 10,000 followers in 3 weeks?",
    answer: "By combining three modern pillars: highly specific AI-generated lifestyle b-roll, high-curiosity psychological text-on-screen hooks, and trending audio tempos. Our prompt pack outlines the exact mathematical prompt templates and posting schedules we used to trigger the Instagram algorithm to push our reels to millions of feeds."
  },
  {
    question: "What is your refund guarantee?",
    answer: "We stand behind our prompts 100%. If you use our copy-paste prompt formulas consistently for 3 weeks and do not get video growth results, we will refund your money entirely. No questions asked."
  },
  {
    question: "Is the prompt pack available right now?",
    answer: "We are currently completing the final preparation, formatting, and performance testing for the prompt pack. By entering your email in our secure wishlist form, you secure your spot on the exclusive waitlist, locking in the special $5 launch price (normally $47) and receiving an instant alert the second it goes live today!"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The 3-Week Instagram Blueprint: From 0 to 4.2 Million Views Faceless",
    slug: "instagram-virality-blueprint",
    excerpt: "Discover the exact viral algorithm system we used to scale an anonymous page to millions of organic impressions and over 10,000 followers in 21 days.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600&h=350",
    date: "July 2, 2026",
    intro: "The old way of growing on Instagram is officially dead. You no longer need to spend hours filming yourself, purchasing expensive DSLR cameras, or hiring professional video editors. A new wave of anonymous creators is dominating the reels feed using generative AI video prompts and highly calculated psychological hooks.",
    sections: [
      {
        type: "h2",
        text: "The Power of Algorithmic Loop Hooks"
      },
      {
        type: "p",
        text: "Instagram's recommendation engine is governed by a simple, dominant metric: watch time. When a user watches your 6-second aesthetic video loop multiple times because they are reading an extremely engaging, high-curiosity paragraph, the algorithm categorizes your content as 'highly addictive'. It immediately pushes it to thousands, then millions, of Explore pages."
      },
      {
        type: "h2",
        text: "The AI Tools We Recommend"
      },
      {
        type: "p",
        text: "Our entire video workflow takes less than 15 minutes a day. We use a selected list of free and low-cost tools to generate premium lifestyle b-roll and pair them with trending audio cues:"
      },
      {
        type: "list",
        text: "To recreate this system, you only need three core components:",
        items: [
          "Canva or CapCut for overlaying neat typography and managing transitions",
          "Our custom Midjourney/Runway prompt recipes to generate luxurious, high-end neutral stock clips",
          "ElevenLabs for warm, authentic, human-like voice narration overlay"
        ]
      },
      {
        type: "quote",
        text: "By focusing on high-intent video templates rather than personal lifestyle vlogging, you build a media asset that drives traffic 24/7 while maintaining complete personal privacy."
      }
    ]
  },
  {
    id: "blog-2",
    title: "The Psychology of Viral Hook Writing: How to Stop the Scroll Instantly",
    slug: "psychology-viral-hooks",
    excerpt: "Stop writing boring captions. Master the five curiosity-trigger frameworks that make viewers spend 5x longer on your faceless reels.",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=600&h=350",
    date: "July 1, 2026",
    intro: "If your video does not capture attention in the first 1.5 seconds, it is dead on arrival. With average attention spans dropping below 3 seconds, successful faceless creators must master visual copywriting.",
    sections: [
      {
        type: "h2",
        text: "The Three Curiosity Triggers"
      },
      {
        type: "p",
        text: "Our prompt pack teaches you how to construct headlines that leverage specific cognitive triggers:"
      },
      {
        type: "list",
        text: "The three most viral copywriting frameworks we use:",
        items: [
          "The Negative Gap: 'Why 99% of people fail to grow on Instagram (and the 1 prompt that fixes it)...'",
          "The Quiet Luxury Secret: 'The silent 15-minute routine that gained me 10k followers while sleeping...'",
          "The Step-By-Step Recipe: 'How to make AI generate your entire week of vertical content in 1 click...'"
        ]
      },
      {
        type: "quote",
        text: "A perfect hook doesn't tell the whole story. It opens a curiosity loop that the reader can only close by reading your full caption or watching the video till the end."
      }
    ]
  }
];
