"use client";

import { useEffect, useRef } from "react";

export function PatternBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--x", `${e.clientX}px`);
      ref.current.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#f9f6f4]"
      style={{
        "--x": "50vw",
        "--y": "50vh",
      } as React.CSSProperties}
    >
      {/* Warm red ambient glow following the cursor */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(600px circle at var(--x) var(--y), rgba(225, 6, 0, 0.045) 0%, rgba(225, 6, 0, 0.015) 40%, transparent 100%)",
        }}
      />

      {/* Spotlight dot matrix pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(225, 6, 0, 0.16) 1.2px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(500px circle at var(--x) var(--y), black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(500px circle at var(--x) var(--y), black 20%, transparent 100%)",
        }}
      />

      {/* Static background dot matrix for low ambient visibility */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(35, 21, 24, 0.07) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Grid line blueprint pattern */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(225, 6, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(225, 6, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
