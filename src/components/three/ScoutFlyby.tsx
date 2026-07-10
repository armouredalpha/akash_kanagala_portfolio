"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const RED = new THREE.Color("#e10600");
const WHITE = new THREE.Color("#ffffff");
// racing livery: gloss red hull, carbon-dark underbody
const HULL = "#d40a00";
const HULL_DARK = "#1c0d0e";

/** One motor pod: mount, spinning blades, and a faint prop-wash disc. */
function Rotor({ position, dir }: { position: [number, number, number]; dir: 1 | -1 }) {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (blades.current) blades.current.rotation.y += delta * 38 * dir;
  });
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.055, 0.07, 0.09, 12]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.85} roughness={0.3} />
      </mesh>
      <group ref={blades} position={[0, 0.06, 0]}>
        <mesh>
          <boxGeometry args={[0.52, 0.008, 0.032]} />
          <meshStandardMaterial color="#3a2325" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.52, 0.008, 0.032]} />
          <meshStandardMaterial color="#3a2325" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.27, 24]} />
        <meshBasicMaterial color={RED} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** The scout quad body — pure model; all motion comes from the parent rig. */
function ScoutModel() {
  const navLight = useRef<THREE.MeshStandardMaterial>(null);
  const armLen = 0.62;
  const arms: { angle: number; dir: 1 | -1 }[] = [
    { angle: Math.PI / 4, dir: 1 },
    { angle: (3 * Math.PI) / 4, dir: -1 },
    { angle: (5 * Math.PI) / 4, dir: 1 },
    { angle: (7 * Math.PI) / 4, dir: -1 },
  ];

  useFrame((state) => {
    if (navLight.current) {
      navLight.current.emissiveIntensity = Math.sin(state.clock.elapsedTime * 6) > 0.6 ? 3.5 : 0.2;
    }
  });

  return (
    <group>
      {/* fuselage — red livery over carbon underbody */}
      <mesh>
        <boxGeometry args={[0.42, 0.13, 0.5]} />
        <meshStandardMaterial color={HULL} metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.26, 0.07, 0.34]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.85} roughness={0.3} />
      </mesh>
      {/* white racing stripe down the canopy */}
      <mesh position={[0, 0.131, 0]}>
        <boxGeometry args={[0.06, 0.004, 0.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* sensor gimbal */}
      <mesh position={[0, -0.1, 0.18]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={HULL_DARK} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.1, 0.245]}>
        <cylinderGeometry args={[0.028, 0.034, 0.03, 12]} />
        <meshStandardMaterial color="#0a0506" emissive={WHITE} emissiveIntensity={1.4} />
      </mesh>
      {/* status strip */}
      <mesh position={[0, 0.005, 0.251]}>
        <boxGeometry args={[0.3, 0.02, 0.006]} />
        <meshStandardMaterial color="#0a0506" emissive={RED} emissiveIntensity={1.4} />
      </mesh>
      {/* rear nav beacon — blinks red */}
      <mesh position={[0, 0.02, -0.26]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshStandardMaterial ref={navLight} color="#0a0506" emissive={RED} emissiveIntensity={0.2} />
      </mesh>

      {arms.map(({ angle, dir }, i) => {
        const x = Math.cos(angle) * armLen;
        const z = Math.sin(angle) * armLen;
        return (
          <group key={i}>
            <mesh position={[x / 2, 0, z / 2]} rotation={[0, -angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.024, 0.03, armLen, 8]} />
              <meshStandardMaterial color={HULL} metalness={0.3} roughness={0.5} />
            </mesh>
            <Rotor position={[x, 0.04, z]} dir={dir} />
            <mesh position={[x * 0.82, -0.13, z * 0.82]}>
              <cylinderGeometry args={[0.012, 0.012, 0.16, 6]} />
              <meshStandardMaterial color={HULL_DARK} metalness={0.7} roughness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

type Trick = "barrel-roll" | "front-flip" | "spin-360";
const TRICKS: Trick[] = ["barrel-roll", "front-flip", "spin-360"];

const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

/**
 * Flight rig: sweeps the scout across the full viewport on a wandering
 * figure-eight, banking into turns like a bike through chicanes, and
 * throws in aerobatics. Scrolling adds a dive impulse.
 */
function FlightRig() {
  const rig = useRef<THREE.Group>(null);
  const attitude = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const scrollVel = useRef(0);
  const lastScroll = useRef(0);
  const trick = useRef<{ type: Trick; t0: number; dur: number; next: number }>({
    type: "barrel-roll",
    t0: -10,
    dur: 1,
    next: 3.5,
  });

  useEffect(() => {
    lastScroll.current = window.scrollY;
    const onScroll = () => {
      scrollVel.current += (window.scrollY - lastScroll.current) * 0.0012;
      lastScroll.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!rig.current || !attitude.current) return;
    const t = state.clock.elapsedTime;
    const hw = viewport.width / 2;
    const hh = viewport.height / 2;

    // wandering figure-eight across the whole viewport
    const x = Math.sin(t * 0.32) * hw * 0.74;
    const y = Math.sin(t * 0.57 + 1.2) * hh * 0.58 + Math.sin(t * 1.7) * 0.12;
    const z = Math.sin(t * 0.19) * 1.6;
    rig.current.position.set(x, y, z);

    // velocity → heading, bank, and pitch
    const dx = Math.cos(t * 0.32) * 0.32 * hw * 0.74;
    const dy = Math.cos(t * 0.57 + 1.2) * 0.57 * hh * 0.58;
    const yaw = Math.atan2(dx, 6);
    const bank = THREE.MathUtils.clamp(-dx * 0.14, -0.9, 0.9);
    const pitch = THREE.MathUtils.clamp(-dy * 0.1 + scrollVel.current, -0.7, 0.7);
    rig.current.rotation.set(pitch, yaw, bank);

    // scroll impulse decays
    scrollVel.current = THREE.MathUtils.damp(scrollVel.current, 0, 3, delta);

    // aerobatics layer
    const tk = trick.current;
    const p = (t - tk.t0) / tk.dur;
    let roll = 0;
    let flip = 0;
    let spin = 0;
    if (p >= 0 && p < 1) {
      const a = easeInOutCubic(p) * Math.PI * 2;
      if (tk.type === "barrel-roll") roll = a;
      else if (tk.type === "front-flip") flip = a;
      else spin = a;
    } else if (t >= tk.next) {
      tk.type = TRICKS[Math.floor(Math.random() * TRICKS.length)];
      tk.t0 = t;
      tk.dur = tk.type === "spin-360" ? 1.4 : 1.0;
      tk.next = t + tk.dur + 4 + Math.random() * 4;
    }
    attitude.current.rotation.set(flip, spin, roll);
  });

  return (
    <group ref={rig}>
      <group ref={attitude}>
        <ScoutModel />
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 6]} intensity={1.8} color="#fff2f0" />
      <pointLight position={[-4, -3, 5]} intensity={14} color="#ff6b5e" />
      <FlightRig />
    </>
  );
}

/**
 * Full-page aerial layer: a fixed, non-interactive canvas above the content
 * where the red scout quad patrols the entire viewport while the visitor scrolls.
 */
export default function ScoutFlyby() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-30">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
