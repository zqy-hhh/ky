import {
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { Billboard, Center, Line, Text, useTexture } from "@react-three/drei";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { geoMercator } from "d3-geo";
import { gsap } from "gsap";
import {
  Box2,
  BufferGeometry,
  CatmullRomCurve3,
  ClampToEdgeWrapping,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  SRGBColorSpace,
  Vector2,
  Vector3,
  type IUniform,
} from "three";
import FlyLine from "./flyLine";
import ScenicMarkers from "@/components/scenicMarkers";
import { useMapStyleStore } from "../stores";
import {
  createGeoOutlineGeometry,
  createGeoShapes,
  type ProjectedPolygon,
} from "@/utils/geoShapes";

import hebeiMapData from "@/assets/sx.json";
import hebeiSatelliteMap from "@/assets/130000_z10.png";

type LngLat = [number, number];
type Ring = LngLat[];
type PolygonCoordinates = Ring[];
type MultiPolygonCoordinates = PolygonCoordinates[];

interface HebeiProperties {
  name: string;
  fullname?: string;
  center: LngLat;
  centroid?: LngLat;
  code?: string;
}

type HebeiFeature = {
  type: "Feature";
  properties: HebeiProperties;
  geometry:
    | { type: "Polygon"; coordinates: PolygonCoordinates }
    | { type: "MultiPolygon"; coordinates: MultiPolygonCoordinates };
};

type HebeiGeoJSON = {
  type: "FeatureCollection";
  features: HebeiFeature[];
  properties?: HebeiProperties;
};

type Region = {
  name: string;
  center: Vector3;
  polygons: ProjectedPolygon[];
};

const data = hebeiMapData as unknown as HebeiGeoJSON;
const MAP_CENTER: LngLat = [116.4, 39.2];
const MAP_SCALE = 150;
const MAP_GROUP_SCALE = 0.55;
const EXTRUDE_DEPTH = 0.5;

export default function SCMap() {
  const camera = useThree((state) => state.camera);
  const mapMode = useMapStyleStore((state) => state.mapMode);

  const projection = useMemo(() => {
    return geoMercator()
      .center(MAP_CENTER)
      .scale(MAP_SCALE)
      .translate([0, 0]);
  }, []);

  const { regions, bbox, outlineRings } = useMemo(() => {
    const regions: Region[] = [];
    const bbox = new Box2();

    const toV2 = (coord: LngLat) => {
      const [x, y] = projection(coord)!;
      const projected = new Vector2(x, -y);
      bbox.expandByPoint(projected);
      return projected;
    };

    data.features.forEach((feature) => {
      const labelCoord = feature.properties.centroid ?? feature.properties.center;
      const [x, y] = projection(labelCoord)!;
      const polygons = normalizePolygons(feature);
      const projectedPolygons = polygons.map((polygon) =>
        polygon.map((ring) => ring.map(toV2))
      );

      regions.push({
        name: feature.properties.name,
        center: new Vector3(x, -y, EXTRUDE_DEPTH + 0.16),
        polygons: projectedPolygons,
      });
    });

    const outlineRings = buildProvinceOutline(data).map((ring) =>
      ring.map((coord) => {
        const [x, y] = projection(coord)!;
        return new Vector3(x, -y, EXTRUDE_DEPTH + 0.04);
      })
    );

    return { regions, bbox, outlineRings };
  }, [projection]);

  useLayoutEffect(() => {
    camera.position.set(0, 18, 20);
    camera.lookAt(0, 0, 0);

    const tween = gsap.to(camera.position, {
      x: 0,
      y: 10,
      z: 14,
      duration: 1.5,
      ease: "sine.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
    });

    return () => {
      tween.kill();
    };
  }, [camera]);

  return (
    <Center top>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={MAP_GROUP_SCALE}
        position={[0, 0, 0]}>
        <group renderOrder={0}>
          {regions.map((region) => (
            <RegionMesh
              key={region.name}
              region={region}
              bbox={bbox}
              depth={EXTRUDE_DEPTH}
              showCityLabel={mapMode === "city"}
            />
          ))}
        </group>

        <group renderOrder={8}>
          {outlineRings.map((ring, index) => (
            <Line
              key={`hebei-outline-${index}`}
              points={ring}
              color="#76f6ff"
              linewidth={2}
            />
          ))}
          <OutlineFlow rings={outlineRings} />
        </group>

        <group visible={mapMode === "city"}>
          <FlyLine projection={projection} depth={EXTRUDE_DEPTH + 0.14} />
        </group>
        {mapMode === "scenic" && (
          <ScenicMarkers
            projection={projection}
            depth={EXTRUDE_DEPTH + 0.22}
            size={0.11}
            variant="beam"
            showLabels
          />
        )}
      </group>
    </Center>
  );
}

function RegionMesh(props: {
  region: Region;
  bbox: Box2;
  depth: number;
  showCityLabel: boolean;
}) {
  const { region, bbox, depth, showCityLabel } = props;
  const textureMap = useTexture(hebeiSatelliteMap);

  useLayoutEffect(() => {
    textureMap.colorSpace = SRGBColorSpace;
    textureMap.wrapS = textureMap.wrapT = ClampToEdgeWrapping;
    textureMap.needsUpdate = true;
  }, [textureMap]);

  const [shapes, edgeGeometry] = useMemo(() => {
    const shapes = createGeoShapes(region.polygons);
    return [shapes, createGeoOutlineGeometry(region.polygons)];
  }, [region.polygons]);

  return (
    <object3D>
      <ExtrudeShape bbox={bbox} args={[shapes, { depth, bevelEnabled: false }]}>
        <meshBasicMaterial
          attach="material-0"
          map={textureMap}
          transparent
          alphaTest={0.02}
          side={DoubleSide}
          toneMapped={false}
        />
        <SideSweepMaterial attach="material-1" />
      </ExtrudeShape>

      <lineSegments position={[0, 0, depth + 0.02]} raycast={() => null}>
        <primitive attach="geometry" object={edgeGeometry} />
        <lineBasicMaterial
          transparent
          color="#b8fbff"
          opacity={0.45}
          depthWrite={false}
        />
      </lineSegments>

      {showCityLabel && (
        <Billboard position={region.center}>
          <Text
            color="#ffffff"
            fontSize={0.28}
            fontWeight={600}
            outlineWidth={0.01}
            outlineColor="#0b1820">
            {region.name}
          </Text>
        </Billboard>
      )}
    </object3D>
  );
}

type ExtrudeShapeProps = Omit<React.JSX.IntrinsicElements["mesh"], "args"> & {
  args?: ThreeElements["extrudeGeometry"]["args"];
  bbox: Box2;
  children: ReactNode;
};

function ExtrudeShape(props: ExtrudeShapeProps) {
  const { args, bbox, children, ...meshProps } = props;
  const meshRef = useRef<Mesh>(null!);

  useLayoutEffect(() => {
    const { geometry } = meshRef.current;
    const pos = geometry.attributes.position;
    const width = bbox.max.x - bbox.min.x || 1;
    const height = bbox.max.y - bbox.min.y || 1;
    const uv: number[] = [];

    for (let i = 0; i < pos.count; i += 1) {
      const u = (pos.getX(i) - bbox.min.x) / width;
      const v = (pos.getY(i) - bbox.min.y) / height;
      uv.push(u, v);
    }

    geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  }, [bbox]);

  return (
    <mesh ref={meshRef} {...meshProps}>
      <extrudeGeometry attach="geometry" args={args} />
      {children}
    </mesh>
  );
}

function SideSweepMaterial(props: { attach?: string }) {
  const uniformsRef = useRef<{
    uRiseTime: IUniform<number>;
    uRiseColor: IUniform<Color>;
  }>({
    uRiseTime: { value: -0.8 },
    uRiseColor: { value: new Color("#9be7dd") },
  });

  useFrame(() => {
    uniformsRef.current.uRiseTime.value =
      uniformsRef.current.uRiseTime.value >= 0.5
        ? -0.8
        : uniformsRef.current.uRiseTime.value + 0.003;
  });

  return (
    <meshPhysicalMaterial
      attach={props.attach}
      transparent
      opacity={0.92}
      color="#0e171a"
      onBeforeCompile={(shader) => {
        shader.uniforms = {
          ...shader.uniforms,
          ...uniformsRef.current,
        };

        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            `
              #include <common>
              varying vec3 vTransformedNormal;
              varying float vHeight;
            `
          )
          .replace(
            "#include <begin_vertex>",
            `
              #include <begin_vertex>
              vTransformedNormal = normalize(normal);
              vHeight = transformed.z;
            `
          );

        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `
              #include <common>
              uniform vec3 uRiseColor;
              uniform float uRiseTime;
              varying float vHeight;
              varying vec3 vTransformedNormal;

              vec3 riseLine() {
                float smoothness = 0.5;
                float speed = uRiseTime;
                bool isTopBottom = (vTransformedNormal.z > 0.0 || vTransformedNormal.z < 0.0) && vTransformedNormal.x == 0.0 && vTransformedNormal.y == 0.0;
                float ratio = isTopBottom ? 0.0 : smoothstep(speed, speed + smoothness, vHeight) - smoothstep(speed + smoothness, speed + smoothness * 2.0, vHeight);
                return uRiseColor * ratio;
              }
            `
          )
          .replace(
            "#include <dithering_fragment>",
            `
              #include <dithering_fragment>
              gl_FragColor = gl_FragColor + vec4(riseLine(), 1.0);
            `
          );
      }}
    />
  );
}

