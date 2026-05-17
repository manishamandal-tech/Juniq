"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Star } from "lucide-react";

const stats = [
  { number: 60, suffix: "+", label: "Years Legacy", highlight: true },
  { number: 17, suffix: "", label: "Colleges" },
  { number: 5000, suffix: "+", label: "Students", highlight: true },
  { number: 40, suffix: "+", label: "Faculty" },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const step = () => {
            const progress = Math.min((Date.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero({ onApplyClick }: { onApplyClick?: () => void }) {
  const [videoModal, setVideoModal] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-jg-navy" />
      <div className="absolute inset-0 bg-gradient-to-br from-jg-navy-2/80 via-jg-navy to-jg-navy" />

      {/* Radial glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-jg-gold/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Decorative arc */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none">
        <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
          <circle cx="600" cy="300" r="250" stroke="url(#gold-gradient)" strokeWidth="1" />
          <circle cx="600" cy="300" r="350" stroke="url(#gold-gradient)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 bg-jg-gold/10 border border-jg-gold/25 text-jg-gold text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
              <Star className="w-3 h-3 fill-current" />
              Admissions Open 2026–27
            </div>

            <div style={{ animation: "fadeUp 0.6s ease 0.2s both" }}>
              <h1 className="font-playfair font-black leading-[1.1]">
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white block">Shape Your</span>
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gradient-gold block">Future at</span>
                <span className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white block">JG University</span>
              </h1>
            </div>

            <p className="text-white/50 text-base lg:text-lg leading-relaxed max-w-lg font-dm"
              style={{ animation: "fadeUp 0.6s ease 0.35s both" }}>
              A UGC-approved, tech-driven university in Ahmedabad empowering students with
              experiential learning, industry-ready skills, and global exposure since 1965.
            </p>

            <div className="flex flex-wrap items-center gap-4" style={{ animation: "fadeUp 0.6s ease 0.5s both" }}>
              <button
                onClick={onApplyClick}
                className="btn-gold-hover inline-flex items-center gap-2 bg-gradient-to-r from-jg-gold to-jg-gold-dark text-jg-navy font-semibold px-7 py-3.5 rounded-xl text-sm lg:text-base"
              >
                Explore Programmes
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setVideoModal(true)}
                className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-200 group"
              >
                <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center group-hover:border-jg-gold/40 group-hover:bg-jg-gold/5 transition-all duration-300">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <span className="text-sm font-medium">Watch Video</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2" style={{ animation: "fadeUp 0.6s ease 0.6s both" }}>
              {["UGC Approved", "NAAC Accredited", "Est. 1965"].map((badge) => (
                <span key={badge} className="text-xs text-white/40 border border-white/10 px-3 py-1.5 rounded-lg font-dm">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-4" style={{ animation: "fadeUp 0.6s ease 0.4s both" }}>
            {stats.map((stat, i) => (
              <div key={stat.label}
                className={`stat-card-hover rounded-2xl p-6 lg:p-8 ${stat.highlight ? "glass-card-gold" : "glass-card"}`}
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                <div className={`font-playfair font-bold text-3xl lg:text-4xl xl:text-5xl mb-2 ${stat.highlight ? "text-gradient-gold" : "text-white"}`}>
                  <CountUp target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 text-xs lg:text-sm tracking-wide font-dm">{stat.label}</div>
              </div>
            ))}
            <div className="col-span-2 glass-card rounded-2xl p-5 flex items-center gap-4 stat-card-hover">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-xs">IBM</span>
              </div>
              <div>
                <div className="text-white/80 text-sm font-semibold">Industry Partnerships</div>
                <div className="text-white/35 text-xs mt-0.5">IBM · ISRO · SAC · 15+ more</div>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 lg:mt-20" style={{ animation: "fadeUp 0.6s ease 0.8s both" }}>
          <div className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-xs tracking-widest uppercase font-dm">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModal(false)}>
          <div className="bg-jg-navy border border-white/10 rounded-2xl p-6 max-w-lg w-full text-center">
            <div className="text-white/60 mb-4">Video tour coming soon!</div>
            <button className="text-jg-gold text-sm hover:text-jg-gold-light transition-colors"
              onClick={() => setVideoModal(false)}>Close ✕</button>
          </div>
        </div>
      )}
    </section>
  );
}