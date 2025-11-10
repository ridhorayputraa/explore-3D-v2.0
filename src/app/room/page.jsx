"use client";
import FormFocusSection from "@/components/FormFocusSection";
import { MapMaka } from "@/components/MapMaka";
import { ModelHiluDraco } from "@/components/ModelHiluDraco";
import { ModelRocket } from "@/components/ModelRocket";
import { ModelRoomHero } from "@/components/ModelRoomHero";
import { AssetCacheProvider } from "@/provider/AssetCacheProvider";
import {
  GlobalCanvas,
  SmoothScrollbar,
  UseCanvas,
  ViewportScrollScene,
} from "@14islands/r3f-scroll-rig";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ScrollRig() {
  const [isTouch, setIsTouch] = useState(false);
  const canvasWrapper = useRef();

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  return (
    <AssetCacheProvider>
      <GlobalCanvas
        camera={{
          position: [1, 1, 100],
          fov: 30,
          near: 1, // depth precision
          far: 20000,
        }}
        style={{ position: "fixed", top: 0, left: 0 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
      </GlobalCanvas>

      <SmoothScrollbar>
        {(bind) => (
          <article {...bind} className="min-h-[100vh] bg-black text-white">
            <section className="h-screen flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold mb-4">Hilu</h1>
              <p className="max-w-md text-center text-gray-400">
                Lorem ipsum dolor sit
              </p>
            </section>
            <ModelMapSection />
            <ModelYamaGeludSection />
            <ModelYamaHiluSection />

            <ModelRocketSection />

            <section className="h-screen flex justify-center items-center text-gray-500">
              <p>END OF PAGE</p>
            </section>
          </article>
        )}
      </SmoothScrollbar>
    </AssetCacheProvider>
  );
}

function ModelMapSection() {
  const el = useRef();

  return (
    <section className="relative h-[100vh]">
      <div
        ref={el}
        className="ScrollScene h-screen flex justify-center items-center"
      />
      <UseCanvas>
        <RotatingModel el={el} />
      </UseCanvas>
    </section>
  );
}

function ModelYamaGeludSection() {
  const el = useRef();

  return (
    <section className="relative h-[100vh]">
      {/* elemen yang di-track untuk viewport scroll scene */}
      <div
        ref={el}
        className="ScrollScene h-screen flex justify-center items-center"
      />

      <UseCanvas>
        <ModelYamaGeludScene el={el} />
      </UseCanvas>
    </section>
  );
}

function ModelRocketSection() {
  const el = useRef();

  return (
    <section className="relative h-[300vh]">
      <div
        ref={el}
        className="ViewportScrollScene sticky top-0 h-screen flex justify-center items-center"
      />
      <UseCanvas>
        <ModelRocketScene el={el} />
      </UseCanvas>
    </section>
  );
}

function ModelYamaHiluSection() {
  const el = useRef();
  const formRef = useRef();
  // const { camera } = useThree();

  return (
    <section className="relative h-[100vh] flex justify-center items-center gap-10">
      <div className="w-full h-full flex">
        <div
          ref={el}
          className="ViewportScrollScene w-full h-screen flex justify-center items-center"
        />

        <div className="absolute">
          <FormFocusSection formRef={formRef} />
        </div>
      </div>

      <UseCanvas>
        <ModelYamaHiluScene el={el} formRef={formRef} />
      </UseCanvas>
      {/* <UseCanvas>
        <Suspense fallback={null}>
          <ModelHiluDraco /> 
        </Suspense>
      </UseCanvas> */}
    </section>
  );
}

function RotatingModel({ scale, scrollState, el }) {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = 0;
      ref.current.rotation.x = 0;
      // ref.current.rotation.y = scrollState.progress * Math.PI * 2;
      // ref.current.rotation.x = Math.sin(scrollState.progress * Math.PI) * 0.3;
    }
  });

  return (
    <ViewportScrollScene track={el} hideOffscreen={false} camera={camera}>
      {(props) => (
        <Suspense fallback={null}>
          <group ref={ref} scale={1}>
            {/* <ModelRoomHero /> */}

            <MapMaka />
          </group>
          <OrbitControls
            domElement={props.track.current}
            makeDefault
            enableZoom={false}
          />
        </Suspense>
      )}
    </ViewportScrollScene>
  );
}

