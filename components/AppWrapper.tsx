"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programmes from "@/components/Programmes";
import Strengths from "@/components/Strengths";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AdmissionModal from "@/components/AdmissionModal";
export default function AppWrapper() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <main style={{ background: "var(--navy)", overflowX: "hidden" }}>
      <Navbar onApplyClick={open} />
      <Hero onApplyClick={open} />
      <About />
      <Programmes />
      <Strengths />
      <Partners />
      <Testimonials />
      <FAQ />
      <CTA onApplyClick={open} />
      <Footer />
      <AdmissionModal isOpen={modalOpen} onClose={close} />
    </main>
  );
}