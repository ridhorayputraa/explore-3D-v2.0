import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function ModelRoomHero(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/room-hero/model.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const [playedOnce, setPlayedOnce] = useState(false);

  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((action, index) => {
      const clip = action.getClip();

      // Reset dan play semua
      action.reset().fadeIn(0.5).play();

      if (index === 1) {
        if (playedOnce) {
          // 👉 Loop kedua dan seterusnya: cuma 0.5 → 1
          const halfTime = clip.duration * 0.2;
          action.time = halfTime;
          action.setLoop(THREE.LoopPingPong, Infinity);
          action.clampWhenFinished = false;
        } else {
          // 👉 Pertama kali: 0 → 1
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;

          // Setelah selesai pertama kali, ubah jadi loop 0.5 → 1
          action.getMixer().addEventListener("finished", (e) => {
            if (e.action === action) {
              const halfTime = clip.duration * 1;
              action.reset();
              action.time = halfTime;
              action.setLoop(THREE.LoopPingPong, Infinity);
              action.play();
              setPlayedOnce(true);
            }
          });
        }
      } else {
        // 👉 Animasi lain: jalan sekali aja
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      }
    });

    return () => {
      Object.values(actions || {}).forEach((action) => action?.stop?.());
    };
  }, [actions, playedOnce]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/room-hero/model.glb");