function OutlineFlow(props: { rings: Vector3[][] }) {
  const { rings } = props;
  const geometry = useRef(new BufferGeometry());
  const index = useRef(0);
  const segmentLength = useRef(50);
  const sourcePoints = useMemo(() => {
    const sourceRing = rings.reduce<Vector3[]>(
      (longest, ring) => (ring.length > longest.length ? ring : longest),
      []
    );

    if (sourceRing.length < 4) return [];
    return new CatmullRomCurve3(sourceRing, true).getSpacedPoints(900);
  }, [rings]);

  useLayoutEffect(() => {
    if (sourcePoints.length === 0) return;

    index.current = Math.floor(
      Math.max(sourcePoints.length - segmentLength.current, 1) * Math.random()
    );
    updateFlowGeometry(geometry.current, sourcePoints, index.current, segmentLength.current);
  }, [sourcePoints]);

  useFrame((_, delta) => {
    if (sourcePoints.length === 0) return;

    index.current = (index.current + 60 * delta) % sourcePoints.length;
    updateFlowGeometry(geometry.current, sourcePoints, index.current, segmentLength.current);
  });

  if (sourcePoints.length === 0) return null;

  return (
    <points geometry={geometry.current} renderOrder={12}>
      <pointsMaterial
        transparent
        color="#ffffff"
        size={0.22}
        depthWrite={false}
        onBeforeCompile={(shader) => {
          shader.vertexShader = shader.vertexShader
            .replace("void main() {", "attribute float percent;\nvoid main() {")
            .replace("gl_PointSize = size;", "gl_PointSize = percent * size;");

          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <output_fragment>",
            `
              #include <output_fragment>
              float r = distance(gl_PointCoord, vec2(0.5));
              float alpha = pow(1.0 - r / 0.5, 6.0);
              gl_FragColor = vec4(gl_FragColor.rgb, gl_FragColor.a * alpha);
            `
          );
        }}
      />
    </points>
  );
}

