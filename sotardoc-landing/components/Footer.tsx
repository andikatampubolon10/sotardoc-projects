"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedLogo from "./AnimatedLogo";
import { Mail, MessageSquare, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className="reveal mt-28 border-t border-[#27272A]/80 pt-16 pb-12 px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#27272A]/60 text-sm">
        {/* Brand & Mission Statement */}
        <div className="md:col-span-5 space-y-4">
          <a href="#" className="inline-block group transition-opacity hover:opacity-90">
            <AnimatedLogo size="md" showSubtitle subtitle="Enterprise IT Solutions" />
          </a>
          <p className="font-roboto text-xs text-gray-400 leading-relaxed max-w-sm">
            Sotardoc Technologies adalah biro rekayasa perangkat lunak enterprise dan integrasi kecerdasan buatan terapan (Applied AI). Berbasis di Jakarta, berstandar industri global.
          </p>
          <div className="flex items-center gap-2 text-xs font-roboto text-gray-400 pt-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
            <span>Jakarta Selatan, DKI Jakarta 12950, Indonesia</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-roboto text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Terdaftar Resmi · NDA-Protected Engineering Operations</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <div className="font-inter text-xs uppercase tracking-wider text-white font-semibold">
            Navigasi Solusi
          </div>
          <ul className="space-y-2 text-xs font-inter text-gray-400">
            <li>
              <a href="#proyek" className="hover:text-white transition-colors">Portofolio &amp; Studi Kasus</a>
            </li>
            <li>
              <a href="#layanan" className="hover:text-white transition-colors">Spesialisasi &amp; Kapabilitas</a>
            </li>
            <li>
              <a href="#insights" className="hover:text-white transition-colors">Engineering Insights &amp; Riset</a>
            </li>
            <li>
              <a href="#filosofi" className="hover:text-white transition-colors">Filosofi Rekayasa &amp; Tim</a>
            </li>
            <li>
              <a href="#kontak" className="hover:text-white transition-colors">Konsultasi &amp; Penawaran Jasa</a>
            </li>
          </ul>
        </div>

        {/* Direct Contacts */}
        <div className="md:col-span-4 space-y-3">
          <div className="font-inter text-xs uppercase tracking-wider text-white font-semibold">
            Kontak Langsung
          </div>
          <div className="space-y-2.5 text-xs font-roboto text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-white" />
              <a href="mailto:contact@sotardoc.com" className="font-mono text-gray-300 hover:text-white transition-colors">
                contact@sotardoc.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <a
                href="https://wa.me/6281290104421?text=Halo%20Tim%20Sotardoc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-gray-300 hover:text-emerald-400 transition-colors"
              >
                +62 812-9010-4421 (WhatsApp)
              </a>
            </div>
            <div className="pt-2 text-[11px] text-gray-500">
              Operasional: Senin – Jumat | 08:30 – 18:00 WIB
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-roboto">
        <p>
          © 2026 Sotardoc Technologies. Hak Cipta Dilindungi Undang-Undang.
        </p>

        <div className="flex items-center space-x-6 text-xs font-inter text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Privasi &amp; Data
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Ketentuan Layanan
          </a>
          <a
            href="https://github.com/sotardoc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>
          <a
            href="/admin/login"
            className="text-gray-500 hover:text-white transition-colors font-mono text-[11px]"
          >
            Portal Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
