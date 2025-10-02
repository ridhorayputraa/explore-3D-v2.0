"use client";

import { ModelMapBake } from "@/components/ModelMapBake";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { PlaneGeometry } from "three";

extend({ PlaneGeometry });

export default function MapBake() {


  return (
    <>
      <Canvas>
        {/* <ambientLight />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
        /> */}
        <axesHelper args={[10]} />

        <OrbitControls />
        <ModelMapBake />
      </Canvas>
    </>
  );
}
