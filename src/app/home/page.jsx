"use client";
import { MapMaka } from "@/components/MapMaka";
import { ModelHiluDraco } from "@/components/ModelHiluDraco";
import { YamaGelud } from "@/components/YamaGelud";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Pulau Hilu",
      desc: "Lorem ipsum dolor sit",
      Model: MapMaka,
    },
    {
      id: 2,
      title: "Yama Gelud",
      desc: "Lorem ipsum dolor sit",
      Model: YamaGelud,
    },
    {
      id: 3,
      title: "Model Draco",
      desc: "Lorem ipsum dolor sit",
      Model: ModelHiluDraco,
    },
  ];

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      <Canvas
        camera={{ position: [1, 1, 100], fov: 30, near: 1, far: 20000 }}
        style={{ position: "fixed", inset: 0 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Scene activeIndex={activeIndex} slides={slides} />
        </Suspense>
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} makeDefault />
      </Canvas>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
        grabCursor
        speed={700}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Slide slide={slide} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function Scene({ activeIndex, slides }) {
  const ActiveModel = slides[activeIndex].Model;
  return (
    <group key={activeIndex} scale={1.2}>
      <ActiveModel />
    </group>
  );
}

function Slide({ slide, isActive }) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end items-center pb-20">
      <div
        className={`transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-4xl font-bold mb-3 text-center">{slide.title}</h2>
        <p className="max-w-md text-center mx-auto text-gray-400">
          {slide.desc}
        </p>
      </div>
    </div>
  );
}
