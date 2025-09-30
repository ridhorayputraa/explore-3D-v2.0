"use client";
import {
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";

function AnimatedBox() {
  const boxRef = useRef();
  const { speed, color } = useControls({
    color: "#00bfff",
    speed: {
      value: 0.005,
      min: 0.0,
      max: 0.03,
      step: 0.001,
    },
  });

  useFrame(() => {
    boxRef.current.rotation.x += speed;
    boxRef.current.rotation.y += speed;
    boxRef.current.rotation.z += speed;
  });
  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="canvas-container">
      <Canvas>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewcube />
          <GizmoViewport />
        </GizmoHelper>

        <axesHelper args={[10]} />
        <gridHelper args={[20, 20, 0xff22aa]} />
        <OrbitControls />
        <AnimatedBox />
        <directionalLight position={[2, 5, 1]} />
      </Canvas>
    </div>
  );
}
