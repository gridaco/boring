import React from "react";
import styled from "@emotion/styled";
import { EditorState, ContentBlock } from "draft-js";

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
      <BlockAtomic>
        <BlockAtomicWrapper>
          <img role="presentation" src={data.src} />
          <BlockAtomicControls>
            <button>&times;</button>
          </BlockAtomicControls>
        </BlockAtomicWrapper>
      </BlockAtomic>
    );
  }
  return <p>No supported block for {type}</p>;
};

export default AtomicBlock;

const BlockAtomic = styled.div`
  margin: 0;
  img {
    width: 100%;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
`;

const BlockAtomicWrapper = styled.div`
  position: relative;
`;

const BlockAtomicControls = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  transition: all 0.2s ease;

  button {
    display: inline-block;
    background-color: #eaeaea;
    border: none;
    // border: 1px solid #A0A0A0;
    color: #6d6d6d;
    cursor: pointer;
    height: 22px;
    width: 22px;
    border-radius: 11px;
    position: absolute;
    z-index: 1;
    left: -27px;
    font-weight: bold;
    text-align: center;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #08c;
      color: #08c;
    }
  }
`;
