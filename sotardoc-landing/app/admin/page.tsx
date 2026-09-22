"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Inbox,
  Clock,
  Database,
  ArrowUpRight,
  AlertTriangle,
  Plus,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [projectsCount, setProjectsCount] = useState(0);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [projRes, inqRes, statusRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/inquiries"),
        fetch("/api/status"),
      ]);

      const projData = await projRes.json();
      const inqData = await inqRes.json();
      const statusData = await statusRes.json();

      if (projData.projects) setProjectsCount(projData.projects.length);
      if (inqData.inquiries) setInquiries(inqData.inquiries);
      if (statusData) setDbStatus(statusData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newInquiriesCount = inquiries.filter((i) => i.status === "BARU").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-inter font-bold text-2xl md:text-3xl text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="font-roboto text-sm text-gray-400 mt-1">
            Pantau performa portofolio digital dan kelola permintaan jasa enterprise.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-inter text-gray-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </button>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-inter font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Projects */}
        <div className="bg-[#111111]/70 border border-[#27272A] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-inter font-medium">Total Portofolio</span>
            <FolderKanban className="w-4 h-4 text-white" />
          </div>
          <div className="font-inter font-bold text-3xl text-white tracking-tight">
            {projectsCount}
          </div>
          <p className="text-[11px] text-gray-500 font-roboto mt-2">
            Proyek aktif di landing page
          </p>
        </div>

        {/* Card 2: Total Inquiries */}
        <div className="bg-[#111111]/70 border border-[#27272A] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-inter font-medium">Pesanan Jasa Masuk</span>
            <Inbox className="w-4 h-4 text-white" />
          </div>
          <div className="font-inter font-bold text-3xl text-white tracking-tight">
            {inquiries.length}
          </div>
          <p className="text-[11px] text-gray-500 font-roboto mt-2">
            Total pemesanan dari form publik
          </p>
        </div>

        {/* Card 3: New Inquiries */}
        <div className="bg-[#111111]/70 border border-[#27272A] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-inter font-medium">Perlu Respon</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-inter font-bold text-3xl text-amber-400 tracking-tight">
            {newInquiriesCount}
          </div>
          <p className="text-[11px] text-gray-500 font-roboto mt-2">
            Status pesanan masih &quot;BARU&quot;
          </p>
        </div>

        {/* Card 4: Database Status */}
        <div className="bg-[#111111]/70 border border-[#27272A] rounded-xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-inter font-medium">Koneksi Database</span>
            <Database className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                dbStatus?.database?.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="font-inter font-bold text-lg text-white">
              {dbStatus?.database?.connected ? "MySQL Arenhost" : "Local Store Sync"}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 font-roboto mt-2 truncate">
            {dbStatus?.database?.name || "sotardoc_projects"}
          </p>
        </div>
      </div>

      {/* Database Diagnostic Notice */}
      {!dbStatus?.database?.connected && (
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-inter font-medium text-amber-200">
                Mode Penyimpanan Lokal Aktif (Fallback Resilient)
              </p>
              <p className="font-roboto text-gray-400 text-[11px] mt-0.5">
                Koneksi remote ke database MySQL Arenhost ({dbStatus?.database?.host || "localhost"}) belum terbuka dari IP laptop Anda. Semua operasi CRUD dan pesan tetap tersimpan dengan aman pada local store, dan akan otomatis tersinkron ke MySQL saat di-deploy ke hosting Arenhost.
              </p>
            </div>
          </div>
          <button
            onClick={fetchData}
            className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-[11px] text-gray-300 hover:text-white shrink-0 cursor-pointer"
          >
            Coba Sambungkan Ulang
          </button>
        </div>
      )}

      {/* Recent Inquiries Section */}
      <div className="bg-[#111111]/70 border border-[#27272A] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
          <div>
            <h3 className="font-inter font-semibold text-base text-white">
              Pesanan Jasa Terbaru
            </h3>
            <p className="font-roboto text-xs text-gray-400 mt-0.5">
              Data klien yang mengirimkan formulir penawaran jasa dari landing page.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1.5 text-xs font-inter text-gray-400 hover:text-white transition-colors"
          >
            <span>Lihat Semua</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm font-inter text-gray-400">Belum ada pesanan jasa masuk.</p>
            <p className="text-xs font-roboto text-gray-600 mt-1">
              Data akan otomatis muncul ketika pengunjung mengisi formulir di landing page.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-roboto">
              <thead className="bg-[#0a0a0a] text-gray-400 uppercase font-inter text-[10px] tracking-wider border-b border-[#27272A]">
                <tr>
                  <th className="py-3 px-5">Klien / Perusahaan</th>
                  <th className="py-3 px-5">Layanan</th>
                  <th className="py-3 px-5">Budget</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]/50">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-inter font-medium text-white">{inq.name}</div>
                      <div className="text-[11px] text-gray-500">{inq.email} {inq.company ? `• ${inq.company}` : ""}</div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-300">
                      {inq.service_type || inq.serviceType}
                    </td>
                    <td className="py-3.5 px-5 text-gray-400 font-mono">
                      {inq.budget || "-"}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-inter font-medium ${
                          inq.status === "BARU"
                            ? "bg-amber-950/60 text-amber-400 border border-amber-800/60"
                            : inq.status === "DIPROSES"
                            ? "bg-blue-950/60 text-blue-400 border border-blue-800/60"
                            : inq.status === "SELESAI"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                            : "bg-neutral-800 text-gray-400"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-gray-500 text-[11px]">
                      {new Date(inq.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
