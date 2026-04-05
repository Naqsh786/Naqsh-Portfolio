import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const TechCrystal = () => {
  const innerRef = useRef();
  const outerRef = useRef();
  const { viewport } = useThree();
  const target = new THREE.Vector3();

  useFrame(({ mouse, clock }) => {
    // Smooth dampening to target cursor
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    target.set(x * 0.3, y * 0.3, 0); 
    
    // Lerp both shapes smoothly to track mouse
    innerRef.current.position.lerp(target, 0.05);
    outerRef.current.position.lerp(target, 0.05);

    // Give them independent counter-rotations
    const t = clock.getElapsedTime();
    innerRef.current.rotation.x = t * 0.2;
    innerRef.current.rotation.y = t * 0.3;
    
    outerRef.current.rotation.x = t * -0.15;
    outerRef.current.rotation.y = t * -0.2;
  });

  return (
    <>
      {/* Inner Solid Crystal - Restored to 'Normal' premium scale */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Icosahedron ref={innerRef} args={[0.8, 0]}>
          <meshStandardMaterial 
            color="#ff003c" 
            emissive="#990024" 
            emissiveIntensity={1} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </Icosahedron>
      </Float>

      {/* Outer Rotating Wireframe Shell - Normal size */}
      <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <Icosahedron ref={outerRef} args={[1.2, 0]}>
          <meshStandardMaterial 
            color="#ff003c" 
            emissive="#ff003c" 
            emissiveIntensity={2.5} 
            wireframe 
          />
        </Icosahedron>
      </Float>
      
      {/* Floating abstract tech particles */}
      <Sparkles count={100} scale={10} size={5} speed={0.2} opacity={0.5} color="#ff003c" />
    </>
  );
};

export default function Hero3D() {
  return (
    <div className="fixed inset-0 z-0 mix-blend-screen opacity-90" style={{ pointerEvents: "none" }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        dpr={[1, 1]} 
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[-10, 10, -5]} intensity={4} color="#ff003c" penumbra={1} />
        
        <TechCrystal />
      </Canvas>
    </div>
  );
}
