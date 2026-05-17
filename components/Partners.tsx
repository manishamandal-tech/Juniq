"use client";

import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const partners = [
  { name: "IBM", color: "text-blue-400", bg: "bg-blue-500/8", border: "border-blue-500/15" },
  { name: "ISRO", color: "text-orange-400", bg: "bg-orange-500/8", border: "border-orange-500/15" },
  { name: "SAC", color: "text-green-400", bg: "bg-green-500/8", border: "border-green-500/15" },
  { name: "YUDIZ", color: "text-purple-400", bg: "bg-purple-500/8", border: "border-purple-500/15" },
  { name: "AZURE", color: "text-blue-300", bg: "bg-blue-400/8", border: "border-blue-400/15" },
  { name: "AVENTURE", color: "text-rose-400", bg: "bg-rose-500/8", border: "border-rose-500/15" },
  { name: "VIRTUAL HEIGHT", color: "text-teal-400", bg: "bg-teal-500/8", border: "border-teal-500/15" },
  { name: "ASIAN AFRICAN", color: "text-amber-400", bg: "bg-amber-500/8", border: "border-amber-500/15" },
  { name: "ORACLE", color: "text-red-400", bg: "bg-red-500/8", border: "border-red-500/15" },
  { name: "NASSCOM", color: "text-indigo-400", bg: "bg-indigo-500/8", border: "border-indigo-500/15" },
];

const stats = [
  { number: "15+", label: "Industry Partners" },
  { number: "500+", label: "Placements / Year" },
  { number: "100+", label: "Hiring Companies" },
  { number: "85%", label: "Placement Rate" },
];

export default function Partners() {
  const { ref, inView } = useInView();

  return (
    <section id="partners" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-jg-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-jg-gold text-xs font-medium tracking-widest uppercase mb-3 font-dm">
            Trusted Partners
          </div>
          <h2 className="font-playfair font-bold text-3xl lg:text-5xl text-white mb-4">
            Industry <span className="text-gradient-gold">Collaborations</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-dm">
            Partnering with global leaders to give students real-world exposure, internships and placement opportunities.
          </p>
        </div>

        {/* Marquee Row 1 */}
        <div className={`marquee-mask overflow-hidden mb-4 transition-all duration-700 delay-100 ${inView ? "opacity-100" : "opacity-0"}`}>
          <div className="flex animate-marquee gap-4 w-max">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex items-center gap-2 ${p.bg} border ${p.border} rounded-xl px-5 py-3`}
              >
                <span className={`font-bold text-sm tracking-wider font-dm ${p.color}`}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — reversed */}
        <div className={`marquee-mask overflow-hidden transition-all duration-700 delay-200 ${inView ? "opacity-100" : "opacity-0"}`}>
          <div className="flex animate-marquee gap-4 w-max" style={{ animationDirection: "reverse" }}>
            {[...partners.slice().reverse(), ...partners.slice().reverse()].map((p, i) => (
              <div
                key={i}
                className={`flex-shrink-0 flex items-center gap-2 bg-white/2 border border-white/6 rounded-xl px-5 py-3`}
              >
                <span className="font-bold text-sm tracking-wider font-dm text-white/30">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-6 text-center stat-card-hover">
              <div className="font-playfair font-bold text-3xl text-gradient-gold mb-1">
                {s.number}
              </div>
              <div className="text-white/40 text-sm font-dm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
