import React, { useState } from "react";
import styled from "@emotion/styled";
import Draft from "draft-js";
import Immutable from "immutable";

const blockRenderMap = Immutable.Map({
  unstyled: {
    element: "div",
    wrapper: <WrapperBlock />,
  },
});
export const extendedBlockRenderMap =
  Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

export function WrapperBlock(props: { children?: JSX.Element }) {
  const [hover, setHover] = useState<boolean>(false);
  const starthover = () => {
    setHover(true);
  };
  const endhover = () => {
    setHover(false);
  };
  return (
    <div onMouseEnter={starthover} onMouseLeave={endhover}>
      <HandleContainer>
        <button hidden={!hover}>o</button>
        <button hidden={!hover}>+</button>
      </HandleContainer>
      <span>{props.children}</span>
    </div>
  );
}

const HandleContainer = styled.div`
  width: 80px;
  height: 20px;
  padding-right: 12px;
  position: absolute;
  left: 280px;
`;
