//
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Title } from "../title";

import { MainBodyContentEditor } from "../content-editor";

interface ScaffoldProps {
  /**
   * defaults to false
   */
  fullWidth?: boolean;
}

export function Scaffold(props: ScaffoldProps) {
  // const [shortcutOpen, setShortcutOpen] = useState<boolean>(false);

  const onTitleReturnHit = () => {
    // todo - focus to main editor
  };

  return (
    <EditorWrap fullWidth={props.fullWidth}>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title onReturn={onTitleReturnHit}>Title</Title>
      <MainBodyContentEditor />
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
