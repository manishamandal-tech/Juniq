"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

type Tab = "Undergraduate" | "Postgraduate" | "Doctoral" | "Certificate";

const programmes: Record<Tab, { icon: string; name: string; duration: string; desc: string }[]> = {
  Undergraduate: [
    { icon: "🎓", name: "BBA / BBA (Hons)", duration: "3–4 Years", desc: "Business Administration with specializations in Marketing, Finance & HR" },
    { icon: "💻", name: "BCA / BCA (Hons)", duration: "3–4 Years", desc: "Computer Applications with modern programming and software development" },
    { icon: "⚙️", name: "B.Tech – CSE / AI / ML", duration: "4 Years", desc: "Engineering with focus on AI, Machine Learning and Data Science" },
    { icon: "📊", name: "B.Com / B.Com (Hons)", duration: "3–4 Years", desc: "Commerce with advanced accounting, taxation and financial studies" },
    { icon: "🔬", name: "B.Sc – Forensic / Quantum", duration: "3–5 Years", desc: "Science programmes in emerging and interdisciplinary fields" },
    { icon: "⚖️", name: "LL.B.", duration: "3 Years", desc: "Law programme with practical training and moot court experience" },
  ],
  Postgraduate: [
    { icon: "📈", name: "MBA / iMBA", duration: "2 Years", desc: "Industry-integrated MBA with live projects and IBM collaboration" },
    { icon: "🖥️", name: "MCA", duration: "2 Years", desc: "Master of Computer Applications with advanced software engineering" },
    { icon: "🔭", name: "M.Sc – Various", duration: "2 Years", desc: "Science specializations in Physics, Chemistry, Mathematics and more" },
    { icon: "⚖️", name: "LL.M.", duration: "1–2 Years", desc: "Advanced law studies with specializations in Corporate and Criminal law" },
    { icon: "🎨", name: "M.Des", duration: "2 Years", desc: "Design programme covering UI/UX, product and graphic design" },
    { icon: "📚", name: "M.Com", duration: "2 Years", desc: "Advanced Commerce with research methodology and financial analysis" },
  ],
  Doctoral: [
    { icon: "🔬", name: "Ph.D – Sciences", duration: "3–5 Years", desc: "Research in Natural Sciences, Forensics and emerging scientific fields" },
    { icon: "💼", name: "Ph.D – Management", duration: "3–5 Years", desc: "Advanced research in Business Management, Marketing and Strategy" },
    { icon: "⚙️", name: "Ph.D – Engineering", duration: "3–5 Years", desc: "Research in Computer Science, AI, ML and Engineering disciplines" },
    { icon: "⚖️", name: "Ph.D – Law", duration: "3–5 Years", desc: "Legal research with interdisciplinary approach to jurisprudence" },
  ],
  Certificate: [
    { icon: "🤖", name: "AI & Machine Learning", duration: "6 Months", desc: "Hands-on AI/ML with Python, TensorFlow and real-world projects" },
    { icon: "📱", name: "Mobile App Development", duration: "3 Months", desc: "iOS and Android development with Flutter and React Native" },
    { icon: "🛡️", name: "Cyber Security", duration: "6 Months", desc: "Ethical hacking, network security and digital forensics" },
    { icon: "📊", name: "Data Analytics", duration: "3 Months", desc: "Business analytics, Power BI, Tableau and SQL for data insights" },
    { icon: "☁️", name: "Cloud Computing", duration: "4 Months", desc: "AWS, Azure and Google Cloud fundamentals and certification prep" },
    { icon: "🎯", name: "Digital Marketing", duration: "3 Months", desc: "SEO, SEM, Social Media and Performance Marketing strategies" },
  ],
};

const tabs: Tab[] = ["Undergraduate", "Postgraduate", "Doctoral", "Certificate"];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Programmes() {
  const [activeTab, setActiveTab] = useState<Tab>("Undergraduate");
  const { ref, inView } = useInView();

  return (
    <section id="programmes" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-jg-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-jg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-jg-gold text-xs font-medium tracking-widest uppercase mb-3 font-dm">
            Academic Programmes
          </div>
          <h2 className="font-playfair font-bold text-3xl lg:text-5xl text-white mb-4">
            Find Your Perfect{" "}
            <span className="text-gradient-gold">Programme</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-dm">
            Choose from 50+ programmes across UG, PG, Doctoral and Certificate
            levels — designed for the careers of tomorrow.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-dm ${
                activeTab === tab
                  ? "bg-gradient-to-r from-jg-gold to-jg-gold-dark text-jg-navy shadow-lg shadow-jg-gold/20"
                  : "glass-card text-white/50 hover:text-white hover:border-white/15"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Programme grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {programmes[activeTab].map((prog, i) => (
            <div
              key={prog.name}
              className={`prog-card-hover glass-card rounded-2xl p-6 group transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-jg-gold/8 border border-jg-gold/15 flex items-center justify-center text-2xl mb-4 group-hover:bg-jg-gold/12 transition-colors duration-300">
                {prog.icon}
              </div>

              {/* Name */}
              <h3 className="font-playfair font-bold text-white text-lg mb-2 leading-tight group-hover:text-jg-gold-light transition-colors duration-300">
                {prog.name}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed font-dm mb-4">
                {prog.desc}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white/30 text-xs font-dm">
                  <Clock className="w-3.5 h-3.5" />
                  {prog.duration}
                </div>
                <button className="flex items-center gap-1.5 text-jg-gold text-xs font-medium group-hover:gap-2.5 transition-all duration-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  Learn More
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-10 transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-jg-gold text-sm font-medium border border-jg-gold/25 px-6 py-3 rounded-xl hover:bg-jg-gold/8 transition-all duration-300 font-dm"
          >
            View All Programmes
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
