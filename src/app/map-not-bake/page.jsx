"use client";

import { ModelMapNotBake } from "@/components/ModelMapNotBake";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { PlaneGeometry } from "three";

extend({ PlaneGeometry });

export default function MapNotBake() {
  return (
    <>
      <Canvas shadows>
        <ambientLight />
        {/* <directionalLight position={[-5, 8, 1]} castShadow>
          <orthographicCamera attach="shadow-camera" top={8} right={8} />
        </directionalLight> */}
        <axesHelper args={[10]} />

        <OrbitControls />
        <ModelMapNotBake />
      </Canvas>
    </>
  );
}
