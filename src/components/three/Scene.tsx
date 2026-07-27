'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
      siz[i] = Math.random() * 2 + 1;
    }
    initialPositions.current = pos;
    return [pos, siz];
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx + 1] =
        (initialPositions.current?.[idx + 1] ?? 0) + Math.sin(time * 0.3 + i) * 0.15;
      positions[idx] =
        (initialPositions.current?.[idx] ?? 0) + Math.cos(time * 0.2 + i * 0.5) * 0.1;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6d4aff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
  });

  const shapes = useMemo(() => {
    const items = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.08, 0),
      new THREE.OctahedronGeometry(0.06, 0),
      new THREE.TorusGeometry(0.08, 0.02, 8, 16),
    ];
    for (let i = 0; i < 20; i++) {
      const geo = geometries[i % geometries.length];
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.6 + Math.random() * 1.3;
      items.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
        geometry: geo,
        color: `hsl(${260 + Math.random() * 30}, 70%, ${60 + Math.random() * 30}%)`,
        scale: 0.5 + Math.random() * 1.5,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          position={shape.position}
          geometry={shape.geometry}
          scale={shape.scale}
        >
          <meshPhysicalMaterial
            color={shape.color}
            transparent
            opacity={0.15}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <FloatingShapes />
        <ParticleField count={80} />
      </Canvas>
    </div>
  );
}
