import { useEffect } from "react";
import styled from "styled-components";
import useMoveTo from "@/hooks/useMoveTo";
import AutoFit from "@/components/autoFit";
import {
  riskLevelColors,
  riskLevelCounts,
  scenicRiskAssessments,
  type ScenicRiskAssessment,
} from "@/data/scenicRiskAssessments";
import { useConfigStore } from "../stores";
import Headder from "./headder";
import Footer from "./footer";

const GridWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.section`
  position: relative;
  z-index: 12;
  display: flex;
  min-height: 0;
  flex-direction: column;
  padding: 15px;
  border: 1px solid rgba(255, 145, 0, 0.3);
  border-radius: 4px;
  background: rgba(255, 245, 232, 0.72);
  backdrop-filter: blur(4px);
  color: #5a4a42;
  pointer-events: auto;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  &::before {
    top: -1px;
    left: -1px;
    border-top: 2px solid #ea580c;
    border-left: 2px solid #ea580c;
  }

  &::after {
    right: -1px;
    bottom: -1px;
    border-right: 2px solid #ea580c;
    border-bottom: 2px solid #ea580c;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    opacity: 0.48;
  }
`;

const CardTitle = styled.h2`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px;
  padding-left: 10px;
  border-left: 4px solid #fdb961;
  color: #5a4a42;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;

  span {
    color: rgba(0, 0, 0, 0.4);
    font-size: 10px;
    font-weight: 400;
  }
`;

const ScrollBody = styled.div`
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(234, 88, 12, 0.38) transparent;
`;

const ScenicName = styled.div`
  color: #3f342e;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
`;

const ScenicMeta = styled.div`
  margin-top: 3px;
  color: rgba(90, 74, 66, 0.72);
  font-size: 13px;
  line-height: 20px;
`;

const RiskSummary = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 13px;
  align-items: center;
  margin-top: 14px;
`;

const RiskBadge = styled.div<{ $color: string }>`
  padding: 10px 8px;
  border: 1px solid ${({ $color }) => $color};
  border-radius: 3px;
  background: ${({ $color }) => `${$color}18`};
  box-shadow: inset 0 0 16px ${({ $color }) => `${$color}12`};
  color: ${({ $color }) => $color};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const RiskScore = styled.div`
  color: rgba(90, 74, 66, 0.74);
  font-size: 13px;
  line-height: 19px;

  strong {
    display: block;
    color: #ea580c;
    font-size: 24px;
    font-weight: 700;
    line-height: 31px;
    font-variant-numeric: tabular-nums;
  }
`;

const RiskFormula = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 7px;
  margin-top: 12px;

  div {
    padding: 7px 4px;
    border-top: 2px solid rgba(234, 88, 12, 0.52);
    background: rgba(255, 255, 255, 0.42);
    color: rgba(90, 74, 66, 0.78);
    font-size: 12px;
    line-height: 18px;
    text-align: center;
  }

  strong {
    display: block;
    color: #5a4a42;
    font-size: 15px;
  }
`;

const TextList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding: 7px 9px 7px 24px;
    border-left: 2px solid rgba(234, 88, 12, 0.5);
    background: rgba(255, 255, 255, 0.38);
    color: rgba(63, 52, 46, 0.9);
    font-size: 14px;
    line-height: 1.55;
  }

  li::before {
    content: "";
    position: absolute;
    top: 15px;
    left: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ea580c;
    box-shadow: 0 0 8px rgba(234, 88, 12, 0.48);
  }
`;

const SuitabilityText = styled.p`
  margin: 0;
  padding: 10px 12px;
  border-left: 4px solid #ea580c;
  background: rgba(255, 255, 255, 0.42);
  color: #4b3e37;
  font-size: 15px;
  line-height: 1.65;
`;

const SelectionHint = styled.div`
  margin-top: 12px;
  color: rgba(90, 74, 66, 0.66);
  font-size: 13px;
  line-height: 1.55;
`;

const SummaryText = styled.p`
  margin: 0;
  color: #4b3e37;
  font-size: 15px;
  line-height: 1.7;
`;

const MatrixLegend = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  margin-top: 13px;
`;

const LegendItem = styled.div<{ $color: string; $active: boolean }>`
  padding: 7px 3px;
  border-top: 3px solid ${({ $color }) => $color};
  background: ${({ $active, $color }) =>
    $active ? `${$color}1f` : "rgba(255, 255, 255, 0.38)"};
  color: ${({ $active, $color }) => ($active ? $color : "#5a4a42")};
  font-size: 11px;
  line-height: 16px;
  text-align: center;

  strong {
    display: block;
    font-size: 12px;
  }
`;

const ModeSwitch = styled.div`
  position: absolute;
  left: 50%;
  bottom: 94px;
  z-index: 20;
  display: flex;
  transform: translateX(-50%);
  padding: 3px;
  border: 1px solid rgba(234, 88, 12, 0.46);
  background: rgba(255, 248, 240, 0.92);
  pointer-events: auto;

  button {
    min-width: 108px;
    height: 34px;
    padding: 0 16px;
    border: 0;
    background: transparent;
    color: rgba(90, 74, 66, 0.72);
    font-size: 15px;
    cursor: pointer;
  }

  button[aria-pressed="true"] {
    background: #ea580c;
    color: #fff;
    box-shadow: inset 0 0 14px rgba(255, 145, 0, 0.32);
  }

  button:hover {
    color: #5a4a42;
  }
