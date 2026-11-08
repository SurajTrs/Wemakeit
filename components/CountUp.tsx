"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the number inside a string up from 0 when it scrolls into view.
 * "10" → 0 … 10 · "7 days" → 0 days … 7 days. Text without a number is shown as-is.
 * The server renders the final value, so search engines and no-JS visitors see the real text.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const [n, setN] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(2, -10 * p); // ease-out-expo
        setN(p >= 1 ? target : Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <>{value}</>;
  const [, pre, num, post] = match;
  const shown = n === null ? num : num.includes(",") ? n.toLocaleString("en-IN") : String(n);
  return (
    <span ref={ref} className="tabular-nums">
      {pre}
      {shown}
      {post}
    </span>
  );
}
