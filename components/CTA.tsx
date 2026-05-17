"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, Download, Phone } from "lucide-react";

function useInView(threshold = 0.2) {
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

export default function CTA({ onApplyClick }: { onApplyClick?: () => void }) {
  const { ref, inView } = useInView();

  return (
    <section id="cta" className="relative section-pad overflow-hidden">
      {/* Shimmer background */}
      <div className="absolute inset-0 shimmer-bg" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-jg-gold/8 blur-3xl" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jg-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jg-gold/15 to-transparent" />

      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-jg-gold/5 pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-jg-gold/5 pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-jg-gold/12 border border-jg-gold/30 text-jg-gold text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="w-2 h-2 bg-jg-gold rounded-full animate-pulse" />
          Admissions Open · 2026–27
        </div>

        {/* Headline */}
        <h2 className={`font-playfair font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Your Future
          <br />
          <span className="text-gradient-gold">Begins Here</span>
        </h2>

        {/* Subtext */}
        <p className={`text-white/50 text-base lg:text-lg max-w-2xl mx-auto mb-10 font-dm leading-relaxed transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Join thousands of students building their careers at JG University, Ahmedabad.
          Applications for 2026–27 are now open. Take the first step today.
        </p>

        {/* Buttons */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-14 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={onApplyClick}
            className="btn-gold-hover inline-flex items-center gap-2 bg-gradient-to-r from-jg-gold via-jg-gold-light to-jg-gold text-jg-navy font-bold px-8 py-4 rounded-xl text-sm lg:text-base font-dm"
            style={{ backgroundSize: "200%", backgroundPosition: "0%" }}
          >
            Apply Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <a href="#" className="inline-flex items-center gap-2 glass-card border border-white/12 text-white font-medium px-8 py-4 rounded-xl text-sm lg:text-base hover:border-jg-gold/25 hover:bg-jg-gold/5 transition-all duration-300 font-dm">
            <Download className="w-4 h-4" />
            Download Brochure
          </a>
          <a href="tel:+917900000000" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-medium text-sm lg:text-base transition-colors duration-200 font-dm">
            <Phone className="w-4 h-4" />
            Call Admissions
          </a>
        </div>

        {/* Trust strip */}
        <div className={`flex flex-wrap items-center justify-center gap-6 lg:gap-10 transition-all duration-700 delay-400 ${inView ? "opacity-100" : "opacity-0"}`}>
          {[
            { icon: "🎓", text: "UGC Approved" },
            { icon: "⭐", text: "NAAC Accredited" },
            { icon: "🏛️", text: "Est. 1965" },
            { icon: "🤝", text: "IBM Partner" },
            { icon: "🚀", text: "85%+ Placement" },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-white/35 text-sm font-dm">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}