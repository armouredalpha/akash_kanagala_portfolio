"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "HOME", index: "01" },
  { href: "/about", label: "DRIVER", index: "02" },
  { href: "/projects", label: "GARAGE", index: "03" },
  { href: "/notes", label: "PIT NOTES", index: "04" },
  { href: "/freelance", label: "FREELANCE", index: "05" },
  { href: "/contact", label: "TEAM RADIO", index: "06" },
];

/** UTC mission clock — rendered only after mount to avoid hydration drift. */
function MissionClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toISOString().slice(11, 19) + " UTC");
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="hidden lg:block font-mono text-[13px] tracking-[0.2em] tabular-nums whitespace-nowrap" style={{ color: "var(--c-muted)" }}>
      {time ?? "--:--:-- UTC"}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-16">
        <motion.div
          className="absolute inset-0 border-b"
          style={{
            opacity: bgOpacity,
            backgroundColor: "rgba(249,246,244,0.88)",
            backdropFilter: "blur(18px)",
            borderColor: "var(--c-border)",
          }}
        />

        <nav className="relative h-full max-w-6xl mx-auto px-6 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 font-mono text-sm font-semibold tracking-[0.2em]" style={{ color: "var(--c-text)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--c-primary)", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            AKASH<span style={{ color: "var(--c-primary)" }}>.OS</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className="group font-mono text-[14px] tracking-[0.2em] transition-colors duration-200 flex items-baseline gap-1.5"
                    style={{ color: active ? "var(--c-text)" : "var(--c-muted)" }}
                  >
                    <span style={{ color: active ? "var(--c-primary)" : "rgba(161,143,141,0.55)" }}>
                      {link.index}
                    </span>
                    <span className="group-hover:text-[color:var(--c-text)] transition-colors duration-200">
                      {link.label}
                    </span>
                  </Link>
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-px"
                      style={{ backgroundColor: "var(--c-primary)" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <MissionClock />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden font-mono text-[14px] tracking-[0.25em] px-3 py-2"
            style={{ color: "var(--c-text)", border: "1px solid var(--c-border)" }}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
            style={{ background: "rgba(249,246,244,0.97)", backdropFilter: "blur(12px)" }}
          >
            <ul className="space-y-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-mono text-lg tracking-[0.25em] flex items-baseline gap-3"
                    style={{ color: pathname === link.href ? "var(--c-primary)" : "var(--c-text)" }}
                  >
                    <span className="text-xs" style={{ color: "var(--c-muted)" }}>
                      {link.index}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
