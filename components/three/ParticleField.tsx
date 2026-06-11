"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { seededRandom } from "@/lib/hooks";

const COUNT = 600;
const BOUNDS = { x: 16, y: 9, z: 6 };

/** Gold dust — Three.js Points slowly drifting upward, wrapping at the top. */
function GoldDust() {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const rand = seededRandom(2026);
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (rand() - 0.5) * BOUNDS.x;
      positions[i * 3 + 1] = (rand() - 0.5) * BOUNDS.y;
      positions[i * 3 + 2] = (rand() - 0.5) * BOUNDS.z;
      speeds[i] = 0.15 + rand() * 0.35;
    }
    return { positions, speeds };
  }, []);

  useFrame((state, delta) => {
    const geo = points.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += speeds[i] * delta;
      // gentle sideways sway
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.4 + i) * delta * 0.04;
      if (pos[i * 3 + 1] > BOUNDS.y / 2) pos[i * 3 + 1] = -BOUNDS.y / 2;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffd700"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      className="!absolute inset-0"
      aria-hidden
    >
      <Suspense fallback={null}>
        <GoldDust />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
