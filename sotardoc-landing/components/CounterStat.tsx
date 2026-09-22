"use client";

import { useEffect, useRef, useState } from "react";

interface CounterStatProps {
  value: number;
  suffix: string;
  label: string;
}

export default function CounterStat({ value, suffix, label }: CounterStatProps) {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (value - from) * eased;
      setDisplayed(parseFloat(current.toFixed(1)));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, value]);

  const displayValue =
    suffix === "%" && displayed === Math.floor(displayed)
      ? displayed.toFixed(1)
      : displayed % 1 === 0
      ? displayed.toFixed(0)
      : displayed.toFixed(1);

  return (
    <div ref={containerRef}>
      <div className="font-inter font-bold text-3xl text-white tracking-tight leading-none stat-counter">
        {displayValue}
        <span className="text-gray-400 text-xl ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 font-inter mt-0.5">{label}</p>
    </div>
  );
}
