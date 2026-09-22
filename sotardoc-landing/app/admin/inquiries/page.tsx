"use client";

import { useEffect, useState } from "react";
import {
  Inbox,
  Search,
  Mail,
  Building,
  Trash2,
  X,
  MessageSquare,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeInquiry, setActiveInquiry] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.inquiries) setInquiries(data.inquiries);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string | number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (activeInquiry && activeInquiry.id === id) {
          setActiveInquiry({ ...activeInquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id: string | number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesanan jasa ini?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (activeInquiry?.id === id) setActiveInquiry(null);
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const statuses = ["Semua", "BARU", "DIPROSES", "SELESAI", "ARSIP"];

  const filtered = inquiries.filter((inq) => {
    const matchStatus = filterStatus === "Semua" || inq.status === filterStatus;
    const matchSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.service_type || inq.serviceType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-inter font-bold text-2xl md:text-3xl text-white tracking-tight">
          Pemesanan Jasa & Konsultasi Klien
        </h1>
        <p className="font-roboto text-sm text-gray-400 mt-1">
          Daftar formulir penawaran dan pemesanan jasa yang dikirimkan oleh klien melalui landing page.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#111111]/70 border border-[#27272A]">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Cari nama klien, email, isi pesan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-inter whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === st
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-gray-400 hover:text-white border border-neutral-800"
              }`}
            >
              {st}
              {st !== "Semua" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({inquiries.filter((i) => i.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#111111]/70 border border-[#27272A] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-500 font-inter text-sm">
            Memuat daftar pemesanan...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-[#27272A] m-4 rounded-xl">
            <Inbox className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="font-inter font-medium text-white">Tidak ada pesan yang cocok.</p>
            <p className="font-roboto text-xs text-gray-500 mt-1">
              Filter atau kata kunci pencarian Anda tidak menemukan hasil.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-roboto">
              <thead className="bg-[#0a0a0a] text-gray-400 uppercase font-inter text-[10px] tracking-wider border-b border-[#27272A]">
                <tr>
                  <th className="py-3.5 px-5">Klien & Kontak</th>
                  <th className="py-3.5 px-5">Layanan</th>
                  <th className="py-3.5 px-5">Budget</th>
                  <th className="py-3.5 px-5">Pesan</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Tanggal</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]/50">
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-neutral-900/40 transition-colors cursor-pointer"
                    onClick={() => setActiveInquiry(inq)}
                  >
                    <td className="py-4 px-5">
                      <div className="font-inter font-bold text-white text-sm">{inq.name}</div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.company && (
                        <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <Building className="w-3 h-3 text-gray-600" />
                          <span>{inq.company}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-inter font-medium text-gray-300">
                        {inq.service_type || inq.serviceType}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono text-gray-300">
                      {inq.budget || "Belum ditentukan"}
                    </td>
                    <td className="py-4 px-5 max-w-xs">
                      <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                        {inq.message}
                      </p>
                    </td>
                    <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        disabled={updatingId === inq.id}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded text-[11px] font-inter font-medium border cursor-pointer focus:outline-none ${
                          inq.status === "BARU"
                            ? "bg-amber-950/70 text-amber-400 border-amber-800"
                            : inq.status === "DIPROSES"
                            ? "bg-blue-950/70 text-blue-400 border-blue-800"
                            : inq.status === "SELESAI"
                            ? "bg-emerald-950/70 text-emerald-400 border-emerald-800"
                            : "bg-neutral-900 text-gray-400 border-neutral-700"
                        }`}
                      >
                        <option value="BARU">BARU</option>
                        <option value="DIPROSES">DIPROSES</option>
                        <option value="SELESAI">SELESAI</option>
                        <option value="ARSIP">ARSIP</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 text-gray-500 text-[11px] whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                        title="Hapus Pesanan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#27272A] rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#27272A] pb-4">
              <div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-inter font-medium mb-1.5 ${
                    activeInquiry.status === "BARU"
                      ? "bg-amber-950/70 text-amber-400 border border-amber-800"
                      : activeInquiry.status === "DIPROSES"
                      ? "bg-blue-950/70 text-blue-400 border border-blue-800"
                      : activeInquiry.status === "SELESAI"
                      ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800"
                      : "bg-neutral-800 text-gray-400"
                  }`}
                >
                  Status: {activeInquiry.status}
                </span>
                <h3 className="font-inter font-bold text-xl text-white">
                  {activeInquiry.name}
                </h3>
                <p className="font-roboto text-xs text-gray-400 mt-0.5">
                  {activeInquiry.company ? `${activeInquiry.company} • ` : ""}
                  {activeInquiry.email}
                </p>
              </div>
              <button
                onClick={() => setActiveInquiry(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs font-roboto bg-[#0a0a0a] p-4 rounded-xl border border-[#27272A]">
              <div>
                <span className="text-gray-500 block text-[11px]">Jenis Layanan:</span>
                <span className="text-white font-medium font-inter mt-0.5 block">
                  {activeInquiry.service_type || activeInquiry.serviceType}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Estimasi Budget:</span>
                <span className="text-white font-medium font-mono mt-0.5 block">
                  {activeInquiry.budget || "Fleksibel / Diskusi"}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-neutral-800">
                <span className="text-gray-500 block text-[11px]">Waktu Pengiriman:</span>
                <span className="text-gray-400 mt-0.5 block">
                  {new Date(activeInquiry.created_at).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-inter font-medium text-gray-300 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>Rincian Kebutuhan & Tantangan Proyek</span>
              </label>
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#27272A] text-xs font-roboto text-gray-300 leading-relaxed whitespace-pre-wrap">
                {activeInquiry.message}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#27272A] flex items-center justify-between">
              <a
                href={`mailto:${activeInquiry.email}?subject=Tanggapan Konsultasi Sotardoc: ${encodeURIComponent(
                  activeInquiry.service_type || activeInquiry.serviceType || "Layanan IT Enterprise"
                )}`}
                className="px-4 py-2 rounded-lg bg-white text-black text-xs font-inter font-semibold flex items-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Balas via Email Klien</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(activeInquiry.id, "DIPROSES")}
                  className="px-3 py-2 rounded-lg bg-blue-950/40 border border-blue-800 text-blue-300 text-xs font-inter hover:bg-blue-900/40 cursor-pointer"
                >
                  Set Diproses
                </button>
                <button
                  onClick={() => updateStatus(activeInquiry.id, "SELESAI")}
                  className="px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-inter hover:bg-emerald-900/40 cursor-pointer"
                >
                  Set Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
