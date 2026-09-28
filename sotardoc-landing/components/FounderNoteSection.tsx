"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Terminal, Users, Target, CheckCircle2, Quote } from "lucide-react";

export default function FounderNoteSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="filosofi" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div ref={sectionRef} className="reveal max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-neutral-900 text-xs font-inter font-medium text-gray-300 mb-4">
            <Quote className="w-3.5 h-3.5 text-white" aria-hidden />
            <span className="text-shimmer">Filosofi Rekayasa &amp; Suara Tim</span>
          </div>
          <h2 className="font-inter text-3xl md:text-4xl text-white tracking-tight font-normal">
            Bukan Sekadar Akronim Canggih, Tapi Solusi Nyata Bisnis Anda
          </h2>
          <p className="font-roboto text-gray-400 text-base leading-relaxed max-w-2xl mx-auto mt-4">
            Mengapa Sotardoc didirikan dan bagaimana pendekatan rekayasa kami berbeda dari agensi software konvensional.
          </p>
        </div>

        {/* Founder Narrative Card */}
        <div className="bg-[#0D0D0D] border border-[#27272A] rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle glow */}
          <div
            className="absolute top-0 right-0 w-[400px] h-[300px] bg-white/[0.02] blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Quote & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>CATATAN ENGINEERING LEADERSHIP</span>
              </div>

              <blockquote className="font-inter text-xl sm:text-2xl text-white font-normal leading-snug tracking-tight">
                &ldquo;Industri IT enterprise kerap terjebak dalam jebakan jargon—menjual kecerdasan buatan dan microservices tanpa memahami betul apa masalah bisnis yang ingin diselesaikan. Di Sotardoc, ukuran keberhasilan kami sederhana: sistem berjalan cepat, hemat biaya, dan tidak pernah tumbang saat lonjakan pengguna.&rdquo;
              </blockquote>

              <p className="font-roboto text-sm text-gray-400 leading-relaxed">
                Kami membangun Sotardoc sebagai antitesis dari agensi yang mengumbar istilah muluk namun melemparkan eksekusi ke tangan junior tanpa pengawasan. Setiap klien kami bermitra langsung dengan senior architect yang membedah kode, memodelkan data, dan menjamin sistem siap melayani beban transaksi nyata.
              </p>

              {/* Founder Sign-off */}
              <div className="pt-4 border-t border-neutral-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-inter font-bold text-white text-base">
                  ST
                </div>
                <div>
                  <div className="font-inter font-semibold text-white text-sm">
                    Tim Principal Engineer &amp; Founder
                  </div>
                  <div className="font-roboto text-xs text-gray-400">
                    Sotardoc Technologies · Jakarta, Indonesia
                  </div>
                </div>
              </div>
            </div>

            {/* Principles Column */}
            <div className="lg:col-span-5 space-y-4 bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-6">
              <div className="font-inter text-xs uppercase tracking-wider text-gray-300 font-semibold mb-4">
                3 Komitmen Utama Kami
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-inter text-sm text-white font-medium">Pragmatic Over Resume-Driven</h3>
                    <p className="font-roboto text-xs text-gray-400 mt-1 leading-relaxed">
                      Kami memilih stack teknologi yang terbukti tangguh dan hemat biaya komputasi, bukan yang sekadar tren demi portofolio.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center flex-shrink-0 text-emerald-400 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-inter text-sm text-white font-medium">Bicara Langsung dengan Pembuat</h3>
                    <p className="font-roboto text-xs text-gray-400 mt-1 leading-relaxed">
                      Tanpa perantara manajer non-teknis. Komunikasi cepat, umpan balik arsitektur instan, dan estimasi waktu yang transparan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center flex-shrink-0 text-cyan-400 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-inter text-sm text-white font-medium">Dampak Bisnis Terukur</h3>
                    <p className="font-roboto text-xs text-gray-400 mt-1 leading-relaxed">
                      Setiap rilis diuji dengan beban puncak, audit keamanan ketat, dan pelaporan metrik kinerja berkala yang bisa diverifikasi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Verified Client Testimonials / Stories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0D0D0D] border border-[#27272A] rounded-xl p-6 relative">
            <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs">
              ★★★★★ <span className="text-gray-500 font-mono text-[11px] ml-1">Klien Enterprise · Sektor Finansial</span>
            </div>
            <p className="font-roboto text-xs text-gray-300 leading-relaxed mb-4 italic">
              &ldquo;Implementasi pipeline KYC OCR oleh Sotardoc memangkas waktu verifikasi calon nasabah kami dari 12 menit menjadi di bawah 1 detik, dengan fraud rate onboarding yang anjlok drastis. Yang paling kami hargai adalah transparansi dan pemahaman mendalam mereka tentang keamanan data.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-white">
                HF
              </div>
              <div>
                <div className="font-inter text-xs font-semibold text-white">VP of Engineering</div>
                <div className="font-roboto text-[11px] text-gray-400">Digital Banking &amp; Fintech Ecosystem</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-[#27272A] rounded-xl p-6 relative">
            <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs">
              ★★★★★ <span className="text-gray-500 font-mono text-[11px] ml-1">Klien Enterprise · Logistik &amp; Supply Chain</span>
            </div>
            <p className="font-roboto text-xs text-gray-300 leading-relaxed mb-4 italic">
              &ldquo;Migrasi sistem monolitik kami ke Kafka dan microservices dituntaskan Sotardoc tanpa 1 detik pun downtime pada operasional gudang nasional kami. Tim Sotardoc selalu hadir mendampingi saat rilis produksi di tengah malam.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-white">
                AP
              </div>
              <div>
                <div className="font-inter text-xs font-semibold text-white">Head of IT Infrastructure</div>
                <div className="font-roboto text-[11px] text-gray-400">Distribusi Komoditas Nasional</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
