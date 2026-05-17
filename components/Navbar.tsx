"use client";

import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Strengths", href: "#strengths" },
  { label: "Campus", href: "#partners" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#footer" },
];

interface Props {
  onApplyClick?: () => void;
}

export default function Navbar({ onApplyClick }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLink = (label: string) => {
    setActive(label);
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);
    onApplyClick?.();
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all .4s ease",
          background: scrolled
            ? "rgba(10,10,20,.95)"
            : "transparent",
          backdropFilter: scrolled
            ? "blur(20px)"
            : "none",
          borderBottom: scrolled
            ? "1px solid rgba(212,175,55,.1)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 70,
            }}
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={() => handleLink("Home")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg,#d4af37,#b8941f)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap
                  size={20}
                  color="#0a0a14"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  <span style={{ color: "#d4af37" }}>
                    JG
                  </span>{" "}
                  University
                </div>

                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,.3)",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Since 1965
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden-mobile"
              style={{
                display: "flex",
                gap: 4,
              }}
            >
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() =>
                    handleLink(item.label)
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: ".2s",
                    color:
                      active === item.label
                        ? "#fff"
                        : "rgba(255,255,255,.5)",
                    background:
                      active === item.label
                        ? "rgba(255,255,255,.05)"
                        : "transparent",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Side */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <button
                onClick={handleApply}
                className="btn-gold"
                style={{
                  padding: "10px 22px",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
              >
                Apply Now →
              </button>

              <button
                className="show-mobile"
                onClick={() => setOpen(!open)}
                style={{
                  display: "none",
                  padding: 8,
                  borderRadius: 10,
                  border:
                    "1px solid rgba(255,255,255,.1)",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {open ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            style={{
              background:
                "rgba(10,10,20,.98)",
              padding: 20,
            }}
          >
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() =>
                  handleLink(item.label)
                }
                style={{
                  display: "block",
                  padding: 12,
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={handleApply}
              style={{
                marginTop: 10,
                width: "100%",
                padding: 14,
              }}
            >
              Apply Now →
            </button>
          </div>
        )}
      </header>

      <style jsx>{`
        @media (max-width: 1023px) {
          .hidden-mobile {
            display: none !important;
          }

          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}