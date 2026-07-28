'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─── Icosahedron ───────────────────────────────────────────────────────

function IcoShape({ position = [0, 0, 0], scale = 1, color = "#6d4aff", speed = 0.15, detail = 1 }: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  detail?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.01;
    meshRef.current.rotation.y += speed * 0.015;
    meshRef.current.position.y += Math.sin(clock.getElapsedTime() * speed * 0.2 + position[0]) * 0.001;
  });

  return (
    <Float speed={0.5 + speed} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, detail]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.03}
          transparent
          opacity={0.06}
          wireframe
          roughness={0.3}
          metalness={0.7}
          distort={0.2}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

// ─── Dodecahedron ──────────────────────────────────────────────────────

function DodeShape({ position = [0, 0, 0], scale = 1, color = "#8b6aff", speed = 0.1 }: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.008;
    meshRef.current.rotation.z += speed * 0.006;
    meshRef.current.position.x += Math.sin(clock.getElapsedTime() * speed * 0.15 + position[1]) * 0.001;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.025}
        roughness={0.2}
        metalness={0.6}
        wireframe
      />
    </mesh>
  );
}

// ─── Octahedron ────────────────────────────────────────────────────────

function OctShape({ position = [0, 0, 0], scale = 1, color = "#a07aff", speed = 0.6 }: {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += speed * 0.01;
    meshRef.current.rotation.x += speed * 0.005;
    meshRef.current.position.z += Math.sin(clock.getElapsedTime() * speed * 0.1 + position[2]) * 0.001;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.02}
        roughness={0.3}
        metalness={0.5}
        wireframe
      />
    </mesh>
  );
}

// ─── Orbital Rings (kept as centerpiece) ───────────────────────────────

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.2;
  });

  const rings = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      radius: 0.6 + i * 0.35,
      tube: 0.003 + i * 0.002,
      color: `hsl(${260 + i * 15}, 70%, ${60 + i * 8}%)`,
      segments: 48 + i * 8,
      tilt: (i * 0.2) % Math.PI,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + ring.tilt, ring.tilt * 0.5, i * 0.12]}>
          <ringGeometry args={[ring.radius, ring.radius + ring.tube, ring.segments]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.025 - i * 0.005}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Network Nodes (particle system) ───────────────────────────────────

function NetworkNodes() {
  const count = 100;
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      colors[i * 3] = 0.4 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.3;
    }

    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ─── Connection Lines ──────────────────────────────────────────────────

function ConnectionLines() {
  const lineRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 2.5;
      points.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.random() > 0.85) {
          result.push({
            start: points[i],
            end: points[j],
            color: `hsl(260, 70%, ${50 + Math.random() * 30}%)`,
          });
        }
      }
    }

    return result;
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <group ref={lineRef}>
      {lines.map((line, i) => {
        const positions = new Float32Array([
          line.start.x, line.start.y, line.start.z,
          line.end.x, line.end.y, line.end.z,
        ]);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={line.color} transparent opacity={0.05} depthWrite={false} />
          </line>
        );
      })}
    </group>
  );
}

// ─── Particle Field ─────────────────────────────────────────────────────

