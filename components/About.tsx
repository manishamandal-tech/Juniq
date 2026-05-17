"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Users, BookOpen, Building2, Award } from "lucide-react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedNumber({
  target,
  suffix = "",
  inView,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const step = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const highlights = [
  "Experiential & project-based learning model",
  "IBM, ISRO, SAC & 15+ industry collaborations",
  "Placement support with dedicated career cell",
  "State-of-the-art labs and modern campus",
];

const miniStats = [
  { icon: Users, number: 5000, suffix: "+", label: "Students Enrolled" },
  { icon: BookOpen, number: 50, suffix: "+", label: "Programmes" },
  { icon: Building2, number: 17, suffix: "", label: "Colleges" },
  { icon: Award, number: 1965, suffix: "", label: "Established" },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative section-pad overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d1a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jg-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Visual */}
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Main card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-jg-navy-2 to-jg-navy rounded-3xl overflow-hidden border border-white/6 aspect-[4/3] flex items-center justify-center">
                {/* Campus illustration */}
                <div className="p-8 text-center">
                  <div className="w-24 h-24 bg-jg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-jg-gold/20">
                    <Building2 className="w-12 h-12 text-jg-gold/60" />
                  </div>
                  <div className="font-playfair font-bold text-2xl text-white/80 mb-2">
                    JG University Campus
                  </div>
                  <div className="text-white/30 text-sm">
                    Ahmedabad, Gujarat
                  </div>
                  {/* Decorative dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {[1, 2, 3, 4].map((d) => (
                      <div
                        key={d}
                        className="w-2 h-2 rounded-full bg-jg-gold/30"
                        style={{ animationDelay: `${d * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge — UGC */}
              <div
                className="absolute -top-4 -right-4 glass-card-gold rounded-2xl p-4 text-center min-w-[100px] animate-float"
                style={{ animationDelay: "0s" }}
              >
                <div className="font-playfair font-bold text-jg-gold text-xl">UGC</div>
                <div className="text-white/40 text-xs mt-0.5">Approved</div>
              </div>

              {/* Floating badge — NAAC */}
              <div
                className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 text-center min-w-[100px] animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="font-playfair font-bold text-white text-xl">NAAC</div>
                <div className="text-white/40 text-xs mt-0.5">Accredited</div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div>
              <div className="text-jg-gold text-xs font-medium tracking-widest uppercase mb-3 font-dm">
                About JG University
              </div>
              <h2 className="font-playfair font-bold text-3xl lg:text-4xl xl:text-5xl leading-tight text-white mb-4">
                A New Age{" "}
                <span className="text-gradient-gold">Tech-Driven</span>{" "}
                University
              </h2>
              <p className="text-white/50 text-base leading-relaxed font-dm">
                Sponsored by ASIA Charitable Trust since 1965, JG University
                offers programmes that evolve with future industry demand —
                enabling students to enter employment or self-employment
                seamlessly. Our interdisciplinary, experiential model prepares
                graduates for a rapidly changing world.
              </p>
            </div>

            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-white/60 text-sm font-dm"
                >
                  <CheckCircle2 className="w-5 h-5 text-jg-gold flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Mini stats grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {miniStats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card rounded-xl p-4 flex items-center gap-3 stat-card-hover"
                >
                  <div className="w-9 h-9 rounded-lg bg-jg-gold/10 border border-jg-gold/15 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-jg-gold" />
                  </div>
                  <div>
                    <div className="font-playfair font-bold text-lg text-white leading-none">
                      <AnimatedNumber
                        target={s.number}
                        suffix={s.suffix}
                        inView={inView}
                      />
                    </div>
                    <div className="text-white/35 text-xs mt-0.5 font-dm">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leadership quote */}
            <blockquote className="border-l-2 border-jg-gold/40 pl-4 py-1">
              <p className="text-white/45 text-sm italic leading-relaxed font-dm">
                &ldquo;We are committed to creating graduates who are not just
                job-ready but future-ready.&rdquo;
              </p>
              <cite className="text-jg-gold text-xs font-medium mt-2 block not-italic">
                — Director General, JG University
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
