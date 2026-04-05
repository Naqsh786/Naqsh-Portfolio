import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

const CursorBody = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const target = new THREE.Vector3();

  useFrame(({ mouse }) => {
    // Standard screen to viewport coords
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    target.set(x, y, 0);
    // Smooth magnetic follow
    meshRef.current.position.lerp(target, 0.1);
  });

  return (
    <group ref={meshRef}>
      {/* A very tiny subtle core orb */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ff003c" emissive="#ff003c" emissiveIntensity={5} />
      </mesh>
      
      {/* Tiny localized sparkles around the cursor */}
      <Sparkles count={15} scale={1.5} size={3} speed={0.5} color="#ff003c" opacity={0.6} />
    </group>
  );
};

export default function GlowCursor() {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1]}
      >
        <ambientLight intensity={0.5} />
        <CursorBody />
      </Canvas>
    </div>
  );
}
