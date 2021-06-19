import React from "react";
import styled from "@emotion/styled";
import {
  ContentBlock,
  EditorBlock,
  EditorState,
  SelectionState,
} from "draft-js";

import { getCurrentBlock } from "../model";

interface Props {
  block: ContentBlock;
  blockProps: any;
}

class ImageBlock extends React.Component<Props> {
  focusBlock = () => {
    const { block, blockProps } = this.props;
    const { getEditorState, setEditorState } = blockProps;
    const key = block.getKey();
    const editorState = getEditorState();
    const currentblock = getCurrentBlock(editorState);
    if (currentblock.getKey() === key) {
      return;
    }
    const newSelection = new SelectionState({
      anchorKey: key,
      focusKey: key,
      anchorOffset: 0,
      focusOffset: 0,
    });
    setEditorState(EditorState.forceSelection(editorState, newSelection));
  };

  render() {
    const { blockProps, block } = this.props;
    const data = block.getData();
    const src = data.get("src");
    const showPlaceholder = block.getLength() === 0 && blockProps.placeholder;

    if (src !== null) {
      const extraProps: any = {};

      if (showPlaceholder) {
        extraProps["data-placeholder"] = blockProps.placeholder;
        extraProps.className = "md-block-image-caption--empty";
      }

      return (
        <BlockImage>
          <div
            className="md-block-image-inner-container"
            onClick={this.focusBlock}
          >
            <img role="presentation" src={src} />
          </div>
          <figcaption {...extraProps}>
            <EditorBlock {...this.props} />
          </figcaption>
        </BlockImage>
      );
    }
    return <EditorBlock {...this.props} />;
  }
}

export default ImageBlock;

const BlockImage = styled.figure`
  margin: 10px 0;
  background: #fbfbfb;
  img {
    cursor: default;
    max-width: 100%;
    border: 1px solid #eee;
    box-sizing: border-box;

    &.is-selected {
      box-shadow: 0 0 0 3px #02b875;
    }
  }

  figcaption {
    display: block;
    font-size: 14px;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.6);
    letter-spacing: 0;
    font-weight: 300;
    font-style: normal;
    text-align: center;
    padding: 5px 0;

    .public-DraftStyleDefault-block {
      text-align: center;
    }

    &.md-block-image-caption--empty {
      position: relative;

      &::before {
        position: absolute;
        content: attr(data-placeholder);
        left: 0;
        opacity: 0.5;
      }
    }
  }

  .md-block-image-inner-container {
    position: relative;
  }
  .md-block-image-toolbar-container {
    position: absolute;
    top: 0;
    right: 10px;
    cursor: pointer;
  }
`;