function ParticleField({ count = 400 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      siz[i] = Math.random() * 2 + 0.5;
    }
    initialPositions.current = new Float32Array(pos);
    return [pos, siz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    const init = initialPositions.current;
    if (!init) return;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = init[idx] + Math.sin(time * 0.12 + i * 0.08) * 0.5;
      pos[idx + 1] = init[idx + 1] + Math.cos(time * 0.1 + i * 0.12) * 0.5;
      pos[idx + 2] = init[idx + 2] + Math.sin(time * 0.07 + i * 0.04) * 0.3;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#6d4aff"
        transparent
        opacity={0.05}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Scene Content ─────────────────────────────────────────────────────

function SceneContent() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 5, 4]} intensity={0.3} color="#6d4aff" />
      <pointLight position={[-4, -3, 5]} intensity={0.2} color="#a99cff" />
      <pointLight position={[0, -5, 4]} intensity={0.15} color="#ffffff" />

      <Suspense fallback={null}>
        <Sparkles
          count={reducedMotion ? 0 : 100}
          scale={7}
          size={0.025}
          speed={0.3}
          color="#6d4aff"
          opacity={0.05}
        />
      </Suspense>

      {/* Minimal center - just subtle rings, no central objects */}
      <OrbitalRings />

      {/* Left side - dense column */}
      <IcoShape position={[-3.5, 2.8, -2.5]} scale={0.38} color="#6d4aff" speed={0.2} detail={2} />
      <DodeShape position={[-3.8, 1, -3]} scale={0.35} color="#8b6aff" speed={0.1} />
      <OctShape position={[-4.2, -0.5, -2.2]} scale={0.36} color="#a07aff" speed={0.7} />
      <IcoShape position={[-3.6, -2, -3.5]} scale={0.32} color="#9b7aff" speed={0.25} detail={1} />
      <DodeShape position={[-4.5, 2, -4]} scale={0.3} color="#7b5dff" speed={0.15} />
      <OctShape position={[-3.2, -3.2, -2.8]} scale={0.34} color="#a07aff" speed={0.8} />

      {/* Right side - dense column */}
      <IcoShape position={[4, 2.5, -3]} scale={0.36} color="#9b7aff" speed={0.22} detail={2} />
      <DodeShape position={[3.5, 0.8, -2.5]} scale={0.38} color="#7b5dff" speed={0.12} />
      <OctShape position={[4.5, -0.8, -3.5]} scale={0.4} color="#a07aff" speed={0.65} />
      <IcoShape position={[3.8, -2.5, -4]} scale={0.34} color="#6d4aff" speed={0.2} detail={1} />
      <DodeShape position={[4.2, 1.5, -4.5]} scale={0.32} color="#8b6aff" speed={0.1} />
      <OctShape position={[3.2, -3.5, -3]} scale={0.36} color="#a07aff" speed={0.75} />

      {/* Top edge - clustered */}
      <IcoShape position={[-2.5, 3.5, -3.5]} scale={0.34} color="#7b5dff" speed={0.2} detail={2} />
      <DodeShape position={[0, 4, -3.8]} scale={0.36} color="#9b7aff" speed={0.15} />
      <OctShape position={[-1, 4.2, -3]} scale={0.3} color="#a07aff" speed={0.9} />
      <IcoShape position={[3, 3.8, -4.2]} scale={0.32} color="#6d4aff" speed={0.18} detail={1} />
      <DodeShape position={[-3.2, 3.8, -4.5]} scale={0.3} color="#8b6aff" speed={0.12} />

      {/* Bottom edge - clustered */}
      <IcoShape position={[-3, -3.8, -4]} scale={0.36} color="#9b7aff" speed={0.18} detail={2} />
      <DodeShape position={[0.5, -4.2, -3.5]} scale={0.34} color="#7b5dff" speed={0.12} />
      <OctShape position={[1.5, -4, -3]} scale={0.32} color="#a07aff" speed={0.85} />
      <IcoShape position={[-1, -3.5, -4.5]} scale={0.3} color="#6d4aff" speed={0.22} detail={1} />
      <DodeShape position={[3.2, -3.5, -4.5]} scale={0.32} color="#8b6aff" speed={0.1} />

      {/* Extreme left edge */}
      <IcoShape position={[-6.5, 1.5, -4]} scale={0.5} color="#5d4aff" speed={0.1} detail={1} />
      <DodeShape position={[-7, -1, -3.5]} scale={0.45} color="#7b5dff" speed={0.08} />
      <OctShape position={[-7.5, 0.5, -5]} scale={0.5} color="#6d4aff" speed={0.5} />
      <IcoShape position={[-6.8, 3, -4.5]} scale={0.42} color="#8b6aff" speed={0.12} detail={1} />
      <DodeShape position={[-7.2, -3, -5]} scale={0.48} color="#9b7aff" speed={0.07} />
      <OctShape position={[-8, 2, -6]} scale={0.55} color="#a07aff" speed={0.4} />
      <IcoShape position={[-6.5, -2, -6]} scale={0.45} color="#5d4aff" speed={0.15} detail={1} />

      {/* Extreme right edge */}
      <IcoShape position={[6.5, -1.5, -4]} scale={0.5} color="#5d4aff" speed={0.1} detail={1} />
      <DodeShape position={[7, 1.5, -3.5]} scale={0.45} color="#7b5dff" speed={0.08} />
      <OctShape position={[7.5, -0.5, -5]} scale={0.5} color="#6d4aff" speed={0.5} />
      <IcoShape position={[6.8, -3, -4.5]} scale={0.42} color="#8b6aff" speed={0.12} detail={1} />
      <DodeShape position={[7.2, 3, -5]} scale={0.48} color="#9b7aff" speed={0.07} />
      <OctShape position={[8, -2, -6]} scale={0.55} color="#a07aff" speed={0.4} />
      <IcoShape position={[6.5, 2, -6]} scale={0.45} color="#5d4aff" speed={0.15} detail={1} />

      {/* Extreme top */}
      <IcoShape position={[-1, 5.5, -4.5]} scale={0.4} color="#6d4aff" speed={0.18} detail={1} />
      <DodeShape position={[3, 5.8, -5]} scale={0.42} color="#8b6aff" speed={0.1} />
      <OctShape position={[-3.5, 6, -5.5]} scale={0.45} color="#a07aff" speed={0.6} />
      <IcoShape position={[1.5, 6.5, -6]} scale={0.5} color="#7b5dff" speed={0.08} detail={1} />

      {/* Extreme bottom */}
      <IcoShape position={[1, -5.5, -4.5]} scale={0.4} color="#6d4aff" speed={0.18} detail={1} />
      <DodeShape position={[-3, -5.8, -5]} scale={0.42} color="#8b6aff" speed={0.1} />
      <OctShape position={[3.5, -6, -5.5]} scale={0.45} color="#a07aff" speed={0.6} />
      <IcoShape position={[-1.5, -6.5, -6]} scale={0.5} color="#7b5dff" speed={0.08} detail={1} />

      {/* Corner anchors */}
      <OctShape position={[-7, 5.5, -6]} scale={0.48} color="#a07aff" speed={0.8} />
      <OctShape position={[7, 5.5, -6]} scale={0.48} color="#8b6aff" speed={0.75} />
      <OctShape position={[-7, -5.5, -6]} scale={0.48} color="#7b5dff" speed={0.85} />
      <OctShape position={[7, -5.5, -6]} scale={0.48} color="#6d4aff" speed={0.7} />

      {/* Deep background - many objects far back */}
      <IcoShape position={[2, 1.5, -7]} scale={0.55} color="#5d4aff" speed={0.06} detail={1} />
      <IcoShape position={[-2.5, -1, -7.5]} scale={0.5} color="#6d5aff" speed={0.08} detail={1} />
      <IcoShape position={[0, 2.8, -8]} scale={0.45} color="#7d6aff" speed={0.1} detail={1} />
      <IcoShape position={[-1.5, -3, -7]} scale={0.48} color="#5d4aff" speed={0.07} detail={1} />
      <IcoShape position={[3.5, -1.5, -8.5]} scale={0.5} color="#6d5aff" speed={0.05} detail={1} />
      <DodeShape position={[2.5, -2.5, -7.5]} scale={0.45} color="#8b6aff" speed={0.06} />
      <DodeShape position={[-3, 2, -8]} scale={0.42} color="#9b7aff" speed={0.07} />
      <OctShape position={[0, -2, -9]} scale={0.48} color="#a07aff" speed={0.5} />
      <OctShape position={[1.5, 3.5, -8.5]} scale={0.44} color="#a07aff" speed={0.45} />
      <OctShape position={[-3.5, -3, -9]} scale={0.46} color="#a07aff" speed={0.55} />

      <ParticleField count={reducedMotion ? 40 : 400} />
    </>
  );
}

// ─── Exported Scene3D ──────────────────────────────────────────────────

export function Scene3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Subtle violet gradient overlay on the sides */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(109,74,255,0.03) 80%, rgba(109,74,255,0.06) 100%)',
        pointerEvents: 'none',
      }} />
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
