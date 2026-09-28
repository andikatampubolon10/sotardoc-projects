export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: "Machine Learning" | "Cloud & Architecture" | "Distributed Systems";
  badgeColor: "emerald" | "cyan" | "violet";
  author: string;
  summary: string;
  keyTakeaways: string[];
  content: string;
}

export const insightArticles: InsightArticle[] = [
  {
    id: "onnx-kyc-inference-optimization",
    slug: "onnx-kyc-inference-optimization",
    title: "Kuantisasi Model Deep Learning & Optimasi Inferensi ONNX untuk Sistem KYC Sub-Detik (<400ms)",
    date: "12 September 2026",
    readTime: "7 menit baca",
    category: "Machine Learning",
    badgeColor: "emerald",
    author: "Sotardoc ML Systems Engineering",
    summary:
      "Bagaimana kami mengompresi bobot model deteksi biometrik dan ekstraksi OCR dari 480MB menjadi 42MB menggunakan kuantisasi dinamis INT8 tanpa menurunkan akurasi pengenalan pola, memangkas latensi inferensi dari 1.8 detik ke 380 milidetik.",
    keyTakeaways: [
      "Kuantisasi INT8 memangkas jejak memori GPU/CPU hingga 82% dan mempertahankan F1-Score pada level 99.1%.",
      "Pemanfaatan ONNX Runtime execution provider (DirectML / TensorRT) menghasilkan deterministik throughput 250 requests/sec per node.",
      "Liveness detection terintegrasi dengan validasi tekstur frekuensi tinggi (Laplacian variance) untuk menangkal spoofing foto cetak.",
    ],
    content: `### Latar Belakang & Tantangan Produksi
Pada sistem perbankan digital dan fintech, kecepatan proses verifikasi identitas (Know-Your-Customer / KYC) berkorelasi langsung terhadap rasio konversi pendaftaran pengguna baru. Model deep learning standar berbasis convolutional neural network (CNN) dan transformer OCR seringkali membutuhkan memori komputasi besar (VRAM > 3GB) dan menghasilkan latensi inferensi rata-rata 1.8 detik pada server CPU standar.

Kondisi ini memicu antrean panjang (bottleneck) saat lonjakan pendaftaran nasabah baru di jam sibuk.

### Metodologi Kuantisasi INT8
Tim Sotardoc menerapkan strategi optimasi bertingkat:
1. **Model Pruning:** Mengeliminasi bobot koneksi saraf non-kritis dengan ambang batas magnitudo terkontrol (< 0.005).
2. **Post-Training Quantization (PTQ):** Mengonversi representasi bobot float32 menjadi fixed-point int8 dengan kalibrasi berbasis entropi KL-Divergence pada 10.000 sampel citra e-KTP dan paspor.
3. **Graph Operator Fusion:** Menggabungkan operasi BatchNorm dan ReLU ke dalam convolutional layer pendahulunya secara native melalui ONNX Runtime.

\`\`\`python
# Cuplikan ekspor ONNX Runtime Quantization
import onnx
from onnxruntime.quantization import quantize_dynamic, QuantType

model_fp32 = 'kyc_detector_fp32.onnx'
model_quant = 'kyc_detector_int8.onnx'

quantize_dynamic(
    model_fp32,
    model_quant,
    weight_type=QuantType.QInt8,
    per_channel=True,
    reduce_range=True
)
\`\`\`

### Hasil Tolok Ukur (Benchmark) Produksi
- **Ukuran File Model:** Berkurang dari 482 MB (FP32) menjadi 42.6 MB (INT8).
- **Latensi Rata-Rata (P95):** Menurun dari 1.840ms menjadi 380ms pada infrastruktur CPU 4-Core tanpa GPU dedicated.
- **Akurasi OCR Karakter (CER):** Character Error Rate hanya bergeser 0.08%, tetap memenuhi standar regulasi kepatuhan perbankan nasional.`,
  },
  {
    id: "monolith-to-kafka-microservices-migration",
    slug: "monolith-to-kafka-microservices-migration",
    title: "Strategi Dekomposisi Monolit ke Event-Driven Microservices Menggunakan Kafka Tanpa Downtime",
    date: "28 Agustus 2026",
    readTime: "9 menit baca",
    category: "Cloud & Architecture",
    badgeColor: "cyan",
    author: "Sotardoc Distributed Architecture Group",
    summary:
      "Panduan arsitektur rekayasa dalam memecah basis kode monolitik warisan (legacy) menjadi 8 microservices terdesentralisasi menggunakan Transactional Outbox Pattern dan Change Data Capture (CDC) dengan zero-downtime.",
    keyTakeaways: [
      "Transactional Outbox Pattern mencegah inkonsistensi status antara basis data relasional dan message broker.",
      "Debezium CDC membaca PostgreSQL Write-Ahead Log (WAL) tanpa membebani query runtime monolit lama.",
      "Skema backward-compatibility diterapkan dengan Avro Schema Registry untuk transisi data bertahap selama 90 hari.",
    ],
    content: `### Masalah: Monolitik Terjebak Deadlock
Sistem supply chain logistik klien mengalami kendala skalabilitas ketika volume transaksi inventaris gudang mencapai lebih dari 500 pemesanan per detik. Basis data monolitik mengalami konkurensi lock yang mengakibatkan transaksi kasir cabang mengalami timeout.

### Arsitektur Migrasi: Strangler Fig & Transactional Outbox
Alih-alih melakukan rewrite total ("big bang rewrite") yang berisiko tinggi terhadap operasional bisnis, Sotardoc menerapkan pola **Strangler Fig**:

1. **Transactional Outbox Pattern:**
   Setiap kali entitas pesanan diperbarui, tabel \`outbox_events\` diisi dalam transaksi ACID yang sama dengan tabel bisnis. Hal ini menjamin status *at-least-once delivery* tanpa risiko pesan hilang (*dual-write problem*).

2. **Change Data Capture (CDC) via Kafka Connect:**
   Konektor Debezium membaca log replikasi PostgreSQL (\`pgoutput\`) dan mempublikasikan payload event ke topik Apache Kafka yang dipartisi berdasarkan \`warehouse_id\`.

3. **Consumer Idempotency:**
   Setiap layanan mikro konsumen (misal: \`inventory-service\` dan \`notification-service\`) menerapkan validasi hash event kunci untuk memastikan operasi tetap idempoten meski terjadi redelivery paket jaringan.

\`\`\`sql
-- Skema Tabel Outbox Transaksional
CREATE TABLE outbox_events (
  id UUID PRIMARY KEY,
  aggregate_type VARCHAR(64) NOT NULL,
  aggregate_id VARCHAR(128) NOT NULL,
  event_type VARCHAR(128) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

### Hasil Operasional Nyata
- **Downtime Migrasi:** 0 detik (zero-downtime). Transisi bertahap diselesaikan selama 8 minggu operasional aktif.
- **Throughput Lonjakan:** Sistem berhasil menangani lonjakan 2.400 event per detik pada hari libur nasional tanpa antrean pending.`,
  },
  {
    id: "high-availability-failover-postgresql",
    slug: "high-availability-failover-postgresql",
    title: "High-Availability & Failover Multi-Region pada Basis Data PostgreSQL Terdistribusi",
    date: "15 Juli 2026",
    readTime: "8 menit baca",
    category: "Distributed Systems",
    badgeColor: "violet",
    author: "Sotardoc Site Reliability Engineering",
    summary:
      "Rancangan arsitektur failover otomatis PostgreSQL menggunakan Patroni, etcd konsensus terdistribusi, dan PgBouncer connection pooling untuk menjamin RTO < 15 detik dan RPO = 0 pada kluster perbankan.",
    keyTakeaways: [
      "Patroni + etcd konsensus menjamin tidak terjadi skenario split-brain saat terjadi partisi jaringan antar-zona.",
      "PgBouncer memangkas beban fork proses PostgreSQL hingga 75%, menstabilkan pool koneksi saat spike transaksi.",
      "Recovery Time Objective (RTO) tercapai dalam 11.4 detik pada pengujian simulasi kegagalan server node utama.",
    ],
    content: `### Tantangan Integritas Transaksi Finansial
Bagi sistem inti transaksi, ketiadaan data yang hilang (*Zero Data Loss* atau Recovery Point Objective = 0) adalah mandat regulasi perbankan. Namun, replikasi sinkron konvensional seringkali menurunkan kinerja latensi baca/tulis ketika terjadi perlambatan jaringan antar-zona ketersediaan (Availability Zone).

### Topologi Arsitektur Patroni + etcd
Sotardoc mengimplementasikan kluster 3-node PostgreSQL dengan rincian:
- **Leader Node:** Menangani seluruh operasi tulis dan mereplikasi log transaksi WAL secara semi-sinkron ke satu standby node.
- **Synchronous Standby:** Menjamin konfirmasi commit sebelum transaksi dinyatakan sukses ke klien.
- **Asynchronous Read-Replica:** Didedikasikan untuk laporan analitik dan audit tanpa membebani node primer.
- **Konsensus etcd:** Mengawasi *heartbeat* node dan memimpin pemilihan *leader* baru secara otomatis saat node primer gagal merespon selama 5 detik.

### Prosedur Validasi Chaos Engineering
Kluster diuji secara berkala dengan mematikan paksa instance primer di tengah simulasi 10.000 transaksi bersamaan:
- **Waktu Deteksi Kegagalan:** 4.2 detik.
- **Promosi Standby Menjadi Leader Baru:** 7.2 detik.
- **Total Recovery Time Objective (RTO):** 11.4 detik.
- **Kehilangan Transaksi (RPO):** Tepat 0 transaksi hilang.`,
  },
];
