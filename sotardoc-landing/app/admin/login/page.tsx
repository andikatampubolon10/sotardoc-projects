"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login gagal. Silakan coba lagi.");
      }

      // Success
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden bg-grid-pattern">
      {/* Ambient background glow */}
      <div className="absolute w-[600px] h-[300px] bg-white/[0.02] blur-3xl rounded-full pointer-events-none -top-20" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/sotardoc-logo.webp"
              alt="Sotardoc Logo"
              width={160}
              height={81}
              unoptimized
              priority
              className="h-12 w-auto object-contain pointer-events-none"
            />
          </div>
          <h2 className="font-inter font-bold text-xl tracking-tight text-white">
            Enterprise Admin Portal
          </h2>
          <p className="font-roboto text-xs text-gray-400 mt-1">
            Masuk untuk mengelola portofolio proyek dan pesanan jasa enterprise.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-[#27272A] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-800/60 flex items-start gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-inter font-medium text-gray-300 mb-1.5">
                Username Admin
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-inter font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-white text-black font-inter font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#27272A]/80 flex items-center justify-between text-[11px] text-gray-500 font-roboto">
            <div className="flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sesi Terenkripsi SHA-256</span>
            </div>
            <Link href="/" className="hover:text-white transition-colors">
              Kembali ke Landing Page
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-600 mt-6 font-roboto">
          Kredensial Default: <code className="text-gray-400">admin</code> / <code className="text-gray-400">admin123456</code>
        </p>
      </div>
    </div>
  );
}
