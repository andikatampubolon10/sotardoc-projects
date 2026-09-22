"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedLogo from "./AnimatedLogo";

export default function Footer() {
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className="reveal mt-20 border-t border-[#27272A]/80 py-12 px-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
        {/* Brand Animated Logo */}
        <a href="#" className="flex items-center group transition-opacity hover:opacity-90">
          <AnimatedLogo size="sm" showSubtitle subtitle="IT Solutions" />
        </a>

        {/* Copyright */}
        <p className="font-roboto text-xs text-gray-500">
          © 2026 Sotardoc Technologies. Hak Cipta Dilindungi Undang-Undang.
        </p>

        {/* Links */}
        <div className="flex items-center space-x-6 text-xs font-inter">
          {["Ketentuan Layanan", "Privasi", "Dokumentasi API"].map((link) => (
            <a
              key={link}
              href="#"
              className="nav-link hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="/admin/login"
            className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <span>Admin</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
