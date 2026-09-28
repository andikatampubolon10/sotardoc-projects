import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ValueSection from "@/components/ValueSection";
import InsightsSection from "@/components/InsightsSection";
import FounderNoteSection from "@/components/FounderNoteSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <main className="relative page-entry">
      {/* Animated particle background */}
      <ParticleBackground />

      {/* Cursor spotlight glow */}
      <CursorGlow />

      {/* Background: subtle grid pattern overlay */}
      <div
        className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60"
        aria-hidden="true"
      />

      {/* Ambient white glow at top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-white/[0.06] via-transparent to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Content above all backgrounds */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <PortfolioSection />
        <ValueSection />
        <InsightsSection />
        <FounderNoteSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
