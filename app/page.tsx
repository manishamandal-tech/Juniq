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

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative bg-jg-navy overflow-x-hidden">
      <Navbar onApplyClick={() => setModalOpen(true)} />
      <Hero onApplyClick={() => setModalOpen(true)} />
      <About />
      <Programmes />
      <Strengths />
      <Partners />
      <Testimonials />
      <FAQ />
      <CTA onApplyClick={() => setModalOpen(true)} />
      <Footer />
      <AdmissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}