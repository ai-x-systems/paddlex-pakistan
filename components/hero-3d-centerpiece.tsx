"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Stylized, low-poly padel racket + ball. Procedural primitives only — no
// external model/texture assets, per the brief's "keep it light" guidance.
function RacketModel() {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse parallax tilt is desktop-only — mobile just auto-rotates, per brief
    // ("no drag dependency" on mobile).
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    function handleMove(e: PointerEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      tilt.current = { x: y * 0.25, y: x * 0.35 };
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!reducedMotion.current) {
      group.current.rotation.y += delta * 0.35;
    }
    group.current.rotation.x += (tilt.current.x - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (-tilt.current.y * 0.3 - group.current.rotation.z) * 0.05;
  });

  return (
    <group ref={group}>
      {/* paddle face */}
      <mesh position={[0, 0.6, 0]} scale={[1, 1.25, 0.12]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#0f0f10"
          emissive="#C8FF00"
          emissiveIntensity={0.35}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      {/* glowing rim outline */}
      <mesh position={[0, 0.6, 0]} scale={[1.04, 1.29, 0.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#C8FF00" wireframe transparent opacity={0.5} />
      </mesh>
      {/* handle */}
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.9, 16]} />
        <meshStandardMaterial color="#1a1a1d" roughness={0.5} />
      </mesh>
      {/* ball */}
      <mesh position={[1.15, 1.1, 0.3]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#C8FF00" emissive="#C8FF00" emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function Hero3DCenterpiece() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Basic WebGL support check — if it's missing, don't even try to mount
    // the canvas. Parent (hero.tsx) handles the actual visual fallback.
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setFailed(true);
    } catch {
      setFailed(true);
    }
  }, []);

  if (failed) return null;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      onError={() => setFailed(true)}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 4]} intensity={1.2} color="#C8FF00" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#4C82FF" />
      <RacketModel />
    </Canvas>
  );
}
