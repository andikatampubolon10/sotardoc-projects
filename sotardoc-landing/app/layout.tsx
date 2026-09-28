import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sotardoc.com"),
  title: {
    default: "Sotardoc — Marbisuk mar-Teknologi: Mitra Rekayasa Sistem Komputasi & AI Enterprise",
    template: "%s | Sotardoc Technologies",
  },
  description:
    "Sotardoc adalah mitra rekayasa perangkat lunak skala enterprise dan integrasi kecerdasan buatan terapan (Applied AI), migrasi cloud terdistribusi, dan desain sistem digital berkinerja tinggi berbasis di Jakarta, Indonesia.",
  keywords: [
    "Sotardoc",
    "IT Enterprise Indonesia",
    "software engineering enterprise",
    "machine learning terapan",
    "arsitektur microservices",
    "cloud migration zero downtime",
    "konsultan IT Jakarta",
    "UI UX design enterprise",
    "computer vision KYC",
    "fast-inference AI",
  ],
  authors: [{ name: "Sotardoc Engineering Team", url: "https://sotardoc.com" }],
  creator: "Sotardoc Technologies",
  publisher: "Sotardoc Technologies",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://sotardoc.com",
  },
  openGraph: {
    title: "Sotardoc — Enterprise IT Solutions & Applied AI Engineering",
    description:
      "Mitra rekayasa perangkat lunak skala enterprise, integrasi AI prediktif, arsitektur cloud terdistribusi, dan sistem berkinerja tinggi.",
    url: "https://sotardoc.com",
    siteName: "Sotardoc Technologies",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sotardoc - Enterprise IT Solutions & Applied AI Engineering",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sotardoc — Enterprise IT Solutions & Applied AI Engineering",
    description:
      "Mitra rekayasa perangkat lunak skala enterprise dan integrasi sistem AI terapan berkinerja tinggi.",
    images: ["/og-image.jpg"],
    creator: "@sotardoc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://sotardoc.com/#organization",
      name: "Sotardoc Technologies",
      alternateName: "Sotardoc",
      url: "https://sotardoc.com",
      logo: "https://sotardoc.com/sotardoc-logo.webp",
      image: "https://sotardoc.com/og-image.jpg",
      description:
        "Agensi rekayasa perangkat lunak skala enterprise, integrasi kecerdasan buatan terapan (Applied AI), arsitektur cloud terdistribusi, dan sistem digital mission-critical.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta Selatan",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.2088,
        longitude: 106.8456,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+62-812-9010-4421",
          contactType: "customer support",
          email: "contact@sotardoc.com",
          availableLanguage: ["Indonesian", "English"],
          hoursAvailable: "Mo-Fr 08:30-18:00",
        },
      ],
      knowsAbout: [
        "Enterprise Software Architecture",
        "Applied Machine Learning & Computer Vision",
        "Microservices & Kafka Event-Driven Architecture",
        "Cloud Migration & Zero-Downtime Infrastructure",
        "High-Throughput Distributed Systems",
        "Enterprise UI/UX Design Systems",
      ],
      priceRange: "$$$$",
      sameAs: [
        "https://github.com/sotardoc",
        "https://linkedin.com/company/sotardoc",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://sotardoc.com/#website",
      url: "https://sotardoc.com",
      name: "Sotardoc Technologies",
      description: "Solusi Rekayasa Perangkat Lunak & Kecerdasan Buatan Enterprise",
      publisher: {
        "@id": "https://sotardoc.com/#organization",
      },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} bg-deepBlack text-white min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
