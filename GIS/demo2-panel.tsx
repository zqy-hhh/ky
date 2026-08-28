import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import AutoFit from "@/components/autoFit";
import useMoveTo from "@/hooks/useMoveTo";
import type { ScenicSpot } from "@/data/scenicSpots";
import { useConfigStore } from "../stores";
import Headder from "./headder";

const GridWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr) minmax(0, 1fr) 340px;
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.section`
  position: relative;
  min-height: 0;
  padding: 18px 20px;
  border: 1px solid rgba(93, 141, 255, 0.62);
  background: rgba(2, 12, 28, 0.84);
  box-shadow: inset 0 0 30px rgba(48, 97, 219, 0.11);
  color: #e8efff;
  pointer-events: auto;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 34px;
    height: 3px;
    background: #ffd166;
  }

  &::before {
    top: -1px;
    left: -1px;
  }

  &::after {
    right: -1px;
    bottom: -1px;
  }
`;

const CardTitle = styled.h2`
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(186, 206, 255, 0.28);
  color: #ffd166;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: 0;
`;

const ScenicName = styled.div`
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.35;
`;

const City = styled.div`
  margin-bottom: 18px;
  color: #8fb8ff;
  font-size: 16px;
`;

const MetaGrid = styled.dl`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 10px 12px;
  margin: 0;
  font-size: 16px;
  line-height: 25px;

  dt {
    color: rgba(232, 239, 255, 0.56);
  }

  dd {
    margin: 0;
    color: #e8efff;
    font-variant-numeric: tabular-nums;
  }
`;

const BodyText = styled.p`
  margin: 0;
  color: rgba(232, 239, 255, 0.88);
  font-size: 17px;
  line-height: 1.85;
`;

const ActivityList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 10px 12px 10px 30px;
    border-left: 2px solid #ffd166;
    background: rgba(93, 141, 255, 0.11);
    color: #e8efff;
    font-size: 15px;
    line-height: 23px;
  }

  li::before {
    content: "";
    position: absolute;
    left: 13px;
    top: 17px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ffd166;
    box-shadow: 0 0 10px #ffd166;
  }
`;

const ImageButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 110px;
  padding: 0;
  border: 1px solid rgba(255, 209, 102, 0.52);
  background: #020814;
  cursor: zoom-in;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.25s ease;
  }

  &:hover img {
    transform: scale(1.035);
  }

  span {
    position: absolute;
    right: 10px;
    bottom: 9px;
    padding: 5px 8px;
    background: rgba(0, 0, 0, 0.72);
    color: #fff;
    font-size: 12px;
  }
`;

const PhotoGrid = styled.div`
  height: calc(100% - 48px);
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  ${ImageButton}:only-child {
    grid-column: 1 / -1;
  }
`;

const ModeSwitch = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  z-index: 20;
  display: flex;
  transform: translateX(-50%);
  padding: 3px;
  border: 1px solid rgba(143, 194, 255, 0.66);
  background: rgba(2, 12, 28, 0.92);
  pointer-events: auto;

  button {
    min-width: 112px;
    height: 36px;
    padding: 0 18px;
    border: 0;
    background: transparent;
    color: rgba(232, 239, 255, 0.72);
    font-size: 16px;
    line-height: 36px;
    cursor: pointer;
  }

  button[aria-pressed="true"] {
    background: #315da8;
    color: #ffffff;
    box-shadow: inset 0 0 14px rgba(143, 194, 255, 0.25);
  }

  button:hover {
    color: #ffffff;
  }
`;

const EmptyHint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 74px;
  transform: translateX(-50%);
  padding: 9px 18px;
  border: 1px solid rgba(255, 209, 102, 0.42);
  background: rgba(2, 12, 28, 0.72);
  color: rgba(232, 239, 255, 0.78);
  font-size: 13px;
  pointer-events: none;
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px clamp(24px, 8vw, 150px);
  background: rgba(0, 0, 0, 0.88);
  pointer-events: auto;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border: 1px solid rgba(255, 209, 102, 0.7);
  object-fit: contain;
  box-shadow: 0 18px 70px rgba(0, 0, 0, 0.7);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 34px;
  right: 46px;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 30px;
  line-height: 36px;
  cursor: pointer;
`;

