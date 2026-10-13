'use client';

import { Component, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, useGLTF } from '@react-three/drei';

export const MODEL_SRC = '/models/fauzan-figure.glb';

function Figure({ pointerRef }) {
  const { scene } = useGLTF(MODEL_SRC);
  const group = useRef(null);

  // Eases toward the existing pointer-parallax values Hero.jsx already
  // computes (--dx/--dy), rather than tracking the pointer a second time.
  useFrame(() => {
    if (!group.current) return;
    const { dx, dy } = pointerRef.current;
    group.current.rotation.y += (dx * 0.35 - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (-dy * 0.12 - group.current.rotation.x) * 0.06;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group}>
        <primitive object={scene} position={[0, -1.1, 0]} />
      </group>
    </Float>
  );
}

/**
 * Catches a mid-session GLTF load failure (the asset vanishing after Hero's
 * own HEAD check passed) and hands control back to the caller's photo
 * fallback instead of taking the whole Hero block down with it.
 */
class FigureBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Collectible-figure render of the OC, standing in for the static portrait
 * once a GLB exists at MODEL_SRC. Mounting/gating lives entirely in
 * Hero.jsx — this component assumes the asset exists and is safe to try.
 */
export default function HeroFigure({ pointerRef, onError }) {
  return (
    <FigureBoundary onError={onError}>
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 32 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[2.5, 4, 3]} intensity={1.1} />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.35} color="#f3f3f4" />
        <Suspense fallback={null}>
          <Figure pointerRef={pointerRef} />
          <ContactShadows position={[0, -1.6, 0]} opacity={0.35} blur={2.4} far={2.5} />
        </Suspense>
      </Canvas>
    </FigureBoundary>
  );
}
