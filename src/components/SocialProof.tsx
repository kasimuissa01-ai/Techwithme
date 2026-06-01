import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { STATS_ITEMS, StatItem } from "../data";

interface StatCounterProps {
  item: StatItem;
  key?: any;
}

function StatCounter({ item }: StatCounterProps) {
  const { number, suffix, label } = item;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    // Return early if the number is 0
    if (number === 0) {
      setCount(0);
      return;
    }

    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          let start = 0;
          const duration = 1500; // Total animation length in ms
          const stepTime = 20; // Step interval in ms (~50 fps)
          const steps = duration / stepTime;
          const increment = number / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= number) {
              setCount(number);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [number, hasRun]);

  return (
    <div ref={ref} className="flex flex-col items-center px-4 py-2">
      <div className="flex items-center justify-center text-brand-secondary">
        <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent mr-1.5" />
        <span className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
          {number === 0 ? "0" : count}
          {suffix}
        </span>
      </div>
      <p className="text-[11px] sm:text-xs uppercase tracking-widest text-brand-secondary/80 font-medium mt-1 whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}

export default function SocialProof() {
  return (
    <div
      id="social-proof"
      className="bg-brand-dark border-y border-white/5 py-4 overflow-hidden relative z-20 scroll-mt-[70px]"
    >
      {/* Desktop & Tablet grid layout (hidden on mobile marquee) */}
      <div className="hidden sm:block max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] divide-x divide-white/10 items-center">
          {STATS_ITEMS.map((item, index) => (
            <StatCounter
              key={index}
              item={item}
            />
          ))}
        </div>
      </div>

      {/* Mobile continuous marquee slider layout */}
      <div className="block sm:hidden relative w-full overflow-hidden whitespace-nowrap py-1">
        <motion.div
          className="inline-flex gap-12"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          }}
        >
          {/* Duplicate double to allow seamless continuous wrap slider */}
          {[...STATS_ITEMS, ...STATS_ITEMS, ...STATS_ITEMS].map((item, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center justify-center min-w-[150px]"
            >
              <div className="flex items-center text-brand-secondary">
                <Star className="w-3 h-3 fill-brand-accent text-brand-accent mr-1.5" />
                <span className="font-serif text-lg font-extrabold text-[#FFFFFF]">
                  {item.number}
                  {item.suffix}
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-brand-secondary/85 font-semibold mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
