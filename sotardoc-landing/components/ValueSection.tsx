"use client";

import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CounterStat from "@/components/CounterStat";

const values = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-white" aria-hidden />,
    title: "Rekayasa Skala Enterprise",
    desc: "Kode berstandar industri dengan pengujian otomatis, observabilitas real-time, dan arsitektur modular yang adaptif terhadap pertumbuhan transaksi.",
    floatClass: "animate-float",
    stat: { value: 99.9, suffix: "%", label: "Uptime SLA" },
  },
  {
    icon: <Sparkles className="w-5 h-5 text-white" aria-hidden />,
    title: "Integrasi AI & Machine Learning",
    desc: "Transformasi data mentah perusahaan menjadi analitik prediktif dan pipeline otomatisasi cerdas yang memberikan keunggulan kompetitif.",
    floatClass: "animate-float-delay",
    stat: { value: 96, suffix: "%", label: "Model Accuracy" },
  },
  {
    icon: <Zap className="w-5 h-5 text-white" aria-hidden />,
    title: "Delivery Tangkas & Transparan",
    desc: "Metodologi kerja terstruktur, dokumentasi arsitektur komprehensif, dan komunikasi intensif dengan pelaporan sprint berkala.",
    floatClass: "animate-float-delay-2",
    stat: { value: 24, suffix: "h", label: "Respons Maksimal" },
  },
];

export default function ValueSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="layanan" className="py-16 px-6 max-w-7xl mx-auto">
      <div
        ref={sectionRef}
        className="reveal-scale bg-[#111111]/60 border border-[#27272A] rounded-2xl p-8 md:p-12 relative overflow-hidden"
      >
        {/* Subtle internal glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-white/[0.02] blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {values.map((v, i) => (
            <div key={i} className="space-y-4 group">
              {/* Floating icon */}
              <div
                className={`${v.floatClass} w-10 h-10 rounded-lg bg-neutral-900 border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover:border-gray-500 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]`}
              >
                {v.icon}
              </div>

              {/* Animated counter */}
              <CounterStat
                value={v.stat.value}
                suffix={v.stat.suffix}
                label={v.stat.label}
              />

              <h4 className="font-inter text-lg text-white font-normal">
                {v.title}
              </h4>
              <p className="font-roboto text-sm text-gray-400 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
