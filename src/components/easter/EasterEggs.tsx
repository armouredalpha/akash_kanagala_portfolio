"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects, siteConfig } from "@/data/content";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type Line = { text: string; tone?: "in" | "ok" | "err" | "dim" };

const BANNER: Line[] = [
  { text: "AKASH.OS v1.0 — pit wall shell", tone: "ok" },
  { text: "type 'help' for available commands", tone: "dim" },
];

function runCommand(
  raw: string,
  push: (lines: Line[]) => void,
  navigate: (path: string) => void,
  close: () => void
) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  switch (cmd.toLowerCase()) {
    case "":
      return;
    case "help":
      push([
        { text: "help          this list" },
        { text: "whoami        driver identity" },
        { text: "ls            list garage builds" },
        { text: "open <slug>   pull a build out of the garage" },
        { text: "goto <page>   home | about | projects | notes | contact" },
        { text: "skills        core systems" },
        { text: "contact       team radio channels" },
        { text: "clear         wipe terminal" },
        { text: "exit          close terminal (Esc)" },
      ]);
      return;
    case "whoami":
      push([
        { text: `${siteConfig.name} — Robotics Engineer`, tone: "ok" },
        { text: "ROS2 navigation & manipulation · imitation learning · agentic pipelines", tone: "dim" },
      ]);
      return;
    case "ls":
    case "projects":
      push(
        projects.map((p) => ({
          text: `${p.slug.padEnd(30)} ${p.category}`,
          tone: "dim" as const,
        }))
      );
      return;
    case "open": {
      const slug = args[0];
      const hit = projects.find((p) => p.slug === slug);
      if (!hit) {
        push([{ text: `build not found: ${slug ?? "(none)"} — try 'ls'`, tone: "err" }]);
        return;
      }
      push([{ text: `firing up ${hit.title}…`, tone: "ok" }]);
      close();
      navigate(`/projects/${hit.slug}`);
      return;
    }
    case "goto": {
      const page = (args[0] ?? "").toLowerCase();
      const map: Record<string, string> = {
        home: "/",
        about: "/about",
        projects: "/projects",
        garage: "/projects",
        notes: "/notes",
        research: "/notes",
        contact: "/contact",
        radio: "/contact",
        freelance: "/freelance",
      };
      if (!map[page]) {
        push([{ text: `unknown destination: ${page}`, tone: "err" }]);
        return;
      }
      close();
      navigate(map[page]);
      return;
    }
    case "skills":
      push([
        { text: "ROS2 · Nav2 · MoveIt2 · Autoware · ACT · Diffusion Policy", tone: "dim" },
        { text: "LangGraph · YOLOv8 · PyTorch · FOC · CANopen · Docker · Jetson", tone: "dim" },
      ]);
      return;
    case "contact":
      push([
        { text: `email    ${siteConfig.email}` },
        { text: `github   ${siteConfig.github}` },
        { text: "status   RADIO CHECK — LOUD AND CLEAR", tone: "ok" },
      ]);
      return;
    case "sudo":
      push([{ text: "nice try. this incident will be reported to race control.", tone: "err" }]);
      return;
    case "max":
    case "verstappen":
      push([
        { text: "GIVING IT MAX. SIMPLY LOVELY.", tone: "ok" },
        { text: "tu-tu-tu-du — max verstappen 🏆🏆🏆🏆", tone: "dim" },
      ]);
      return;
    case "dhoni":
    case "thala":
      push([
        { text: "HELICOPTER SHOT ENGAGED.", tone: "ok" },
        { text: "finishes off in style — captain cool, no. 7 forever", tone: "dim" },
      ]);
      return;
    case "ducati":
    case "panigale":
      push([
        { text: "PANIGALE V4 — DESMOSEDICI STRADALE. 214 HP.", tone: "ok" },
        { text: "there is no replacement for desmodromic displacement", tone: "dim" },
      ]);
      return;
    case "veyron":
    case "bugatti":
      push([
        { text: "GRAND SPORT 16.4 — W16, 4 TURBOS, 1001 HP.", tone: "ok" },
        { text: "top speed mode: hydraulics locked, spoiler trimmed", tone: "dim" },
      ]);
      return;
    case "uav":
    case "cod":
      push([
        { text: "UAV ONLINE — ENEMY LOCATIONS REVEALED.", tone: "ok" },
        { text: "friendly AC-130 above. reloading… tactical nuke incoming?", tone: "dim" },
      ]);
      return;
    case "konami":
      push([{ text: "↑ ↑ ↓ ↓ ← → ← → B A", tone: "dim" }]);
      return;
    case "exit":
    case "quit":
      close();
      return;
    default:
      push([{ text: `command not found: ${cmd} — try 'help'`, tone: "err" }]);
  }
}

