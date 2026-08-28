import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ConfigStore {
  mapPlayComplete: boolean;
  cloud: boolean;
  bar: boolean;
  rotation: boolean;
  heat: boolean;
  mode: boolean;
  mapMode: "scenic" | "city";
  toggle: (key: "cloud" | "bar" | "rotation" | "heat" | "mode") => void;
  setMapMode: (mode: "scenic" | "city") => void;
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
    toggle: (key) => set((s) => ({ [key]: !s[key] })),
    setMapMode: (mode) => set({ mapMode: mode }),
    reset: () => set(store.getInitialState()),
  }))
);
