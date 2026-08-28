import { Suspense } from "react";
import Cloud from "./cloud";
import Base from "./base";
import Bottom from "./bottom";
import type { CityGeoJSON } from "@/types/map";

import hebeiMapData from "@/assets/sx.json";

const mapData = hebeiMapData as unknown as CityGeoJSON;

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Cloud />

      <Base data={mapData} />

      <Bottom />
    </Suspense>
  );
}
