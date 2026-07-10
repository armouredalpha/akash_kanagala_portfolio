"use client";

import Link from "next/link";
import { siteConfig } from "@/data/content";

export function Footer() {
  return (
    <footer className="mt-auto py-10 px-6" style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[14px] tracking-[0.2em]" style={{ color: "var(--c-muted)" }}>
          © 2026 {siteConfig.name.toUpperCase()} —{" "}
          <span style={{ color: "var(--c-primary)" }}>ALL SYSTEMS NOMINAL</span>
        </span>
        <div className="flex items-center gap-6">
          {[
            { href: siteConfig.github, label: "GITHUB" },
            { href: siteConfig.linkedin, label: "LINKEDIN" },
            { href: `mailto:${siteConfig.email}`, label: "EMAIL" },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="font-mono text-[14px] tracking-[0.2em] transition-colors duration-200 hover:text-[color:var(--c-text)]"
              style={{ color: "var(--c-muted)" }}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {label}
            </Link>
          ))}
          <span className="hidden md:block font-mono text-[13px]" style={{ color: "rgba(143,125,123,0.5)" }}>
            PRESS ` FOR TERMINAL
          </span>
        </div>
      </div>
    </footer>
  );
}
