"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const RED = new THREE.Color("#e10600");
const INK = new THREE.Color("#231518");

function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pointer;
}

/** Dolly-in on load, then subtle parallax that follows the cursor. */
function CameraRig({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const target = useMemo(() => new THREE.Vector3(0, 0.55, 0), []);
  useFrame((state, delta) => {
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 8.2, 1.4, delta);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.current.x * 0.55, 2.2, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 1.15 + pointer.current.y * 0.3, 2.2, delta);
    cam.lookAt(target);
  });
  return null;
}

/** Wireframe planet with slow satellite orbits — stage-right, deep background. */
function DigitalEarth() {
  const globe = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (globe.current) globe.current.rotation.y = state.clock.elapsedTime * 0.06;
  });
  return (
    <group position={[4.6, 1.9, -5.5]}>
      <group ref={globe}>
        <mesh>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshBasicMaterial color={RED} wireframe transparent opacity={0.14} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.88} />
        </mesh>
      </group>
      <OrbitRing radius={2.2} tilt={1.35} speed={0.3} color="#e10600" />
      <OrbitRing radius={2.75} tilt={1.05} speed={-0.18} color="#8f7d7b" />
    </group>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <group ref={ref} rotation={[tilt, 0, 0.25]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 6, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <boxGeometry args={[0.07, 0.03, 0.05]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/** Sparse graph of pulsing nodes and edges — stage-left, reads as a live ROS graph. */
function NeuralGraph() {
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);

  const { nodes, linePositions } = useMemo(() => {
    const rng = (seed: number) => {
      // deterministic layout so SSR/CSR agree and it never pops
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(42);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 26; i++) {
      pts.push(
        new THREE.Vector3(
          (rand() - 0.5) * 3.2,
          (rand() - 0.5) * 2.6,
          (rand() - 0.5) * 1.8
        )
      );
    }
    const segs: number[] = [];
    pts.forEach((p, i) => {
      // connect to two nearest neighbours
      const dists = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      dists.forEach(({ j }) => {
        segs.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z);
      });
    });
    return { nodes: pts, linePositions: new Float32Array(segs) };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.04;
      group.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    }
    if (lineMat.current) {
      lineMat.current.opacity = 0.08 + (Math.sin(t * 1.4) + 1) * 0.04;
    }
  });

  return (
    <group ref={group} position={[-5.6, 2.3, -5.5]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMat} color={INK} transparent opacity={0.18} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial color={i % 5 === 0 ? "#e10600" : "#a18f8d"} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/** Slow drifting dust motes filling the volume. */
function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // deterministic LCG so render stays pure and layout is stable
    let s = 1337;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const count = 420;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 24;
      arr[i * 3 + 1] = rand() * 9 - 1;
      arr[i * 3 + 2] = (rand() - 0.5) * 16 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#c26a62"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Tiny world-axes triad anchored near the floor — a quiet HUD nod. */
function AxisTriad() {
  const axes: { dir: [number, number, number]; color: string }[] = [
    { dir: [0.5, 0, 0], color: "#e10600" },
    { dir: [0, 0.5, 0], color: "#231518" },
    { dir: [0, 0, 0.5], color: "#8f7d7b" },
  ];
  return (
    <group position={[-3.1, 0.02, 1.6]}>
      {axes.map(({ dir, color }, i) => {
        const v = new THREE.Vector3(...dir);
        const mid = v.clone().multiplyScalar(0.5);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          v.clone().normalize()
        );
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.008, 0.008, 0.5, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  const pointer = useWindowPointer();
  return (
    <>
      <fog attach="fog" args={["#f9f6f4", 9, 22]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 8, 5]} intensity={1.4} color="#fff6f4" />
      <pointLight position={[-5, 3, 2]} intensity={6} color="#ff3b2a" />

      <CameraRig pointer={pointer} />

      <DigitalEarth />
      <NeuralGraph />
      <Dust />
      <AxisTriad />

      <Grid
        position={[0, -0.4, 0]}
        args={[40, 40]}
        cellSize={0.7}
        cellThickness={0.4}
        cellColor="#eedcd8"
        sectionSize={3.5}
        sectionThickness={0.8}
        sectionColor="#dfb1a9"
        fadeDistance={22}
        fadeStrength={2}
        infiniteGrid
      />
    </>
  );
}

/** Full-bleed hero environment: a dark race-control room the camera
 *  dollies into after boot. The scout quad itself lives in ScoutFlyby,
 *  which patrols the whole page. Non-interactive layer behind the hero copy. */
export default function ControlRoom() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 1.6, 13.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
