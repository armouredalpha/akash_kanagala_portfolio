"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { projects, Project } from "@/data/content";

const STEP = 0.72; // angular gap between nodes on the spiral (rad)
const RADIUS = 470; // px orbit radius on desktop
const DEPTH = 340; // px translateZ swing

const categoryColor: Record<string, string> = {
  Robotics: "var(--c-primary)",
  "AI/ML": "var(--c-secondary)",
  "Control Systems": "#8a6f6b",
  "Agentic AI": "var(--c-accent)",
};

function SpiralNode({
  project,
  index,
  focus,
  active,
  onLaunch,
}: {
  project: Project;
  index: number;
  focus: MotionValue<number>;
  active: boolean;
  onLaunch: (slug: string) => void;
}) {
  // angle of this node relative to the front of the spiral
  const angle = useTransform(focus, (f) => (index - f) * STEP);
  const x = useTransform(angle, (a) => Math.sin(a) * RADIUS);
  const z = useTransform(angle, (a) => (Math.cos(a) - 1) * DEPTH);
  const y = useTransform(focus, (f) => (index - f) * 30);
  const scale = useTransform(angle, (a) => 0.55 + 0.45 * Math.max(0, Math.cos(a)));
  const opacity = useTransform(angle, (a) => {
    const c = Math.cos(a);
    return c > 0 ? 0.25 + 0.75 * c : Math.max(0.08, 0.25 + 0.3 * c);
  });
  const zIndex = useTransform(angle, (a) => Math.round(100 + Math.cos(a) * 100));
  const blur = useTransform(angle, (a) => `blur(${Math.max(0, (1 - Math.cos(a)) * 3).toFixed(1)}px)`);

  const color = categoryColor[project.category] ?? "var(--c-primary)";

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[400px] -ml-[200px] -mt-[130px]"
      style={{ x, y, z, scale, opacity, zIndex, filter: blur, pointerEvents: active ? "auto" : "none" }}
    >
      <button
        type="button"
        onClick={() => active && onLaunch(project.slug)}
        className={`hud-corners w-full text-left rounded-sm transition-colors duration-300 ${
          active ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          background: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
          border: `1px solid ${active ? "rgba(35,21,24,0.35)" : "var(--c-border)"}`,
          backdropFilter: "blur(8px)",
        }}
        tabIndex={active ? 0 : -1}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4 font-mono text-[13px] tracking-[0.25em]">
            <span style={{ color }}>
              NODE {String(index + 1).padStart(2, "0")} · {project.category.toUpperCase()}
            </span>
            <span style={{ color: "var(--c-muted)" }}>{project.year}</span>
          </div>

          <h3 className="text-xl font-semibold leading-snug mb-2" style={{ color: "var(--c-text)" }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--c-muted)" }}>
            {project.subtitle}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[13px] px-2 py-0.5 rounded-sm"
                style={{ background: "rgba(35,21,24,0.04)", color: "var(--c-muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="font-mono text-[14px] tracking-[0.2em] flex items-center gap-2 transition-opacity duration-300"
            style={{ color, opacity: active ? 1 : 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, animation: "pulse-dot 1.6s ease-in-out infinite" }} />
            OPEN CASE STUDY →
          </div>
        </div>
      </button>
    </motion.div>
  );
}

/**
 * Signature section: projects arranged on a rotating spiral. Scroll turns the
 * spiral; the active node sweeps to the front; clicking it flies the camera in.
 */
export function SpiralProjects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [launching, setLaunching] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const focus = useSpring(useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]), {
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  });

  useMotionValueEvent(focus, "change", (v) => {
    const idx = Math.min(projects.length - 1, Math.max(0, Math.round(v)));
    if (idx !== activeIdx) setActiveIdx(idx);
  });

  const launch = (slug: string) => {
    if (launching) return;
    setLaunching(true);
    window.setTimeout(() => router.push(`/projects/${slug}`), 520);
  };

  const active = projects[activeIdx];

  return (
    <section ref={sectionRef} className="relative hidden lg:block" style={{ height: `${projects.length * 58 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* orbital guides */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.12 }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="720" cy="450" rx="560" ry="210" fill="none" stroke="#e10600" strokeWidth="1" strokeDasharray="3 9" />
          <ellipse cx="720" cy="450" rx="380" ry="140" fill="none" stroke="#8a6f6b" strokeWidth="0.6" strokeDasharray="2 12" />
        </svg>

        {/* section header */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-[250]">
          <p className="section-label">{"// PROJECT CONSTELLATION"}</p>
          <h2 className="text-4xl font-semibold tracking-tight" style={{ color: "var(--c-text)" }}>
            Deployed Systems
          </h2>
        </div>

        {/* the spiral stage */}
        <div className="absolute inset-0" style={{ perspective: "1300px" }}>
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {projects.map((project, i) => (
              <SpiralNode
                key={project.slug}
                project={project}
                index={i}
                focus={focus}
                active={i === activeIdx && !launching}
                onLaunch={launch}
              />
            ))}
          </div>
        </div>

        {/* telemetry sidebar */}
        <div className="absolute left-10 bottom-12 font-mono text-[14px] tracking-[0.2em] space-y-1.5 z-[250]" style={{ color: "var(--c-muted)" }}>
          <div>
            NODE{" "}
            <span style={{ color: "var(--c-primary)" }}>
              {String(activeIdx + 1).padStart(2, "0")}
            </span>{" "}
            / {String(projects.length).padStart(2, "0")}
          </div>
          <div style={{ color: "var(--c-text)" }}>{active.title.toUpperCase()}</div>
          <div>SCROLL TO ROTATE · CLICK TO ENTER</div>
        </div>

        {/* progress rail */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-[250]">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="w-5 h-px transition-all duration-300"
              style={{
                background: i === activeIdx ? "var(--c-primary)" : "rgba(35,21,24,0.15)",
                width: i === activeIdx ? 28 : 20,
              }}
            />
          ))}
        </div>

        {/* fly-in transition when a node is opened */}
        <AnimatePresence>
          {launching && (
            <motion.div
              className="absolute inset-0 z-[400] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ background: "radial-gradient(circle at center, rgba(35,21,24,0.12) 0%, #ffffff 70%)" }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.84, 0] }}
            >
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 14, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.7, 0, 0.84, 0] }}
                className="w-24 h-24 rounded-full"
                style={{ border: "1px solid rgba(225,6,0,0.6)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/** Small-screen fallback: the same nodes as a vertical mission list. */
export function ProjectListMobile() {
  return (
    <section className="lg:hidden py-24 px-6">
      <div className="max-w-xl mx-auto">
        <p className="section-label">{"// PROJECT CONSTELLATION"}</p>
        <h2 className="text-3xl font-semibold mb-10" style={{ color: "var(--c-text)" }}>
          Deployed Systems
        </h2>
        <div className="space-y-4">
          {projects.map((project, i) => {
            const color = categoryColor[project.category] ?? "var(--c-primary)";
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="hud-corners block rounded-sm p-5"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid var(--c-border)" }}
                >
                  <div className="flex items-center justify-between mb-3 font-mono text-[13px] tracking-[0.25em]">
                    <span style={{ color }}>
                      NODE {String(i + 1).padStart(2, "0")} · {project.category.toUpperCase()}
                    </span>
                    <span style={{ color: "var(--c-muted)" }}>{project.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1.5" style={{ color: "var(--c-text)" }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    {project.subtitle}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
