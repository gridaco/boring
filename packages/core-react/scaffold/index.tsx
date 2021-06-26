//
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Title } from "../title";
import { Node } from "@tiptap/core";
import { MainBodyContentEditor } from "../content-editor";

interface ScaffoldProps {
  /**
   * defaults to false
   */
  fullWidth?: boolean;

  /**
   * boring in-content extended node blocks configuration
   */
  extensions?: Node[];

  // doc
  initialTitle?: string;
  onTitleChange?: (title: string) => void;
  initialContent?: string;
  onContentChange?: (content: string) => void;
  //
}

export function Scaffold(props: ScaffoldProps) {
  // const [shortcutOpen, setShortcutOpen] = useState<boolean>(false);

  const onTitleReturnHit = () => {
    // todo - focus to main editor
  };

  return (
    <EditorWrap fullWidth={props.fullWidth}>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title onChange={props.onTitleChange} onReturn={onTitleReturnHit}>
        {props.initialTitle}
      </Title>
      <MainBodyContentEditor
        onChange={props.onContentChange}
        initialContent={props.initialContent}
        extensions={props.extensions}
      />
    </EditorWrap>
  );
}

const EditorWrap = styled.div<{
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 160px ${(p) => (p.fullWidth ? "140px" : "200px")};
`;
