import { use, useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import {
  Box2,
  ClampToEdgeWrapping,
  LineSegments,
  Mesh,
  SRGBColorSpace,
  Vector2,
  type Group,
} from "three";
import { geoMercator } from "d3-geo";
import type { CityGeoJSON } from "@/types/map";
import City, { type CityProps } from "./city";
import loadTexture from "../helpers/loadTexture";
import { useConfigStore } from "../stores";

import map from "@/assets/130000_z10.png";
import Heatmap from "./heatmap";
import ScenicMarkers from "@/components/scenicMarkers";

const MAP_CENTER: [number, number] = [116.4, 39.2];

export interface BaseProps {
  depth?: number;
  data: CityGeoJSON;
  outlineData?: CityGeoJSON;
}

const satelliteTexture = loadTexture(map, (texture) => {
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
  texture.needsUpdate = true;
});

export default function Base(props: BaseProps) {
  const { data, depth = 6 } = props;
  const groupRef = useRef<Group>(null!);
  const camera = useThree((state) => state.camera);
  const mapMode = useConfigStore((state) => state.mapMode);

  const texture = use(satelliteTexture);

  const projection = useMemo(() => {
    return geoMercator()
      .center(MAP_CENTER)
      .scale(1000)
      .translate([0, 0]);
  }, [data]);

  const { regions, bbox } = useMemo(() => {
    const regions: CityProps["data"][] = [];
    const bbox = new Box2();

    const toV2 = (coord: number[]) => {
      const [x, y] = projection(coord as [number, number])!;
      const projected = new Vector2(x, -y);
      bbox.expandByPoint(projected);
      return projected;
    };

    data.features.forEach((feature) => {
      const polygons = normalizePolygons(feature).map((polygon) =>
        polygon.map<Vector2[]>((coordinates) => coordinates.map(toV2))
      );

      const [x, y] = projection(
        feature.properties.centroid ?? feature.properties.center
      )!;

      regions.push({
        city: feature.properties.name,
        cityId: [x, -y, depth + 0.1],
        polygons,
      });
    });

    return {
      regions,
      bbox,
    };
  }, [projection, data, depth]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        useConfigStore.setState({ mapPlayComplete: true });
      },
    });

    tl.to(camera.position, {
      x: 0,
      y: 115,
      z: 155,
      duration: 2,
      ease: "circ.out",
    });
    tl.to(
      groupRef.current.scale,
      { x: 1, y: 1, z: 1, duration: 1, ease: "circ.out" },
      2
    );
    groupRef.current.traverse((obj) => {
      if (
        !obj.userData.skipIntroAnimation &&
        (obj instanceof Mesh || obj instanceof LineSegments)
      ) {
        tl.to(obj.material, { opacity: 1, duration: 1, ease: "circ.out" }, 2);
      }
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  return (
    <group
      ref={groupRef}
      rotation={[-Math.PI / 2, 0, 0]}
      scale-z={0.01}
      position-x={0}>
      {regions.map((region, idx) => (
        <City
          key={idx}
          depth={depth}
          bbox={bbox}
          data={region}
          map={texture}
          showCityMarker={mapMode === "city"}
        />
      ))}
      <Heatmap
        renderOrder={11}
        projection={projection}
        position-z={depth + 1}
      />
      {mapMode === "scenic" && (
        <ScenicMarkers
          projection={projection}
          depth={depth + 1.3}
          size={0.55}
          tooltipDistanceFactor={100}
          variant="beam"
          showLabels
          beamHeight={4.5}
        />
      )}
    </group>
  );
}

function normalizePolygons(feature: CityGeoJSON["features"][number]) {
  return feature.geometry.type === "Polygon"
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
}
