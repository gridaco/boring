import React from "react";

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
        <div>
          <div
            className="md-block-image-inner-container"
            onClick={this.focusBlock}
          >
            <img role="presentation" src={src} />
          </div>
          <figcaption {...extraProps}>
            <EditorBlock {...this.props} />
          </figcaption>
        </div>
      );
    }
    return <EditorBlock {...this.props} />;
  }
}

export default ImageBlock;
