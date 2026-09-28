export interface Project {
  id: number | string;
  title: string;
  stack: string[];
  filterCategory: "all" | "ai" | "cloud" | "ui-ux";
  category: string;
  shortDesc: string;
  fullDesc: string;
  badgeLabel: string;
  badgeColor: "emerald" | "cyan" | "violet";
  svgGraphicCard: string;
  svgGraphicModal: string;
}

export const projects: Project[] = [
  {
    id: 0,
    title: "AgriFlow-ML",
    stack: ["Python", "RNN", "React", "TensorFlow", "FastAPI"],
    filterCategory: "ai",
    category: "Machine Learning & Smart Agriculture",
    badgeLabel: "Prediksi Panen Real-Time",
    badgeColor: "emerald",
    shortDesc:
      "Sistem pemantauan & estimasi rantai pasok pangan yang memangkas risiko pembusukan hasil panen.",
    fullDesc:
      "AgriFlow-ML dikembangkan untuk konsorsium distribusi pangan dalam memprediksi fluktuasi panen dan merencanakan rute logistik dingin secara real-time. Dengan arsitektur Recurrent Neural Network (RNN) dan dasbor interaktif, sistem ini berhasil memangkas tingkat pembusukan hasil tani hingga 34% pada rute distribusi antar-provinsi.",
    svgGraphicCard: `<svg class="w-full h-full opacity-35 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 140 C80 60, 160 160, 240 80 L300 110" stroke="#FFFFFF" stroke-dasharray="4 4" stroke-width="2"></path>
      <circle cx="80" cy="95" fill="#FFFFFF" r="5"></circle>
      <circle cx="160" cy="130" fill="#FFFFFF" r="5"></circle>
      <circle cx="240" cy="80" fill="#FFFFFF" r="6"></circle>
      <rect fill="#27272A" height="40" rx="6" stroke="#3F3F46" stroke-width="1.5" width="90" x="210" y="25"></rect>
      <path d="M225 45 L255 45 M225 53 L285 53" stroke="#FFFFFF" stroke-linecap="round" stroke-width="1.5"></path>
    </svg>`,
    svgGraphicModal: `<svg class="w-full h-full opacity-60" viewBox="0 0 600 338" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="338" fill="#0A0A0A"/>
      <path d="M50 260 Q180 80, 320 220 T550 120" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
      <path d="M50 290 Q200 160, 350 270 T550 170" stroke="#52525B" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
      <circle cx="180" cy="140" r="7" fill="#FFFFFF"/>
      <circle cx="320" cy="220" r="7" fill="#FFFFFF"/>
      <circle cx="450" cy="140" r="7" fill="#FFFFFF"/>
      <rect x="380" y="50" width="180" height="65" rx="8" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
      <text x="400" y="78" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="13">Akurasi Model: 96.4%</text>
      <text x="400" y="98" fill="#A1A1AA" font-family="Roboto" font-size="11">RNN Sequential Pipeline</text>
    </svg>`,
  },
  {
    id: 1,
    title: "VisionScan OCR & KYC",
    stack: ["PyTorch", "FastAPI", "OpenCV", "Docker", "ONNX"],
    filterCategory: "ai",
    category: "Computer Vision & Identity Fraud Detection",
    badgeLabel: "KYC Liveness <450ms",
    badgeColor: "emerald",
    shortDesc:
      "Verifikasi identitas instan dan deteksi keaslian wajah untuk pendaftaran nasabah fintech.",
    fullDesc:
      "VisionScan memecahkan masalah antrean verifikasi manual pada layanan perbankan digital melalui pipeline ekstraksi KTP/Paspor otomatis dan pencocokan biometrik wajah. Didukung kuantisasi ONNX Runtime, inferensi tuntas dalam tempo <450ms dengan akurasi 99.2%, menurunkan angka penipuan identitas hingga 85%.",
    svgGraphicCard: `<svg class="w-full h-full opacity-35 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#121212" height="120" rx="6" stroke="#FFFFFF" stroke-width="1.5" width="180" x="70" y="30"></rect>
      <rect fill="#27272A" height="55" rx="3" stroke="#71717A" width="45" x="85" y="45"></rect>
      <circle cx="107" cy="65" r="10" stroke="#FFFFFF" stroke-width="1.2"></circle>
      <path d="M94 88 C94 80, 120 80, 120 88" fill="none" stroke="#FFFFFF" stroke-width="1.2"></path>
      <rect fill="#FFFFFF" height="8" rx="2" width="90" x="145" y="48"></rect>
      <rect fill="#3F3F46" height="6" rx="2" width="70" x="145" y="62"></rect>
      <rect fill="#3F3F46" height="6" rx="2" width="80" x="145" y="74"></rect>
      <line stroke="#10B981" stroke-dasharray="3 3" stroke-width="1.5" x1="60" x2="260" y1="90" y2="90"></line>
      <rect fill="#1E1E24" height="22" rx="3" stroke="#3F3F46" width="150" x="85" y="112"></rect>
      <path d="M95 123 H150 M170 123 H225" stroke="#10B981" stroke-linecap="round" stroke-width="1.5"></path>
    </svg>`,
    svgGraphicModal: `<svg class="w-full h-full opacity-60" viewBox="0 0 600 338" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="338" fill="#0A0A0A"/>
      <rect x="80" y="50" width="280" height="190" rx="10" stroke="#FFFFFF" stroke-width="2" fill="#141416"/>
      <rect x="105" y="75" width="70" height="85" rx="6" fill="#27272A" stroke="#71717A"/>
      <circle cx="140" cy="105" r="16" stroke="#FFFFFF" stroke-width="2"/>
      <path d="M120 142 C120 130, 160 130, 160 142" stroke="#FFFFFF" stroke-width="2" fill="none"/>
      <rect x="195" y="80" width="140" height="12" rx="3" fill="#FFFFFF"/>
      <rect x="195" y="102" width="110" height="9" rx="3" fill="#52525B"/>
      <rect x="195" y="120" width="125" height="9" rx="3" fill="#52525B"/>
      <line x1="70" y1="145" x2="370" y2="145" stroke="#10B981" stroke-width="2" stroke-dasharray="4 4"/>
      <rect x="390" y="70" width="160" height="150" rx="10" fill="#18181B" stroke="#3F3F46" stroke-width="1.5"/>
      <text x="410" y="105" fill="#10B981" font-family="Inter" font-weight="700" font-size="13">✓ LIVENESS PASS</text>
      <text x="410" y="130" fill="#FFFFFF" font-family="Inter" font-weight="600" font-size="12">Latency: 380ms</text>
      <text x="410" y="152" fill="#A1A1AA" font-family="Roboto" font-size="11">Confidence: 99.4%</text>
      <rect x="410" y="175" width="120" height="24" rx="4" fill="#27272A"/>
      <text x="425" y="191" fill="#FFFFFF" font-family="Inter" font-size="11">PyTorch / ONNX</text>
    </svg>`,
  },
  {
    id: 2,
    title: "MediTrack Transformation",
    stack: ["Node.js", "Microservices", "Docker", "Kafka", "PostgreSQL"],
    filterCategory: "cloud",
    category: "Healthcare Infrastructure Migration",
    badgeLabel: "Arsitektur Layanan Kesehatan",
    badgeColor: "cyan",
    shortDesc:
      "Modernisasi sistem pendataan Posyandu nasional dengan kapabilitas sinkronisasi data offline.",
    fullDesc:
      "MediTrack merestrukturisasi sistem pemantauan gizi anak dari monolitik lama ke arsitektur microservices terdesentralisasi. Melayani lebih dari 12.000 titik Posyandu dengan sinkronisasi data offline ketika konektivitas sinyal terbatas di pelosok daerah, memastikan pencatatan tumbuh kembang anak tidak terputus.",
    svgGraphicCard: `<svg class="w-full h-full opacity-35 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#27272A" height="70" rx="4" stroke="#FFFFFF" stroke-width="1.5" width="60" x="30" y="55"></rect>
      <rect fill="#18181b" height="45" rx="4" stroke="#A1A1AA" stroke-width="1.5" width="60" x="130" y="35"></rect>
      <rect fill="#18181b" height="45" rx="4" stroke="#A1A1AA" stroke-width="1.5" width="60" x="130" y="95"></rect>
      <rect fill="#27272A" height="50" rx="4" stroke="#FFFFFF" stroke-width="1.5" width="60" x="230" y="65"></rect>
      <path d="M90 90 L130 55 M90 90 L130 115 M190 55 L230 90 M190 115 L230 90" stroke="#FFFFFF" stroke-dasharray="3 3" stroke-width="1.5"></path>
    </svg>`,
    svgGraphicModal: `<svg class="w-full h-full opacity-60" viewBox="0 0 600 338" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="338" fill="#0A0A0A"/>
      <rect x="70" y="110" width="110" height="120" rx="8" fill="#18181B" stroke="#FFFFFF" stroke-width="2"/>
      <text x="92" y="175" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="14">Gateway</text>
      <path d="M180 170 L260 100 M180 170 L260 170 M180 170 L260 240" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 4"/>
      <rect x="260" y="70" width="120" height="60" rx="6" fill="#18181B" stroke="#71717A" stroke-width="1.5"/>
      <text x="280" y="105" fill="#E4E4E7" font-family="Inter" font-size="12">Auth Service</text>
      <rect x="260" y="140" width="120" height="60" rx="6" fill="#18181B" stroke="#71717A" stroke-width="1.5"/>
      <text x="275" y="175" fill="#E4E4E7" font-family="Inter" font-size="12">Patient Data</text>
      <rect x="260" y="210" width="120" height="60" rx="6" fill="#18181B" stroke="#71717A" stroke-width="1.5"/>
      <text x="275" y="245" fill="#E4E4E7" font-family="Inter" font-size="12">Sync Stream</text>
      <rect x="440" y="130" width="90" height="80" rx="8" fill="#27272A" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="460" y="175" fill="#FFFFFF" font-family="Inter" font-size="12">Kafka Bus</text>
    </svg>`,
  },
  {
    id: 3,
    title: "BankCore Kubernetes Migration",
    stack: ["Go", "K8s", "Terraform", "AWS", "gRPC", "Prometheus"],
    filterCategory: "cloud",
    category: "Cloud Native & Enterprise Core Banking",
    badgeLabel: "Zero-Downtime Migration",
    badgeColor: "cyan",
    shortDesc:
      "Modernisasi sistem inti perbankan ke kluster Kubernetes dengan ketersediaan tinggi.",
    fullDesc:
      "Mentransformasikan sistem perbankan tradisional ke infrastruktur cloud-native modern berbasis AWS EKS. Dilengkapi pendekatan Infrastructure-as-Code (Terraform) dan implementasi zero-downtime blue/green deployment, menjamin operasional perbankan tetap 99.999% andal di saat lonjakan transaksi hari raya.",
    svgGraphicCard: `<svg class="w-full h-full opacity-35 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#18181B" height="120" rx="6" stroke="#71717A" stroke-width="1.5" width="75" x="25" y="30"></rect>
      <rect fill="#27272A" height="20" rx="3" stroke="#FFFFFF" stroke-width="1" width="55" x="35" y="45"></rect>
      <rect fill="#27272A" height="20" rx="3" stroke="#FFFFFF" stroke-width="1" width="55" x="35" y="75"></rect>
      <rect fill="#27272A" height="20" rx="3" stroke="#FFFFFF" stroke-width="1" width="55" x="35" y="105"></rect>
      <path d="M100 90 H135" stroke="#FFFFFF" stroke-dasharray="3 3" stroke-width="2"></path>
      <rect fill="#1E1E24" height="90" rx="6" stroke="#FFFFFF" stroke-width="1.5" width="70" x="135" y="45"></rect>
      <circle cx="170" cy="75" r="16" stroke="#38BDF8" stroke-width="2"></circle>
      <path d="M170 65 V85 M160 75 H180" stroke="#38BDF8" stroke-width="1.5"></path>
      <rect fill="#27272A" height="15" rx="2" width="50" x="145" y="105"></rect>
      <path d="M205 70 H235 M205 110 H235" stroke="#FFFFFF" stroke-width="1.5"></path>
      <rect fill="#18181B" height="32" rx="4" stroke="#71717A" width="65" x="235" y="55"></rect>
      <rect fill="#18181B" height="32" rx="4" stroke="#71717A" width="65" x="235" y="95"></rect>
    </svg>`,
    svgGraphicModal: `<svg class="w-full h-full opacity-60" viewBox="0 0 600 338" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="338" fill="#0A0A0A"/>
      <rect x="50" y="60" width="130" height="200" rx="10" fill="#141416" stroke="#52525B" stroke-width="1.5"/>
      <text x="70" y="90" fill="#A1A1AA" font-family="Inter" font-size="12" font-weight="600">AWS MULTI-AZ</text>
      <rect x="70" y="110" width="90" height="35" rx="4" fill="#27272A" stroke="#FFFFFF"/>
      <text x="85" y="132" fill="#FFFFFF" font-family="Inter" font-size="11">Node Pool 1</text>
      <rect x="70" y="160" width="90" height="35" rx="4" fill="#27272A" stroke="#FFFFFF"/>
      <text x="85" y="182" fill="#FFFFFF" font-family="Inter" font-size="11">Node Pool 2</text>
      <path d="M180 145 H240" stroke="#38BDF8" stroke-width="2" stroke-dasharray="3 3"/>
      <rect x="240" y="80" width="140" height="150" rx="10" fill="#18181B" stroke="#38BDF8" stroke-width="2"/>
      <circle cx="310" cy="130" r="28" stroke="#38BDF8" stroke-width="2"/>
      <text x="282" y="136" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="14">K8s Core</text>
      <text x="270" y="195" fill="#94A3B8" font-family="Inter" font-size="11">Auto-scale 45k TPS</text>
      <path d="M380 145 H440" stroke="#38BDF8" stroke-width="2"/>
      <rect x="440" y="95" width="110" height="120" rx="8" fill="#18181B" stroke="#71717A" stroke-width="1.5"/>
      <text x="455" y="135" fill="#E4E4E7" font-family="Inter" font-size="12">Zero Downtime</text>
      <text x="455" y="160" fill="#10B981" font-family="Inter" font-weight="700" font-size="13">99.999% SLA</text>
      <text x="455" y="185" fill="#A1A1AA" font-family="Roboto" font-size="10">PCI-DSS Compliant</text>
    </svg>`,
  },
  {
    id: 4,
    title: "Parkarejo",
    stack: ["Figma", "UI/UX", "Design System", "Prototyping", "User Research"],
    filterCategory: "ui-ux",
    category: "Enterprise Logistics & Urban Mobility",
    badgeLabel: "URBAN MOBILITY DESIGN SYSTEM",
    badgeColor: "violet",
    shortDesc:
      "Prototipe & design system sistem parkir digital untuk efisiensi mobilitas urban.",
    fullDesc:
      "Parkarejo adalah purwarupa sistem manajemen pergudangan dan routing logistik terpadu yang dirancang melalui 4 fase riset etnografi pengguna lapangan. Menghadirkan antarmuka ultra-minimalis dengan ergonomi tinggi untuk operator terminal, mempercepat waktu input manifest pengiriman hingga 62% dengan angka kesalahan input mendekati nol.",
    svgGraphicCard: `<svg class="w-full h-full opacity-35 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect height="130" rx="8" stroke="#FFFFFF" stroke-width="1.5" width="240" x="40" y="25"></rect>
      <line stroke="#3F3F46" stroke-width="1.5" x1="40" x2="280" y1="55" y2="55"></line>
      <rect fill="#27272A" height="70" rx="4" width="70" x="55" y="70"></rect>
      <rect fill="#3F3F46" height="18" rx="3" width="125" x="140" y="70"></rect>
      <rect fill="#27272A" height="12" rx="3" width="100" x="140" y="96"></rect>
      <rect fill="#FFFFFF" height="20" rx="4" width="60" x="140" y="116"></rect>
    </svg>`,
    svgGraphicModal: `<svg class="w-full h-full opacity-60" viewBox="0 0 600 338" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="338" fill="#0A0A0A"/>
      <rect x="60" y="45" width="480" height="250" rx="10" stroke="#FFFFFF" stroke-width="2" fill="#121212"/>
      <line x1="60" y1="95" x2="540" y2="95" stroke="#27272A" stroke-width="2"/>
      <circle cx="85" cy="70" r="5" fill="#52525B"/>
      <circle cx="105" cy="70" r="5" fill="#52525B"/>
      <circle cx="125" cy="70" r="5" fill="#52525B"/>
      <rect x="90" y="125" width="120" height="135" rx="6" fill="#1E1E24" stroke="#3F3F46" stroke-width="1"/>
      <rect x="230" y="125" width="270" height="35" rx="4" fill="#27272A"/>
      <rect x="230" y="175" width="270" height="35" rx="4" fill="#27272A"/>
      <rect x="230" y="225" width="120" height="35" rx="4" fill="#FFFFFF"/>
    </svg>`,
  },
  {
    id: 5,
    title: "NexaPay FinTech SuperApp",
    stack: [
      "Figma",
      "Prototyping",
      "Usability Testing",
      "Design Tokens",
      "Micro-interactions",
    ],
    filterCategory: "ui-ux",
    category: "Next-Gen Financial Application Design",
    badgeLabel: "FINTECH APP REDESIGN",
    badgeColor: "violet",
    shortDesc:
      "Redesain end-to-end aplikasi perbankan digital generasi baru dengan peningkatan konversi transaksi 38%.",
    fullDesc:
      "NexaPay adalah inisiatif restrukturisasi pengalaman pengguna (UX) untuk aplikasi keuangan dan payment gateway enterprise. Divalidasi melalui 50+ sesi usability testing mendalam dengan metrik SUS (System Usability Scale) 88.5, menghasilkan arsitektur informasi yang intuitif, zero-cognitive friction checkout, dan adopsi fitur investasi mikro yang melonjak hingga 38%.",
    svgGraphicCard: `<svg class="w-full h-full opacity-35 transition-transform duration-500 group-hover:scale-105" fill="none" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#121212" height="140" rx="12" stroke="#FFFFFF" stroke-width="1.5" width="75" x="75" y="20"></rect>
      <rect fill="#3F3F46" height="5" rx="2" width="40" x="92" y="26"></rect>
      <rect fill="#27272A" height="28" rx="6" stroke="#71717A" width="55" x="85" y="38"></rect>
      <rect fill="#3F3F46" height="10" rx="3" width="55" x="85" y="74"></rect>
      <circle cx="94" cy="98" fill="#FFFFFF" r="6"></circle>
      <circle cx="112" cy="98" fill="#3F3F46" r="6"></circle>
      <circle cx="130" cy="98" fill="#3F3F46" r="6"></circle>
      <rect fill="#1E1E24" height="35" rx="4" width="55" x="85" y="112"></rect>
      <rect fill="#18181B" height="110" rx="8" stroke="#71717A" stroke-width="1.2" width="95" x="170" y="35"></rect>
      <line stroke="#3F3F46" stroke-width="1" x1="170" x2="265" y1="55" y2="55"></line>
      <rect fill="#27272A" height="25" rx="4" width="75" x="180" y="65"></rect>
      <path d="M185 82 L198 73 L212 78 L228 69 L245 74" fill="none" stroke="#A78BFA" stroke-width="1.5"></path>
    </svg>`,
    svgGraphicModal: `<svg class="w-full h-full opacity-60" viewBox="0 0 600 338" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="338" fill="#0A0A0A"/>
      <rect x="130" y="30" width="150" height="275" rx="20" stroke="#FFFFFF" stroke-width="2" fill="#121214"/>
      <rect x="175" y="42" width="60" height="7" rx="3.5" fill="#3F3F46"/>
      <rect x="150" y="65" width="110" height="55" rx="10" fill="#27272A" stroke="#71717A"/>
      <text x="162" y="90" fill="#A1A1AA" font-family="Inter" font-size="9">Total Saldo Aktif</text>
      <text x="162" y="108" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="12">Rp 248.500.000</text>
      <circle cx="165" cy="145" r="14" fill="#27272A"/>
      <circle cx="205" cy="145" r="14" fill="#FFFFFF"/>
      <circle cx="245" cy="145" r="14" fill="#27272A"/>
      <rect x="150" y="175" width="110" height="85" rx="8" fill="#18181B" stroke="#27272A"/>
      <rect x="320" y="55" width="180" height="225" rx="12" stroke="#52525B" stroke-width="1.5" fill="#141416"/>
      <text x="340" y="90" fill="#FFFFFF" font-family="Inter" font-weight="700" font-size="14">Metrik Evaluasi UX</text>
      <line x1="340" y1="105" x2="480" y2="105" stroke="#27272A" stroke-width="1.5"/>
      <text x="340" y="130" fill="#A78BFA" font-family="Inter" font-size="12" font-weight="600">+38% Conversion</text>
      <text x="340" y="155" fill="#A1A1AA" font-family="Roboto" font-size="11">SUS Score: 88.5 / 100</text>
      <text x="340" y="180" fill="#A1A1AA" font-family="Roboto" font-size="11">Drop-off: Reduced 52%</text>
      <rect x="340" y="210" width="140" height="35" rx="6" fill="#FFFFFF"/>
      <text x="365" y="232" fill="#000000" font-family="Inter" font-weight="700" font-size="11">Lihat Design System</text>
    </svg>`,
  },
];
