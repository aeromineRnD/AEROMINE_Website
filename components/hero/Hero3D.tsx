"use client";

import { Suspense, Component, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ACESFilmicToneMapping } from "three";

const MODEL_URL = "/models/lato-hero.glb";

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

function LatoModel() {
  const { scene } = useGLTF(MODEL_URL);
  return (
    <Bounds fit clip observe margin={0.85}>
      <primitive object={scene} />
    </Bounds>
  );
}

function IdleAutoRotateControls() {
  const controls = useRef<OrbitControlsImpl>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pause = () => {
    if (controls.current) controls.current.autoRotate = false;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (controls.current) controls.current.autoRotate = true;
    }, 4000);
  };

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      autoRotate
      autoRotateSpeed={0.4}
      enablePan={false}
      enableDamping
      maxPolarAngle={Math.PI / 2.2}
      onStart={pause}
    />
  );
}

export default function Hero3D({ fallback }: { fallback: ReactNode }) {
  return (
    <ModelErrorBoundary fallback={fallback}>
      <Canvas
        camera={{ position: [6, 5, 6], fov: 50 }}
        gl={{ toneMapping: ACESFilmicToneMapping, antialias: true }}
        dpr={[1, 1.8]}
        className="!absolute inset-0"
      >
        <hemisphereLight args={["#c9deff", "#8a7560", 1.7]} />
        <directionalLight color="#fffaf0" intensity={2.4} position={[1, 2, 1]} />
        <Suspense fallback={null}>
          <LatoModel />
        </Suspense>
        <IdleAutoRotateControls />
      </Canvas>
    </ModelErrorBoundary>
  );
}

useGLTF.preload(MODEL_URL);
