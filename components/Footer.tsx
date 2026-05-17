import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const programmes = [
  "BBA / BBA (Hons)",
  "BCA / BCA (Hons)",
  "B.Tech – CSE / AI",
  "MBA / iMBA",
  "MCA",
  "Ph.D Programmes",
  "Certificate Courses",
];

const quickLinks = [
  { label: "About University", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Faculty", href: "#strengths" },
  { label: "Campus Life", href: "#partners" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Admissions", href: "#cta" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#060610]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jg-gold/15 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-jg-gold to-jg-gold-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-5 h-5 text-jg-navy" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-playfair font-bold text-white text-lg leading-none">
                  <span className="text-jg-gold">JG</span> University
                </div>
                <div className="text-white/25 text-[9px] tracking-widest uppercase font-dm mt-0.5">
                  Since 1965
                </div>
              </div>
            </a>

            <p className="text-white/35 text-sm leading-relaxed font-dm mb-6 max-w-xs">
              A UGC-approved, tech-driven university in Ahmedabad, Gujarat.
              Sponsored by ASIA Charitable Trust, empowering students since 1965.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-start gap-2.5 text-white/35 text-xs font-dm">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-jg-gold/50" />
                Ahmedabad, Gujarat, India – 380009
              </div>
              <div className="flex items-center gap-2.5 text-white/35 text-xs font-dm">
                <Phone className="w-3.5 h-3.5 text-jg-gold/50" />
                +91 79 0000 0000
              </div>
              <div className="flex items-center gap-2.5 text-white/35 text-xs font-dm">
                <Mail className="w-3.5 h-3.5 text-jg-gold/50" />
                admissions@jguni.in
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass-card border border-white/8 flex items-center justify-center text-white/35 hover:text-jg-gold hover:border-jg-gold/25 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-playfair font-bold text-white/80 text-sm mb-5 tracking-wide">
              Programmes
            </h4>
            <ul className="space-y-2.5">
              {programmes.map((p) => (
                <li key={p}>
                  <a
                    href="#programmes"
                    className="text-white/35 text-xs font-dm hover:text-jg-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-jg-gold transition-colors duration-200 flex-shrink-0" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-bold text-white/80 text-sm mb-5 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/35 text-xs font-dm hover:text-jg-gold transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-jg-gold transition-colors duration-200 flex-shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Admission CTA */}
          <div>
            <h4 className="font-playfair font-bold text-white/80 text-sm mb-5 tracking-wide">
              Stay Updated
            </h4>
            <p className="text-white/35 text-xs font-dm mb-4 leading-relaxed">
              Get admission notifications, events and updates directly to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white/70 text-xs font-dm placeholder-white/25 focus:outline-none focus:border-jg-gold/30 focus:bg-white/6 transition-all duration-200"
              />
              <button className="w-full bg-gradient-to-r from-jg-gold to-jg-gold-dark text-jg-navy font-semibold text-xs py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 font-dm">
                Subscribe
              </button>
            </div>

            {/* Accreditation badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["UGC", "NAAC", "AIU"].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-bold text-jg-gold/60 border border-jg-gold/15 bg-jg-gold/5 px-2.5 py-1 rounded-lg font-dm tracking-wider"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-dm text-center sm:text-left">
            © 2026 JG University. All rights reserved. Sponsored by ASIA Charitable Trust.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/20 text-xs font-dm hover:text-white/50 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
