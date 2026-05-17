"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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

const testimonials = [
  {
    quote: "JG shaped me into the person I am today. The faculty served as mentors who guided us at every step. The values I imbibed during my time here continue to serve as a guiding light in my career.",
    name: "Jigardan Gadhvi",
    role: "Celebrity Singer",
    initials: "JG",
    color: "from-jg-gold to-jg-gold-dark",
    stars: 5,
  },
  {
    quote: "The demanding academic programme and top-notch teachers gave me a solid foundation. Practical learning through internships was invaluable. JG instilled in me the discipline and creativity I needed.",
    name: "Parth Rupareliya",
    role: "Art Director, Mumbai",
    initials: "PR",
    color: "from-violet-500 to-purple-600",
    stars: 5,
  },
  {
    quote: "My BCA programme provided a strong IT foundation. I draw upon the skills I gained at JG daily in my role at Tata Consultancy Services. The curriculum was exactly aligned with industry needs.",
    name: "Yatendra Sinh Joddha",
    role: "Technical Lead, TCS",
    initials: "YJ",
    color: "from-emerald-500 to-teal-600",
    stars: 5,
  },
  {
    quote: "The MBA programme at JG was transformational. Live projects with IBM, industry mentors, and real case studies prepared me for leadership roles that I couldn't have imagined otherwise.",
    name: "Priya Mehta",
    role: "Product Manager, Infosys",
    initials: "PM",
    color: "from-blue-500 to-cyan-600",
    stars: 5,
  },
  {
    quote: "JG's interdisciplinary approach truly sets it apart. I studied Computer Science but also got exposure to business and design thinking. That combination landed me my dream job at a startup.",
    name: "Rahul Sharma",
    role: "Founder & CTO, TechStart",
    initials: "RS",
    color: "from-rose-500 to-pink-600",
    stars: 5,
  },
  {
    quote: "The campus environment, faculty mentorship, and the focus on emerging technologies like AI and Cloud Computing made my B.Tech experience incredibly enriching and industry-relevant.",
    name: "Ananya Patel",
    role: "Software Engineer, Google",
    initials: "AP",
    color: "from-orange-500 to-amber-600",
    stars: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView();

  // Auto-rotate
  useEffect(() => {
    if (paused || !inView) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, inView]);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  // Show 3 on desktop (active + neighbours)
  const visible = [
    (active - 1 + testimonials.length) % testimonials.length,
    active,
    (active + 1) % testimonials.length,
  ];

  return (
    <section id="testimonials" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d1a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-jg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-jg-gold text-xs font-medium tracking-widest uppercase mb-3 font-dm">
            Alumni Speak
          </div>
          <h2 className="font-playfair font-bold text-3xl lg:text-5xl text-white mb-4">
            What Our <span className="text-gradient-gold">Alumni</span> Say
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-dm">
            Thousands of JG graduates are shaping industries, building companies, and making an impact.
          </p>
        </div>

        {/* Desktop: 3-card view */}
        <div
          className={`hidden lg:grid grid-cols-3 gap-5 mb-10 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {visible.map((idx, position) => {
            const t = testimonials[idx];
            const isCenter = position === 1;
            return (
              <div
                key={idx}
                className={`rounded-2xl p-6 border transition-all duration-500 cursor-pointer ${
                  isCenter
                    ? "glass-card-gold scale-[1.02] shadow-xl shadow-jg-gold/8"
                    : "glass-card opacity-60 hover:opacity-80"
                }`}
                onClick={() => setActive(idx)}
              >
                <Quote className={`w-8 h-8 mb-4 ${isCenter ? "text-jg-gold" : "text-white/20"}`} />
                <p className="text-white/60 text-sm leading-relaxed font-dm mb-6 line-clamp-4">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold font-dm">{t.name}</div>
                    <div className="text-white/35 text-xs font-dm">{t.role}</div>
                  </div>
                  {isCenter && (
                    <div className="ml-auto flex gap-0.5">
                      {Array(t.stars).fill(0).map((_, i) => (
                        <span key={i} className="text-jg-gold text-xs">★</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: single card */}
        <div
          className={`lg:hidden mb-8 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="glass-card-gold rounded-2xl p-6 border">
            <Quote className="w-8 h-8 mb-4 text-jg-gold" />
            <p className="text-white/60 text-sm leading-relaxed font-dm mb-6">
              {testimonials[active].quote}
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonials[active].color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                {testimonials[active].initials}
              </div>
              <div>
                <div className="text-white text-sm font-semibold font-dm">{testimonials[active].name}</div>
                <div className="text-white/35 text-xs font-dm">{testimonials[active].role}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-jg-gold text-xs">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`flex items-center justify-center gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-jg-gold/30 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-jg-gold"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-jg-gold/30 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
