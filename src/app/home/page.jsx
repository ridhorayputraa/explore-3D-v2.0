"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MapMaka } from "@/components/MapMaka";
import { ModelHiluDraco } from "@/components/ModelHiluDraco";
import { YamaGelud } from "@/components/YamaGelud";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Pulau Hilu",
      desc: "Selamat datang di ujung dunia.",
      Model: MapMaka,
    },
    {
      id: 2,
      title: "Yama Gelud",
      desc: "Rasakan kekuatan alam liar di Yama Gelud.",
      Model: YamaGelud,
    },
    {
      id: 3,
      title: "Model Draco",
      desc: "Seni dan teknologi bertemu di Hilu Draco.",
      Model: ModelHiluDraco,
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* === Canvas tunggal untuk semua model === */}
      <Canvas
        camera={{
          position: [1, 1, 100],
          fov: 30,
          near: 1, // depth precision
          far: 20000,
        }}
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <group
            position={[-(activeIndex - 1) * 8, 0, 0]}
            transition={{ duration: 0.8 }}
          >
            {slides.map((slide, i) => (
              <group key={i} position={[i * 8, 0, 0]} scale={1.2}>
                <slide.Model />
              </group>
            ))}
          </group>
        </Suspense>

        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* === Swiper === */}
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          centeredSlides
          slidesPerView={3}
          spaceBetween={-50}
          grabCursor
          speed={700}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1.5,
            slideShadows: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full max-w-5xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-[70vh] flex flex-col justify-end items-center pb-16">
                <div
                  className={`transition-opacity duration-500 text-center ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
                  <p className="max-w-sm mx-auto text-gray-400">{slide.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
