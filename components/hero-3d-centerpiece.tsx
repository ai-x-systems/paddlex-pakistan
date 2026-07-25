"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroRacketBall } from "@/components/hero-racket-ball";

// Real 3D padel racket + ball, with the lime-themed 2D graphic as a fallback
// for the brief WebGL-unsupported case. Colors and pattern are drawn onto
// canvas textures at runtime (no external image assets) to get the warm
// brown perforated face, glowing cream-yellow rim, tan-to-green tapered
// handle — lit and in 3D.
//
// The racket and the ball each spin continuously on their own axis. They
// are siblings (not nested), so the ball spins in place next to the racket
// instead of orbiting around it as the racket turns.

function useFaceTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(
      size * 0.4,
      size * 0.32,
      size * 0.04,
      size * 0.5,
      size * 0.5,
      size * 0.56
    );
    grad.addColorStop(0, "#6b5a34");
    grad.addColorStop(0.55, "#4a3c22");
    grad.addColorStop(1, "#2a2113");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // perforation holes — five staggered rows, matching the SVG reference
    ctx.fillStyle = "#100c06";
    const rows: number[][] = [
      [-0.16, -0.055, 0.055, 0.16],
      [-0.24, -0.08, 0.08, 0.24],
      [-0.26, -0.09, 0, 0.09, 0.26],
      [-0.24, -0.08, 0.08, 0.24],
      [-0.16, -0.055, 0.055, 0.16],
    ];
    rows.forEach((row, ri) => {
      const cy = size * (0.26 + ri * 0.115);
      row.forEach((rx) => {
        ctx.beginPath();
        ctx.arc(size / 2 + rx * size, cy, size * 0.026, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // soft sheen highlight, top-left
    const sheen = ctx.createRadialGradient(
      size * 0.32,
      size * 0.24,
      0,
      size * 0.32,
      size * 0.24,
      size * 0.28
    );
    sheen.addColorStop(0, "rgba(255,255,255,0.22)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function useBallTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(10,10,10,0.3)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(size * 0.5, size * 0.32, size * 0.46, size * 0.14, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(size * 0.5, size * 0.7, size * 0.46, size * 0.14, 0, 0, Math.PI * 2);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function useHandleTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const w = 64;
    const h = 256;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#EDE2A6");
    grad.addColorStop(0.5, "#C8D96C");
    grad.addColorStop(1, "#6F9A34");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // bright edge highlight + dark shadow edge for a cylindrical read
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(w * 0.12, 0, w * 0.1, h);
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(w * 0.8, 0, w * 0.1, h);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function RacketModel() {
  const outer = useRef<THREE.Group>(null);
  const racketRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useRef(false);

  const faceTexture = useFaceTexture();
  const ballTexture = useBallTexture();
  const handleTexture = useHandleTexture();

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    if (outer.current) {
      // gentle idle bob for the whole composition
      const t = state.clock.elapsedTime;
      outer.current.position.y = Math.sin(t * 1.3) * 0.05;
    }
    if (!reducedMotion.current) {
      // racket spins fully in place, on its own axis
      if (racketRef.current) {
        racketRef.current.rotation.y += delta * 0.6;
      }
      // ball spins fully in place, on its own separate axis — a sibling of
      // the racket, so it never orbits around it
      if (ballRef.current) {
        ballRef.current.rotation.y += delta * 1.6;
        ballRef.current.rotation.x += delta * 0.9;
      }
    }
  });

  return (
    <group ref={outer}>
      <group ref={racketRef}>
        {/* paddle face */}
        <mesh position={[0, 0.6, 0.05]} scale={[1, 1.24, 1]}>
          <circleGeometry args={[1, 48]} />
          <meshStandardMaterial
            map={faceTexture ?? undefined}
            color={faceTexture ? "#ffffff" : "#3a2f1c"}
            roughness={0.5}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* glowing cream-yellow rim */}
        <mesh position={[0, 0.6, 0.05]} scale={[1, 1.24, 1]}>
          <torusGeometry args={[1, 0.05, 16, 64]} />
          <meshStandardMaterial
            color="#E9FF66"
            emissive="#C8FF00"
            emissiveIntensity={0.85}
            roughness={0.3}
          />
        </mesh>
        {/* tapered handle */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.082, 0.1, 1.0, 20, 1]} />
          <meshStandardMaterial
            map={handleTexture ?? undefined}
            color={handleTexture ? "#ffffff" : "#9ab35a"}
            roughness={0.55}
          />
        </mesh>
        {/* dark grip cap */}
        <mesh position={[0, -1.24, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#232316" roughness={0.6} />
        </mesh>
      </group>

      {/* ball — sibling of the racket group, spins in place beside it */}
      <mesh ref={ballRef} position={[1.3, 1.15, 0.35]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          map={ballTexture ?? undefined}
          color={ballTexture ? "#ffffff" : "#f0f0f0"}
          roughness={0.35}
        />
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
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      onError={() => setFailed(true)}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 4]} intensity={1.1} color="#E9FF66" />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#C8FF00" />
      <RacketModel />
    </Canvas>
  );
}
