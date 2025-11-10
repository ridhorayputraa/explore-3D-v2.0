import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function ModelRoomHero(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/room-hero/model.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);
  const looped = useRef(false);

  useEffect(() => {
    if (!actions) return;

    const allActions = Object.values(actions);
    if (!allActions.length) return;

    const mixers = new Set();

    allActions.forEach((action, index) => {
      if (!action) return;
      const clip = action.getClip();
      const mixer = action.getMixer();
      mixers.add(mixer);

      action.reset();
      action.enabled = true;
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();

      if (index === 1 && !looped.current) {
        const durationMs = clip.duration * 1000;

        const timer = setTimeout(() => {
          const loopAction = mixer.clipAction(clip, group.current);
          loopAction.reset();
          loopAction.enabled = true;
          loopAction.setLoop(THREE.LoopPingPong, Infinity);
          loopAction.clampWhenFinished = false;

          looped.current = true;
        }, Math.max(0, durationMs - 100));

        return () => clearTimeout(timer);
      }
    });

    return () => {
      allActions.forEach((action) => {
        if (action) action.stop();
      });
      mixers.forEach((mixer) => mixer.stopAllAction());
    };
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload("/room-hero/model.glb");
