"use client";

import { useState } from "react";
import { insightArticles, type InsightArticle } from "@/data/insights";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Clock, ArrowUpRight, X, CheckCircle2, Share2, Sparkles } from "lucide-react";

export default function InsightsSection() {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="insights" className="py-20 px-6 max-w-7xl mx-auto relative">
      <div ref={sectionRef} className="reveal">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest font-inter font-semibold mb-2 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-white inline-block" />
              <span className="text-shimmer">Engineering Insights &amp; Riset Teknis</span>
            </div>
            <h2 className="font-inter text-3xl md:text-4xl text-white tracking-tight font-normal">
              Catatan Rekayasa &amp; Bedah Arsitektur
            </h2>
          </div>
          <p className="font-roboto text-sm text-gray-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            Studi empiris, optimasi algoritma, dan pola arsitektur dari sistem produksi skala enterprise yang kami rancang.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightArticles.map((article) => {
            const badgeBorder =
              article.badgeColor === "emerald"
                ? "border-emerald-500/30 text-emerald-400 bg-emerald-950/20"
                : article.badgeColor === "cyan"
                ? "border-cyan-500/30 text-cyan-400 bg-cyan-950/20"
                : "border-purple-500/30 text-purple-400 bg-purple-950/20";

            return (
              <article
                key={article.id}
                className="bg-[#0D0D0D] border border-[#27272A] hover:border-[#3F3F46] rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,255,255,0.04)]"
              >
                <div>
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badgeBorder}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-inter text-lg text-white font-medium group-hover:text-neutral-200 transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-roboto text-xs text-gray-400 leading-relaxed line-clamp-3 mb-5">
                    {article.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-2 pt-4 border-t border-neutral-800/80 mb-6">
                    <div className="font-inter text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>Temuan Kunci (Takeaway)</span>
                    </div>
                    <ul className="space-y-1.5">
                      {article.keyTakeaways.slice(0, 2).map((point, idx) => (
                        <li key={idx} className="text-[11px] font-roboto text-gray-400 flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-gray-500">{article.date}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1 text-xs font-inter font-medium text-white hover:text-gray-300 transition-colors cursor-pointer group-hover:underline"
                  >
                    <span>Baca Bedah Kasus</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Modal Teardown Viewer */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease_forwards]"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-[#0D0D0D] border border-[#27272A] rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup artikel"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Meta */}
              <div className="space-y-3 pr-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono border border-neutral-700 bg-neutral-900 text-white">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{selectedArticle.date}</span>
                  <span className="text-xs font-mono text-gray-400">· {selectedArticle.readTime}</span>
                </div>

                <h2 className="font-inter text-2xl md:text-3xl text-white font-semibold tracking-tight">
                  {selectedArticle.title}
                </h2>
                <div className="font-roboto text-xs text-gray-400">
                  Dipublikasikan oleh: <strong className="text-white">{selectedArticle.author}</strong>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-2.5">
                <div className="font-inter text-xs uppercase tracking-wider text-white font-semibold">
                  Executive Summary &amp; Key Takeaways
                </div>
                <ul className="space-y-2">
                  {selectedArticle.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="text-xs font-roboto text-gray-300 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Content Body */}
              <div className="prose prose-invert max-w-none text-gray-300 text-sm font-roboto leading-relaxed space-y-4">
                <div className="whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <p className="text-xs font-roboto text-gray-500">
                  © 2026 Sotardoc Technologies · Lisensi Riset Arsitektur Sistem
                </p>
                <a
                  href="#kontak"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-md bg-white text-black font-inter font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  Diskusikan Kasus Serupa
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
