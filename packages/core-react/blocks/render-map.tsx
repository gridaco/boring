import Draft from "draft-js";
import Immutable from "immutable";
import { WrapperBlock } from "./wrapper-block";
import { Block } from "./block-names";

const BlockRenderMap = Immutable.Map({
  unstyled: {
    element: "div",
    wrapper: <WrapperBlock />,
  },
});
export const extendedBlockRenderMap =
  Draft.DefaultDraftBlockRenderMap.merge(BlockRenderMap);
