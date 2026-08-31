import { useEffect, useMemo, useRef, type ComponentProps } from "react";
import styled from "styled-components";
import {
  Canvas,
  useFrame,
  extend,
  type ThreeElements,
} from "@react-three/fiber";
import { Image, ScrollControls, useScroll } from "@react-three/drei";
import {
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  LinearFilter,
  MathUtils,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  Vector2,
  Vector3,
} from "three";
import { useNavigate } from "react-router";
import Bg from "./bg";

const CAROUSEL_ITEMS = [
  {
    id: "city-brain-primary",
    title: "河北省智慧城市数据大脑",
    url: "/sc-datav/demo_1_hebei.png?v=2",
    path: "/demo1",
  },
  {
    id: "smart-tourism-primary",
    title: "河北智慧文旅全景平台",
    url: "/sc-datav/demo_2_hebei.png?v=3",
    path: "/demo2",
  },
  {
    id: "city-brain-secondary",
    title: "河北省智慧城市数据大脑",
    url: "/sc-datav/demo_1_hebei.png?v=2",
    path: "/demo3",
  },
  {
    id: "smart-tourism-secondary",
    title: "河北智慧文旅全景平台",
    url: "/sc-datav/demo_2_hebei.png?v=3",
    path: "/demo4",
  },
];

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const HomeButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(39, 119, 152, 0.65);
  border-radius: 6px;
  background: rgba(7, 26, 38, 0.84);
  color: #e8f7ff;
  font-size: 14px;
  letter-spacing: 0;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 160ms ease, border-color 160ms ease;

  &:hover {
    border-color: #61d9ff;
    background: rgba(11, 48, 65, 0.94);
  }

  &:focus-visible {
    outline: 2px solid #61d9ff;
    outline-offset: 3px;
  }
`;


class BentPlaneGeometry extends PlaneGeometry {
  constructor(
    radius: number,
    width: number,
    height: number,
    widthSegments?: number,
    heightSegments?: number
  ) {
    super(width, height, widthSegments, heightSegments);
    let p = this.parameters;
    let hw = p.width * 0.5;
    let a = new Vector2(-hw, 0);
    let b = new Vector2(0, radius);
    let c = new Vector2(hw, 0);
    let ab = new Vector2().subVectors(a, b);
    let bc = new Vector2().subVectors(b, c);
    let ac = new Vector2().subVectors(a, c);
    let r =
      (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
    let center = new Vector2(0, radius - r);
    let baseV = new Vector2().subVectors(a, center);
    let baseAngle = baseV.angle() - Math.PI * 0.5;
    let arc = baseAngle * 2;
    let uv = this.attributes.uv;
    let pos = this.attributes.position;
    let mainV = new Vector2();
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = uv.getX(i);
      let y = pos.getY(i);
      mainV.copy(c).rotateAround(center, arc * uvRatio);
      pos.setXYZ(i, mainV.x, y, -mainV.y);
    }
    pos.needsUpdate = true;
  }
}

const BentPlaneGeometryEl = extend(BentPlaneGeometry);

const WheelDrop = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.6;
`;

const Circle = styled.circle`
  @keyframes scroll-drop {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(15px);
      opacity: 0;
    }
  }

  animation: scroll-drop 1.5s ease-in-out infinite;
`;

