"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroRacketBall } from "@/components/hero-racket-ball";

// Perforation dot layout (normalized -0.5..0.5 offsets from center) reused
// for the canvas texture painted onto the paddle face.
const holes: Array<[number, number]> = [
  [-0.18, -0.34], [0, -0.37], [0.18, -0.34],
  [-0.3, -0.22], [-0.1, -0.24], [0.1, -0.24], [0.3, -0.22],
  [-0.34, -0.05], [-0.14, -0.06], [0.06, -0.06], [0.26, -0.05],
  [-0.3, 0.12], [-0.1, 0.13], [0.1, 0.13], [0.3, 0.12],
  [-0.18, 0.27], [0, 0.29], [0.18, 0.27],
];

// Procedurally paints a golden/tan, perforated racket-face texture onto a
// canvas so the paddle reads as a real racket instead of a flat color blob.
function useRacketTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, size, size);

    const grad = ctx.createRadialGradient(
      size * 0.36, size * 0.3, size * 0.05,
      size * 0.5, size * 0.5, size * 0.58
    );
    grad.addColorStop(0, "#F5E37A");
    grad.addColorStop(0.5, "#D9B23C");
    grad.addColorStop(1, "#8A6A1A");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(size / 2, size / 2, size * 0.46, size * 0.46, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = size * 0.018;
    ctx.strokeStyle = "#FFE9A8";
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.ellipse(size / 2, size / 2, size * 0.44, size * 0.44, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(25,18,6,0.85)";
    holes.forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(size / 2 + dx * size, size / 2 + dy * size, size * 0.028, 0, Math.PI * 2);
      ctx.fill();
    });

    const sheen = ctx.createLinearGradient(size * 0.22, size * 0.08, size * 0.52, size * 0.42);
    sheen.addColorStop(0, "rgba(255,255,255,0.55)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.beginPath();
    ctx.ellipse(size * 0.34, size * 0.27, size * 0.17, size * 0.1, -0.4, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function RacketModel() {
  const group = useRef<THREE.Group>(null);
  const ball = useRef<THREE.Mesh>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);
  const texture = useRacketTexture();

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

  useFrame(({ clock }, delta) => {
    if (group.current) {
      if (!reducedMotion.current) {
        group.current.rotation.y += delta * 0.35;
      }
      group.current.rotation.x += (tilt.current.x - group.current.rotation.x) * 0.05;
      group.current.rotation.z += (-tilt.current.y * 0.3 - group.current.rotation.z) * 0.05;
    }
    // Ball orbits the racket independently — a real moving path, not just
    // spinning in place along with the paddle's own rotation.
    if (ball.current && !reducedMotion.current) {
      const t = clock.getElapsedTime() * 0.8;
      ball.current.position.x = Math.cos(t) * 1.5;
      ball.current.position.y = 0.6 + Math.sin(t) * 1.3;
      ball.current.position.z = Math.sin(t * 0.6) * 0.6;
    }
  });

  return (
    <group>
      <group ref={group}>
        {/* paddle face — textured with the golden/tan perforated canvas map */}
        <mesh position={[0, 0.6, 0]} scale={[1, 1.25, 0.12]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            map={texture ?? undefined}
            color={texture ? "#ffffff" : "#D9B23C"}
            roughness={0.4}
            metalness={0.18}
          />
        </mesh>
        {/* handle — warm wood-tone grip instead of flat black */}
        <mesh position={[0, -0.95, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.9, 16]} />
          <meshStandardMaterial color="#6b4a24" roughness={0.55} />
        </mesh>
      </group>
      {/* ball — orbits the racket on its own path, outside the paddle's group
          so its motion isn't rigidly tied to the paddle's rotation */}
      <mesh ref={ball} position={[1.15, 1.1, 0.3]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#D6FF4D" emissive="#9ACD00" emissiveIntensity={0.4} roughness={0.3} />
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

  if (failed) return <HeroRacketBall />;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      onError={() => setFailed(true)}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={1.2} color="#FFE9A8" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#C8FF00" />
      <RacketModel />
    </Canvas>
  );
}
