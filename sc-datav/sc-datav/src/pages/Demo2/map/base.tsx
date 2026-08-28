import { useLayoutEffect, useMemo, useRef } from "react";
import { Center, useTexture } from "@react-three/drei";
import {
  Box2,
  ClampToEdgeWrapping,
  DoubleSide,
  LineSegments,
  Mesh,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  type Group,
} from "three";
import { geoMercator } from "d3-geo";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import ShiftMaterial from "./shaderMaterial";
import GeoTrail from "./geoTrail";
import type { CityGeoJSON } from "@/types/map";
import ShapeBox from "./shape";
import FlyLine from "./flyLine";
import Boundary from "./boundary";
import Label from "./label";
import { useConfigStore } from "../stores";
import {
  createGeoOutlineGeometry,
  createGeoShapes,
  type ProjectedPolygon,
} from "@/utils/geoShapes";

import hebeiSatelliteMap from "@/assets/130000_z10.png";
import Cones from "./cone";
import ScenicMarkers from "@/components/scenicMarkers";

const MAP_CENTER: [number, number] = [116.4, 39.2];

export interface BaseProps {
  depth?: number;
  data: CityGeoJSON;
  outlineData?: CityGeoJSON;
}

export default function Base(props: BaseProps) {
  const { data, outlineData, depth = 1 } = props;
  const groupRef = useRef<Group>(null!);
  const camera = useThree((state) => state.camera);
  const mapMode = useConfigStore((state) => state.mapMode);

  const projection = useMemo(() => {
    return geoMercator()
      .center(MAP_CENTER)
      .translate([0, 0]);
  }, []);

  const { regions, bbox, boundary } = useMemo(() => {
    const regions: {
      name: string;
      center: Vector3;
      polygons: ProjectedPolygon[];
    }[] = [];
    const bbox = new Box2();

    const toV2 = (coord: number[]) => {
      const [x, y] = projection(coord as [number, number])!;
      const projected = new Vector2(x, -y);
      bbox.expandByPoint(projected);
      return projected;
    };

    data.features.forEach((feature) => {
      const [x, y] = projection(
        feature.properties.centroid ?? feature.properties.center
      )!;

      const polygons = normalizePolygons(feature).map((polygon) =>
        polygon.map<Vector2[]>((coordinates) => coordinates.map(toV2))
      );

      regions.push({
        name: feature.properties.name,
        center: new Vector3(x, -y),
        polygons,
      });
    });

    let boundary = [] as ReturnType<typeof createGeoShapes>;

    outlineData?.features.forEach((feature) => {
      const polygons = normalizePolygons(feature).map((polygon) =>
        polygon.map((coordinates) => coordinates.map(toV2))
      );
      boundary = boundary.concat(createGeoShapes(polygons));
    });

    return {
      regions,
      bbox,
      boundary,
    };
  }, [projection]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const tl = gsap.timeline();

    tl.to(camera.position, {
      x: 0,
      y: 10,
      z: 14,
      duration: 2.5,
      // delay: 2,
      ease: "circ.out",
      onUpdate: () => camera.lookAt(0, 0, 0),
      onComplete: () => {
        useConfigStore.setState({ mapPlayComplete: true });
      },
    });
    tl.to(groupRef.current.position, { x: 0, y: 0, z: 0, duration: 1 }, 2.5);

    tl.to(
      groupRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "circ.out",
      },
      2.5
    );
    groupRef.current.traverse((obj) => {
      if (
        !obj.userData.skipIntroAnimation &&
        (obj instanceof Mesh || obj instanceof LineSegments)
      ) {
        tl.to(obj.material, { opacity: 1, duration: 1, ease: "circ.out" }, 2.5);
      }
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  return (
    <Center top>
      <group
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.2, 0]}>
        <group ref={groupRef} scale={[1, 1, 0]} position={[0, 0, -0.01]}>
          {regions.map((region, idx) => (
            <City
              key={region.name + idx}
              depth={depth}
              bbox={bbox}
              data={region}
              showLabel={mapMode === "city"}
            />
          ))}
          {outlineData && (
            <GeoTrail
              projection={projection}
              feature={outlineData.features[0]}
            />
          )}
          <group visible={mapMode === "city"}>
            <Cones data={regions} />
            <FlyLine data={regions} />
          </group>
          <Boundary data={boundary} />
          {mapMode === "scenic" && (
            <ScenicMarkers
              projection={projection}
              depth={depth + 0.28}
              size={0.12}
              variant="beam"
              showLabels
              onSelect={(spot) => useConfigStore.getState().selectScenic(spot)}
            />
          )}
        </group>
      </group>
    </Center>
  );
}

function normalizePolygons(feature: CityGeoJSON["features"][number]) {
  return feature.geometry.type === "Polygon"
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
}

function City(props: {
  depth: number;
  bbox: Box2;
  showLabel: boolean;
  data: {
    name: string;
    center: Vector3;
    polygons: ProjectedPolygon[];
  };
}) {
  const { bbox, data, depth, showLabel } = props;
  const materialRef = useRef<ShaderMaterial>(null!);
  const groupRef = useRef<Group>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));

  const texture = useTexture(hebeiSatelliteMap);

  useLayoutEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
    texture.needsUpdate = true;
  }, [texture]);

  const [shape, shapeGeometry] = useMemo(() => {
    const shapes = createGeoShapes(data.polygons);
    const shapeGeometry = createGeoOutlineGeometry(data.polygons);
    return [shapes, shapeGeometry];
  }, [data.polygons]);

  useFrame((_, delta) => {
    groupRef.current.scale.lerp(vector3.current, 0.1);
    materialRef.current.uniforms.time.value += delta / 3;
  });

  return (
    <object3D
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        vector3.current.setZ(1.5);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        vector3.current.setZ(1);
        document.body.style.cursor = "auto";
      }}
      //   onClick={(e) => {
      //     e.stopPropagation();
      //     gsap.to(e.camera.position, {
      //       x: e.object.position.x,
      //       y: e.object.position.y,
      //       z: e.object.position.z,
      //       duration: 2,
      //     });
      //   }}
    >
      <ShapeBox bbox={bbox} args={[shape, { depth, bevelEnabled: false }]}>
        <meshBasicMaterial
          transparent
          attach="material-0"
          map={texture}
          alphaTest={0.02}
          side={DoubleSide}
          opacity={0}
          toneMapped={false}
        />
        <ShiftMaterial
          transparent
          attach="material-1"
          ref={materialRef}
          opacity={0}
          depth={depth}
        />
      </ShapeBox>
      <lineSegments position={[0, 0, depth + 0.05]} raycast={() => null}>
        <primitive attach="geometry" object={shapeGeometry} />
        <lineBasicMaterial transparent color="#ffffff" opacity={0} />
      </lineSegments>
      {showLabel && (
        <Label
          center
          position={[data.center.x, data.center.y, depth + 0.2]}
          distanceFactor={10}
          zIndexRange={[100 - 1000]}>
          {data.name}
        </Label>
      )}
    </object3D>
  );
}
