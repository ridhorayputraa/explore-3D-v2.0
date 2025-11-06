"use client";

import { ModeHiluRill } from "@/components/ModeHiluRill";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Suspense } from "react";


export default function WelcomePage() {
  const handleEnter = () => {
    window.location.href = "/home";
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-white text-black overflow-hidden relative">
      <div className="h-full w-full flex flex-col items-center text-center justify-center pt-20 px-4 z-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Welcome to</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mari Berkarya</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Lorem ipsum dolor sit amet consectetur. Auctor id volutpat sed urna
          elementum nulla ut vitae morbi. Leo et ultrices egestas convallis odio
          justo.
        </p>

        <button
          onClick={handleEnter}
          className="bg-[#8AC7C1] text-white font-semibold px-10 py-3 rounded-full hover:opacity-80 transition-all"
        >
          Get Started
        </button>
      </div>

      {/* Model 3D di bawah */}
      <div className="relative w-full h-50 flex justify-center items-end overflow-hidden">
        <div className="absolute bottom w-full h-full pointer-events-none">
          <Suspense
            fallback={<p className="text-center mt-10">Loading model...</p>}
          >
            <Canvas
              camera={{
                position: [1, 1, 100],
                fov: 30,
                near: 1,
                far: 20000,
              }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={1} />
              <directionalLight position={[2, 5, 2]} intensity={2} />
              <Suspense fallback={null}>
                <group position={[0, -1.5, 0]}>
                  <ModeHiluRill />
                </group>
                <Environment preset="sunset" />
              </Suspense>
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
