"use client";

import AnimatedLogo from "./AnimatedLogo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080808]/85 border-b border-[#27272A]/60">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Animated Logo */}
        <a href="#" className="flex items-center cursor-pointer group transition-opacity hover:opacity-90">
          <AnimatedLogo size="md" showSubtitle subtitle="Enterprise IT Solutions" />
        </a>

        {/* Nav with underline draw */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-inter font-medium text-gray-300">
          {["Proyek", "Layanan", "Tentang Kami", "Kontak"].map((label, i) => {
            const hrefs = ["#proyek", "#layanan", "#keunggulan", "#kontak"];
            return (
              <a
                key={label}
                href={hrefs[i]}
                className="nav-link hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* CTA with glow pulse */}
        <div className="flex items-center">
          <a
            href="#kontak"
            id="cta-konsultasi"
            className="btn-magnetic btn-glow-pulse px-5 py-2.5 rounded-md text-xs font-inter font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all duration-200"
          >
            Konsultasi Gratis
          </a>
        </div>
      </div>
    </header>
  );
}
