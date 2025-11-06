"use client";
import { useScrollRig } from "@14islands/r3f-scroll-rig";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export function ModelHiluDraco({ formRef, ...props }) {
  const group = useRef();
  const eyeRef = useRef();
  const { gl, invalidate } = useThree();
  const { requestRender } = useScrollRig();

  const { scene, animations } = useGLTF("/yama-hilu/modelHiluDraco.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, names } = useAnimations(animations, clone);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInForm, setIsInForm] = useState(false);
  const [isReturningToIdle, setIsReturningToIdle] = useState(false);

  const firstAction = names.length ? actions[names[0]] : null;

  // 🧩 Main idle animation
  useEffect(() => {
    if (firstAction) {
      firstAction.reset().setLoop(THREE.LoopRepeat).fadeIn(0.5).play();
    }
    return () => {
      if (firstAction) firstAction.fadeOut(0.5);
    };
  }, [firstAction]);

  useEffect(() => {
    clone.traverse((obj) => {
      if (obj.isBone && obj.name.toLowerCase() === "head") {
        eyeRef.current = obj;
        console.log("✅ Bone Head ditemukan:", obj.name);
      }
    });
  }, [clone]);

  useEffect(() => {
    let lastTime = 0;

    const handleMove = (e) => {
      const now = performance.now();
      if (now - lastTime < 16) return; // throttle biar gak terlalu berat (60fps)
      lastTime = now;

      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePos({ x, y });

      // 🧩 Ini bagian penting: gunakan ScrollRig render loop, bukan invalidate()
      requestRender();
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [gl, requestRender]);

  useEffect(() => {
    if (!formRef?.current) return;

    const formEl = formRef.current;

    const handleEnter = () => setIsInForm(true);
    const handleLeave = () => setIsInForm(false);

    formEl.addEventListener("mouseenter", handleEnter);
    formEl.addEventListener("mouseleave", handleLeave);

    return () => {
      formEl.removeEventListener("mouseenter", handleEnter);
      formEl.removeEventListener("mouseleave", handleLeave);
    };
  }, [formRef]);

  const lastHeadRotation = useRef({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    const head = eyeRef.current;
    if (!head) return;

    if (isInForm) {
      if (firstAction?.isRunning()) {
        firstAction.fadeOut(0.3);
        firstAction.paused = true;
      }

      const rotX = THREE.MathUtils.lerp(
        head.rotation.x,
        -mousePos.y * 0.3,
        0.05
      );
      const rotY = THREE.MathUtils.lerp(
        head.rotation.y,
        mousePos.x * 0.5,
        0.05
      );

      head.rotation.x = THREE.MathUtils.clamp(rotX, -0.3, 0.3);
      head.rotation.y = THREE.MathUtils.clamp(rotY, -0.5, 0.5);
    } else {
      head.rotation.x = THREE.MathUtils.lerp(
        head.rotation.x,
        lastHeadRotation.current.x,
        0.05
      );
      head.rotation.y = THREE.MathUtils.lerp(
        head.rotation.y,
        lastHeadRotation.current.y,
        0.05
      );

      if (!firstAction?.isRunning() && !isReturningToIdle) {
        setIsReturningToIdle(true);
        let progress = 0;

        const transition = () => {
          if (!eyeRef.current) return;
          progress += 0.05;

          eyeRef.current.rotation.x = THREE.MathUtils.lerp(
            eyeRef.current.rotation.x,
            lastHeadRotation.current.x,
            progress
          );
          eyeRef.current.rotation.y = THREE.MathUtils.lerp(
            eyeRef.current.rotation.y,
            lastHeadRotation.current.y,
            progress
          );

          requestRender();

          if (progress < 1) {
            requestAnimationFrame(transition);
          } else {
            firstAction.paused = false;
            firstAction.reset().fadeIn(0.5).play();
            setIsReturningToIdle(false);
          }
        };

        transition();
      }
    }

    requestRender();
  });

  return <primitive ref={group} object={clone} {...props} scale={19.249} />;
}

useGLTF.preload("/yama-hilu/modelHiluDraco.glb");
