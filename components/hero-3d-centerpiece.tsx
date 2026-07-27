"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Real 3D padel racket + ball — a faithful port of the reference build's
// vanilla Three.js hero (js/hero3d.js): the same oval bezier head outline,
// staggered perforation grid, extruded lime bumper ring (not a torus),
// tapered throat/grip/cap/strap, an orbiting ball, an in-scene canvas-halo
// (not a CSS glow), a faint court-line floor, and the same camera/light
// rig and animation-loop math. The lime-themed 2D SVG remains the fallback
// for the no-WebGL / low-power-device case.

const LIME = "#c6ff3d";
const INK = "#101214";
const RX = 1.16;
const RY = 1.42;

// Oval head outline, tapered toward the throat — same four-bezier shape as
// the reference, reused at two scales for the face plate and the bumper.
function headOutline(rx: number, ry: number) {
  const s = new THREE.Shape();
  s.moveTo(0, ry);
  s.bezierCurveTo(rx * 0.98, ry * 0.96, rx * 1.02, -ry * 0.22, rx * 0.44, -ry * 0.88);
  s.bezierCurveTo(rx * 0.22, -ry * 1.04, -rx * 0.22, -ry * 1.04, -rx * 0.44, -ry * 0.88);
  s.bezierCurveTo(-rx * 1.02, -ry * 0.22, -rx * 0.98, ry * 0.96, 0, ry);
  return s;
}

// Perforated face — holes on a staggered grid, kept only where they sit
// safely inside the outline (ellipse test, inset from the real contour).
function buildFaceGeometry() {
  const shape = headOutline(RX, RY);
  const step = 0.34;
  const holeR = 0.088;

  for (let row = -7; row <= 7; row++) {
    for (let col = -5; col <= 5; col++) {
      const x = col * step + (row % 2 ? step / 2 : 0);
      const y = row * step * 0.86 - 0.08;
      const inside = (x / (RX * 0.7)) ** 2 + ((y + 0.12) / (RY * 0.72)) ** 2 < 1;
      if (!inside) continue;
      const h = new THREE.Path();
      h.absarc(x, y, holeR, 0, Math.PI * 2, true);
      shape.holes.push(h);
    }
  }

  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.11,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 1,
    curveSegments: 8,
  });
}

// Bumper guard — the outline minus a slightly smaller copy of itself, i.e.
// a real extruded ring (not a torus), which is what actually reads as the
// glowing lime rim in the reference.
function buildBumperGeometry() {
  const outer = headOutline(RX, RY);
  const inner = headOutline(RX * 0.9, RY * 0.91);
  outer.holes.push(new THREE.Path(inner.getPoints(64)));

  return new THREE.ExtrudeGeometry(outer, {
    depth: 0.26,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 20,
  });
}

// Court lines on the floor, faded toward the edges via vertex colors.
function buildFloorGeometry() {
  const positions: number[] = [];
  const colors: number[] = [];
  const half = 9;
  const step = 1.5;
  const base = new THREE.Color(LIME);

  const push = (x1: number, z1: number, x2: number, z2: number) => {
    positions.push(x1, 0, z1, x2, 0, z2);
    for (const [x, z] of [
      [x1, z1],
      [x2, z2],
    ]) {
      const d = Math.min(1, Math.hypot(x, z) / half);
      const a = Math.pow(1 - d, 2.2) * 0.55;
      colors.push(base.r * a, base.g * a, base.b * a);
    }
  };

  for (let i = -half; i <= half; i += step) {
    push(-half, i, half, i);
    push(i, -half, i, half);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return geo;
}

function useHaloTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d");
    if (!g) return null;
    // Tight falloff on purpose — a wide, low-alpha gradient additively
    // blended over near-black desaturates into flat grey; a small punchy
    // core reads as a neon glow behind the racket instead.
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0.0, "rgba(198,255,61,0.55)");
    grad.addColorStop(0.18, "rgba(198,255,61,0.2)");
    grad.addColorStop(0.45, "rgba(198,255,61,0.05)");
    grad.addColorStop(1.0, "rgba(198,255,61,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);
}

// Futsal/football — dark ink base with lime pentagon patches, same palette
// language as the racket (INK + LIME) rather than a literal black/white ball.
function useFutsalTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const g = c.getContext("2d");
    if (!g) return null;
    g.fillStyle = INK;
    g.fillRect(0, 0, size, size);
    g.fillStyle = LIME;
    const pentagon = (cx: number, cy: number, r: number) => {
      g.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.closePath();
      g.fill();
    };
    pentagon(size * 0.5, size * 0.32, size * 0.13);
    pentagon(size * 0.22, size * 0.62, size * 0.11);
    pentagon(size * 0.78, size * 0.62, size * 0.11);
    pentagon(size * 0.5, size * 0.88, size * 0.09);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// Pickleball — genuinely perforated in real life, so the texture leans into
