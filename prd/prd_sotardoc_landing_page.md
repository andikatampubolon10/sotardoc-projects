# Product Requirements Document (PRD)
**Project Name:** Sotardoc - Enterprise IT Solutions Landing Page
**Document Version:** 1.0
**Target Platform:** Web (Desktop & Mobile Responsive)

## 1. Project Overview
**Sotardoc** adalah agensi IT Business Solution yang fokus pada layanan rekayasa perangkat lunak skala enterprise, integrasi AI/Machine Learning, Cloud Architecture, dan UI/UX Design. 

Tujuan dari proyek ini adalah membangun landing page utama (bertema dark-mode, premium, dan profesional) untuk memamerkan portofolio proyek unggulan dan menyediakan jalur konversi (Inquiry Form) bagi calon klien B2B untuk memesan jasa atau berkonsultasi.

## 2. Design System & Theming
*   **Theme:** Dark Mode / Cyber-Minimalist.
*   **Background:** Hitam pekat (`#000000` atau `#09090B`) dengan aksen pola *grid lines* tipis transparan di latar belakang untuk memberikan kesan teknikal/engineering.
*   **Typography:** 
    *   Modern Sans-serif (seperti Inter, Roboto, atau Geist).
    *   Warna teks dominan: Putih tajam (`#FFFFFF`) untuk judul, abu-abu terang (`#A1A1AA` atau `#D1D5DB`) untuk deskripsi.
*   **Borders & Shapes:** Menggunakan *rounded corners* yang halus (misal `rounded-xl` atau `rounded-2xl`) dengan border tipis (1px solid abu-abu gelap/transparan).
*   **Interactions:** Efek *hover* yang mulus pada tombol dan kartu proyek (elevasi, perubahan warna border, dan transisi ikon).

## 3. Page Structure & Features

### 3.1. Header / Navigation
*   **Brand Logo:** Teks "Sotardoc" (Bold) dengan *tagline* kecil "ENTERPRISE IT SOLUTIONS". Terdapat logo ikon "S" di dalam kotak.
*   **Navigation Links:** Proyek, Layanan, Tentang Kami, Kontak (Smooth scroll ke masing-masing section).
*   **CTA Button:** Tombol outline putih "KONSULTASI GRATIS" (Di sudut kanan atas).

### 3.2. Section: Portfolio Showcase ("Proyek Utama Kami")
*   **Header:** Label kecil "PORTOFOLIO TERPILIH" dan Judul H2 "Proyek Utama Kami".
*   **Filter System:** Baris tombol filter kategori proyek (Pill shape):
    *   Semua (Default active - background putih, teks hitam)
    *   AI / Machine Learning
    *   Cloud & Architecture
    *   UI/UX Design
*   **Project Grid:** Grid 3 kolom (Desktop) & 1 kolom (Mobile).
*   **Data Proyek (Refer to UI):**
    1.  **AgriFlow-ML:** (Python, RNN, React) - Sistem ekosistem digital rantai pasok pertanian.
    2.  **VisionScan OCR & KYC:** (PyTorch, FastAPI, OpenCV) - Ekstraksi identitas otomatis & verifikasi biometrik.
    3.  **MediTrack Transformation:** (Node.js, Microservices, Docker) - Migrasi arsitektur monolitik untuk sistem deteksi awal Posyandu.
    4.  **BankCore Kubernetes Migration:** (Go, K8s, Terraform, AWS) - Re-platforming sistem core perbankan.
    5.  **Parkarejo:** (Figma, UI/UX, Design System) - Prototipe & design system sistem parkir digital.
    6.  **NexaPay FinTech SuperApp:** (Figma, Prototyping, Usability Testing) - Redesain end-to-end aplikasi perbankan digital.
*   **Card UI Anatomy:**
    *   *Image Area:* Placeholder gambar/grafis dengan badge kecil transparan di sudut kiri bawah (misal: "MODEL PREDICTIVE v1.4"). Ikon *expand* di kanan atas.
    *   *Title & Tags:* Judul tebal, di bawahnya terdapat deretan *tech stack pills* berukuran kecil.
    *   *Description:* 2-3 baris teks penjelasan ringkas.
    *   *Action:* Tombol "LIHAT DETAIL" (Outline) dengan ikon *external link*. Ketika diklik, akan memicu **Project Detail Modal**.

### 3.3. Section: Value Propositions / Why Us
*   **Layout:** 3 Kolom sejajar di dalam sebuah *container card* dengan border tipis.
*   **Content:**
    1.  **Rekayasa Skala Enterprise:** (Ikon Code/Shield) Kode berstandar industri dengan pengujian otomatis...
    2.  **Integrasi AI & Machine Learning:** (Ikon Node/AI) Transformasi data mentah perusahaan menjadi analitik prediktif...
    3.  **Delivery Tangkas & Transparan:** (Ikon Lightning/Agile) Metodologi kerja terstruktur, dokumentasi komprehensif...

### 3.4. Section: Contact & Inquiry Form
*   **Header:** Badge "Konsultasi Proyek & Pemesanan Jasa", Judul "Hubungi Kami untuk Pemesanan Jasa", dan sub-teks SLA (respon maksimal 1x24 jam kerja).
*   **Form Fields:** Input form bergaya *floating label* atau *standard label* di luar kotak dengan *background* abu-abu sangat gelap (`bg-neutral-900/50`).
    1.  **NAMA LENGKAP *** (Teks input, placeholder: Contoh: Budi Pratama)
    2.  **EMAIL / WHATSAPP *** (Teks input, placeholder: budi@perusahaan.co.id...)
    3.  **TIPE LAYANAN *** (Dropdown select, placeholder: Pilih salah satu spesifikasi layanan)
    4.  **DETAIL PROYEK *** (Textarea, placeholder: Jelaskan kebutuhan fungsional...)
*   **Submit Action:** Tombol penuh (Full-width) warna putih tebal dengan teks hitam "Kirim Pesan Pemesanan Jasa" (Beserta ikon *paper plane*).
*   **Footer Note:** Teks persetujuan privasi (NDA standard industri) di bawah tombol *submit*.

### 3.5. Footer
*   **Left:** Logo "S Sotardoc IT Solutions".
*   **Center:** Copyright "© 2026 Sotardoc Technologies. Hak Cipta Dilindungi Undang-Undang."
*   **Right:** Links "Ketentuan Layanan", "Privasi", "Dokumentasi API".

## 4. Technical Requirements
*   **Framework:** React.js / Next.js
*   **Styling:** Tailwind CSS (Wajib menggunakan arbitrary values atau utility classes untuk grid, flex, padding, dan colors).
*   **Icons:** Lucide React (Direkomendasikan untuk ikon UI dan kategori).
*   **State Management:** Membutuhkan `useState` lokal untuk:
    *   *Active state* pada filter kategori portofolio.
    *   Menyembunyikan/menampilkan kartu proyek berdasarkan filter aktif.
    *   Logika input form (*Controlled components*).
    *   (Jika diperlukan) Modal pop-up untuk detail proyek.

## 5. Next Action for AI (Prompting Guide)
When feeding this PRD to an AI generator (like Antigravity/Cursor):
1. Instruct the AI to set up a dark-mode Next.js/React project with Tailwind.
2. Build the layout section by section sequentially.
3. Ensure the CSS background grid pattern (`bg-[linear-gradient...]`) is applied globally to match the reference image.