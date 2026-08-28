import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  DoubleSide,
  Vector3,
  type Box2,
  type Group,
  type MeshStandardMaterialProperties,
} from "three";
import ShapeMesh from "./shape";
import Tooltip from "./tooltip";
import Bar from "./bar";
import Label from "./label";
import {
  createGeoOutlineGeometry,
  createGeoShapes,
  type ProjectedPolygon,
} from "@/utils/geoShapes";

import cityData from "../cityData";

export interface CityProps extends Pick<MeshStandardMaterialProperties, "map"> {
  bbox: Box2;
  depth: number;
  data: {
    city: string;
    cityId: [x: number, y: number, z: number];
    polygons: ProjectedPolygon[];
  };
  showCityMarker: boolean;
}

export default function City(props: CityProps) {
  const { data, bbox, depth, map, showCityMarker } = props;
  const groupRef = useRef<Group>(null!);
  const tooltipRef = useRef<{ open: () => void; close: () => void }>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));

  const [shape, shapeGeometry] = useMemo(() => {
    const shapes = createGeoShapes(data.polygons);
    const shapeGeometry = createGeoOutlineGeometry(data.polygons);
    return [shapes, shapeGeometry];
  }, [data.polygons]);

  useFrame(() => {
    groupRef.current.scale.lerp(vector3.current, 0.1);
  });

  const cityEvents = showCityMarker
    ? {
        onPointerOver: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          vector3.current.setZ(1.5);
          tooltipRef.current.open();
          document.body.style.cursor = "pointer";
        },
        onPointerOut: () => {
          vector3.current.setZ(1);
          tooltipRef.current.close();
          document.body.style.cursor = "auto";
        },
      }
    : {};

  return (
    <group ref={groupRef} {...cityEvents}>
      <ShapeMesh position-z={depth + 0.1} bbox={bbox} args={[shape]}>
        <meshBasicMaterial
          map={map}
          transparent
          alphaTest={0.02}
          toneMapped={false}
        />
      </ShapeMesh>
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[shape, { depth, steps: 1, bevelEnabled: false }]}
        />
        <meshStandardMaterial
          transparent
          opacity={0}
          metalness={0.2}
          roughness={0.5}
          side={DoubleSide}
          color="#f9f3e7"
        />
      </mesh>
      <lineSegments position-z={depth + 0.2} raycast={() => null}>
        <primitive attach="geometry" object={shapeGeometry} />
        <lineBasicMaterial transparent opacity={0} color="#ffffff" />
      </lineSegments>

      {showCityMarker && (
        <Bar
          position={data.cityId}
          value={cityData[data.city as keyof typeof cityData]?.population ?? 0}>
          {(barHeight) => (
            <>
              <Label
                center
                position={[0, 0, barHeight + 0.2]}
                distanceFactor={100}
                zIndexRange={[100 - 1000]}>
                {data.city}
              </Label>
              <Tooltip
                ref={tooltipRef}
                data={{
                  city: data.city,
                  ...cityData[data.city as keyof typeof cityData],
                }}
                position={[0, 0, barHeight + 7]}
                visible={false}
              />
            </>
          )}
        </Bar>
      )}
    </group>
  );
}
