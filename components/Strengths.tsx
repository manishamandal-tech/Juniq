"use client";

import { useRef, useEffect, useState } from "react";
import { Puzzle, FlaskConical, Brain, Users, Globe, Zap, Shield, TrendingUp } from "lucide-react";

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

const strengths = [
  {
    icon: Puzzle,
    title: "Interdisciplinary Approach",
    desc: "Students from diverse backgrounds connect, ideate, and solve real-world problems collaboratively across disciplines.",
    color: "from-amber-500/10 to-yellow-500/5",
    border: "border-amber-500/15",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: FlaskConical,
    title: "Experiential Learning",
    desc: "Real-life project exposure develops hands-on industry expertise. Learn by doing — not just studying.",
    color: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-500/15",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    icon: Brain,
    title: "Whole Brain Pedagogy",
    desc: "Future-proof technical skills combined with creative thinking, emotional intelligence and critical reasoning.",
    color: "from-emerald-500/10 to-green-500/5",
    border: "border-emerald-500/15",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Industry Faculty",
    desc: "Dynamic scholars with vast academic knowledge and real-world industry experience guiding every student.",
    color: "from-blue-500/10 to-cyan-500/5",
    border: "border-blue-500/15",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Globe,
    title: "Global Exposure",
    desc: "International collaborations, exchange programmes and global industry connections for a worldwide perspective.",
    color: "from-rose-500/10 to-pink-500/5",
    border: "border-rose-500/15",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: Zap,
    title: "Tech-First Curriculum",
    desc: "AI, ML, Cloud, Blockchain and emerging tech embedded across all programmes — staying ahead of the curve.",
    color: "from-orange-500/10 to-yellow-500/5",
    border: "border-orange-500/15",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: Shield,
    title: "UGC & NAAC Approved",
    desc: "Fully recognized by UGC, NAAC accredited — every degree you earn holds national and international value.",
    color: "from-teal-500/10 to-cyan-500/5",
    border: "border-teal-500/15",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10",
  },
  {
    icon: TrendingUp,
    title: "Strong Placement Record",
    desc: "Dedicated career cell, campus drives and tie-ups with 100+ companies ensuring strong placement outcomes.",
    color: "from-jg-gold/10 to-yellow-500/5",
    border: "border-jg-gold/15",
    iconColor: "text-jg-gold",
    iconBg: "bg-jg-gold/10",
  },
];

export default function Strengths() {
  const { ref, inView } = useInView();

  return (
    <section id="strengths" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-jg-navy-2" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jg-gold/15 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-jg-gold/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-blue-600/4 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-jg-gold text-xs font-medium tracking-widest uppercase mb-3 font-dm">
            Our Strengths
          </div>
          <h2 className="font-playfair font-bold text-3xl lg:text-5xl text-white mb-4">
            Why Choose <span className="text-gradient-gold">JG University?</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-dm">
            Eight pillars that make JG University a destination for students who want more than just a degree.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {strengths.map((s, i) => (
            <div
              key={s.title}
              className={`group relative rounded-2xl p-6 border bg-gradient-to-br ${s.color} ${s.border}
                transition-all duration-500 cursor-default hover:scale-[1.02] hover:shadow-xl
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px rgba(212,175,55,0.03)" }} />

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>

              {/* Text */}
              <h3 className="font-playfair font-bold text-white text-base mb-2 leading-snug group-hover:text-jg-gold-light transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-dm">
                {s.desc}
              </p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-6 right-6 h-px ${s.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
