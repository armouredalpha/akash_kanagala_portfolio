"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { BootSequence } from "@/components/intro/BootSequence";
import { SpiralProjects, ProjectListMobile } from "@/components/home/SpiralProjects";
import { SkillsEcosystem } from "@/components/home/SkillsEcosystem";
import { ExperienceLogs } from "@/components/home/ExperienceLogs";
import { services } from "@/data/content";

const ControlRoom = dynamic(() => import("@/components/three/ControlRoom"), {
  ssr: false,
});

const ScoutFlyby = dynamic(() => import("@/components/three/ScoutFlyby"), {
  ssr: false,
});

const PanigaleFlyby = dynamic(() => import("@/components/three/PanigaleFlyby"), {
  ssr: false,
});

const ROLES = [
  "MECHANICAL ENGINEER",
  "FORMULA STUDENT",
  "ROBOTICS ENGINEER",
  "AGENTIC AI",
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 26, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Home() {
  const [booted, setBooted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scrolling out of the hero reads as the camera flying forward past the copy.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, 1.32]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(9px)"]);
  const sceneOpacity = useTransform(scrollYProgress, [0.3, 1], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <main>
      <BootSequence onReveal={() => setBooted(true)} />

      {/* the scout quad patrols the page; the Panigale sprints the lower band */}
      {booted && <ScoutFlyby />}
      {booted && <PanigaleFlyby />}

      {/* ── Hero — race control ─────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="volumetric-glow" />
        <div className="grid-pattern absolute inset-0" />

        <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity, y: sceneY }}>
          {booted && <ControlRoom />}
        </motion.div>

        {/* HUD frame */}
        {booted && (
          <motion.div
            aria-hidden
            className="absolute inset-x-6 md:inset-x-10 top-24 bottom-8 pointer-events-none z-[5] font-mono text-[13px] tracking-[0.25em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            style={{ color: "rgba(161,143,141,0.85)" }}
          >
            <div className="absolute top-0 left-0">
              SYS.ONLINE
              <span style={{ color: "var(--c-primary)" }}> ●</span>
            </div>
            <div className="absolute top-0 right-0 text-right">AUTONOMY STACK v2.0</div>
            <div className="absolute bottom-0 left-0 hidden sm:block">LAT 17.38 / LON 78.48 · HYD</div>
            <div className="absolute bottom-0 right-0 text-right hidden sm:block">GRID P1 · DRS ENABLED · LINK STABLE</div>
          </motion.div>
        )}

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center"
          style={{ scale: copyScale, opacity: copyOpacity, filter: copyBlur }}
        >
          {booted && (
            <>
              <motion.p
                {...rise(0.55)}
                className="font-mono text-[14px] tracking-[0.4em] mb-8"
                style={{ color: "var(--c-primary)" }}
              >
                {"// RACE CONTROL"}
              </motion.p>

              <motion.h1
                {...rise(0.75)}
                className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-none mb-8"
              >
                <span style={{ color: "var(--c-text)" }}>Akash Kanagala</span>
              </motion.h1>

              <motion.h2
                {...rise(0.95)}
                className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-10"
              >
                <span className="gradient-text">From Race Cars</span>
                <br />
                <span className="gradient-text">to Robots.</span>
              </motion.h2>

              <motion.div
                {...rise(1.15)}
                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[14px] tracking-[0.25em] mb-14"
                style={{ color: "var(--c-muted)" }}
              >
                {ROLES.map((role, i) => (
                  <span key={role} className="flex items-center gap-5">
                    {i > 0 && <span style={{ color: "rgba(225,6,0,0.6)" }}>/</span>}
                    {role}
                  </span>
                ))}
              </motion.div>

              <motion.div {...rise(1.35)} className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#projects"
                  className="hud-corners px-8 py-3.5 font-mono text-xs tracking-[0.25em] font-semibold transition-colors duration-300"
                  style={{
                    background: "var(--c-primary)",
                    border: "1px solid var(--c-primary)",
                    color: "#ffffff",
                  }}
                >
                  ENTER THE GARAGE
                </a>
                <Link
                  href="/contact"
                  className="px-8 py-3.5 font-mono text-xs tracking-[0.25em] transition-colors duration-300"
                  style={{ border: "1px solid var(--c-border)", color: "var(--c-muted)" }}
                >
                  OPEN TEAM RADIO
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            style={{ color: "var(--c-muted)" }}
          >
            <span className="font-mono text-[13px] tracking-[0.3em]">LIGHTS OUT</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
              <ArrowDown size={13} />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ── Spiral project constellation ───────────────── */}
      {/* anchor lives on the wrapper so #projects works on every breakpoint */}
      <div id="projects">
        <SpiralProjects />
        <ProjectListMobile />
      </div>

      {/* ── Capabilities ───────────────────────────────── */}
      <section className="py-28 px-6" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14">
            <p className="section-label">{"// POWER UNITS"}</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-text)" }}>
              Engineering Capabilities
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.08} className="h-full">
                <div className="hud-corners panel rounded-sm p-7 h-full">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-sm font-bold text-lg mb-6"
                    style={{ color: "var(--c-primary)", background: "rgba(225,6,0,0.1)" }}
                  >
                    {svc.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2.5" style={{ color: "var(--c-text)" }}>
                    {svc.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--c-muted)" }}>
                    {svc.description}
                  </p>
                  <ul className="space-y-1.5">
                    {svc.items.map((item) => (
                      <li key={item} className="font-mono text-[14px] flex items-center gap-2" style={{ color: "var(--c-muted)" }}>
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--c-primary)" }} />
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

      {/* ── Skills ecosystem ───────────────────────────── */}
      <section className="py-28 px-6" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="section-label">{"// TELEMETRY CHANNELS"}</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-text)" }}>
              Core Systems
            </h2>
            <p className="mt-3 font-mono text-[14px] tracking-[0.2em]" style={{ color: "var(--c-muted)" }}>
              HOVER A MODULE FOR TELEMETRY
            </p>
          </Reveal>
          <SkillsEcosystem />
        </div>
      </section>

      {/* ── Experience logs ────────────────────────────── */}
      <section className="py-28 px-6" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-14">
            <p className="section-label">{"// LAP HISTORY"}</p>
            <h2 className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--c-text)" }}>
              Operational History
            </h2>
          </Reveal>
          <ExperienceLogs />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ borderTop: "1px solid var(--c-border)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="section-label" style={{ color: "var(--c-accent)" }}>
              {"// PIT WALL OPEN"}
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-5 leading-tight" style={{ color: "var(--c-text)" }}>
              Have a mission in mind?
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--c-muted)" }}>
              Autonomous navigation, robot learning, agentic pipelines —
              let&apos;s put a machine on the grid.
            </p>
            <Link
              href="/contact"
              className="hud-corners inline-block px-10 py-4 font-mono text-xs tracking-[0.3em] font-semibold transition-colors duration-300"
              style={{
                background: "var(--c-primary)",
                border: "1px solid var(--c-primary)",
                color: "#ffffff",
              }}
            >
              BOX BOX — LET&apos;S TALK
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
