"use client";

import { useState } from "react";
import { Mail, Send, ChevronDown, CheckCircle, MapPin, Clock, ShieldCheck, MessageSquare, PhoneCall } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FormState {
  fullName: string;
  contactInfo: string;
  serviceType: string;
  projectDetails: string;
}

const initialForm: FormState = {
  fullName: "",
  contactInfo: "",
  serviceType: "",
  projectDetails: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const headerRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const formRef = useScrollReveal<HTMLFormElement>({ threshold: 0.08 });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const serviceLabels: Record<string, string> = {
    "ml-ai": "Pengembangan Machine Learning & AI Terapan",
    "cloud-microservices": "Arsitektur Microservices & Migrasi Cloud",
    "ui-ux": "Desain UI/UX & Riset Prototipe Digital",
    "custom-dev": "Pengembangan Aplikasi Web & Mobile Khusus",
    "consulting": "Audit Arsitektur & Konsultasi IT Enterprise",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      const selectedService = serviceLabels[form.serviceType] || form.serviceType;
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.contactInfo,
          serviceType: selectedService,
          message: form.projectDetails,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim formulir. Silakan coba lagi.");
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-neutral-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 font-roboto text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-200";

  const labelClass =
    "block font-inter text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2";

  return (
    <section id="kontak" className="mt-24 py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div ref={headerRef} className="reveal text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-neutral-900 text-xs font-inter font-medium text-gray-300 mb-4">
          <Mail className="w-3.5 h-3.5" aria-hidden />
          <span className="text-shimmer">Konsultasi Arsitektur &amp; Penawaran Jasa</span>
        </div>
        <h2 className="font-inter text-3xl md:text-4xl text-white tracking-tight mb-4 font-normal">
          Hubungi Tim Engineering Kami
        </h2>
        <p className="font-roboto text-gray-400 text-base leading-relaxed max-w-xl mx-auto font-normal">
          Diskusikan roadmap teknologi, optimasi infrastruktur cloud, atau pipeline AI Anda langsung dengan senior architect Sotardoc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        {/* Left Column: Direct Corporate Credentials & Trust */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0D0D0D] border border-[#27272A] rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="font-inter text-xl text-white font-medium tracking-tight">
              Kanal Komunikasi Resmi
            </h3>
            <p className="font-roboto text-xs text-gray-400 leading-relaxed">
              Kami memprioritaskan komunikasi langsung tanpa perantara sales agensi tradisional. Anda akan terhubung dengan insinyur yang memahami kode dan arsitektur sistem.
            </p>

            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-600 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0 text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-inter text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Email Korespondensi</div>
                  <a href="mailto:contact@sotardoc.com" className="font-mono text-sm text-white hover:text-gray-300 font-medium transition-colors">
                    contact@sotardoc.com
                  </a>
                  <div className="font-roboto text-[11px] text-gray-500">Proposal teknis &amp; dokumen tender (RFP)</div>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/6281290104421?text=Halo%20Tim%20Sotardoc,%20kami%20ingin%20berkonsultasi%20mengenai%20proyek%20sistem%20perusahaan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-950/10 transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center flex-shrink-0 text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-inter text-[11px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>WhatsApp Langsung</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  </div>
                  <div className="font-mono text-sm text-white font-medium group-hover:text-emerald-300 transition-colors">
                    +62 812-9010-4421
                  </div>
                  <div className="font-roboto text-[11px] text-gray-500">Konsultasi cepat &amp; jadwal panggilan video</div>
                </div>
              </a>

              {/* Office Location */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0 text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-inter text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Engineering Hub</div>
                  <div className="font-roboto text-sm text-white font-normal">
                    Jakarta Selatan, DKI Jakarta
                  </div>
                  <div className="font-roboto text-[11px] text-gray-500">Indonesia · Melayani Klien Nasional &amp; Regional</div>
                </div>
              </div>

              {/* SLA & NDA */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0 text-white">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-inter text-[11px] uppercase tracking-wider text-gray-400 font-semibold">SLA Evaluasi Teknis</div>
                  <div className="font-roboto text-sm text-white font-normal">
                    Maksimal 1×24 Jam Kerja
                  </div>
                  <div className="font-roboto text-[11px] text-gray-500">Senin – Jumat, 08:30 – 18:00 WIB</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[11px] font-roboto text-gray-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <span>
                <strong>Jaminan Kerahasiaan (NDA):</strong> Seluruh data arsitektur dan skema bisnis yang Anda bagikan dilindungi perjanjian kerahasiaan ketat sebelum NDA resmi ditandatangani.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Form with animated gradient border */}
        <div className="lg:col-span-7">
          <form
            ref={formRef}
            id="contact-form"
            onSubmit={handleSubmit}
            className="reveal animated-border-card bg-[#0d0d0d] rounded-2xl p-8 md:p-10 shadow-2xl relative"
          >
            <div className="space-y-6">

            {/* Nama Lengkap */}
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Nama Lengkap <span className="text-white font-bold">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Contoh: Budi Pratama"
                className={inputClass}
              />
            </div>

            {/* Email / WhatsApp */}
            <div>
              <label htmlFor="contactInfo" className={labelClass}>
                Email / WhatsApp <span className="text-white font-bold">*</span>
              </label>
              <input
                id="contactInfo"
                name="contactInfo"
                type="text"
                required
                value={form.contactInfo}
                onChange={handleChange}
                placeholder="budi@perusahaan.co.id atau +62 812-XXXX-XXXX"
                className={inputClass}
              />
            </div>

            {/* Tipe Layanan */}
            <div>
              <label htmlFor="serviceType" className={labelClass}>
                Tipe Layanan <span className="text-white font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  id="serviceType"
                  name="serviceType"
                  required
                  value={form.serviceType}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Pilih salah satu spesialisasi layanan
                  </option>
                  <option value="ml-ai">
                    Pengembangan Machine Learning &amp; AI Terapan
                  </option>
                  <option value="cloud-microservices">
                    Arsitektur Microservices &amp; Migrasi Cloud
                  </option>
                  <option value="ui-ux">
                    Desain UI/UX &amp; Riset Prototipe Digital
                  </option>
                  <option value="custom-dev">
                    Pengembangan Aplikasi Web &amp; Mobile Khusus
                  </option>
                  <option value="consulting">
                    Audit Arsitektur &amp; Konsultasi IT Enterprise
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" aria-hidden />
                </div>
              </div>
            </div>

            {/* Detail Proyek */}
            <div>
              <label htmlFor="projectDetails" className={labelClass}>
                Detail Proyek <span className="text-white font-bold">*</span>
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                required
                rows={4}
                value={form.projectDetails}
                onChange={handleChange}
                placeholder="Jelaskan kebutuhan fungsional, estimasi tenggat waktu, atau kendala teknis sistem saat ini..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Success Alert */}
            {success && (
              <div
                id="form-success-alert"
                className="p-4 rounded-lg bg-neutral-900 border border-white text-sm text-[#F3F4F6] font-roboto flex items-start gap-3 animate-[fadeInUp_0.4s_ease_forwards]"
                style={{
                  animation: "fadeInUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
                }}
              >
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="font-inter font-bold text-white">
                    Permintaan Berhasil Terkirim
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Terima kasih atas kepercayaan Anda. Tim rekayasa kami akan
                    segera mempelajari ringkasan proyek ini dan menghubungi Anda.
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {errorMsg && (
              <div className="p-4 rounded-lg bg-red-950/50 border border-red-800 text-xs text-red-200 font-roboto">
                <p className="font-bold font-inter text-red-400">Pengiriman Gagal</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="submit-btn"
              type="submit"
              disabled={loading}
              className="btn-magnetic w-full py-3 bg-white text-black font-inter font-bold text-sm tracking-wide rounded-lg hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Mengirimkan Detail...</span>
                </>
              ) : (
                <>
                  <span>Kirim Pesan Pemesanan Jasa</span>
                  <Send className="w-4 h-4" aria-hidden />
                </>
              )}
            </button>

            {/* Privacy note */}
            <p className="text-[11px] text-gray-500 text-center font-roboto">
              Data Anda terlindungi oleh kebijakan kerahasiaan &amp;
              Non-Disclosure Agreement (NDA) standar industri.
            </p>
          </div>
        </form>
      </div>
      </div>
    </section>
  );
}
