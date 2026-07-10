"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/RevealText";
import { TiltCard } from "@/components/animations/TiltCard";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/content";

type Filter = "All" | "Robotics" | "AI/ML" | "Control Systems" | "Agentic AI";

const filters: Filter[] = [
  "All",
  "Robotics",
  "AI/ML",
  "Control Systems",
  "Agentic AI",
];

// raw hexes (not CSS vars) so alpha suffixes like `${color}28` stay valid
const categoryColor: Record<string, string> = {
  Robotics: "#ffffff",
  "AI/ML": "#c9cfd8",
  "Control Systems": "#9aa7b5",
  "Agentic AI": "#eef0f3",
};

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <main>
      {/* ── Header ───────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="aurora-bg">
          <div
            className="aurora-blob"
            style={{
              width: "55vw",
              height: "55vw",
              background:
                "radial-gradient(circle, rgba(35,21,24,0.09) 0%, transparent 70%)",
              top: "-20%",
              left: "-15%",
              animation: "aurora 14s ease-in-out infinite",
            }}
          />
          <div className="grid-pattern" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal>
            <p className="section-label">{"// portfolio"}</p>
            <h1
              className="text-5xl md:text-6xl font-bold"
              style={{ color: "var(--c-text)" }}
            >
              Projects
            </h1>
            <p
              className="text-lg mt-4 max-w-xl"
              style={{ color: "var(--c-muted)" }}
            >
              A collection of robotics, AI, and control systems work — built in
              the lab and in the wild.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Filter ───────────────────────────────────── */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="px-5 py-2 rounded-full text-sm font-medium font-mono transition-all duration-200"
                style={
                  active === f
                    ? {
                        backgroundColor: "var(--c-primary)",
                        color: "#ffffff",
                      }
                    : {
                        border: "1px solid rgba(35,21,24,0.08)",
                        color: "var(--c-muted)",
                        background: "transparent",
                      }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <TiltCard className="glass rounded-2xl p-6 h-full flex flex-col group">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex flex-col flex-1"
                    >
                      {/* blueprint thumbnail — procedural, until real captures exist */}
                      <div
                        className="relative w-full h-40 rounded-xl mb-5 overflow-hidden flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(rgba(35,21,24,0.05) 1px, transparent 1px) 0 0 / 100% 20px, linear-gradient(90deg, rgba(35,21,24,0.05) 1px, transparent 1px) 0 0 / 20px 100%, radial-gradient(ellipse at 50% 120%, rgba(35,21,24,0.1), transparent 70%), rgba(35,21,24,0.02)",
                          border: "1px solid rgba(35,21,24,0.04)",
                        }}
                      >
                        <span
                          className="font-mono text-3xl font-semibold tracking-[0.3em]"
                          style={{ color: `${categoryColor[project.category]}55` }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="absolute bottom-2 left-3 font-mono text-[12px] tracking-[0.3em]"
                          style={{ color: "var(--c-muted)" }}
                        >
                          SYS.{project.year}
                        </span>
                        <span
                          className="absolute top-2 right-3 font-mono text-[12px] tracking-[0.3em]"
                          style={{ color: categoryColor[project.category] }}
                        >
                          ●
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="font-mono text-xs px-2.5 py-0.5 rounded-full"
                          style={{
                            color: categoryColor[project.category],
                            border: `1px solid ${categoryColor[project.category]}28`,
                            background: `${categoryColor[project.category]}0a`,
                          }}
                        >
                          {project.category}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: "var(--c-muted)" }}
                        >
                          {project.year}
                        </span>
                      </div>

                      <h3
                        className="font-semibold text-base mb-1.5 leading-snug"
                        style={{ color: "var(--c-text)" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4 flex-1"
                        style={{ color: "var(--c-muted)" }}
                      >
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(35,21,24,0.04)",
                              color: "var(--c-muted)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>

                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
                        style={{ color: "var(--c-primary)" }}
                      >
                        Case study
                        <ArrowRight size={13} />
                      </Link>
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
                          style={{ color: "var(--c-muted)" }}
                        >
                          GitHub
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div
              className="text-center py-24 font-mono text-sm"
              style={{ color: "var(--c-muted)" }}
            >
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