function updateFlowGeometry(
  geometry: BufferGeometry,
  points: Vector3[],
  startIndex: number,
  length: number
) {
  const start = Math.floor(startIndex);
  const end = start + length;
  const segment =
    end <= points.length
      ? points.slice(start, end)
      : points.slice(start).concat(points.slice(0, end - points.length));
  const curve = new CatmullRomCurve3(segment);
  const flowPoints = curve.getSpacedPoints(200);
  const half = Math.floor(flowPoints.length / 2);
  const percent = flowPoints.map((_, i) =>
    i < half ? i / half : 1 - (i - half) / half
  );

  geometry.setFromPoints(flowPoints);
  geometry.setAttribute("percent", new Float32BufferAttribute(percent, 1));
}

function normalizePolygons(feature: HebeiFeature): PolygonCoordinates[] {
  return feature.geometry.type === "Polygon"
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
}

function buildProvinceOutline(mapData: HebeiGeoJSON): Ring[] {
  const edges = new Map<
    string,
    { count: number; a: LngLat; b: LngLat; ak: string; bk: string }
  >();

  mapData.features.forEach((feature) => {
    normalizePolygons(feature).forEach((polygon) => {
      const ring = polygon[0];
      if (!ring) return;

      for (let i = 0; i < ring.length; i += 1) {
        const a = ring[i];
        const b = ring[(i + 1) % ring.length];
        if (!a || !b) continue;

        const ak = coordKey(a);
        const bk = coordKey(b);
        if (ak === bk) continue;

        const key = ak < bk ? `${ak}|${bk}` : `${bk}|${ak}`;
        const edge = edges.get(key);
        if (edge) {
          edge.count += 1;
        } else {
          edges.set(key, { count: 1, a, b, ak, bk });
        }
      }
    });
  });

  const boundarySegments = [...edges.values()]
    .filter((edge) => edge.count === 1)
    .map((edge) => ({ ...edge, used: false }));
  const adjacency = new Map<string, number[]>();

  boundarySegments.forEach((edge, index) => {
    adjacency.set(edge.ak, [...(adjacency.get(edge.ak) ?? []), index]);
    adjacency.set(edge.bk, [...(adjacency.get(edge.bk) ?? []), index]);
  });

  const rings: Ring[] = [];

  boundarySegments.forEach((edge) => {
    if (edge.used) return;

    edge.used = true;
    const path: Ring = [edge.a, edge.b];
    const startKey = edge.ak;
    let currentKey = edge.bk;
    let guard = 0;

    while (currentKey !== startKey && guard < boundarySegments.length + 5) {
      const nextIndex = (adjacency.get(currentKey) ?? []).find(
        (candidateIndex) => !boundarySegments[candidateIndex].used
      );

      if (nextIndex === undefined) break;

      const next = boundarySegments[nextIndex];
      next.used = true;

      if (next.ak === currentKey) {
        path.push(next.b);
        currentKey = next.bk;
      } else {
        path.push(next.a);
        currentKey = next.ak;
      }

      guard += 1;
    }

    if (path.length > 3) {
      rings.push(path);
    }
  });

  return rings.sort((a, b) => b.length - a.length);
}

function coordKey(coord: LngLat) {
  return `${coord[0].toFixed(6)},${coord[1].toFixed(6)}`;
}
