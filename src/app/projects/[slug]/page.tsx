import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/data/content";

const categoryColor: Record<string, string> = {
  Robotics: "var(--c-primary)",
  "AI/ML": "var(--c-secondary)",
  "Control Systems": "var(--c-accent)",
  "Agentic AI": "#eef0f3",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Akash Kanagala`,
    description: project.subtitle,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const color = categoryColor[project.category] ?? "var(--c-primary)";
  const cs = project.caseStudy;

  return (
    <main>
      {/* ── Header ───────────────────────────────────── */}
      <section className="relative pt-32 pb-14 px-6 overflow-hidden">
        <div className="aurora-bg">
          <div
            className="aurora-blob"
            style={{
              width: "50vw",
              height: "50vw",
              background:
                "radial-gradient(circle, rgba(35,21,24,0.08) 0%, transparent 70%)",
              top: "-18%",
              right: "-12%",
              animation: "aurora 14s ease-in-out infinite",
            }}
          />
          <div className="grid-pattern" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs mb-8 transition-colors"
              style={{ color: "var(--c-muted)" }}
            >
              <ArrowLeft size={13} />
              All projects
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-xs px-2.5 py-0.5 rounded-full"
                style={{
                  color,
                  border: `1px solid ${color}28`,
                  background: `${color}0a`,
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

            <h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ color: "var(--c-text)" }}
            >
              {project.title}
            </h1>
            <p
              className="text-lg mt-4 max-w-2xl"
              style={{ color: "var(--c-muted)" }}
            >
              {project.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-sm font-medium font-mono inline-flex items-center gap-2"
                  style={{ backgroundColor: "var(--c-primary)", color: "#ffffff" }}
                >
                  View on GitHub
                  <ArrowUpRight size={15} />
                </a>
              )}
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full text-sm font-medium font-mono"
                style={{
                  border: "1px solid rgba(35,21,24,0.12)",
                  color: "var(--c-text)",
                }}
              >
                Build something like this
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {cs && (
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-14">
            {/* Problem / Approach */}
            <div className="grid md:grid-cols-2 gap-5">
              <Reveal>
                <div className="glass rounded-2xl p-7 h-full">
                  <p className="section-label">{"// the problem"}</p>
                  <p
                    className="text-sm leading-relaxed mt-3"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {cs.problem}
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="glass rounded-2xl p-7 h-full">
                  <p className="section-label">{"// the approach"}</p>
                  <p
                    className="text-sm leading-relaxed mt-3"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {cs.approach}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Highlights */}
            <Reveal>
              <div>
                <p className="section-label mb-5">{"// technical highlights"}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {cs.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="glass rounded-xl p-5 flex gap-3 items-start"
                    >
                      <span
                        className="font-mono text-xs mt-0.5 shrink-0"
                        style={{ color }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--c-muted)" }}
                      >
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Stack */}
            <Reveal>
              <div>
                <p className="section-label mb-5">{"// stack"}</p>
                <div className="glass rounded-2xl divide-y divide-white/5">
                  {cs.stack.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4"
                    >
                      <span
                        className="font-mono text-xs w-36 shrink-0 uppercase tracking-wider"
                        style={{ color }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--c-text)" }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Outcome */}
            <Reveal>
              <div
                className="glass rounded-2xl p-7"
                style={{ borderColor: `${color}30` }}
              >
                <p className="section-label">{"// outcome"}</p>
                <p
                  className="text-base leading-relaxed mt-3"
                  style={{ color: "var(--c-text)" }}
                >
                  {cs.outcome}
                </p>
              </div>
            </Reveal>

            {/* Tags + next project */}
            <Reveal>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-mono"
                    style={{
                      background: "rgba(35,21,24,0.04)",
                      color: "var(--c-muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
