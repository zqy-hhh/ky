import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { ScenicSpot } from "@/data/scenicSpots";

interface ConfigStore {
  mapPlayComplete: boolean;
  cloud: boolean;
  bar: boolean;
  rotation: boolean;
  heat: boolean;
  mode: boolean;
  mapMode: "scenic" | "city";
  selectedScenic: ScenicSpot | null;
  toggle: (key: "cloud" | "bar" | "rotation" | "heat" | "mode") => void;
  setMapMode: (mode: "scenic" | "city") => void;
  selectScenic: (spot: ScenicSpot | null) => void;
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
    toggle: (key) => set((state) => ({ [key]: !state[key] })),
    setMapMode: (mode) => set({ mapMode: mode }),
    selectScenic: (spot) => set({ selectedScenic: spot }),
    reset: () => set(store.getInitialState()),
  }))
);