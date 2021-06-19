//
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Title } from "../title";

import { MainBodyContentEditor } from "../content-editor";
import MediumDraftEditor from "../content-editor/editor";
import createEditorState from "../model/content";
import { EditorState } from "draft-js";
export function Scaffold() {
  // const [shortcutOpen, setShortcutOpen] = useState<boolean>(false);

  const [editorState, setEditorState] = useState<EditorState>(() =>
    createEditorState()
  );
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <EditorWrap>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title>Title</Title>
      <MediumDraftEditor
        //
        editorState={editorState}
        onChange={onChange}
      />
      {/* <MainBodyContentEditor /> */}
    </EditorWrap>
  );
}

const EditorWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 140px;
`;
