import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLocation } from "react-router-dom";
import { Torus, Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";

// Suppress internal R3F / Three.js THREE.Clock deprecation warning
if (typeof window !== "undefined" && !window.__THREE_CLOCK_WARNED__) {
  window.__THREE_CLOCK_WARNED__ = true;
  const origWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
      return;
    }
    origWarn.apply(console, args);
  };
}

const themeColors = {
  cyberpunk: {
    primary: "#8b5cf6",
    secondary: "#06b6d4",
    accent: "#ec4899",
    emissive: "#4c1d95"
  },
  matrix: {
    primary: "#10b981",
    secondary: "#14b8a6",
    accent: "#84cc16",
    emissive: "#064e3b"
  },
  sunset: {
    primary: "#f97316",
    secondary: "#ef4444",
    accent: "#eab308",
    emissive: "#7c2d12"
  }
};

// Deterministic pseudo-random for stable chip placement across renders
const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const SatelliteOrbit = ({ radius, tilt, color, size, phase, orbitRef }) => (
  <group rotation={tilt}>
    <group ref={orbitRef}>
      <mesh position={[Math.cos(phase) * radius, Math.sin(phase) * radius, 0]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.2} />
      </mesh>
    </group>
  </group>
);

const DataChips = ({ colors, isMobile }) => {
  const chips = useMemo(() => {
    const rand = mulberry32(7);
    const palette = [colors.primary, colors.secondary, colors.accent];
    return Array.from({ length: isMobile ? 4 : 6 }, (_, i) => {
      const angle = rand() * Math.PI * 2;
      const radius = 1.9 + rand() * 0.5;
      return {
        id: i,
        position: [Math.cos(angle) * radius, (rand() * 2 - 1) * 1.3, Math.sin(angle) * radius],
        size: 0.05 + rand() * 0.05,
        color: palette[i % 3],
        isWire: i % 3 === 0,
        speed: 1 + rand() * 1.5
      };
    });
  }, [colors, isMobile]);

  return (
    <>
      {chips.map((chip) => (
        <Float key={chip.id} speed={chip.speed} rotationIntensity={0.8} floatIntensity={1}>
          <mesh position={chip.position} scale={chip.size}>
            {chip.isWire ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <boxGeometry args={[1, 1, 1]} />
            )}
            <meshStandardMaterial
              color={chip.color}
              emissive={chip.color}
              emissiveIntensity={0.6}
              wireframe={chip.isWire}
              transparent
              opacity={0.75}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const HologramScene = ({ colors, isMobile, variant = "home" }) => {
  const sceneRef = useRef();
  const shellRef = useRef();
  const ringRefs = useRef([]);
  const orbitRefs = useRef([]);

  useFrame((_, delta) => {
    if (sceneRef.current) sceneRef.current.rotation.y += delta * 0.05;

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.5;
      shellRef.current.rotation.x += delta * 0.15;
    }

    ringRefs.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += delta * (0.08 + i * 0.045) * (i % 2 === 0 ? 1 : -1);
    });

    orbitRefs.current.forEach((orbit, i) => {
      if (orbit) orbit.rotation.y += delta * (0.7 - i * 0.15);
    });
  });

  const isAdmin = variant === "admin";

  let scale;
  let offsetY;
  if (isAdmin) {
    scale = isMobile ? 0.9 : 1.3;
    offsetY = 0;
  } else {
    scale = isMobile ? 1.2 : 2.3;
    offsetY = isMobile ? 1.6 : 0.2;
  }
  const offsetX = 0;

  return (
    <group ref={sceneRef} position={[offsetX, offsetY, 0]} scale={scale}>
      <group>
        {/* Central Core Light — lights the satellites from inside */}
        <pointLight position={[0, 0, 0]} intensity={3} distance={6} color={colors.primary} />

        {/* Holo Pedestal — dim grounding base */}
        <group position={[0, -1.15, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.0, isMobile ? 32 : 48]} />
            <meshBasicMaterial color={colors.primary} transparent opacity={0.07} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
          <Torus args={[1.05, 0.015, 8, isMobile ? 40 : 64]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={colors.primary} emissive={colors.emissive} emissiveIntensity={0.4} wireframe transparent opacity={0.35} />
          </Torus>
          <Torus args={[1.3, 0.01, 8, isMobile ? 40 : 64]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={0.25} wireframe transparent opacity={0.2} />
          </Torus>
        </group>

        {/* Refined Rings — tight, tilted, low glow */}
        <Torus ref={(el) => (ringRefs.current[0] = el)} args={[1.2, 0.018, 8, isMobile ? 48 : 80]} rotation={[1.15, 0.35, 0]}>
          <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={0.3} wireframe transparent opacity={0.4} />
        </Torus>
        <Torus ref={(el) => (ringRefs.current[1] = el)} args={[1.45, 0.015, 8, isMobile ? 48 : 80]} rotation={[0.75, -0.6, 0.2]}>
          <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={0.3} wireframe transparent opacity={0.3} />
        </Torus>
        <Torus ref={(el) => (ringRefs.current[2] = el)} args={[1.7, 0.012, 8, isMobile ? 48 : 80]} rotation={[1.5, 0.9, 0.4]}>
          <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.25} wireframe transparent opacity={0.22} />
        </Torus>

        {/* Tech Satellites — atom-style orbiters */}
        <SatelliteOrbit orbitRef={(el) => (orbitRefs.current[0] = el)} radius={1.3} tilt={[1.1, 0.3, 0]} color={colors.secondary} size={0.07} phase={0} />
        <SatelliteOrbit orbitRef={(el) => (orbitRefs.current[1] = el)} radius={1.55} tilt={[0.8, -0.5, 0.3]} color={colors.primary} size={0.06} phase={Math.PI} />
        <SatelliteOrbit orbitRef={(el) => (orbitRefs.current[2] = el)} radius={1.8} tilt={[1.4, 0.6, 0.1]} color={colors.accent} size={0.08} phase={Math.PI / 2} />

        {/* Inner Wireframe Shell — counter-rotating */}
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.6} wireframe transparent opacity={0.45} />
        </mesh>

        {/* Central Hologram Core — brightest focal point */}
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.5}>
          <mesh>
            <icosahedronGeometry args={[0.55, 4]} />
            <MeshDistortMaterial
              color={colors.primary}
              emissive={colors.primary}
              emissiveIntensity={1.0}
              roughness={0.15}
              metalness={0.35}
              distort={isMobile ? 0.12 : 0.3}
              speed={isMobile ? 1 : 2}
            />
          </mesh>
        </Float>

        {/* Floating Data Chips */}
        <DataChips colors={colors} isMobile={isMobile} />

        {/* Scene Particles */}
        <Sparkles count={isMobile ? 20 : 50} scale={4} size={2.5} speed={0.35} opacity={0.55} color={colors.primary} />
        <Sparkles count={isMobile ? 10 : 30} scale={5} size={3} speed={0.5} opacity={0.35} color={colors.secondary} />
      </group>
    </group>
  );
};

export default function Hero3D({ theme = "cyberpunk" }) {
  const colors = useMemo(() => {
    return themeColors[theme] || themeColors.cyberpunk;
  }, [theme]);

  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [bgOpacity, setBgOpacity] = useState(0.8);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Show the model only near the top of the page (hero), fade out on scroll
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      const progress = window.scrollY / (vh * 1.1);
      setBgOpacity(Math.max(0, 0.8 * (1 - Math.min(1, Math.max(0, progress)))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: bgOpacity, transition: "opacity 0.5s ease" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={4} color={colors.accent} />
        <spotLight position={[0, 15, 10]} intensity={3} color={colors.primary} penumbra={1} />

        <HologramScene colors={colors} isMobile={isMobile} variant={isAdminPage ? "admin" : "home"} />

        {/* Global Ambient Background Particles */}
        <Sparkles count={isMobile ? 25 : 60} scale={18} size={2} speed={0.2} opacity={0.4} color={colors.primary} />
        <Sparkles count={isMobile ? 15 : 40} scale={15} size={3} speed={0.3} opacity={0.3} color={colors.secondary} />
      </Canvas>
    </div>
  );
}
