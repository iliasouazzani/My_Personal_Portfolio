'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Bounds } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─── Floating AI Core ──────────────────────────────────────────────────

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.15;
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={Math.min(viewport.width * 0.08, 0.6)}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#6d4aff"
          emissive="#6d4aff"
          emissiveIntensity={0.15}
          transparent
          opacity={0.6}
          wireframe
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// ─── Orbital Rings ─────────────────────────────────────────────────────

function OrbitalRings() {
  const count = 3;
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.04) * 0.1;
  });

  const rings = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      radius: 1.2 + i * 0.5,
      color: `hsl(${260 + i * 15}, 70%, ${65 + i * 10}%)`,
      segments: 48 + i * 8,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.2]}>
          <ringGeometry args={[ring.radius, ring.radius + 0.008, ring.segments]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.12 - i * 0.03}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Network Nodes ─────────────────────────────────────────────────────

function NetworkNodes() {
  const count = 30;
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1 + Math.random() * 2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      colors[i * 3] = 0.4 + Math.random() * 0.3;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.3;

      sizes[i] = 0.02 + Math.random() * 0.04;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ─── Connections Lines ─────────────────────────────────────────────────

function ConnectionLines() {
  const lineRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < 15; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.5 + Math.random() * 1.5;
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
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.03;
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
              <bufferAttribute
                attach="attributes-position"
                args={[positions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={line.color}
              transparent
              opacity={0.06}
              depthWrite={false}
            />
          </line>
        );
      })}
    </group>
  );
}

// ─── Glass Spheres ──────────────────────────────────────────────────────

function GlassSpheres() {
  const spheres = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
      scale: 0.05 + Math.random() * 0.15,
      color: `hsl(${260 + Math.random() * 40}, 60%, ${70 + Math.random() * 20}%)`,
    }));
  }, []);

  return (
    <>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position} scale={sphere.scale}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshPhysicalMaterial
            color={sphere.color}
            transparent
            opacity={0.12}
            roughness={0}
            metalness={0.1}
            clearcoat={0.5}
            clearcoatRoughness={0.3}
            envMapIntensity={0.5}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── Linux Cube ─────────────────────────────────────────────────────────

function LinuxCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={[1.8, -0.5, -1.5]}
        scale={0.25}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#6d4aff"
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// ─── Particle Field ─────────────────────────────────────────────────────

function ParticleField({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      siz[i] = Math.random() * 2 + 0.5;
    }
    initialPositions.current = new Float32Array(pos);
    return [pos, siz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = clock.getElapsedTime();
    const init = initialPositions.current;
    if (!init) return;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx] = init[idx] + Math.sin(time * 0.2 + i * 0.1) * 0.2;
      pos[idx + 1] = init[idx + 1] + Math.cos(time * 0.15 + i * 0.15) * 0.2;
      pos[idx + 2] = init[idx + 2] + Math.sin(time * 0.1 + i * 0.05) * 0.1;
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
        size={0.015}
        color="#6d4aff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Scene Background ──────────────────────────────────────────────────

function SceneContent() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 2]} intensity={0.3} color="#6d4aff" />
      <pointLight position={[-2, -1, 3]} intensity={0.2} color="#a99cff" />

      <Suspense fallback={null}>
        <Sparkles
          count={reducedMotion ? 0 : 40}
          scale={4}
          size={0.03}
          speed={0.3}
          color="#6d4aff"
          opacity={0.3}
        />
      </Suspense>

      <AICore />

      <OrbitalRings />

      <NetworkNodes />

      <ConnectionLines />

      <GlassSpheres />

      <LinuxCube />

      <ParticleField count={reducedMotion ? 30 : 150} />
    </>
  );
}

// ─── Exported Scene3D ──────────────────────────────────────────────────

export function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
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
