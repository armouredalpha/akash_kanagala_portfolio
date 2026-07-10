"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/content";

type FormState = "idle" | "sending" | "success";

const channels = [
  { label: "EMAIL", value: siteConfig.email, href: `mailto:${siteConfig.email}`, freq: "PRIMARY UPLINK" },
  { label: "GITHUB", value: "github.com/armouredalpha", href: siteConfig.github, freq: "CODE TELEMETRY" },
  { label: "LINKEDIN", value: "in/akash-kanagala", href: siteConfig.linkedin, freq: "PROFESSIONAL BAND" },
];

/** Rotating-sweep radar with a few contact blips. Pure CSS animation. */
function Radar() {
  const blips = [
    { top: "28%", left: "62%", delay: "0s" },
    { top: "58%", left: "34%", delay: "1.4s" },
    { top: "42%", left: "48%", delay: "2.7s" },
  ];
  return (
    <div className="radar aspect-square w-full max-w-[340px] mx-auto">
      <div className="radar-sweep" />
      {blips.map((b, i) => (
        <span key={i} className="radar-blip" style={{ top: b.top, left: b.left, animationDelay: b.delay }} />
      ))}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--c-primary)" }}
      />
      <span
        className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[12px] tracking-[0.3em]"
        style={{ color: "var(--c-muted)" }}
      >
        SCANNING FOR MISSIONS
      </span>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Placeholder: replace with your actual form handler (e.g. Resend, Formspree)
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("success");
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(35,21,24,0.03)",
    border: "1px solid var(--c-border)",
    color: "var(--c-text)",
    borderRadius: "2px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <main className="pt-28">
      {/* ── Header ─────────────────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="section-label">{"// COMMUNICATIONS"}</p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none" style={{ color: "var(--c-text)" }}>
              Open a Channel
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-6 items-start">
          {/* ── Left console: radar + channels + status ── */}
          <div className="space-y-6">
            <Reveal>
              <div className="hud-corners panel rounded-sm p-8">
                <Radar />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="hud-corners panel rounded-sm p-6 space-y-4">
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-2"
                    style={{ borderBottom: "1px solid var(--c-border)" }}
                  >
                    <div>
                      <div className="font-mono text-[13px] tracking-[0.3em] mb-1" style={{ color: "var(--c-muted)" }}>
                        {ch.label} · {ch.freq}
                      </div>
                      <div
                        className="font-mono text-sm break-all transition-colors duration-200 group-hover:text-[color:var(--c-secondary)]"
                        style={{ color: "var(--c-text)" }}
                      >
                        {ch.value}
                      </div>
                    </div>
                    <span className="font-mono text-xs shrink-0" style={{ color: "var(--c-primary)" }}>
                      →
                    </span>
                  </a>
                ))}

                <div className="pt-2 font-mono text-[14px] space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--c-muted)" }}>STATUS</span>
                    <span className="flex items-center gap-2" style={{ color: "var(--c-accent)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--c-accent)", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
                      ACCEPTING MISSIONS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--c-muted)" }}>BASE</span>
                    <span style={{ color: "var(--c-text)" }}>HYDERABAD, IN · REMOTE GLOBAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--c-muted)" }}>RESPONSE WINDOW</span>
                    <span style={{ color: "var(--c-text)" }}>&lt; 24 HOURS</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right console: transmission composer ───── */}
          <Reveal delay={0.12}>
            <div className="hud-corners panel rounded-sm p-8">
              <p className="font-mono text-[13px] tracking-[0.3em] mb-6" style={{ color: "var(--c-primary)" }}>
                TRANSMISSION COMPOSER
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                  >
                    <div className="font-mono text-sm tracking-[0.25em] mb-3" style={{ color: "var(--c-primary)" }}>
                      [ TRANSMISSION RECEIVED ]
                    </div>
                    <p className="text-sm" style={{ color: "var(--c-muted)" }}>
                      Signal acquired. Expect a response within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block font-mono text-[13px] tracking-[0.25em] mb-2" style={{ color: "var(--c-muted)" }}>
                          OPERATOR NAME
                        </label>
                        <input id="name" name="name" required value={form.name} onChange={handleChange} style={inputStyle} placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-mono text-[13px] tracking-[0.25em] mb-2" style={{ color: "var(--c-muted)" }}>
                          RETURN FREQUENCY (EMAIL)
                        </label>
                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="jane@company.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block font-mono text-[13px] tracking-[0.25em] mb-2" style={{ color: "var(--c-muted)" }}>
                        MISSION TYPE
                      </label>
                      <select id="projectType" name="projectType" required value={form.projectType} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
                        <option value="" disabled>
                          Select mission profile…
                        </option>
                        <option value="robotics">Robotics system (ROS2)</option>
                        <option value="manipulation">Manipulation / imitation learning</option>
                        <option value="vision">Computer vision / perception</option>
                        <option value="agents">Agentic AI / LLM pipeline</option>
                        <option value="embedded">Embedded / motor control</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-mono text-[13px] tracking-[0.25em] mb-2" style={{ color: "var(--c-muted)" }}>
                        MESSAGE PAYLOAD
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        style={{ ...inputStyle, resize: "vertical" }}
                        placeholder="Mission goals, constraints, timeline, budget range…"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="hud-corners w-full py-4 font-mono text-xs tracking-[0.3em] font-semibold transition-opacity duration-200 disabled:opacity-60"
                      style={{
                        background: "var(--c-primary)",
                        border: "1px solid var(--c-primary)",
                        color: "#ffffff",
                        cursor: status === "sending" ? "wait" : "pointer",
                      }}
                    >
                      {status === "sending" ? "TRANSMITTING…" : "TRANSMIT →"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
