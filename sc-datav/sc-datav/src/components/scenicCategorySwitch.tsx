import styled from "styled-components";
import {
  scenicCategories,
  type ScenicCategoryId,
} from "@/data/scenicCategories";

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 136px;
  z-index: 20;
  display: flex;
  gap: 4px;
  max-width: calc(100vw - 40px);
  padding: 4px;
  transform: translateX(-50%);
  border: 1px solid rgba(234, 88, 12, 0.42);
  background: rgba(255, 248, 240, 0.94);
  pointer-events: auto;

  @media (max-width: 900px) {
    bottom: 128px;
    width: calc(100vw - 24px);
    overflow-x: auto;
  }
`;

const Button = styled.button<{ $active: boolean }>`
  min-width: 132px;
  height: 36px;
  padding: 0 12px;
  border: 0;
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#ea580c" : "transparent")};
  background: ${({ $active }) => ($active ? "#fff0df" : "transparent")};
  color: ${({ $active }) => ($active ? "#c2410c" : "#6b5b53")};
  font-size: 13px;
  line-height: 17px;
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: #fff0df;
    color: #c2410c;
  }

  &:focus-visible {
    outline: 2px solid #ea580c;
    outline-offset: 2px;
  }

  small {
    display: block;
    color: inherit;
    font-size: 10px;
    opacity: 0.7;
  }

  @media (max-width: 900px) {
    min-width: 124px;
  }
`;

export default function ScenicCategorySwitch(props: {
  active: ScenicCategoryId;
  onChange: (category: ScenicCategoryId) => void;
}) {
  const { active, onChange } = props;

  return (
    <Wrapper aria-label="景点画像分类">
      {scenicCategories.map((category) => (
        <Button
          key={category.id}
          type="button"
          $active={active === category.id}
          aria-pressed={active === category.id}
          title={`${category.description}`}
          onClick={() => onChange(category.id)}>
          {category.label}
          <small>{category.persona}</small>
        </Button>
      ))}
    </Wrapper>
  );
}