`;

export default function Content() {
  const topBox = useMoveTo("toBottom", 0.6);
  const leftBox = useMoveTo("toRight", 0.8, 0.5);
  const leftBox1 = useMoveTo("toRight", 0.8, 0.6);
  const leftBox2 = useMoveTo("toRight", 0.8, 0.7);
  const rightBox = useMoveTo("toLeft", 0.8, 0.5);
  const rightBox1 = useMoveTo("toLeft", 0.8, 0.6);
  const rightBox2 = useMoveTo("toLeft", 0.8, 0.7);
  const bottomBox = useMoveTo("toTop", 0.8, 0.5);
  const mapMode = useConfigStore((state) => state.mapMode);
  const setMapMode = useConfigStore((state) => state.setMapMode);
  const selectedScenic = useConfigStore((state) => state.selectedScenic);
  const assessment = selectedScenic
    ? scenicRiskAssessments[selectedScenic.id]
    : undefined;

  useEffect(() => {
    const unMapPlaySub = useConfigStore.subscribe(
      (state) => state.mapPlayComplete,
      (complete) => {
        if (complete) {
          topBox.restart();
          bottomBox.restart();
          leftBox.restart();
          leftBox1.restart();
          leftBox2.restart();
          rightBox.restart();
          rightBox1.restart();
          rightBox2.restart();
        }
      }
    );

    const unModeSub = useConfigStore.subscribe(
      (state) => state.mode,
      (visible) => {
        if (visible) {
          topBox.restart();
          leftBox.restart();
          leftBox1.restart();
          leftBox2.restart();
          rightBox.restart();
          rightBox1.restart();
          rightBox2.restart();
        } else {
          topBox.reverse();
          leftBox.reverse();
          leftBox1.reverse();
          leftBox2.reverse();
          rightBox.reverse();
          rightBox1.reverse();
          rightBox2.reverse();
        }
      }
    );

    return () => {
      unMapPlaySub();
      unModeSub();
    };
  }, []);

  if (!selectedScenic || !assessment) return null;

  return (
    <AutoFit>
      <Headder ref={topBox.ref} />
      <GridWrapper>
        <Card ref={leftBox.ref} style={{ gridArea: "1 / 1 / 3 / 2" }}>
          <CardTitle>
            景区风险概览<span>RISK OVERVIEW</span>
          </CardTitle>
          <RiskOverview spot={selectedScenic} assessment={assessment} />
        </Card>
        <Card ref={leftBox1.ref} style={{ gridArea: "3 / 1 / 5 / 2" }}>
          <CardTitle>
            中老年人主要风险<span>SENIOR RISK</span>
          </CardTitle>
          <RiskList items={assessment.risks} />
        </Card>
        <Card ref={leftBox2.ref} style={{ gridArea: "5 / 1 / 7 / 2" }}>
          <CardTitle>
            适游判断<span>TRAVEL SUITABILITY</span>
          </CardTitle>
          <ScrollBody>
            <SuitabilityText>{assessment.suitability}</SuitabilityText>
            <SelectionHint>
              当前景区：{selectedScenic.name} · {selectedScenic.city}
              <br />
              经纬度：{selectedScenic.longitude.toFixed(4)}°E / {selectedScenic.latitude.toFixed(4)}°N
              <br />
              点击地图上的其他景区光柱，可切换对应风险分析。
            </SelectionHint>
          </ScrollBody>
        </Card>
        <Card ref={rightBox.ref} style={{ gridArea: "1 / 4 / 3 / 5" }}>
          <CardTitle>
            推荐建议<span>RECOMMENDATIONS</span>
          </CardTitle>
          <RiskList items={assessment.recommendations} />
        </Card>
        <Card ref={rightBox1.ref} style={{ gridArea: "3 / 4 / 5 / 5" }}>
          <CardTitle>
            安全措施与应急服务<span>EMERGENCY SERVICES</span>
          </CardTitle>
          <RiskList items={assessment.emergency} />
        </Card>
        <Card ref={rightBox2.ref} style={{ gridArea: "5 / 4 / 7 / 5" }}>
          <CardTitle>
            综合总结<span>RISK SUMMARY</span>
          </CardTitle>
          <ScrollBody>
            <SummaryText>{assessment.summary}</SummaryText>
            <MatrixLegend>
              {riskLevelCounts.map((item) => (
                <LegendItem
                  key={item.level}
                  $color={riskLevelColors[item.level]}
                  $active={item.level === assessment.level}>
                  <strong>{item.level}</strong>
                  {item.range}
                </LegendItem>
              ))}
            </MatrixLegend>
          </ScrollBody>
        </Card>
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
      <Footer ref={bottomBox.ref} />
    </AutoFit>
  );
}

function RiskOverview(props: {
  spot: { name: string };
  assessment: ScenicRiskAssessment;
}) {
  const { spot, assessment } = props;
  const color = riskLevelColors[assessment.level];

  return (
    <ScrollBody>
      <ScenicName>{spot.name}</ScenicName>
      <ScenicMeta>基于 L × C 风险矩阵的中老年游客安全评估</ScenicMeta>
      <RiskSummary>
        <RiskBadge $color={color}>{assessment.level}</RiskBadge>
        <RiskScore>
          当前风险值 R
          <strong>{assessment.riskValue}</strong>
        </RiskScore>
      </RiskSummary>
      <RiskFormula>
        <div>
          <strong>L = {assessment.likelihood}</strong>
          发生可能性
        </div>
        <div>
          <strong>C = {assessment.consequence}</strong>
          后果严重性
        </div>
        <div>
          <strong>R = L × C</strong>
          矩阵评估
        </div>
      </RiskFormula>
    </ScrollBody>
  );
}

function RiskList(props: { items: string[] }) {
  return (
    <ScrollBody>
      <TextList>
        {props.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </TextList>
    </ScrollBody>
  );
}