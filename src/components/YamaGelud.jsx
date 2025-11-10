"use client";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function YamaGelud(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/yama-gelud/model.glb");

  // Clone biar animasi gak tumpang tindih kalau dipakai lebih dari satu instance
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, names } = useAnimations(animations, clone);

  // 🟢 Putar SEMUA animasi yang ada
  useEffect(() => {
    if (names.length > 0) {
      names.forEach((name) => {
        const action = actions[name];
        if (action) {
          action.reset().setLoop(THREE.LoopRepeat).fadeIn(0.5).play();
          console.log(`▶️ Playing animation: ${name}`);
        }
      });
    }

    // Cleanup saat unmount
    return () => {
      names.forEach((name) => {
        const action = actions[name];
        if (action) action.fadeOut(0.5).stop();
      });
    };
  }, [actions, names]);

  return (
    <group scale={0.5} ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}
