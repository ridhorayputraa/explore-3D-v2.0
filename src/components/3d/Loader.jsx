// components/Loader.jsx
"use client";

import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export default function Loader({ onFinish }) {
  const { progress, item, active } = useProgress();
  const progressRef = useRef();
  const textRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    // animasi progres bar
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.3,
      ease: "power2.out",
    });

    // animasi teks persentase
    gsap.to(textRef.current, {
      textContent: `${Math.floor(progress)}%`,
      duration: 0.3,
      ease: "none",
      snap: { textContent: 1 },
    });

    if (!active && progress === 100) {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.inOut",
        onComplete: () => onFinish?.(),
      });
    }
  }, [progress, active, onFinish]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <p className="mb-4 text-lg tracking-wide font-medium">
        {item ? `Loading: ${item}` : "Initializing Scene..."}
      </p>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-white rounded-full"
          style={{ width: "0%" }}
        />
      </div>
      <p ref={textRef} className="mt-3 text-sm text-gray-300">
        0%
      </p>
    </div>
  );
}
