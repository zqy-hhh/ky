import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { ScenicSpot } from "@/data/scenicSpots";
import type { ScenicCategoryId } from "@/data/scenicCategories";

interface ConfigStore {
  mapPlayComplete: boolean;
  cloud: boolean;
  bar: boolean;
  rotation: boolean;
  heat: boolean;
  mode: boolean;
  mapMode: "scenic" | "city";
  selectedScenic: ScenicSpot | null;
  scenicCategory: ScenicCategoryId;
  toggle: (key: "cloud" | "bar" | "rotation" | "heat" | "mode") => void;
  setMapMode: (mode: "scenic" | "city") => void;
  selectScenic: (spot: ScenicSpot | null) => void;
  setScenicCategory: (category: ScenicCategoryId) => void;
  reset: () => void;
}

export const useConfigStore = create<ConfigStore>()(
  subscribeWithSelector((set, _, store) => ({
    mapPlayComplete: false,
    cloud: true,
    bar: true,
    rotation: true,
    heat: true,
    mode: true,
    mapMode: "scenic",
    selectedScenic: null,
    scenicCategory: "culture",
    toggle: (key) => set((state) => ({ [key]: !state[key] })),
    setMapMode: (mode) => set({ mapMode: mode }),
    selectScenic: (spot) => set({ selectedScenic: spot }),
    setScenicCategory: (category) => set({ scenicCategory: category }),
    reset: () => set(store.getInitialState()),
  }))
);