export default function Panel() {
  const selectedScenic = useConfigStore((state) => state.selectedScenic);
  const mapMode = useConfigStore((state) => state.mapMode);
  const setMapMode = useConfigStore((state) => state.setMapMode);
  const topBox = useMoveTo<HTMLElement>("toBottom", 0.6);
  const [imageOpen, setImageOpen] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = useConfigStore.subscribe(
      (state) => state.mapPlayComplete,
      (complete) => complete && topBox.restart()
    );
    return unsubscribe;
  }, [topBox]);

  useEffect(() => setImageOpen(null), [selectedScenic]);

  return (
    <>
      <AutoFit>
        <Headder ref={topBox.ref} />
        <GridWrapper>
          {selectedScenic ? (
            <ScenicPanels
              spot={selectedScenic}
              onOpenImage={(image) => setImageOpen(image)}
            />
          ) : mapMode === "scenic" ? (
            <EmptyHint>点击景区光柱查看景区详情</EmptyHint>
          ) : null}
        </GridWrapper>
        <ModeSwitch aria-label="地图显示模式">
          <button
            type="button"
            aria-pressed={mapMode === "scenic"}
            onClick={() => setMapMode("scenic")}>
            景区模式
          </button>
          <button
            type="button"
            aria-pressed={mapMode === "city"}
            onClick={() => setMapMode("city")}>
            城市模式
          </button>
        </ModeSwitch>
      </AutoFit>
      {selectedScenic &&
        imageOpen &&
        createPortal(
          <Lightbox
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedScenic.name}实景照片`}
            onClick={() => setImageOpen(null)}>
            <CloseButton
              aria-label="关闭图片"
              onClick={() => setImageOpen(null)}>
              ×
            </CloseButton>
            <LightboxImage
              src={imageOpen}
              alt={`${selectedScenic.name}实景照片`}
              onClick={(event) => event.stopPropagation()}
            />
          </Lightbox>,
          document.body
        )}
    </>
  );
}

function ScenicPanels(props: {
  spot: ScenicSpot;
  onOpenImage: (image: string) => void;
}) {
  const { spot, onOpenImage } = props;
  const activities = spot.activities.split("、");

  return (
    <>
      <Card style={{ gridArea: "1 / 1 / 4 / 2" }}>
        <CardTitle>景区概览</CardTitle>
        <ScenicName>{spot.name}</ScenicName>
        <City>{spot.city}</City>
        <MetaGrid>
          <dt>经度</dt>
          <dd>{spot.longitude.toFixed(6)}° E</dd>
          <dt>纬度</dt>
          <dd>{spot.latitude.toFixed(6)}° N</dd>
        </MetaGrid>
      </Card>
      <Card style={{ gridArea: "4 / 1 / 7 / 2" }}>
        <CardTitle>景区特色</CardTitle>
        <BodyText>{spot.summary}</BodyText>
      </Card>
      <Card style={{ gridArea: "1 / 4 / 4 / 5" }}>
        <CardTitle>景点游玩项目</CardTitle>
        <ActivityList>
          {activities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ActivityList>
      </Card>
      <Card style={{ gridArea: "4 / 4 / 7 / 5" }}>
        <CardTitle>景区实景照片</CardTitle>
        <PhotoGrid>
          {spot.images.map((image, index) => (
            <ImageButton
              key={image}
              type="button"
              onClick={() => onOpenImage(image)}>
              <img src={image} alt={`${spot.name}实景照片${index + 1}`} />
              <span>点击放大</span>
            </ImageButton>
          ))}
        </PhotoGrid>
      </Card>
    </>
  );
}
