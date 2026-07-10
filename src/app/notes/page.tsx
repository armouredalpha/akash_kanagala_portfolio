import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { notes } from "@/data/notes";

export const metadata = {
  title: "Notes — Akash Kanagala",
  description:
    "Engineering notes on robotics, control theory, simulation, and agentic AI.",
};

export default function Notes() {
  const sorted = [...notes].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main>
      {/* ── Header ───────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="aurora-bg">
          <div
            className="aurora-blob"
            style={{
              width: "50vw",
              height: "50vw",
              background:
                "radial-gradient(circle, rgba(157,78,221,0.09) 0%, transparent 70%)",
              top: "-18%",
              left: "-10%",
              animation: "aurora 14s ease-in-out infinite",
            }}
          />
          <div className="grid-pattern" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <p className="section-label">{"// writing"}</p>
            <h1
              className="text-5xl md:text-6xl font-bold"
              style={{ color: "var(--c-text)" }}
            >
              Notes
            </h1>
            <p
              className="text-lg mt-4 max-w-xl"
              style={{ color: "var(--c-muted)" }}
            >
              Engineering notes from real projects — simulation tradeoffs,
              control architecture decisions, and keeping AI systems honest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── List ─────────────────────────────────────── */}
      <section className="px-6 pb-28">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          {sorted.map((note) => (
            <Reveal key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="block group">
                <article className="glass rounded-2xl p-7 transition-colors">
                  <div
                    className="flex items-center gap-3 font-mono text-xs mb-3"
                    style={{ color: "var(--c-muted)" }}
                  >
                    <span>{note.date}</span>
                    <span>·</span>
                    <span>{note.readingTime} read</span>
                  </div>
                  <h2
                    className="text-xl md:text-2xl font-semibold leading-snug mb-2"
                    style={{ color: "var(--c-text)" }}
                  >
                    {note.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {note.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full font-mono"
                          style={{
                            background: "rgba(35,21,24,0.04)",
                            color: "var(--c-muted)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 font-mono text-xs"
                      style={{ color: "var(--c-primary)" }}
                    >
                      Read
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
