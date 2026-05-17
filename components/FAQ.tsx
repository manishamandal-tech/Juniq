"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus, Mail } from "lucide-react";

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

const faqs = [
  {
    q: "Is JG University recognized by UGC?",
    a: "Yes. JG University is fully approved by the University Grants Commission (UGC) and recognized by the Government of Gujarat. The university is also NAAC accredited. All degrees awarded are valid across India and internationally recognized.",
  },
  {
    q: "What programmes are available for admission in 2026–27?",
    a: "We offer a wide range of programmes including Undergraduate (BBA, BCA, B.Tech, B.Com, B.Sc, LL.B.), Postgraduate (MBA, iMBA, MCA, M.Sc, M.Com, LL.M.), Doctoral (Ph.D) across disciplines, and Certificate programmes in AI/ML, Cyber Security, Cloud Computing, Data Analytics and more.",
  },
  {
    q: "What is the admission process and eligibility criteria?",
    a: "Admission is merit-based with entrance tests for select programmes. Eligibility varies — typically 10+2 for UG programmes and a relevant bachelor's degree for PG. Applications are submitted online through our admissions portal. Shortlisted candidates are called for counselling.",
  },
  {
    q: "Does JG University offer scholarships?",
    a: "Yes. Merit-based and need-based scholarships are available for deserving students. Government scholarships (both state and central) are also applicable. The university offers fee waivers and financial assistance. Contact the admissions office for detailed eligibility criteria.",
  },
  {
    q: "Are there industry tie-ups and placement support?",
    a: "JG University has active collaborations with IBM, ISRO, SAC, Yudiz, Azure and 15+ other industry partners. A dedicated placement cell assists students with internships, live projects, and campus recruitment. Our placement rate stands at 85%+ with 100+ hiring companies.",
  },
  {
    q: "Is hostel accommodation available on campus?",
    a: "Yes. Separate hostel facilities for male and female students are available on campus in Ahmedabad, Gujarat. The hostels offer modern amenities including Wi-Fi, mess facility, indoor games, 24/7 security, and medical assistance.",
  },
  {
    q: "What makes JG University different from other universities?",
    a: "JG University follows a unique whole-brain pedagogy — combining technical education with creative thinking, interdisciplinary exposure, and industry partnerships. With IBM collaboration on the iMBA programme, ISRO projects for engineering students, and real-world internships built into every curriculum, JG offers a distinctly practical education.",
  },
  {
    q: "How do I apply for admission?",
    a: "You can apply online through the official JG University admissions portal at jguni.in. Fill the application form, upload required documents (10th & 12th marksheets, transfer certificate, ID proof), pay the application fee, and submit. Shortlisted candidates will be notified via email and phone for the next steps.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  delay,
  inView,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
  inView: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-700
        ${isOpen ? "border-jg-gold/25 bg-jg-gold/3" : "border-white/7 bg-white/[0.02] hover:border-white/12"}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left group"
      >
        <span className={`font-dm font-medium text-sm lg:text-base leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
          {faq.q}
        </span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? "bg-jg-gold/15 border-jg-gold/30 text-jg-gold rotate-0"
            : "border-white/10 text-white/40 group-hover:border-white/20"
        }`}>
          {isOpen
            ? <Minus className="w-3.5 h-3.5" />
            : <Plus className="w-3.5 h-3.5" />
          }
        </span>
      </button>

      {/* Animated content */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 400) + "px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
          <div className="h-px bg-jg-gold/10 mb-4" />
          <p className="text-white/50 text-sm leading-relaxed font-dm">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-jg-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-jg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-jg-gold text-xs font-medium tracking-widest uppercase mb-3 font-dm">
            FAQs
          </div>
          <h2 className="font-playfair font-bold text-3xl lg:text-5xl text-white mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-dm">
            Everything you need to know about admissions, programmes, and life at JG University.
          </p>
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">

          {/* Left — sticky info */}
          <div className={`lg:sticky lg:top-28 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}>
            <div className="glass-card rounded-2xl p-6 lg:p-8 border border-white/7">
              <div className="w-12 h-12 rounded-xl bg-jg-gold/10 border border-jg-gold/20 flex items-center justify-center mb-5">
                <Mail className="w-5 h-5 text-jg-gold" />
              </div>
              <h3 className="font-playfair font-bold text-white text-xl mb-3">
                Still have questions?
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-dm mb-6">
                Our admissions team is available Monday–Saturday, 9 AM to 6 PM. Reach out and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:admissions@jguni.in"
                className="flex items-center gap-2 text-jg-gold text-sm font-medium border border-jg-gold/25 px-5 py-3 rounded-xl hover:bg-jg-gold/8 transition-all duration-300 font-dm w-full justify-center"
              >
                <Mail className="w-4 h-4" />
                Contact Admissions
              </a>

              {/* Quick stats */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                {[
                  { label: "Response Time", value: "< 24 hours" },
                  { label: "Admissions Open", value: "2026–27" },
                  { label: "Application Fee", value: "₹500 only" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between text-xs font-dm">
                    <span className="text-white/35">{s.label}</span>
                    <span className="text-white/70 font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                delay={i * 50}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
