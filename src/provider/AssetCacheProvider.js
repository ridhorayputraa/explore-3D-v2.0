"use client";

import { createContext, useContext, useRef, useEffect } from "react";
import * as THREE from "three";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";

const AssetCacheContext = createContext();
let isKTX2Ready = false;
let ktx2Loader = null;

export function AssetCacheProvider({ children }) {
  const cacheRef = useRef(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || isKTX2Ready) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    ktx2Loader = new KTX2Loader()
      .setTranscoderPath("/basis/") // ✅ pastikan /public/basis/ ada isi transcoder
      .detectSupport(renderer);

    isKTX2Ready = true;
    console.log("✅ KTX2Loader siap dan global!");
  }, []);

  const getModel = (url) => {
    if (!cacheRef.current.has(url)) {
      if (!isKTX2Ready || !ktx2Loader) {
        console.warn("⚠️ KTX2Loader belum siap, model diload tanpa KTX2 support");
      }

      // Buat instance GLTFLoader sendiri supaya bisa inject loader
      const loader = new GLTFLoader();
      if (ktx2Loader) loader.setKTX2Loader(ktx2Loader);

      const model = useGLTF(url, true, true, loader);
      cacheRef.current.set(url, model);
    }

    return cacheRef.current.get(url);
  };

  return (
    <AssetCacheContext.Provider value={{ getModel }}>
      {children}
    </AssetCacheContext.Provider>
  );
}

export const useAssetCache = () => useContext(AssetCacheContext);
