import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { PatternBackground } from "@/components/layout/PatternBackground";
import { EasterEggs } from "@/components/easter/EasterEggs";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Kanagala — Robotics Engineer",
  description:
    "Robotics Engineer — ROS2 navigation and manipulation, imitation learning (ACT, Diffusion Policy), Autoware autonomy, and LLM-driven agentic pipelines. From closed-loop motor control to autonomous robots.",
  keywords: [
    "Robotics",
    "ROS2",
    "Autoware",
    "Imitation Learning",
    "LangGraph",
    "Agentic AI",
    "MoveIt2",
    "Nav2",
    "F1TENTH",
    "Motor Control",
  ],
  authors: [{ name: "Akash Kanagala" }],
  openGraph: {
    title: "Akash Kanagala — Robotics Engineer",
    description: "Building reliable, real-world robotic systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <PatternBackground />
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <EasterEggs />
        <div className="scanline-overlay" />
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
