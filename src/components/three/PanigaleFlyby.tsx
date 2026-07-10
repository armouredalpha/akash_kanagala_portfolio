"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// rosso corsa livery — gloss red fairings, carbon dark internals, white plate
const FAIRING = "#e10600";
const FAIRING_DARK = "#8f0500";
const CARBON = "#1c0d0e";
const TYRE = "#171012";

function Wheel({ position, radius = 0.34 }: { position: [number, number, number]; radius?: number }) {
  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.z -= delta * 26;
  });
  return (
    <group position={position}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, 0.085, 12, 28]} />
          <meshStandardMaterial color={TYRE} metalness={0.2} roughness={0.85} />
        </mesh>
        {/* five-spoke wheel */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
            <boxGeometry args={[0.05, radius * 1.7, 0.04]} />
            <meshStandardMaterial color={FAIRING_DARK} metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>
      {/* brake disc */}
      <mesh position={[0, 0, 0.06]}>
        <cylinderGeometry args={[radius * 0.55, radius * 0.55, 0.012, 24]} />
        <meshStandardMaterial color="#5a5a5e" metalness={0.9} roughness={0.35} />
      </mesh>
    </group>
  );
}

/** Stylized Panigale V4 — pure model, nose facing +x; motion lives in the rig. */
function PanigaleModel() {
  return (
    <group>
      {/* wheels */}
      <Wheel position={[0.72, 0, 0]} radius={0.3} />
      <Wheel position={[-0.7, 0, 0]} radius={0.3} />

      {/* main fairing — long, low, nose-down stance */}
      <mesh position={[0.04, 0.34, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[1.26, 0.22, 0.24]} />
        <meshStandardMaterial color={FAIRING} metalness={0.25} roughness={0.45} />
      </mesh>
      {/* tank hump */}
      <mesh position={[-0.04, 0.5, 0]} rotation={[0, 0, -0.14]}>
        <boxGeometry args={[0.42, 0.15, 0.2]} />
        <meshStandardMaterial color={FAIRING} metalness={0.25} roughness={0.45} />
      </mesh>
      {/* nose cone — Panigale beak, tucked to the fairing */}
      <mesh position={[0.66, 0.4, 0]} rotation={[0, 0, -Math.PI / 2 - 0.22]}>
        <coneGeometry args={[0.13, 0.42, 4]} />
        <meshStandardMaterial color={FAIRING} metalness={0.25} roughness={0.45} />
      </mesh>
      {/* winglets */}
      {([-0.14, 0.14] as const).map((z) => (
        <mesh key={z} position={[0.52, 0.32, z]} rotation={[0, 0, -0.12]}>
          <boxGeometry args={[0.18, 0.016, 0.09]} />
          <meshStandardMaterial color={FAIRING_DARK} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* windscreen */}
      <mesh position={[0.36, 0.55, 0]} rotation={[0, 0, -0.55]}>
        <boxGeometry args={[0.17, 0.11, 0.16]} />
        <meshStandardMaterial color="#3a2a2c" metalness={0.4} roughness={0.15} transparent opacity={0.7} />
      </mesh>
      {/* tail — kicked up, with white number plate */}
      <mesh position={[-0.52, 0.5, 0]} rotation={[0, 0, 0.26]}>
        <boxGeometry args={[0.42, 0.12, 0.17]} />
        <meshStandardMaterial color={FAIRING} metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh position={[-0.68, 0.55, 0]} rotation={[0, 0, 0.26]}>
        <boxGeometry args={[0.13, 0.1, 0.19]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* belly pan closing the gap to the wheels */}
      <mesh position={[0.04, 0.18, 0]}>
        <boxGeometry args={[0.86, 0.16, 0.2]} />
        <meshStandardMaterial color={CARBON} metalness={0.85} roughness={0.3} />
      </mesh>
      {/* V4 engine block hint */}
      <mesh position={[0.06, 0.26, 0]}>
        <boxGeometry args={[0.4, 0.16, 0.26]} />
        <meshStandardMaterial color={CARBON} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* front forks reaching the axle */}
      {([-0.08, 0.08] as const).map((z) => (
        <mesh key={z} position={[0.68, 0.2, z]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.44, 8]} />
          <meshStandardMaterial color="#b8a37a" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
      {/* swingarm to the rear axle */}
      <mesh position={[-0.38, 0.08, 0.04]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.58, 0.06, 0.045]} />
        <meshStandardMaterial color={CARBON} metalness={0.85} roughness={0.3} />
      </mesh>
      {/* underseat twin exhausts */}
      {([-0.05, 0.05] as const).map((z) => (
        <mesh key={z} position={[-0.74, 0.42, z]} rotation={[0, 0, Math.PI / 2 - 0.24]}>
          <cylinderGeometry args={[0.03, 0.04, 0.2, 10]} />
          <meshStandardMaterial color="#6e6e72" metalness={0.95} roughness={0.2} />
        </mesh>
      ))}
      {/* headlight + taillight */}
      <mesh position={[0.84, 0.38, 0]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color="#fff" emissive={new THREE.Color("#ffffff")} emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[-0.78, 0.52, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial color="#e10600" emissive={new THREE.Color("#ff2d1e")} emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

const PERIOD = 8; // seconds between passes
const CROSS = 3; // seconds on screen
const LEAD = 0.8; // pause before the first launch each cycle

const easeInOutQuad = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

/**
 * Sprint rig: every few seconds the Panigale tears across the bottom of the
 * viewport — alternating direction, small launch wheelie, lean into the exit.
 * Off-pass it waits out of frame.
 */
function SprintRig() {
  const rig = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!rig.current) return;
    if (process.env.NEXT_PUBLIC_BIKE_PARK === "1") {
      rig.current.position.set(0, -1.4, 0);
      rig.current.rotation.set(0, 0, 0);
      return;
    }
    const t = state.clock.elapsedTime;
    const local = t % PERIOD;
    const pass = Math.floor(t / PERIOD);
    const dir = pass % 2 === 0 ? 1 : -1; // alternate left→right / right→left
    const hw = viewport.width / 2;
    const yBase = -viewport.height / 2 + 1.1;

    if (local < LEAD || local > LEAD + CROSS) {
      rig.current.position.set(9999, yBase, 0);
      return;
    }

    const p = easeInOutQuad((local - LEAD) / CROSS);
    const x = THREE.MathUtils.lerp(-hw - 2.2, hw + 2.2, p) * dir;

    // launch wheelie in the first quarter, settling after
    const wheelie = Math.max(0, Math.sin(Math.min(1, p * 4) * Math.PI)) * 0.3;
    // slight forward lean mid-pass
    const lean = Math.sin(p * Math.PI) * 0.06;

    rig.current.position.set(x, yBase + wheelie * 0.18, 0);
    rig.current.rotation.set(0, dir === 1 ? 0 : Math.PI, (wheelie - lean) * dir);
  });

  return (
    <group ref={rig} scale={0.72}>
      <PanigaleModel />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 8, 6]} intensity={1.6} color="#fff6f4" />
      <pointLight position={[-4, -3, 5]} intensity={8} color="#ff5c4d" />
      <SprintRig />
    </>
  );
}

/**
 * Full-page track layer: a fixed, non-interactive canvas where the Panigale V4
 * sprints across the lower band of the viewport between the scout's patrols.
 */
export default function PanigaleFlyby() {
  return (
    <div aria-hidden className="fixed inset-0 pointer-events-none z-20">
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
