"use client";
import { GlobalCanvas } from "@14islands/r3f-scroll-rig";
import { Perf } from "r3f-perf";

function Layout3d({ children }) {
  return (
    <div className="w-full h-screen">
      <GlobalCanvas camera={{ position: [0, 0, 10], fov: 20 }}>
        <Perf position="top-right" />
      </GlobalCanvas>
      {children}
    </div>
  );
}

export default Layout3d;