function returnToPlatformHome() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  try {
    if (window.opener && !window.opener.closed) {
      window.opener.focus();
      window.close();
      return;
    }
  } catch {
    // Fall through to a direct navigation fallback.
  }

  if (document.referrer) {
    window.location.assign(document.referrer);
    return;
  }

  window.location.assign(`${window.location.origin}/`);
}
export default function Index() {
  return (
    <Wrapper>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={["#6e6e6e", 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
        </ScrollControls>
        <Bg />
      </Canvas>

      <HomeButton type="button" onClick={returnToPlatformHome}>
        <span aria-hidden="true">←</span>
        <span>返回首页</span>
      </HomeButton>

      <WheelDrop>
        <svg width="20" height="32.5" viewBox="0 0 40 65">
          <rect
            x="2.5"
            y="2.5"
            width="35"
            height="60"
            rx="17.5"
            ry="17.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

          <Circle cx="20" cy="15" r="3" fill="currentColor" />
        </svg>
      </WheelDrop>
    </Wrapper>
  );
}

function Rig(props: ThreeElements["group"]) {
  const ref = useRef<Group>(null!);
  const scroll = useScroll();
  const vector3 = useRef(new Vector3(1, 1, 1));

  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update?.();
    vector3.current.set(-state.pointer.x * 2, state.pointer.y + 1.5, 10);
    state.camera.position.lerp(vector3.current, 1 - Math.exp(-8 * delta));
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4 }) {
  const navigator = useNavigate();
  const count = CAROUSEL_ITEMS.length;

  return CAROUSEL_ITEMS.map((item, i) => (
    <group
      key={item.id}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}>
      <CardTitle title={item.title} />
      <Card
        url={item.url}
        onClick={(e) => {
          e.stopPropagation();
          navigator(item.path);
        }}
      />
    </group>
  ));
}

function CardTitle({ title }: { title: string }) {
  const texture = useMemo(() => createLabelTexture(title), [title]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite
      position={[0, 0.66, 0.04]}
      scale={[1.08, 0.17, 1]}
      renderOrder={10}>
      <spriteMaterial
        map={texture}
        transparent
        toneMapped={false}
        depthTest={false}
        depthWrite={false}
      />
    </sprite>
  );
}

function createLabelTexture(title: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 160;
  const context = canvas.getContext("2d");

  if (!context) return new CanvasTexture(canvas);

  const inset = 4;
  const radius = 24;
  const width = canvas.width - inset * 2;
  const height = canvas.height - inset * 2;

  context.beginPath();
  context.moveTo(inset + radius, inset);
  context.lineTo(inset + width - radius, inset);
  context.quadraticCurveTo(inset + width, inset, inset + width, inset + radius);
  context.lineTo(inset + width, inset + height - radius);
  context.quadraticCurveTo(
    inset + width,
    inset + height,
    inset + width - radius,
    inset + height
  );
  context.lineTo(inset + radius, inset + height);
  context.quadraticCurveTo(inset, inset + height, inset, inset + height - radius);
  context.lineTo(inset, inset + radius);
  context.quadraticCurveTo(inset, inset, inset + radius, inset);
  context.closePath();
  context.fillStyle = "rgba(4, 21, 33, 0.88)";
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = "rgba(107, 221, 255, 0.75)";
  context.stroke();

  context.font = '600 48px "Microsoft YaHei", sans-serif';
  context.fillStyle = "#eefaff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = "rgba(83, 205, 255, 0.9)";
  context.shadowBlur = 14;
  context.fillText(title, canvas.width / 2, canvas.height / 2 + 2);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export interface ImageMaterial extends ShaderMaterial {
  scale?: number[];
  imageBounds?: number[];
  radius?: number;
  resolution?: number;
  color?: Color;
  map: Texture;
  zoom?: number;
  grayscale?: number;
}

function Card(props: ComponentProps<typeof Image>) {
  const ref = useRef<Mesh<BentPlaneGeometry, ImageMaterial>>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));
  const targetRadius = useRef(0.1);
  const targetZoom = useRef(1.5);

  useFrame((_, delta) => {
    ref.current.scale.lerp(vector3.current, 1 - Math.exp(-10 * delta));
    ref.current.material.radius = MathUtils.lerp(
      ref.current.material.radius!,
      targetRadius.current,
      1 - Math.exp(-8 * delta)
    );

    ref.current.material.zoom = MathUtils.lerp(
      ref.current.material.zoom!,
      targetZoom.current,
      1 - Math.exp(-8 * delta)
    );
  });

  return (
    <Image
      ref={ref}
      transparent
      toneMapped={false}
      side={DoubleSide}
      onPointerOver={(e) => {
        e.stopPropagation();
        vector3.current.setScalar(1.15);
        targetRadius.current = 0.25;
        targetZoom.current = 1;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        vector3.current.setScalar(1);
        targetRadius.current = 0.1;
        targetZoom.current = 1.5;
        document.body.style.cursor = "auto";
      }}
      {...props}>
      <BentPlaneGeometryEl args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}
