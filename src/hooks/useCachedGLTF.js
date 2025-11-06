"use client";

import { useAssetCache } from "@/provider/AssetCacheProvider";


export function useCachedGLTF(url) {
  const { getModel } = useAssetCache();
  return getModel(url);
}
