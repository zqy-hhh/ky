import { useEffect } from "react";
import styled from "styled-components";
import { scenicSpots } from "@/data/scenicSpots";
import { useConfigStore } from "./stores";
import Panel from "./panel";
import Map from "./map";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export default function Index() {
  useEffect(() => {
    const store = useConfigStore.getState();
    store.reset();
    store.selectScenic(scenicSpots[0] ?? null);

    return () => useConfigStore.getState().reset();
  }, []);

  return (
    <Wrapper>
      <Map />
      <Panel />
    </Wrapper>
  );
}