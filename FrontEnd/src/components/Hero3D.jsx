import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Torus, Icosahedron, Box, Cone, Float, Sparkles } from "@react-three/drei";

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

const FloatingElements = ({ colors }) => {
  const groupRef = useRef();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const speed = 0.4 + index * 0.08;
        const offset = index * 8;
        child.position.z = Math.sin(t * speed + offset) * 1.5;
        child.position.x = Math.cos(t * (speed * 0.7) + offset) * 0.8;
        child.position.y = Math.sin(t * (speed * 1.1) + offset) * 0.8;

        child.rotation.x = t * (0.15 + index * 0.05);
        child.rotation.y = t * (0.1 + index * 0.05);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Box */}
      <Box args={[0.2, 0.2, 0.2]}>
        <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={1} roughness={0.2} />
      </Box>
      {/* 3D Icosahedron */}
      <Icosahedron args={[0.16, 0]}>
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1.5} wireframe />
      </Icosahedron>
      {/* 3D Cone */}
      <Cone args={[0.12, 0.24, 4]}>
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={1} />
      </Cone>
      {/* 3D Small Torus */}
      <Torus args={[0.13, 0.03, 12, 24]}>
        <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={1.2} />
      </Torus>
    </group>
  );
};

const HolographicPortal = ({ colors, isMobile }) => {
  const outerRingRef = useRef();
  const midRingRef = useRef();
  const innerRingRef = useRef();
  const timeRef = useRef(0);
  const { viewport } = useThree();
  const isDesktop = viewport.width > 7;

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = t * 0.3;
      innerRingRef.current.rotation.z = t * 0.15;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.x = t * 0.2;
      midRingRef.current.rotation.y = -t * 0.25;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = -t * 0.12;
      outerRingRef.current.rotation.z = t * 0.18;
    }
  });

  const posX = 0;
  const posY = 0;
  const scale = isDesktop ? 1.35 : 0.95;

  return (
    <group position={[posX, posY, 0]} scale={scale}>
      {/* Central Inner Portal Ring */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Torus ref={innerRingRef} args={[1.2, 0.08, 12, isMobile ? 48 : 80]}>
          <meshPhysicalMaterial
            color={colors.primary}
            emissive={colors.emissive}
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </Torus>
      </Float>

      {/* Middle Dynamic Accent Ring */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <Torus ref={midRingRef} args={[1.6, 0.025, 12, isMobile ? 48 : 80]}>
          <meshStandardMaterial
            color={colors.accent}
            emissive={colors.accent}
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>

      {/* Outer Rotating Wireframe Cage Ring */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
        <Torus ref={outerRingRef} args={[2.0, 0.02, 8, isMobile ? 48 : 80]}>
          <meshStandardMaterial
            color={colors.secondary}
            emissive={colors.secondary}
            emissiveIntensity={1.5}
            wireframe
            transparent
            opacity={0.4}
          />
        </Torus>
      </Float>

      {/* Floating Geometric Data Elements */}
      <FloatingElements colors={colors} />

      {/* Glowing Starfield Particles (Scaled for Device Performance) */}
      <Sparkles count={isMobile ? 30 : 100} scale={4} size={3} speed={0.4} opacity={0.6} color={colors.primary} />
      <Sparkles count={isMobile ? 20 : 60} scale={5} size={4} speed={0.6} opacity={0.4} color={colors.secondary} />
      <Sparkles count={isMobile ? 10 : 30} scale={4} size={2} speed={0.8} opacity={0.5} color={colors.accent} />
    </group>
  );
};

export default function Hero3D({ theme = "cyberpunk" }) {
  const colors = useMemo(() => {
    return themeColors[theme] || themeColors.cyberpunk;
  }, [theme]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-0 opacity-85 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={4} color={colors.accent} />
        <spotLight position={[0, 15, 10]} intensity={3} color={colors.primary} penumbra={1} />
        
        <HolographicPortal colors={colors} isMobile={isMobile} />

        {/* Global Ambient Background Particles */}
        <Sparkles count={isMobile ? 25 : 60} scale={18} size={2} speed={0.2} opacity={0.4} color={colors.primary} />
        <Sparkles count={isMobile ? 15 : 40} scale={15} size={3} speed={0.3} opacity={0.3} color={colors.secondary} />
      </Canvas>
    </div>
  );
}
