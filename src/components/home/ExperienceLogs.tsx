"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeline } from "@/data/content";

/** Career history rendered as expandable command-center log entries. */
export function ExperienceLogs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="relative">
      {/* vertical bus line */}
      <div
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ background: "linear-gradient(to bottom, rgba(35,21,24,0.5), rgba(35,21,24,0.06))" }}
      />

      <div className="space-y-3">
        {timeline.map((entry, i) => {
          const open = openIdx === i;
          const live = entry.status === "ACTIVE";
          return (
            <motion.div
              key={entry.year + entry.org}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-9"
            >
              {/* node on the bus */}
              <span
                className="absolute left-0 top-4 w-[15px] h-[15px] rounded-full flex items-center justify-center"
                style={{ background: "var(--c-bg)", border: `1px solid ${live ? "var(--c-accent)" : "rgba(35,21,24,0.5)"}` }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full"
                  style={{
                    background: live ? "var(--c-accent)" : "var(--c-primary)",
                    animation: live ? "pulse-dot 1.8s ease-in-out infinite" : undefined,
                  }}
                />
              </span>

              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full text-left rounded-sm transition-colors duration-300"
                style={{
                  background: open ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${open ? "rgba(35,21,24,0.28)" : "var(--c-border)"}`,
                }}
              >
                <div className="px-5 py-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-sm" style={{ color: "var(--c-primary)" }}>
                    {entry.year}
                  </span>
                  <span className="font-semibold" style={{ color: "var(--c-text)" }}>
                    {entry.org}
                  </span>
                  <span className="text-sm" style={{ color: "var(--c-muted)" }}>
                    {entry.title}
                  </span>
                  <span
                    className="ml-auto font-mono text-[13px] tracking-[0.25em] px-2 py-0.5 rounded-sm"
                    style={{
                      color: live ? "var(--c-accent)" : "var(--c-muted)",
                      border: `1px solid ${live ? "rgba(35,21,24,0.35)" : "var(--c-border)"}`,
                    }}
                  >
                    {entry.status}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm leading-relaxed mb-4 max-w-2xl" style={{ color: "var(--c-muted)" }}>
                          {entry.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.systems.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[13px] px-2 py-0.5 rounded-sm"
                              style={{ background: "rgba(35,21,24,0.07)", color: "var(--c-secondary)" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
