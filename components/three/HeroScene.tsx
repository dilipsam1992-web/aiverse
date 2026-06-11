"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Faceted diamond — icosahedron with glass-like physical material. */
function Diamond() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.25;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={mesh} position={[3.6, 1.4, -1.5]} scale={0.95}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.6}
          roughness={0}
          metalness={0}
          ior={2.4}
          color="#bfe0ff"
          attenuationColor="#9ec9ff"
          attenuationDistance={2.5}
          envMapIntensity={2.2}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
    </Float>
  );
}

/** Floating gold ring. */
function GoldRing() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18;
      mesh.current.rotation.z += delta * 0.1;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={[-3.9, -1.9, -2]} rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[1.05, 0.3, 48, 128]} />
        <meshStandardMaterial
          color="#ffd700"
          metalness={1}
          roughness={0.12}
          envMapIntensity={2.4}
          emissive="#b8860b"
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

/** Small accent gem far back for depth. */
function AccentGem() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[-0.6, 2.4, -4]} scale={0.45}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0}
          ior={2.0}
          color="#c9b0ff"
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

/** Mouse parallax — whole jewellery group leans toward the cursor. */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.22,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.14,
      0.04
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.3,
      0.04
    );
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={40} color="#ffffff" />
        <pointLight position={[-6, -2, 4]} intensity={25} color="#1e88ff" />
        <pointLight position={[0, 4, -4]} intensity={20} color="#7b3ff2" />

        <ParallaxRig>
          <Diamond />
          <GoldRing />
          <AccentGem />
          <Sparkles
            count={140}
            scale={[14, 9, 8]}
            size={2.6}
            speed={0.35}
            color="#ffd700"
            opacity={0.65}
          />
          <Sparkles
            count={60}
            scale={[12, 8, 6]}
            size={1.8}
            speed={0.2}
            color="#9ec9ff"
            opacity={0.4}
          />
        </ParallaxRig>

        <Environment preset="city" />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
