import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import type { ScenicSpot } from "@/data/scenicSpots";
import type { ScenicCategoryId } from "@/data/scenicCategories";

interface ConfigStore {
  mapPlayComplete: boolean;
  mapMode: "scenic" | "city";
  selectedScenic: ScenicSpot | null;
  scenicCategory: ScenicCategoryId;
  selectScenic: (spot: ScenicSpot | null) => void;
  setScenicCategory: (category: ScenicCategoryId) => void;
  setMapMode: (mode: "scenic" | "city") => void;
  reset: () => void;
}

export const useConfigStore = create<ConfigStore>()(
  subscribeWithSelector((set, _, store) => ({
    mapPlayComplete: false,
    mapMode: "scenic",
    selectedScenic: null,
    scenicCategory: "culture",
    selectScenic: (spot) => set({ selectedScenic: spot }),
    setScenicCategory: (category) => set({ scenicCategory: category }),
    setMapMode: (mode) =>
      set((state) => ({
        mapMode: mode,
        selectedScenic: mode === "city" ? null : state.selectedScenic,
      })),
    reset: () => set(store.getInitialState()),
  }))
);
