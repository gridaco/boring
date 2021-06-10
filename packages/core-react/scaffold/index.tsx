//
import React from "react";
import styled from "@emotion/styled";
import { Title } from "../title";

import { MainBodyContentEditor } from "../content-editor";

export function Scaffold() {
  // const [shortcutOpen, setShortcutOpen] = useState<boolean>(false);

  return (
    <EditorWrap>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title>Title</Title>
      <MainBodyContentEditor />
    </EditorWrap>
  );
}

const EditorWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 140px;
`;
