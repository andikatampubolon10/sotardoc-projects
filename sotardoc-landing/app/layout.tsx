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
  title: "Sotardoc - Solusi IT & Transformasi Digital Bisnis Enterprise",
  description:
    "Sotardoc adalah agensi IT Business Solution yang fokus pada rekayasa perangkat lunak skala enterprise, integrasi AI/Machine Learning, Cloud Architecture, dan UI/UX Design.",
  keywords: [
    "IT enterprise",
    "software engineering",
    "machine learning",
    "cloud architecture",
    "UI/UX design",
    "Sotardoc",
  ],
  openGraph: {
    title: "Sotardoc - Enterprise IT Solutions",
    description:
      "Rekayasa perangkat lunak enterprise, AI/ML, Cloud, dan UI/UX Design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${roboto.variable} bg-deepBlack text-white min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
