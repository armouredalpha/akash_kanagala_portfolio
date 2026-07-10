"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, SkillModule } from "@/data/content";

const domainColor: Record<SkillModule["domain"], string> = {
  Autonomy: "var(--c-primary)",
  Perception: "var(--c-secondary)",
  AI: "var(--c-primary)",
  Simulation: "var(--c-secondary)",
  Systems: "#8a6f6b",
  Embedded: "var(--c-accent)",
};

function Module({ mod, index }: { mod: SkillModule; index: number }) {
  const [open, setOpen] = useState(false);
  const color = domainColor[mod.domain];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      className="hud-corners relative text-left rounded-sm cursor-pointer outline-none"
      style={{
        background: open ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)",
        border: `1px solid ${open ? `color-mix(in srgb, ${color} 45%, transparent)` : "var(--c-border)"}`,
        transition: "border-color 0.25s ease, background 0.25s ease",
        // stagger the idle float so the field never moves in unison
        animation: `float-y ${5 + (index % 4)}s ease-in-out ${index * 0.35}s infinite`,
      }}
    >
      <div className="px-4 pt-3 pb-3 min-w-[150px]">
        <div
          className="font-mono text-[13px] tracking-[0.2em] mb-1.5 flex items-center gap-2"
          style={{ color: "var(--c-muted)" }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: color }} />
          {mod.code} · {mod.domain.toUpperCase()}
        </div>
        <div className="font-semibold text-sm" style={{ color: "var(--c-text)" }}>
          {mod.name}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mt-3 pt-3 font-mono text-[14px] space-y-1.5"
                style={{ borderTop: "1px solid var(--c-border)" }}
              >
                <div className="flex justify-between gap-6">
                  <span style={{ color: "var(--c-muted)" }}>EXPERIENCE</span>
                  <span style={{ color: "var(--c-text)" }}>{mod.years} YRS</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span style={{ color: "var(--c-muted)" }}>DEPLOYED IN</span>
                  <span style={{ color: "var(--c-text)" }}>{mod.projects} PROJECTS</span>
                </div>
                <div className="pt-1 flex flex-wrap gap-1.5">
                  {mod.related.map((r) => (
                    <span
                      key={r}
                      className="px-1.5 py-0.5 rounded-sm text-[13px]"
                      style={{
                        background: "rgba(35,21,24,0.04)",
                        color,
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

/** The skills section: an ecosystem of floating tech modules instead of bars. */
export function SkillsEcosystem() {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-5 items-start">
      {skills.map((mod, i) => (
        <Module key={mod.code} mod={mod} index={i} />
      ))}
    </div>
  );
}
