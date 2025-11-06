/*
Refactor by ChatGPT
Original command:
npx gltfjsx@6.5.3 public/hilu-ril/model-p.glb -o src/components/ModeHiluRill.jsx -k -K -r public
*/
"use client";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function ModeHiluRill(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/hilu-ril/model-p.glb");

  // 🧩 Clone biar instance modelnya terpisah (aman buat reuse)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, names } = useAnimations(animations, clone);

  // 🧠 Jalankan animasi idle (kalau ada)
  useEffect(() => {
    if (names.length > 0) {
      const idle = actions[names[0]];
      idle?.reset().setLoop(THREE.LoopRepeat).fadeIn(0.5).play();
    }

    return () => {
      if (names.length > 0) {
        actions[names[0]]?.fadeOut(0.5);
      }
    };
  }, [actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* gunakan scale dari hasil gltfjsx */}
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/hilu-ril/model-p.glb");
