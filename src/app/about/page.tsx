"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { ExperienceLogs } from "@/components/home/ExperienceLogs";
import { SkillsEcosystem } from "@/components/home/SkillsEcosystem";
import { projects, skills, siteConfig } from "@/data/content";

const stats = [
  { label: "SYSTEMS DEPLOYED", value: String(projects.length).padStart(2, "0") },
  { label: "CORE MODULES", value: String(skills.length).padStart(2, "0") },
  { label: "DOMAINS", value: "06" },
  { label: "MISSION STATUS", value: "ACTIVE" },
];

const directives = [
  {
    code: "DIR-01",
    title: "Hardware Is the Exam",
    body: "Simulation in Gazebo or MuJoCo de-risks the design, but nothing ships until it runs on the real robot. Sim-to-real is a discipline, not a hope.",
  },
  {
    code: "DIR-02",
    title: "Close Every Loop",
    body: "From FOC current loops to Reflexion-style agent loops — open-loop systems fail silently. Feedback, verification, and observability by default.",
  },
  {
    code: "DIR-03",
    title: "Reproducible Engineering",
    body: "Dockerized stacks, checkpointed pipelines, pinned interfaces. If it can't be rebuilt from the repo, it doesn't exist.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-28">
      {/* ── Header ─────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="section-label">{"// MISSION CONTROL"}</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none mb-8" style={{ color: "var(--c-text)" }}>
              Operator Profile
            </h1>
          </Reveal>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
            <Reveal delay={0.08}>
              <div className="hud-corners panel rounded-sm p-8 h-full">
                <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--c-text)" }}>
                  I&apos;m {siteConfig.name} — a robotics engineer with ~2 years across
                  perception, control, and learning: ROS2 navigation and manipulation,
                  imitation learning, and LLM-driven agentic pipelines. Hands-on from
                  closed-loop motor control to autonomous robots.
                </p>
                <p className="leading-relaxed" style={{ color: "var(--c-muted)" }}>
                  My work spans the full stack — Autoware on an F1TENTH racer,
                  heterogeneous multi-robot fleets, a patented pipe-crawling
                  inspection robot with FOC over CANopen, and imitation-learning
                  policies (ACT, Diffusion Policy) trained from teleoperation.
                  I care about systems that survive contact with the real world:
                  code-verified, observable, and reproducible from a clean checkout.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="hud-corners panel rounded-sm p-8 h-full font-mono text-[16px] space-y-4">
                {[
                  { k: "CALLSIGN", v: siteConfig.initials },
                  { k: "ROLE", v: "ROBOTICS ENGINEER" },
                  { k: "SPECIALIZATION", v: "ROS2 · IMITATION LEARNING · AGENTIC AI" },
                  { k: "BASE", v: "HYDERABAD, IN" },
                  { k: "UPLINK", v: siteConfig.email, href: `mailto:${siteConfig.email}` },
                ].map(({ k, v, href }) => (
                  <div key={k} className="flex flex-col gap-0.5">
                    <span className="tracking-[0.25em] text-[13px]" style={{ color: "var(--c-muted)" }}>
                      {k}
                    </span>
                    {href ? (
                      <a href={href} className="tracking-wide break-all" style={{ color: "var(--c-secondary)" }}>
                        {v}
                      </a>
                    ) : (
                      <span className="tracking-wide" style={{ color: "var(--c-text)" }}>
                        {v}
                      </span>
                    )}
                  </div>
                ))}
                <div className="pt-2 flex items-center gap-2 tracking-[0.25em] text-[13px]" style={{ color: "var(--c-accent)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--c-accent)", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
                  ACCEPTING MISSIONS
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px rounded-sm overflow-hidden" style={{ background: "var(--c-border)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="p-6 text-center"
              style={{ background: "var(--c-surface)" }}
            >
              <div className="text-3xl font-semibold mb-1 tabular-nums" style={{ color: i === 3 ? "var(--c-accent)" : "var(--c-primary)" }}>
                {s.value}
              </div>
              <div className="font-mono text-[13px] tracking-[0.25em]" style={{ color: "var(--c-muted)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Directives ─────────────────────────────────── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="section-label">{"// PRIME DIRECTIVES"}</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-text)" }}>
              How I Engineer
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {directives.map((d, i) => (
              <Reveal key={d.code} delay={i * 0.08} className="h-full">
                <div className="hud-corners panel rounded-sm p-7 h-full">
                  <p className="font-mono text-[13px] tracking-[0.3em] mb-4" style={{ color: "var(--c-primary)" }}>
                    {d.code}
                  </p>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--c-text)" }}>
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career timeline ────────────────────────────── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-14">
            <p className="section-label">{"// MISSION LOG"}</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-text)" }}>
              Journey
            </h2>
          </Reveal>
          <ExperienceLogs />
        </div>
      </section>

      {/* ── Systems ────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="section-label">{"// TECHNOLOGY ECOSYSTEM"}</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-text)" }}>
              Core Systems
            </h2>
          </Reveal>
          <SkillsEcosystem />
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="px-6 py-24 text-center" style={{ borderTop: "1px solid var(--c-border)" }}>
        <Reveal>
          <Link
            href="/contact"
            className="hud-corners inline-block px-10 py-4 font-mono text-xs tracking-[0.3em] font-semibold"
            style={{
              background: "var(--c-primary)",
              border: "1px solid var(--c-primary)",
              color: "#ffffff",
            }}
          >
            OPEN TEAM RADIO
          </Link>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
