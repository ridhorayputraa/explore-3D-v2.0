"use client";

import { UseCanvas } from "@14islands/r3f-scroll-rig";

import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { ModelMapBakeDrako } from "./ModelMapBakeDrako";
import { ModelMapBake } from "./ModelMapBake";

export default function HtmlComponent() {
  const el = useRef();
  return (
    <>
      <UseCanvas>
        <PresentationControls
          scale={12}
          global // Apply controls globally to the entire scene
          cursor={true} // Show a cursor while dragging
          snap // Snap back to initial position after interaction
          speed={1} // Control the animation speed
          zoom={10} // Control the zoom factor
          rotation={[0, 0, 0]} // Initial rotation
        >
          <ModelMapBake />
          {/* <ModelMapBakeDrako /> */}
          {/* <SpaceShipScaled /> */}
          {/* <SpaceShip /> */}
        </PresentationControls>
      </UseCanvas>
    </>
  );
}
