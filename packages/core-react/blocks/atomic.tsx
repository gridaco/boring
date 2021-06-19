import { EditorState, ContentBlock } from "draft-js";

import React from "react";

interface Props {
  getEditorState: () => EditorState;
  block: ContentBlock;
}

const AtomicBlock = (props: Props) => {
  const content = props.getEditorState().getCurrentContent();
  const entity = content.getEntity(props.block.getEntityAt(0));
  const data = entity.getData();
  const type = entity.getType();
  if (type === "image") {
    return (
      <div className="md-block-atomic-wrapper">
        <img role="presentation" src={data.src} />
        <div className="md-block-atomic-controls">
          <button>&times;</button>
        </div>
      </div>
    );
  }
  return <p>No supported block for {type}</p>;
};

export default AtomicBlock;