// that with a dense dot grid rather than seam lines, pale lime base.
function usePickleballTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const g = c.getContext("2d");
    if (!g) return null;
    g.fillStyle = "#E9FF9A";
    g.fillRect(0, 0, size, size);
    g.fillStyle = "rgba(16,18,20,0.55)";
    const rows = 8;
    const cols = 8;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = ((col + 0.5) / cols) * size;
        const y = ((row + 0.5) / rows) * size;
        g.beginPath();
        g.arc(x, y, size * 0.022, 0, Math.PI * 2);
        g.fill();
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function RacketScene() {
  const { size } = useThree();

  const racketRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const futsalRef = useRef<THREE.Mesh>(null);
  const pickleballRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  const faceGeometry = useMemo(() => buildFaceGeometry(), []);
  const bumperGeometry = useMemo(() => buildBumperGeometry(), []);
  const floorGeometry = useMemo(() => buildFloorGeometry(), []);
  const haloTexture = useHaloTexture();
  const futsalTexture = useFutsalTexture();
  const pickleballTexture = usePickleballTexture();

  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: INK, metalness: 0.45, roughness: 0.38 }),
    []
  );
  const limeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: LIME,
        metalness: 0.2,
        roughness: 0.34,
        emissive: LIME,
        emissiveIntensity: 0.32,
      }),
    []
  );
  const gripMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1c1f22", metalness: 0.1, roughness: 0.85 }),
    []
  );
  const strapMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2e31", roughness: 0.9 }), []);
  const ballMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8ffb0",
        roughness: 0.55,
        metalness: 0.05,
        emissive: LIME,
        emissiveIntensity: 0.22,
      }),
    []
  );
  const futsalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: futsalTexture ?? undefined,
        color: futsalTexture ? "#ffffff" : INK,
        roughness: 0.5,
        metalness: 0.15,
      }),
    [futsalTexture]
  );
  const pickleballMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: pickleballTexture ?? undefined,
        color: pickleballTexture ? "#ffffff" : "#E9FF9A",
        roughness: 0.6,
        metalness: 0.02,
        emissive: LIME,
        emissiveIntensity: 0.12,
      }),
    [pickleballTexture]
  );

  const reducedMotion = useRef(false);
  const finePointer = useRef(false);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const view = useRef({ orbitR: 1.5 });
  const visible = useRef(true);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    finePointer.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer.current || reducedMotion.current) return;

    function handleMove(e: PointerEvent) {
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  // Pause the heavier per-frame math when the hero has scrolled out of view.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const target = document.getElementById("hero-3d-mount");
    if (!target) return;
    const obs = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    }, { threshold: 0.01 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  useFrame((state) => {
    if (!visible.current) return;
    const t = state.clock.getElapsedTime();

    // ---- responsive framing, recomputed each frame from the container size
    const w = size.width || 1;
    const h = size.height || 1;
    const wide = w / h > 1.05;
    const scale = wide ? 0.52 : 0.44;
    const racketX = wide ? 2.5 : 0;
    view.current.orbitR = 2.4 * scale;

    const cam = state.camera as THREE.PerspectiveCamera;
    cam.position.z = wide ? 7.4 : 9.0;
    cam.fov = 38;
    cam.updateProjectionMatrix();

    if (racketRef.current) {
      racketRef.current.scale.setScalar(scale);
      racketRef.current.position.x = racketX;
    }

    if (!reducedMotion.current && finePointer.current) {
      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.045;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.045;
    }
    const p = pointer.current;

    if (racketRef.current) {
      const spin = reducedMotion.current ? 0 : t * 0.34;
      racketRef.current.rotation.y = spin + p.x * 0.42;
      racketRef.current.rotation.x = Math.sin(t * 0.42) * 0.1 + p.y * 0.2;
      racketRef.current.rotation.z = -0.16 + Math.sin(t * 0.3) * 0.05;
      racketRef.current.position.y = 0.55 + Math.sin(t * 0.66) * 0.16;
    }

    if (ballRef.current && racketRef.current) {
      const orbit = t * 0.85;
      const r = view.current.orbitR;
      ballRef.current.position.set(
        racketRef.current.position.x + Math.cos(orbit) * r,
        0.75 + Math.sin(t * 1.15) * 0.38,
        Math.sin(orbit) * r * 0.8
      );
      ballRef.current.scale.setScalar(scale * 1.3);
    }

    // Futsal + pickleball: same orbit/bob formula as the padel ball, offset
    // in phase and radius so all three keep a clean gap between them.
    if (futsalRef.current && racketRef.current) {
      const orbit = t * 0.85 + 2.35;
      const r = view.current.orbitR * 0.86;
      futsalRef.current.position.set(
        racketRef.current.position.x + Math.cos(orbit) * r,
        0.75 + Math.sin(t * 1.15 + 1.4) * 0.38,
        Math.sin(orbit) * r * 0.8
      );
      futsalRef.current.rotation.y = t * 0.5;
      futsalRef.current.rotation.x = t * 0.3;
      futsalRef.current.scale.setScalar(scale * 1.35);
    }
    if (pickleballRef.current && racketRef.current) {
      const orbit = t * 0.85 + 4.5;
      const r = view.current.orbitR * 0.7;
      pickleballRef.current.position.set(
        racketRef.current.position.x + Math.cos(orbit) * r,
        0.75 + Math.sin(t * 1.15 + 2.6) * 0.38,
        Math.sin(orbit) * r * 0.8
      );
      pickleballRef.current.rotation.y = t * 0.7;
      pickleballRef.current.scale.setScalar(scale * 0.95);
    }

    if (haloRef.current && racketRef.current) {
      haloRef.current.position.y = racketRef.current.position.y;
      haloRef.current.position.x = racketRef.current.position.x;
      haloRef.current.scale.setScalar(wide ? 1 : 0.85);
    }

    cam.position.y = 0.5 + Math.sin(t * 0.24) * 0.22 - p.y * 0.25;
    cam.position.x = -p.x * 0.5;
    if (racketRef.current) {
      cam.lookAt(racketRef.current.position.x * 0.55, 0.2, 0);
    }
  });

  return (
    <>
      <group ref={racketRef} position={[0, 0.55, 0]} rotation={[0, 0, -0.16]}>
        <mesh geometry={faceGeometry} material={darkMat} position={[0, 0, 0.07]} />
        <mesh geometry={bumperGeometry} material={limeMat} position={[0, 0, 0]} />
        <mesh position={[0, -RY - 0.2, 0.13]} material={darkMat}>
          <cylinderGeometry args={[0.1, 0.17, 0.55, 12]} />
        </mesh>
        <mesh position={[0, -RY - 1.03, 0.13]} material={gripMat}>
          <cylinderGeometry args={[0.15, 0.135, 1.15, 16]} />
        </mesh>
        <mesh position={[0, -RY - 1.63, 0.13]} material={limeMat}>
          <cylinderGeometry args={[0.17, 0.17, 0.09, 16]} />
        </mesh>
        <mesh position={[0, -RY - 1.72, 0.13]} rotation={[Math.PI / 2.4, 0, 0]} material={strapMat}>
          <torusGeometry args={[0.2, 0.022, 6, 24]} />
        </mesh>
      </group>

      <mesh ref={ballRef} material={ballMat}>
        <sphereGeometry args={[0.23, 24, 16]} />
      </mesh>

      <mesh ref={futsalRef} material={futsalMat}>
        <sphereGeometry args={[0.24, 24, 16]} />
      </mesh>

      <mesh ref={pickleballRef} material={pickleballMat}>
        <sphereGeometry args={[0.2, 24, 16]} />
      </mesh>

      <mesh ref={haloRef} position={[0, 0.4, -2.4]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial
          map={haloTexture ?? undefined}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <lineSegments geometry={floorGeometry} position={[0, -2.55, 0]}>
        <lineBasicMaterial vertexColors transparent opacity={0.85} />
      </lineSegments>

      <hemisphereLight args={["#bfd8ff", "#0a0a0a", 0.5]} />
      <directionalLight color="#ffffff" intensity={1.9} position={[4, 6, 6]} />
      <pointLight color={LIME} intensity={42} distance={18} position={[-4.2, 1.6, 2.6]} />
      <pointLight color="#ff6b1a" intensity={14} distance={16} position={[3.6, -2.4, 3.2]} />
    </>
  );
}

// Basic capability check, mirroring the reference's graceful degradation:
// skip the 3D scene (falling back to the 2D SVG) on missing WebGL, very
// low-power devices, or a metered/slow connection.
function shouldSkip3D(): boolean {
  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return true;
  } catch {
    return true;
  }
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency;
  if (cores && cores < 4) return true;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem && mem < 4) return true;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (conn) {
    if (conn.saveData) return true;
    if (conn.effectiveType && /^(slow-)?2g$/.test(conn.effectiveType)) return true;
  }
  return false;
}

export function Hero3DCenterpiece() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (shouldSkip3D()) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className="absolute right-[12%] top-[18%] h-40 w-40 rounded-full bg-brand-green/10 blur-3xl" />
    );
  }

  return (
    <div id="hero-3d-mount" className="absolute inset-0">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.5, 7.6], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
        style={{ pointerEvents: "none" }}
        onError={() => setFailed(true)}
      >
        <RacketScene />
      </Canvas>
    </div>
  );
}
