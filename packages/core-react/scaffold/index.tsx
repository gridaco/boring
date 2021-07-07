//
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Title } from "../title";
import { Node } from "@tiptap/core";
import { MainBodyContentEditor } from "../content-editor";
import { BoringContent, BoringDocument } from "@boring.so/document-model";

interface ScaffoldProps {
  /**
   * defaults to false
   */
  fullWidth?: boolean;

  /**
   * boring in-content extended node blocks configuration
   */
  extensions?: Node[];

  // region document model
  /**
  once initial document is provided, other individual initial[content, title] will be ignored
  */
  initialDocument?: BoringDocument;

  /**
  once initial document is provided, other individual initial[content, title] will be ignored
  */
  initialTitle?: string;
  onTitleChange?: (title: string) => void;

  /**
   * once initial document is provided, other individual initial[content, title] will be ignored
   */
  initialContent?: string;
  onContentChange?: (content: string) => void;
  // endregion document model
}

export function Scaffold(props: ScaffoldProps) {
  let _title: string;
  let _content: string | BoringContent;
  if (props.initialDocument) {
    _title = props.initialDocument.title.raw; // add icon handling
    _content = props.initialDocument.content;
  } else {
    _title = props.initialTitle;
    _content = props.initialContent;
  }
  // const [shortcutOpen, setShortcutOpen] = useState<boolean>(false);

  const onTitleReturnHit = () => {
    // todo - focus to main editor
  };

  return (
    <EditorWrap fullWidth={props.fullWidth}>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title onChange={props.onTitleChange} onReturn={onTitleReturnHit}>
        {_title}
      </Title>
      <MainBodyContentEditor
        onChange={props.onContentChange}
        initialContent={_content}
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
