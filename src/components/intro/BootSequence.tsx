"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  { label: "PIT WALL ONLINE", status: "SYS" },
  { label: "ENGINE START SEQUENCE", status: "OK" },
  { label: "DRIVER CHECK — A. KANAGALA", status: "OK" },
  { label: "TYRES · BRAKES · DRS", status: "OK" },
  { label: "TELEMETRY UPLINK", status: "OK" },
  { label: "ROS2 AUTONOMY STACK", status: "OK" },
  { label: "FORMATION LAP COMPLETE", status: "OK" },
  { label: "IT'S LIGHTS OUT AND AWAY WE GO", status: "GO" },
];

const CHAR_MS = 16;
const LINE_GAP_MS = 210;
const EXIT_HOLD_MS = 620;

// boot plays on a dark grid before the site reveals in daylight —
// literal colors here, the page palette is light.
const BOOT_BG = "#0b0304";
const BOOT_TEXT = "#f6eeee";
const BOOT_MUTED = "#a18f8d";
const BOOT_RED = "#ff2d1e";

/** One terminal line that types itself out, then reports its status. */
function BootLine({ label, status, onDone }: { label: string; status: string; onDone: () => void }) {
  const [chars, setChars] = useState(0);
  const done = chars >= label.length;
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= label.length) {
        window.clearInterval(id);
        window.setTimeout(() => onDoneRef.current(), LINE_GAP_MS);
      }
    }, CHAR_MS);
    return () => window.clearInterval(id);
  }, [label]);

  return (
    <div className="flex items-baseline gap-4">
      <span className="w-24 shrink-0 text-right" style={{ color: BOOT_MUTED }}>
        {done ? `[ ${status} ]` : "[ .. ]"}
      </span>
      <span
        className={done ? "" : "boot-cursor"}
        style={{
          color: status === "GO" ? BOOT_RED : BOOT_TEXT,
          letterSpacing: "0.22em",
        }}
      >
        {label.slice(0, chars)}
      </span>
    </div>
  );
}

/** The five F1 start lights. They come on as checks pass; all off = go. */
function StartLights({ lit, out }: { lit: number; out: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const on = !out && i < lit;
        return (
          <span
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300"
            style={{
              background: on ? BOOT_RED : "rgba(246,238,238,0.08)",
              border: `1px solid ${on ? BOOT_RED : "rgba(246,238,238,0.2)"}`,
              boxShadow: on ? `0 0 18px rgba(255,45,30,0.8)` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Full-screen race-start intro. Plays once per browser session, is skippable
 * with any click/key, and ends with a camera-push into the page beneath —
 * lights out in the garage, away we go into the white site.
 */
export function BootSequence({ onReveal }: { onReveal: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const revealedRef = useRef(false);

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    try {
      sessionStorage.setItem("akash-booted", "1");
    } catch {}
    setLeaving(true);
    onReveal();
    window.setTimeout(() => setActive(false), 1000);
  };

  useEffect(() => {
    // deferred a tick so the gate never sets state synchronously in the effect
    const id = window.setTimeout(() => {
      setMounted(true);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try {
        seen = sessionStorage.getItem("akash-booted") === "1";
      } catch {}
      if (reduced || seen) {
        revealedRef.current = true;
        onReveal();
      } else {
        setActive(true);
      }
    }, 0);
    return () => window.clearTimeout(id);
    // onReveal is stable-by-usage; run boot gate exactly once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!active || leaving) return;
    const skip = () => reveal();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, leaving]);

  const advance = () => {
    setLineCount((n) => {
      if (n >= BOOT_LINES.length) {
        window.setTimeout(reveal, EXIT_HOLD_MS);
        return n;
      }
      return n + 1;
    });
  };

  // Last line finished typing → hold, then lights out and away we go.
  const allTyped = lineCount >= BOOT_LINES.length;
  useEffect(() => {
    if (!allTyped || !active) return;
    const id = window.setTimeout(reveal, EXIT_HOLD_MS + LINE_GAP_MS + BOOT_LINES[7].label.length * CHAR_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTyped, active]);

  // one start light per completed pair of checks, capped at five
  const lit = Math.min(5, Math.max(0, lineCount - 2));

  if (!mounted) {
    // Pre-hydration: match the page background so nothing flashes.
    return <div className="fixed inset-0 z-[10000]" style={{ background: "#f9f6f4" }} />;
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: BOOT_BG }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          aria-label="race start sequence — press any key to skip"
        >
          {/* drifting micro-particles */}
          <div className="absolute inset-0" aria-hidden>
            {[...Array(24)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 2,
                  height: 2,
                  left: `${(i * 41) % 100}%`,
                  top: `${(i * 67) % 100}%`,
                  background: i % 3 === 0 ? "rgba(255, 45, 30, 0.7)" : "rgba(246, 238, 238, 0.45)",
                }}
                animate={{ y: [0, -30], opacity: [0, 0.7, 0] }}
                transition={{
                  duration: 6 + (i % 5),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="boot-scanlines" aria-hidden />
          <div className="boot-sweep" aria-hidden />

          {/* the terminal block — camera-push scales it past the viewer on exit */}
          <motion.div
            className="boot-screen boot-glitch relative font-mono text-sm md:text-base"
            animate={
              leaving
                ? { scale: 6, opacity: 0, filter: "blur(6px)" }
                : { scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            transition={
              leaving
                ? { duration: 0.9, ease: [0.7, 0, 0.84, 0] }
                : { duration: 0 }
            }
          >
            <StartLights lit={lit} out={leaving} />
            <div className="space-y-2.5">
              {BOOT_LINES.slice(0, lineCount).map((line, i) => (
                <BootLine
                  key={line.label}
                  label={line.label}
                  status={line.status}
                  onDone={i === lineCount - 1 ? advance : () => {}}
                />
              ))}
            </div>
          </motion.div>

          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[14px] tracking-[0.3em]"
            style={{ color: "rgba(161,143,141,0.6)" }}
          >
            PRESS ANY KEY TO SKIP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