/**
 * Global hidden-interaction layer:
 *  - `~` (backquote) toggles a developer terminal
 *  - Konami code triggers a system-override 360 spin (kept it pinned, no lift)
 */
export function EasterEggs() {
  const router = useRouter();
  const [termOpen, setTermOpen] = useState(false);
  const [override, setOverride] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const konamiIdx = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const triggerOverride = useCallback(() => {
    setOverride(true);
    document.documentElement.style.transition = "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
    document.documentElement.style.transform = "rotate(360deg)";
    window.setTimeout(() => {
      document.documentElement.style.transform = "";
      window.setTimeout(() => {
        document.documentElement.style.transition = "";
      }, 1300);
    }, 1250);
    window.setTimeout(() => setOverride(false), 3200);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Konami tracker (never while typing in a field)
      if (!typing) {
        const expected = KONAMI[konamiIdx.current];
        if (e.key === expected || e.key.toLowerCase() === expected) {
          konamiIdx.current += 1;
          if (konamiIdx.current === KONAMI.length) {
            konamiIdx.current = 0;
            triggerOverride();
          }
        } else {
          konamiIdx.current = e.key === KONAMI[0] ? 1 : 0;
        }
      }

      if (e.key === "`" && !typing) {
        e.preventDefault();
        setTermOpen((v) => !v);
      } else if (e.key === "Escape") {
        setTermOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerOverride]);

  useEffect(() => {
    if (termOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [termOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, termOpen]);

  const submit = () => {
    const raw = input;
    setInput("");
    if (raw.trim().toLowerCase() === "clear") {
      setLines(BANNER);
      return;
    }
    setLines((prev) => [...prev, { text: `> ${raw}`, tone: "in" }]);
    runCommand(
      raw,
      (out) => setLines((prev) => [...prev, ...out]),
      (path) => router.push(path),
      () => setTermOpen(false)
    );
  };

  // literal colors: the terminal stays dark while the site palette is light
  const toneColor: Record<NonNullable<Line["tone"]>, string> = {
    in: "#ffffff",
    ok: "#ff5c4d",
    err: "#ffb3ac",
    dim: "#a18f8d",
  };

  return (
    <>
      <AnimatePresence>
        {termOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-x-0 top-0 z-[9999] px-4 pt-4"
          >
            <div className="terminal-window max-w-3xl mx-auto rounded-lg overflow-hidden font-mono text-[17px]">
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
              >
                <span style={{ color: "var(--c-muted)" }}>
                  driver@akash.os — /dev/pitwall
                </span>
                <span style={{ color: "var(--c-muted)" }}>ESC to close</span>
              </div>
              <div ref={scrollRef} className="px-4 py-3 max-h-64 overflow-y-auto space-y-1">
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className="whitespace-pre-wrap break-words"
                    style={{ color: line.tone ? toneColor[line.tone] : "#f6eeee" }}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
              >
                <span style={{ color: "#ff5c4d" }}>&gt;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: "#f6eeee", caretColor: "#ff5c4d" }}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal input"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {override && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded font-mono text-xs tracking-[0.3em]"
            style={{
              background: "rgba(225,6,0,0.1)",
              border: "1px solid rgba(225,6,0,0.5)",
              color: "var(--c-accent)",
            }}
          >
            OVERTAKE COMPLETE — SIMPLY LOVELY
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
