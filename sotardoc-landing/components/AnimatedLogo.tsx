"use client";

import Image from "next/image";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
  subtitle?: string;
}

export default function AnimatedLogo({
  size = "md",
  className = "",
  showSubtitle = false,
  subtitle = "Enterprise IT Solutions",
}: AnimatedLogoProps) {
  const config = {
    sm: { height: "h-8", subText: "text-[9px]", width: 128, heightPx: 65 },
    md: { height: "h-10 md:h-11", subText: "text-[10px]", width: 160, heightPx: 81 },
    lg: { height: "h-12 md:h-14", subText: "text-[11px]", width: 192, heightPx: 97 },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crisp animated logo with true transparent alpha channel */}
      <Image
        src="/sotardoc-logo.webp"
        alt="Sotardoc Logo"
        width={config.width}
        height={config.heightPx}
        unoptimized
        priority
        className={`${config.height} w-auto object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105`}
      />

      {showSubtitle && (
        <div className="flex flex-col justify-center border-l border-[#27272A] pl-3 py-0.5">
          <span className={`${config.subText} tracking-widest uppercase text-gray-400 font-inter font-medium`}>
            {subtitle}
          </span>
          <span className="text-[9px] text-gray-500 font-roboto">
            Digital Partner
          </span>
        </div>
      )}
    </div>
  );
}
