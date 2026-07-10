import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/animations/RevealText";
import { Footer } from "@/components/layout/Footer";
import { notes, type NoteBlock } from "@/data/notes";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) return {};
  return {
    title: `${note.title} — Akash Kanagala`,
    description: note.summary,
  };
}

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          className="text-2xl font-semibold mt-10 mb-4"
          style={{ color: "var(--c-text)" }}
        >
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-3 my-5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className="font-mono text-xs mt-1.5 shrink-0"
                style={{ color: "var(--c-primary)" }}
              >
                ▸
              </span>
              <span
                className="text-base leading-relaxed"
                style={{ color: "var(--c-muted)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p
          className="text-base leading-relaxed my-5"
          style={{ color: "var(--c-muted)" }}
        >
          {block.text}
        </p>
      );
  }
}

export default async function NoteDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();

  return (
    <main>
      <section className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="aurora-bg">
          <div className="grid-pattern" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 font-mono text-xs mb-8 transition-colors"
              style={{ color: "var(--c-muted)" }}
            >
              <ArrowLeft size={13} />
              All notes
            </Link>

            <div
              className="flex items-center gap-3 font-mono text-xs mb-4"
              style={{ color: "var(--c-muted)" }}
            >
              <span>{note.date}</span>
              <span>·</span>
              <span>{note.readingTime} read</span>
            </div>

            <h1
              className="text-3xl md:text-5xl font-bold leading-tight"
              style={{ color: "var(--c-text)" }}
            >
              {note.title}
            </h1>

            <div className="flex flex-wrap gap-1.5 mt-6">
              {note.tags.map((tag) => (
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

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <article>
              {note.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </article>

            <div
              className="mt-14 glass rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold" style={{ color: "var(--c-text)" }}>
                  Working on something in this space?
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--c-muted)" }}>
                  I take on robotics, control, and AI systems projects.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full text-sm font-medium font-mono shrink-0 text-center"
                style={{ backgroundColor: "var(--c-primary)", color: "#ffffff" }}
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
