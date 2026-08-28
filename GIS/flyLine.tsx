import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  AdditiveBlending,
  QuadraticBezierCurve3,
  RepeatWrapping,
  Vector3,
} from "three";
import { type GeoProjection } from "d3-geo";

import flyLineTexture from "@/assets/fly_line.png";

type LngLat = [number, number];

export interface FlyRoute {
  name: string;
  from: LngLat;
  to: LngLat;
  color?: string;
}

export interface FlyLineProps {
  projection: GeoProjection;
  depth?: number;
  routes?: FlyRoute[];
}

const DEFAULT_ROUTES: FlyRoute[] = [
  {
    name: "石家庄-保定",
    from: [114.514976, 38.042007],
    to: [115.464523, 38.874476],
    color: "#9ee8ff",
  },
  {
    name: "唐山-秦皇岛",
    from: [118.180149, 39.63068],
    to: [119.52022, 39.888243],
    color: "#7df9d4",
  },
  {
    name: "邯郸-承德",
    from: [114.53915, 36.625849],
    to: [117.962859, 40.95324],
    color: "#c7f7ff",
  },
  {
    name: "沧州-廊坊",
    from: [116.838715, 38.304676],
    to: [116.683546, 39.538304],
    color: "#8fc2ff",
  },
];

export default function FlyLine(props: FlyLineProps) {
  const { projection, depth = 0.64, routes = DEFAULT_ROUTES } = props;
  const texture = useTexture(flyLineTexture, (tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(1.4, 1);
  });

  const curves = useMemo(() => {
    return routes.map((route) => {
      const start = projectLngLat(projection, route.from, depth);
      const end = projectLngLat(projection, route.to, depth);
      const distance = start.distanceTo(end);
      const mid = new Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .setZ(depth + Math.max(1.2, distance * 0.36));

      return {
        name: route.name,
        color: route.color ?? "#8fc2ff",
        curve: new QuadraticBezierCurve3(start, mid, end),
      };
    });
  }, [depth, projection, routes]);

  useFrame((_, delta) => {
    texture.offset.x -= delta * 0.7;
  });

  return (
    <group renderOrder={20}>
      {curves.map((route) => (
        <mesh key={route.name}>
          <tubeGeometry args={[route.curve, 64, 0.035, 8, false]} />
          <meshBasicMaterial
            transparent
            color={route.color}
            fog={false}
            map={texture}
            opacity={0.92}
            depthWrite={false}
            depthTest={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function projectLngLat(
  projection: GeoProjection,
  coord: LngLat,
  depth: number
) {
  const [x, y] = projection(coord)!;
  return new Vector3(x, -y, depth);
}
