"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Upload,
  ExternalLink,
  X,
  AlertCircle,
  FolderKanban,
} from "lucide-react";

interface ProjectForm {
  id?: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  description: string;
  client: string;
  duration: string;
  architecture: string[];
  metrics: Array<{ label: string; value: string }>;
  techStack: string[];
  liveUrl: string;
}

const emptyForm: ProjectForm = {
  title: "",
  category: "AI & Machine Learning",
  image: "",
  summary: "",
  description: "",
  client: "",
  duration: "3 Bulan",
  architecture: [""],
  metrics: [{ label: "", value: "" }],
  techStack: [],
  liveUrl: "",
};

const categories = [
  "Semua",
  "AI & Machine Learning",
  "Cloud Architecture",
  "Enterprise Core & Microservices",
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProjectForm>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.projects) setProjects(data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setFormData(emptyForm);
    setTechInput("");
    setFormError("");
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setFormData({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image || p.image_url || "",
      summary: p.summary,
      description: p.description,
      client: p.client || "",
      duration: p.duration || "",
      architecture: p.architecture && p.architecture.length > 0 ? p.architecture : [""],
      metrics: p.metrics && p.metrics.length > 0 ? p.metrics : [{ label: "", value: "" }],
      techStack: p.techStack || [],
      liveUrl: p.liveUrl || p.live_url || "",
    });
    setTechInput((p.techStack || []).join(", "));
    setFormError("");
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengupload gambar.");

      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err: any) {
      setFormError("Upload error: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      // Process tech stack
      const parsedTech = techInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // Clean architecture and metrics
      const cleanArch = formData.architecture.filter((a) => a.trim().length > 0);
      const cleanMetrics = formData.metrics.filter((m) => m.label.trim() && m.value.trim());

      const payload = {
        ...formData,
        techStack: parsedTech,
        architecture: cleanArch,
        metrics: cleanMetrics,
      };

      const url = isEditing ? `/api/projects/${formData.id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan proyek.");

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/projects/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteId(null);
        fetchProjects();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCat =
      selectedCategory === "Semua" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-inter font-bold text-2xl md:text-3xl text-white tracking-tight">
            Manajemen Portofolio Proyek
          </h1>
          <p className="font-roboto text-sm text-gray-400 mt-1">
            Tambah, edit konten, arsitektur, metrik performa, dan gambar proyek enterprise.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black text-xs font-inter font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-sm shadow-white/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#111111]/70 border border-[#27272A]">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Cari judul proyek, klien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-inter whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-black font-semibold"
                  : "bg-neutral-900 text-gray-400 hover:text-white border border-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="p-16 text-center text-gray-500 font-inter text-sm">
          Memuat data proyek...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-16 text-center border border-dashed border-[#27272A] rounded-2xl bg-[#0c0c0c]">
          <FolderKanban className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="font-inter font-medium text-white">Tidak ada proyek yang sesuai.</p>
          <p className="font-roboto text-xs text-gray-500 mt-1">
            Coba ubah kata kunci pencarian atau tambah proyek baru.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-[#111111]/80 border border-[#27272A] rounded-xl overflow-hidden flex flex-col group hover:border-[#3F3F46] transition-all"
            >
              {/* Image preview */}
              <div className="h-44 bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center border-b border-[#27272A]">
                {p.image ? (
                  p.image.startsWith("data:image/svg") || p.image.startsWith("<svg") ? (
                    <div
                      className="w-full h-full flex items-center justify-center p-4 scale-90"
                      dangerouslySetInnerHTML={{
                        __html: p.image.startsWith("data:image/svg+xml;utf8,")
                          ? decodeURIComponent(p.image.replace("data:image/svg+xml;utf8,", ""))
                          : p.image,
                      }}
                    />
                  ) : (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )
                ) : (
                  <div className="text-gray-600 text-xs font-mono">No Image</div>
                )}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-neutral-700 text-[10px] font-inter font-medium text-gray-300">
                  {p.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1 font-mono">
                    <span>{p.client || "Client Enterprise"}</span>
                    <span>{p.duration || "Durasi -"}</span>
                  </div>
                  <h3 className="font-inter font-bold text-base text-white tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="font-roboto text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {p.summary}
                  </p>
                </div>

                {/* Tech tags */}
                {p.techStack && p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.techStack.slice(0, 3).map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-gray-400"
                      >
                        {t}
                      </span>
                    ))}
                    {p.techStack.length > 3 && (
                      <span className="text-[10px] text-gray-500 self-center">
                        +{p.techStack.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-[#27272A]/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs font-inter text-gray-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="p-1.5 rounded bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900/40 hover:text-red-200 transition-colors cursor-pointer"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-white text-xs flex items-center gap-1"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#27272A] rounded-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-inter font-bold text-lg text-white">Hapus Proyek Ini?</h3>
            <p className="font-roboto text-xs text-gray-400 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Proyek akan dihapus secara permanen dari portofolio landing page.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-gray-300 text-xs font-inter hover:bg-neutral-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-inter font-semibold hover:bg-red-700 cursor-pointer"
              >
                Ya, Hapus Proyek
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-[#27272A] rounded-2xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#27272A] flex items-center justify-between bg-[#0a0a0a]">
              <div>
                <h3 className="font-inter font-bold text-lg text-white">
                  {isEditing ? "Edit Detail Proyek" : "Tambah Proyek Baru"}
                </h3>
                <p className="font-roboto text-xs text-gray-400 mt-0.5">
                  Lengkapi data arsitektur, metrik, dan gambar untuk portofolio landing page.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 font-roboto text-xs">
              {formError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 flex items-center gap-2 text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter font-medium text-gray-300 mb-1.5">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Platform Prediksi Supply Chain"
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium text-gray-300 mb-1.5">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white focus:outline-none focus:border-white"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Enterprise Core & Microservices">
                      Enterprise Core & Microservices
                    </option>
                  </select>
                </div>
              </div>

              {/* Client & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter font-medium text-gray-300 mb-1.5">
                    Nama Klien / Industri
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Contoh: FMCG Multinasional"
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium text-gray-300 mb-1.5">
                    Durasi Pengerjaan
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Contoh: 4 Bulan (Sprint Berkelanjutan)"
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Image Upload / URL */}
              <div>
                <label className="block font-inter font-medium text-gray-300 mb-1.5">
                  Gambar / Banner Proyek
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/uploads/... atau https://..."
                      className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white font-mono text-[11px]"
                    />
                  </div>
                  <label className="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-gray-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "Mengunggah..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2.5 h-28 w-44 rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden relative">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block font-inter font-medium text-gray-300 mb-1.5">
                  Ringkasan Singkat (Muncul di Kartu Portofolio) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Ringkasan dampak bisnis dan teknologi dalam 1-2 kalimat..."
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block font-inter font-medium text-gray-300 mb-1.5">
                  Deskripsi Lengkap (Muncul di Modal Detail) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan latar belakang masalah, solusi arsitektur yang dibangun, serta pendekatan implementasinya..."
                  className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              {/* Architecture Highlights (List) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-inter font-medium text-gray-300">
                    Sorotan Arsitektur Solusi
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        architecture: [...formData.architecture, ""],
                      })
                    }
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Poin</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.architecture.map((arch, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={arch}
                        onChange={(e) => {
                          const updated = [...formData.architecture];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, architecture: updated });
                        }}
                        placeholder={`Poin Arsitektur ${idx + 1}`}
                        className="flex-1 px-3.5 py-2 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white"
                      />
                      {formData.architecture.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.architecture.filter((_, i) => i !== idx);
                            setFormData({ ...formData, architecture: updated });
                          }}
                          className="p-2 text-gray-500 hover:text-red-400 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Metrics (Label + Value) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-inter font-medium text-gray-300">
                    Metrik Dampak / Hasil Terukur
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        metrics: [...formData.metrics, { label: "", value: "" }],
                      })
                    }
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Metrik</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.metrics.map((m, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2">
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const updated = [...formData.metrics];
                          updated[idx].value = e.target.value;
                          setFormData({ ...formData, metrics: updated });
                        }}
                        placeholder="Nilai (misal: 99.98% atau +34%)"
                        className="col-span-5 px-3.5 py-2 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white font-mono"
                      />
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const updated = [...formData.metrics];
                          updated[idx].label = e.target.value;
                          setFormData({ ...formData, metrics: updated });
                        }}
                        placeholder="Keterangan (misal: Efisiensi Biaya Cloud)"
                        className="col-span-6 px-3.5 py-2 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.metrics.filter((_, i) => i !== idx);
                          setFormData({ ...formData, metrics: updated });
                        }}
                        className="col-span-1 p-2 text-gray-500 hover:text-red-400 flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Live URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-inter font-medium text-gray-300 mb-1.5">
                    Tech Stack (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Next.js, FastAPI, Kafka, Kubernetes, PostgreSQL"
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block font-inter font-medium text-gray-300 mb-1.5">
                    Live Demo / Arsitektur URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#27272A] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-5 border-t border-[#27272A] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-neutral-900 text-gray-300 text-xs font-inter hover:bg-neutral-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg bg-white text-black text-xs font-inter font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Publikasikan Proyek"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