function ModelYamaGeludScene({ el }) {
  const { camera } = useThree();

  return (
    <ViewportScrollScene track={el} hideOffscreen={false} camera={camera}>
      {() => (
        <Suspense fallback={null}>
          <group scale={1}>
            <ModelRoomHero />
          </group>

          <CameraFollowCursor />
        </Suspense>
      )}
    </ViewportScrollScene>
  );
}

function ModelRocketScene({ el }) {
  const { camera } = useThree();
  const rocketRef = useRef();
  const [avoidDirection, setAvoidDirection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const contentLeft = document.querySelector(".content-left");
      const rect = contentLeft?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        setAvoidDirection(1);
      } else {
        setAvoidDirection(-1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ViewportScrollScene
      frameloop="always"
      track={el}
      hideOffscreen={false}
      camera={camera}
    >
      {(scrollState) => (
        <Suspense fallback={null}>
          <group ref={rocketRef} scale={1}>
            <ModelRocket />
          </group>

          <RocketMotion
            rocketRef={rocketRef}
            scrollState={scrollState}
            avoidDirection={avoidDirection}
            el={el} // <--- tambahkan ini
          />

          <Environment preset="sunset" />
          <Grid args={[20, 20]} scale={0.5} fadeDistance={10} />
        </Suspense>
      )}
    </ViewportScrollScene>
  );
}

function ModelYamaHiluScene({ el, formRef }) {
  const { camera } = useThree();

  return (
    <ViewportScrollScene
      frameloop="always"
      track={el}
      hideOffscreen={false}
      camera={camera}
    >
      {(props) => (
        <Suspense fallback={null}>
          <group scale={1}>
            <ModelHiluDraco formRef={formRef} />
          </group>
          <Environment preset="sunset" />
          <Grid args={[20, 20]} scale={0.5} fadeDistance={10} />
        </Suspense>
      )}
    </ViewportScrollScene>
  );
}

function RocketMotion({ rocketRef, scrollState, avoidDirection, el }) {
  const targetPos = useRef(new THREE.Vector3());
  const targetRot = useRef(new THREE.Euler());

  useFrame(() => {
    if (!rocketRef.current || !el.current) return;

    let progress = scrollState?.progress || 0;

    const rect = el.current.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;

    const distanceFromCenter = viewportCenter - elementCenter;
    const normalized = THREE.MathUtils.clamp(
      0.5 + distanceFromCenter / viewportCenter / 2,
      0,
      1
    );
    progress = normalized;

    const y = progress * 40 - 20;
    const waveX = Math.sin(progress * Math.PI * 4) * 8 * avoidDirection;
    const rotZ = Math.sin(progress * Math.PI * 2) * 0.3 * avoidDirection;

    targetPos.current.set(waveX, y, 0);
    targetRot.current.set(0, 0, rotZ);

    rocketRef.current.position.lerp(targetPos.current, 0.1);
    rocketRef.current.rotation.x = THREE.MathUtils.lerp(
      rocketRef.current.rotation.x,
      targetRot.current.x,
      0.1
    );
    rocketRef.current.rotation.y = THREE.MathUtils.lerp(
      rocketRef.current.rotation.y,
      targetRot.current.y,
      0.1
    );
    rocketRef.current.rotation.z = THREE.MathUtils.lerp(
      rocketRef.current.rotation.z,
      targetRot.current.z,
      0.1
    );
  });

  return null;
}

function CameraFollowCursor() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const CAMERA_BASE = {
    position: [1, 1, 100],
    fov: 30,
    near: 1,
    far: 20000,
  };

  const MAX_ROTATE_X = 0.4;
  const MAX_ROTATE_Y = 0.6;
  const SMOOTHNESS = 0.05;
  const RADIUS = 100;

  useEffect(() => {
    camera.position.set(...CAMERA_BASE.position);
    camera.fov = CAMERA_BASE.fov;
    camera.near = CAMERA_BASE.near;
    camera.far = CAMERA_BASE.far;
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;

      target.current.x = -x * MAX_ROTATE_Y;
      target.current.y = y * MAX_ROTATE_X;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    mouse.current.x += (target.current.x - mouse.current.x) * SMOOTHNESS;
    mouse.current.y += (target.current.y - mouse.current.y) * SMOOTHNESS;

    const offsetX = Math.sin(mouse.current.x) * RADIUS;
    const offsetZ = Math.cos(mouse.current.x) * RADIUS;
    const offsetY = mouse.current.y * 50;

    camera.position.set(offsetX, offsetY, offsetZ);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
