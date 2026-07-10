"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { services, process } from "@/data/content";

const pricing = [
  {
    tier: "Starter",
    price: "Contact for quote",
    description: "Short-term projects, prototypes, and proof-of-concepts.",
    items: [
      "Up to 2 weeks",
      "Single deliverable",
      "1 revision round",
      "Email support",
    ],
    highlight: false,
  },
  {
    tier: "Project",
    price: "Contact for quote",
    description:
      "Full-scope development with design, build, test, and documentation.",
    items: [
      "2–8 weeks",
      "Full system delivery",
      "Unlimited revisions",
      "Async + sync support",
      "Code documentation",
    ],
    highlight: true,
  },
  {
    tier: "Retainer",
    price: "Contact for quote",
    description:
      "Ongoing engineering support for teams building robotics or AI systems.",
    items: [
      "Monthly engagement",
      "Architecture reviews",
      "Implementation support",
      "Priority response",
    ],
    highlight: false,
  },
];

export default function Freelance() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="aurora-bg">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
          <div className="grid-pattern" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--c-accent)" }}
            >
              {"// freelance engineering"}
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{ color: "var(--c-text)" }}
            >
              Let&apos;s build something{" "}
              <span className="gradient-text">intelligent.</span>
            </h1>
            <p
              className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: "var(--c-muted)" }}
            >
              I work with startups, research teams, and companies building at
              the frontier of robotics and AI — from concept to deployment.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full font-bold text-sm transition-all duration-200"
              style={{ backgroundColor: "var(--c-primary)", color: "#ffffff" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 28px rgba(225,6,0,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Start a Project →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(35,21,24,0.04)" }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="section-label">{"// what i offer"}</p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--c-text)" }}
            >
              Services
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.12}>
                <div
                  className="p-7 rounded-2xl h-full transition-all duration-300"
                  style={{
                    background: "rgba(13,13,24,0.5)",
                    border: "1px solid rgba(35,21,24,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(35,21,24,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(35,21,24,0.06)";
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg mb-5"
                    style={{
                      color: "var(--c-primary)",
                      background: "rgba(35,21,24,0.08)",
                    }}
                  >
                    {svc.icon}
                  </div>
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{ color: "var(--c-text)" }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {svc.description}
                  </p>
                  <ul className="space-y-2">
                    {svc.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm flex items-center gap-2"
                        style={{ color: "var(--c-muted)" }}
                      >
                        <span style={{ color: "var(--c-accent)" }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(35,21,24,0.04)" }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-2"
              style={{ color: "var(--c-secondary)" }}
            >
              {"// how it works"}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--c-text)" }}
            >
              My Process
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div
                  className="p-6 rounded-2xl relative"
                  style={{
                    background: "rgba(13,13,24,0.35)",
                    border: "1px solid rgba(35,21,24,0.05)",
                  }}
                >
                  <div
                    className="font-mono text-4xl font-bold mb-4 leading-none"
                    style={{ color: "rgba(35,21,24,0.12)" }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--c-text)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(35,21,24,0.04)" }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="section-label">{"// investment"}</p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--c-text)" }}
            >
              Engagement Types
            </h2>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--c-muted)" }}
            >
              All projects are scoped individually. Get in touch for a custom quote.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <Reveal key={plan.tier} delay={i * 0.1}>
                <div
                  className="p-7 rounded-2xl h-full flex flex-col"
                  style={
                    plan.highlight
                      ? {
                          border: "1px solid rgba(35,21,24,0.3)",
                          background:
                            "linear-gradient(135deg, rgba(35,21,24,0.05) 0%, rgba(225,6,0,0.05) 100%)",
                        }
                      : {
                          border: "1px solid rgba(35,21,24,0.06)",
                          background: "rgba(13,13,24,0.4)",
                        }
                  }
                >
                  {plan.highlight && (
                    <div
                      className="font-mono text-xs px-3 py-1 rounded-full w-fit mb-4"
                      style={{
                        background: "rgba(35,21,24,0.1)",
                        color: "var(--c-primary)",
                        border: "1px solid rgba(35,21,24,0.2)",
                      }}
                    >
                      MOST COMMON
                    </div>
                  )}
                  <h3
                    className="font-bold text-xl mb-1"
                    style={{ color: "var(--c-text)" }}
                  >
                    {plan.tier}
                  </h3>
                  <p
                    className="font-mono text-xs mb-4"
                    style={{ color: "var(--c-primary)" }}
                  >
                    {plan.price}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {plan.description}
                  </p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm flex items-center gap-2"
                        style={{ color: "var(--c-muted)" }}
                      >
                        <span style={{ color: "var(--c-accent)" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="block text-center py-3 rounded-full text-sm font-medium transition-all duration-200"
                    style={
                      plan.highlight
                        ? {
                            backgroundColor: "var(--c-primary)",
                            color: "#ffffff",
                          }
                        : {
                            border: "1px solid rgba(35,21,24,0.1)",
                            color: "var(--c-text)",
                          }
                    }
                  >
                    Get in Touch
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
