import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const Crystal = ({ position = [0, 0, 0], scale = 1, trackMouse = false, rotationSpeed = 1 }) => {
  const innerRef = useRef();
  const outerRef = useRef();
  const { viewport } = useThree();
  const target = new THREE.Vector3();
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime() * rotationSpeed;
    
    if (trackMouse) {
      // Smooth dampening to target cursor
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;
      
      target.set(x * 0.8, y * 0.8, 0); 
      
      innerRef.current.position.lerp(target, 0.08);
      outerRef.current.position.lerp(target, 0.08);
    } else {
      // Gentle floating for background crystals
      innerRef.current.position.y = initialPosition.y + Math.sin(t + initialPosition.x) * 0.3;
      outerRef.current.position.y = initialPosition.y + Math.sin(t + initialPosition.x) * 0.3;
    }

    // Give them independent counter-rotations
    innerRef.current.rotation.x = t * 0.2;
    innerRef.current.rotation.y = t * 0.3;
    
    outerRef.current.rotation.x = t * -0.15;
    outerRef.current.rotation.y = t * -0.2;
  });

  return (
    <group position={!trackMouse ? position : [0, 0, 0]} scale={scale}>
      {/* Inner Solid Crystal */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Icosahedron ref={innerRef} args={[0.8, 0]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#3b82f6" 
            emissiveIntensity={1.2} 
            roughness={0.2} 
            metalness={0.9} 
          />
        </Icosahedron>
      </Float>

      {/* Outer Rotating Wireframe Shell */}
      <Float speed={2.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <Icosahedron ref={outerRef} args={[1.05, 0]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#8b5cf6" 
            emissiveIntensity={3} 
            wireframe 
          />
        </Icosahedron>
      </Float>
    </group>
  );
};

export default function Hero3D() {
  // Generate random background crystals
  const bgCrystals = useMemo(() => {
    const crystals = [];
    for (let i = 0; i < 20; i++) {
      crystals.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 25, // Spread across width
          (Math.random() - 0.5) * 15, // Spread across height
          (Math.random() - 0.5) * 15 - 5, // Push back in Z
        ],
        scale: Math.random() * 0.25 + 0.05, // Random small scales
        rotationSpeed: Math.random() * 0.6 + 0.2
      });
    }
    return crystals;
  }, []);

  return (
    <div className="fixed inset-0 z-0 mix-blend-screen opacity-95" style={{ pointerEvents: "none" }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        dpr={[1, 1]} 
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <spotLight position={[-10, 10, -5]} intensity={5} color="#8b5cf6" penumbra={1} />
        
        {/* Main Crystal Tracking Mouse */}
        <Crystal trackMouse={true} scale={1} />

        {/* Background Crystals */}
        {bgCrystals.map((props) => (
          <Crystal key={props.id} {...props} />
        ))}
        
        {/* Floating abstract tech particles */}
        <Sparkles count={300} scale={20} size={5} speed={0.2} opacity={0.6} color="#8b5cf6" />
      </Canvas>
    </div>
  );
}
