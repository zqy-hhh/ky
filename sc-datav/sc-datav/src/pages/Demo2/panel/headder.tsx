import type { ComponentProps } from "react";
import styled from "styled-components";

const TitleWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 85px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 5;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 30px;
    width: 31%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #5d8dff);
  }

  &::before {
    left: 2%;
  }

  &::after {
    right: 2%;
    transform: scaleX(-1);
  }
`;

const Title = styled.h1`
  position: relative;
  margin: 10px 0 0;
  padding: 0 56px 13px;
  border-bottom: 2px solid rgba(93, 141, 255, 0.75);
  background: #000;
  color: #dce9ff;
  font-size: 31px;
  line-height: 42px;
  font-weight: 700;
  letter-spacing: 0;

  &::after {
    content: "HEBEI SMART TOURISM";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -18px;
    color: rgba(139, 181, 255, 0.72);
    font-size: 10px;
    line-height: 14px;
    text-align: center;
  }
`;

export default function Headder(props: ComponentProps<typeof TitleWrapper>) {
  return (
    <TitleWrapper {...props}>
      <Title>河北智慧文旅全景平台</Title>
    </TitleWrapper>
  );
}
