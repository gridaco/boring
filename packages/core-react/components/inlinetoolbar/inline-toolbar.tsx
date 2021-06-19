import { EditorState } from "draft-js";
import React from "react";

import StyleButton from "../styledbutton";

interface Props {
  buttons?: any[];
  editorState: EditorState;
  onToggle: () => void;
  onClick?: () => void;
}

export const InlineToolbar = (props: Props) => {
  if (props.buttons.length < 1) {
    return null;
  }
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="md-RichEditor-controls md-RichEditor-controls-inline">
      {props.buttons.map((type) => {
        const iconLabel = {
          label: type.label,
        };
        return (
          <StyleButton
            {...iconLabel}
            key={type.style}
            active={currentStyle.has(type.style)}
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
