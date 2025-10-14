import { useEffect } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

async function getFileSize(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const size = res.headers.get("content-length");

    if (size) return (size / 1024).toFixed(2);

    const blobRes = await fetch(url);
    const blob = await blobRes.blob();
    return (blob.size / 1024).toFixed(2);
  } catch (err) {
    console.warn("⚠️ Failed to fetch size for", url, err);
    return null;
  }
}

async function loadGLTFWithTiming(url) {
  const loader = new GLTFLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const start = performance.now();

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        const end = performance.now();
        resolve({ scene: gltf.scene, loadTime: end - start });
      },
      undefined,
      reject
    );
  });
}

export function useModelBenchmark(urls = []) {
  useEffect(() => {
    (async () => {
      console.group("🧩 Model Benchmark Results");

      for (const url of urls) {
        try {
          const { loadTime } = await loadGLTFWithTiming(url);
          const sizeKB = await getFileSize(url);

          console.log(`📦 ${url}`);
          console.log(`   Size: ${sizeKB ? `${sizeKB} KB` : "Unknown"}`);
          console.log(`   Load time: ${loadTime.toFixed(2)} ms`);
        } catch (err) {
          console.error(`❌ Failed to load ${url}`, err);
        }
      }

      console.groupEnd();
    })();
  }, [urls]);
}
