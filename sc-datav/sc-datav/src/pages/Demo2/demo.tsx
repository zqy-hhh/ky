import { useEffect } from "react";
import styled from "styled-components";
import { scenicSpots } from "@/data/scenicSpots";
import { scenicCategories, getScenicCategory, type ScenicCategoryId } from "@/data/scenicCategories";
import { useConfigStore } from "./stores";
import Map from "./map";
import Panel from "./panel";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export default function Index() {
  useEffect(() => {
    const store = useConfigStore.getState();
    store.reset();
    const query = window.location.hash.includes("?")
      ? window.location.hash.slice(window.location.hash.indexOf("?") + 1)
      : window.location.search;
    const profile = new URLSearchParams(query).get("profile");
    const category: ScenicCategoryId = scenicCategories.some((item) => item.id === profile)
      ? (profile as ScenicCategoryId)
      : "culture";
    store.setScenicCategory(category);
    store.selectScenic(scenicSpots.find((spot) => getScenicCategory(spot.id) === category) ?? null);
    return () => useConfigStore.getState().reset();
  }, []);
  return (
    <Wrapper>
      <Map />
      <Panel />
    </Wrapper>
  );
}
