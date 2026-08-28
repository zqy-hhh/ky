import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { GeoProjection } from "d3-geo";
import { useMemo, useRef, useState } from "react";
import { AdditiveBlending, DoubleSide, Vector3, type Mesh } from "three";
import styled from "styled-components";
import type { ScenicSpot } from "@/data/scenicSpots";
import { scenicSpots } from "@/data/scenicSpots";

const TooltipBox = styled.div`
  min-width: 174px;
  padding: 10px 12px;
  border: 1px solid rgba(255, 209, 102, 0.75);
  border-radius: 5px;
  background: rgba(8, 19, 27, 0.94);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.38);
  color: #eafaff;
  font-size: 12px;
  line-height: 1.55;
  white-space: nowrap;
`;

const TooltipName = styled.div`
  margin-bottom: 4px;
  color: #ffd166;
  font-size: 13px;
  font-weight: 700;
`;

const TooltipMeta = styled.div`
  color: rgba(234, 250, 255, 0.78);
`;

const MarkerLabel = styled.div`
  position: relative;
  padding: 5px 10px;
  border: 1px solid rgba(255, 209, 102, 0.82);
  border-radius: 3px;
  background: rgba(5, 14, 22, 0.9);
  box-shadow: 0 0 14px rgba(255, 183, 3, 0.35);
  color: #fff3bd;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    width: 1px;
    height: 10px;
    background: #ffd166;
  }
`;

export interface ScenicMarkersProps {
  projection: GeoProjection;
  depth: number;
  size?: number;
  tooltipDistanceFactor?: number;
  onSelect?: (spot: ScenicSpot) => void;
  variant?: "dot" | "beam";
  showLabels?: boolean;
  beamHeight?: number;
}

export default function ScenicMarkers(props: ScenicMarkersProps) {
  const {
    projection,
    depth,
    size = 0.16,
    tooltipDistanceFactor = 10,
    onSelect,
    variant = "dot",
    showLabels = false,
    beamHeight = 1.3,
  } = props;
  const points = useMemo(
    () =>
      scenicSpots.map((spot) => {
        const [x, y] = projection([spot.longitude, spot.latitude])!;
        return { spot, position: new Vector3(x, -y, depth + 0.18) };
      }),
    [depth, projection]
  );

  return (
    <group renderOrder={30}>
      {points.map(({ spot, position }, index) => (
        <ScenicMarker
          key={spot.name}
          spot={spot}
          position={position}
          size={size}
          tooltipDistanceFactor={tooltipDistanceFactor}
          onSelect={onSelect}
          variant={variant}
          showLabel={showLabels}
          index={index}
          beamHeight={beamHeight}
        />
      ))}
    </group>
  );
}

function ScenicMarker(props: {
  spot: ScenicSpot;
  position: Vector3;
  size: number;
  tooltipDistanceFactor: number;
  onSelect?: (spot: ScenicSpot) => void;
  variant: "dot" | "beam";
  showLabel: boolean;
  index: number;
  beamHeight: number;
}) {
  const {
    spot,
    position,
    size,
    tooltipDistanceFactor,
    onSelect,
    variant,
    showLabel,
    index,
    beamHeight,
  } = props;
  const [hovered, setHovered] = useState(false);
  const pulseRef = useRef<Mesh>(null!);
  const currentBeamHeight = beamHeight + (index % 3) * beamHeight * 0.1;

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 3.2 + index * 0.55) * 0.14;
    pulseRef.current.scale.setScalar(pulse);
  });

  const pointerHandlers = {
    onPointerOver: (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      setHovered(true);
      document.body.style.cursor = onSelect ? "pointer" : "default";
    },
    onPointerOut: () => {
      setHovered(false);
      document.body.style.cursor = "auto";
    },
    onClick: (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      onSelect?.(spot);
    },
  };

  return (
    <group position={position} renderOrder={31}>
      {variant === "beam" ? (
        <>
          <mesh
            position-z={currentBeamHeight / 2}
            rotation-x={Math.PI / 2}
            raycast={() => null}>
            <cylinderGeometry
              args={[size * 0.32, size * 0.7, currentBeamHeight, 16, 1, true]}
            />
            <meshBasicMaterial
              color={hovered ? "#fff4b8" : "#ffd166"}
              transparent
              opacity={0.68}
              depthTest={false}
              depthWrite={false}
              fog={false}
              side={DoubleSide}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh position-z={currentBeamHeight + size * 0.2} raycast={() => null}>
            <sphereGeometry args={[size * 1.35, 16, 10]} />
            <meshBasicMaterial
              color="#fff1a8"
              depthTest={false}
              depthWrite={false}
              fog={false}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh
            userData={{ skipIntroAnimation: true }}
            position-z={currentBeamHeight / 2}
            rotation-x={Math.PI / 2}
            {...pointerHandlers}>
            <cylinderGeometry
              args={[size * 4.2, size * 4.2, currentBeamHeight + 0.7, 8]}
            />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </>
      ) : (
        <>
          <mesh raycast={() => null}>
        <sphereGeometry args={[size * 1.9, 16, 10]} />
        <meshBasicMaterial
          color={hovered ? "#fff1a8" : "#ffd166"}
          depthTest={false}
          depthWrite={false}
          fog={false}
          blending={AdditiveBlending}
        />
          </mesh>
          <mesh
            userData={{ skipIntroAnimation: true }}
            position-z={-size * 0.1}
            {...pointerHandlers}>
            <sphereGeometry args={[size * 4.2, 12, 8]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthTest={false}
              depthWrite={false}
              fog={false}
            />
          </mesh>
        </>
      )}
      <mesh ref={pulseRef} rotation-x={0} raycast={() => null}>
        <ringGeometry
          args={
            variant === "beam"
              ? [size * 2.4, size * 3.2, 32]
              : [size * 1.45, size * 1.75, 24]
          }
        />
        <meshBasicMaterial
          color="#ffb703"
          depthTest={false}
          depthWrite={false}
          fog={false}
          opacity={0.72}
          transparent
          blending={AdditiveBlending}
        />
      </mesh>
      {showLabel && !hovered && (
        <Html
          center
          distanceFactor={tooltipDistanceFactor}
          position={[0, 0, currentBeamHeight + size * 4.8]}
          style={{ pointerEvents: "none" }}
          zIndexRange={[1100, 1199]}>
          <MarkerLabel>{spot.name}</MarkerLabel>
        </Html>
      )}
      {hovered && (
        <Html
          center
          distanceFactor={tooltipDistanceFactor}
          position={[
            0,
            0,
            variant === "beam" ? currentBeamHeight + size * 7 : size * 7,
          ]}
          style={{ pointerEvents: "none" }}
          zIndexRange={[1200, 1300]}>
          <TooltipBox>
            <TooltipName>{spot.name}</TooltipName>
            <TooltipMeta>{spot.city}</TooltipMeta>
            <TooltipMeta>
              经度 {spot.longitude.toFixed(6)}°
            </TooltipMeta>
            <TooltipMeta>
              纬度 {spot.latitude.toFixed(6)}°
            </TooltipMeta>
          </TooltipBox>
        </Html>
      )}
    </group>
  );
}
