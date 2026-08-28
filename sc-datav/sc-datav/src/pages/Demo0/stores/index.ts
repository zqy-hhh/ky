import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface MapStyleStore {
  newStyle: boolean;
  pureMode: boolean;
  mapMode: "scenic" | "city";
  toggleMapStyle: () => void;
  togglePureMode: () => void;
  setMapMode: (mode: "scenic" | "city") => void;
}

export const useMapStyleStore = create<MapStyleStore>()(
  subscribeWithSelector((set) => ({
    newStyle: false,
    pureMode: false,
    mapMode: "scenic",
    toggleMapStyle: () => set((s) => ({ newStyle: !s.newStyle })),
    togglePureMode: () => set((s) => ({ pureMode: !s.pureMode })),
    setMapMode: (mode) => set({ mapMode: mode }),
  }))
);
