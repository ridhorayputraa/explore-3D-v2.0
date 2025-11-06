"use client";

import Loader from "@/components/3d/Loader";
import Layout from "@/components/Layout";
import { ModelRoomHero } from "@/components/ModelRoomHero";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { useState } from "react";
import { PlaneGeometry } from "three";

extend({ PlaneGeometry });

export default function MapBake() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Layout>
      {!isLoaded && <Loader onFinish={() => setIsLoaded(true)} />}

      {isLoaded && (
        <Canvas
          camera={{
            position: [1, 1, 100],
            fov: 30,
            near: 1,
            far: 20000,
          }}
        >
          {/* <ambientLight />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize={1024}
        /> */}
          <axesHelper args={[10]} />

          <OrbitControls />
          {/* <ModelMapBake /> */}
          {/* <YamaGelud/> */}
          {/* <ModeHiluRill /> */}
          <ModelRoomHero />
        </Canvas>
      )}
    </Layout>
  );
}
