import React from "react";
import { EditorState, RichUtils } from "draft-js";

import StyleButton from "../styledbutton";

interface Props {
  buttons: any[];
  editorState: EditorState;
  onToggle?: (v?) => void;
  onClick?: (v?) => void;
}

export const BlockToolbar = (props: Props) => {
  if (props.buttons.length < 1) {
    return null;
  }
  const { editorState } = props;
  const blockType = RichUtils.getCurrentBlockType(editorState);
  return (
    <div className="md-RichEditor-controls md-RichEditor-controls-block">
      {props.buttons.map((type) => {
        const iconLabel: {
          label: any;
        } = {
          label: type.label,
        };

        return (
          <StyleButton
            {...iconLabel}
            key={type.style}
            active={type.style === blockType}
            onToggle={props.onToggle}
            style={type.style}
            description={type.description}
            onClick={type.onClick}
          />
        );
      })}
    </div>
  );
};
