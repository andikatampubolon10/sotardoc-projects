"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HeroSection() {
  const heroRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative pt-12 pb-6 md:pt-16 md:pb-8 px-6 max-w-7xl mx-auto overflow-hidden">
      <div ref={heroRef} className="reveal max-w-4xl mx-auto text-center">
        {/* Primary Semantic H1 with Batak Philosophy */}
        <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.18] text-balance">
          Togu parpadanan, hatop di ulaon.
        </h1>
      </div>
    </section>
  );
}
