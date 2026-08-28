import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { ScenicSpot } from "@/data/scenicSpots";

interface ConfigStore {
  mapPlayComplete: boolean;
  mapMode: "scenic" | "city";
  selectedScenic: ScenicSpot | null;
  selectScenic: (spot: ScenicSpot | null) => void;
  setMapMode: (mode: "scenic" | "city") => void;
  reset: () => void;
}

export const useConfigStore = create<ConfigStore>()(
  subscribeWithSelector((set, _, store) => ({
    mapPlayComplete: false,
    mapMode: "scenic",
    selectedScenic: null,
    selectScenic: (spot) => set({ selectedScenic: spot }),
    setMapMode: (mode) =>
      set((state) => ({
        mapMode: mode,
        selectedScenic: mode === "city" ? null : state.selectedScenic,
      })),
    reset: () => set(store.getInitialState()),
  }))
);
