"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HeroRacketBall } from "@/components/hero-racket-ball";

// Real 3D padel racket + ball, with the lime-themed 2D graphic as a fallback
// for the brief WebGL-unsupported case.
//
// Unlike the earlier version (flat circle + dots painted on a texture), the
// perforation holes here are genuine geometry — cut directly into the face
// shape via THREE.Shape holes and extruded, so they have real depth, catch
// light, and show a shadowed backing plate through them like the reference.
//
// The racket and the ball each spin continuously on their own axis. They
// are siblings (not nested), so the ball spins in place next to the racket
// instead of orbiting around it as the racket turns.

// Hole layout in the face's local unit-circle space (radius ~1, before the
// [1, 1.24, 1] oval scale is applied) — five staggered rows, matching the
// reference's perforation pattern.
const HOLES: Array<[number, number, number]> = [
  [-0.22, 0.42, 0.062], [0, 0.47, 0.066], [0.22, 0.42, 0.062],
  [-0.4, 0.22, 0.065], [-0.14, 0.24, 0.07], [0.14, 0.24, 0.07], [0.4, 0.22, 0.065],
  [-0.46, -0.02, 0.063], [-0.17, -0.04, 0.07], [0.17, -0.04, 0.07], [0.46, -0.02, 0.063],
  [-0.4, -0.26, 0.063], [-0.14, -0.27, 0.068], [0.14, -0.27, 0.068], [0.4, -0.26, 0.063],
  [-0.22, -0.48, 0.058], [0, -0.52, 0.063], [0.22, -0.48, 0.058],
];

function useFaceGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    const outerSegs = 64;
    for (let i = 0; i <= outerSegs; i++) {
      const theta = (i / outerSegs) * Math.PI * 2;
      const x = Math.cos(theta);
      const y = Math.sin(theta);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    HOLES.forEach(([hx, hy, hr]) => {
      const hole = new THREE.Path();
      const holeSegs = 20;
      for (let j = 0; j <= holeSegs; j++) {
        const t = (j / holeSegs) * Math.PI * 2;
        const x = hx + Math.cos(t) * hr;
        const y = hy + Math.sin(t) * hr;
        if (j === 0) hole.moveTo(x, y);
        else hole.lineTo(x, y);
      }
      shape.holes.push(hole);
    });

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.016,
      bevelSegments: 4,
      curveSegments: 48,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);
}

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
      size * 0.4, size * 0.32, size * 0.04,
      size * 0.5, size * 0.5, size * 0.56
    );
    grad.addColorStop(0, "#a3823f");
    grad.addColorStop(0.4, "#8a6a2f");
    grad.addColorStop(0.75, "#664d20");
    grad.addColorStop(1, "#3d2c14");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const sheen = ctx.createRadialGradient(
      size * 0.32, size * 0.24, 0,
      size * 0.32, size * 0.24, size * 0.3
    );
    sheen.addColorStop(0, "rgba(255,255,255,0.32)");
    sheen.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function useBackingTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(
      size * 0.5, size * 0.5, 0,
      size * 0.5, size * 0.5, size * 0.5
    );
    grad.addColorStop(0, "#0d0a05");
    grad.addColorStop(1, "#050403");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
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

  const faceGeometry = useFaceGeometry();
  const faceTexture = useFaceTexture();
  const backingTexture = useBackingTexture();
  const ballTexture = useBallTexture();
  const handleTexture = useHandleTexture();

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((state, delta) => {
    if (outer.current) {
      const t = state.clock.elapsedTime;
      outer.current.position.y = Math.sin(t * 1.3) * 0.05;
    }
    if (!reducedMotion.current) {
      if (racketRef.current) {
        racketRef.current.rotation.y += delta * 0.6;
      }
      if (ballRef.current) {
        ballRef.current.rotation.y += delta * 1.6;
        ballRef.current.rotation.x += delta * 0.9;
      }
    }
  });

  return (
    <group ref={outer}>
      <group ref={racketRef}>
        {/* dark backing plate, visible through the perforation holes */}
        <mesh position={[0, 0.6, -0.02]} scale={[1, 1.24, 1]}>
          <circleGeometry args={[1.02, 48]} />
          <meshStandardMaterial map={backingTexture ?? undefined} color={backingTexture ? "#ffffff" : "#0a0704"} roughness={0.9} />
        </mesh>

        {/* paddle face — real extruded geometry with genuine cut-through holes */}
        <mesh geometry={faceGeometry} position={[0, 0.6, 0.05]} scale={[1, 1.24, 1]}>
          <meshPhysicalMaterial
            map={faceTexture ?? undefined}
            color={faceTexture ? "#ffffff" : "#6b5430"}
            roughness={0.4}
            metalness={0.08}
            clearcoat={0.45}
            clearcoatRoughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* glowing cream-yellow rim */}
        <mesh position={[0, 0.6, 0.05]} scale={[1, 1.24, 1]}>
          <torusGeometry args={[1, 0.055, 20, 72]} />
          <meshPhysicalMaterial
            color="#F5FFB0"
            emissive="#C8FF00"
            emissiveIntensity={0.55}
            roughness={0.25}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* tapered handle */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.078, 0.1, 1.0, 24, 1]} />
          <meshPhysicalMaterial
            map={handleTexture ?? undefined}
            color={handleTexture ? "#ffffff" : "#9ab35a"}
            roughness={0.5}
            clearcoat={0.3}
            clearcoatRoughness={0.3}
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
        <meshPhysicalMaterial
          map={ballTexture ?? undefined}
          color={ballTexture ? "#ffffff" : "#f0f0f0"}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
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
      camera={{ position: [0, 0.2, 8.6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      onError={() => setFailed(true)}
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 4]} intensity={1} color="#E9FF66" />
      <pointLight position={[-3, -2, 3]} intensity={0.35} color="#C8FF00" />
      {/* neutral front fill so the face/handle textures read their real
          color instead of being washed dark by the colored rim lights alone */}
      <pointLight position={[0, 0.5, 6]} intensity={0.55} color="#ffffff" />
      <RacketModel />
    </Canvas>
  );
}
