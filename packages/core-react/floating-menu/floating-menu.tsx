import React from "react";
import styled from "@emotion/styled";
import { FloatingMenu as TiptapFloatingMenu, Editor } from "@tiptap/react";

export function FloatingMenu({
  editor,
  onAddClick,
}: {
  editor: Editor;
  onAddClick: () => void;
}) {
  return (
    <TiptapFloatingMenu editor={editor}>
      <Positioner>
        <Container>
          <AddButton onClick={onAddClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              <path
                viewBox="0 0 24 24"
                fill="rgba(0, 0, 0, 0.5)"
                d="M 5 0 C 4.723857402801514 0 4.5 0.22385776042938232 4.5 0.5000001192092896 L 4.5 4.499999523162842 L 0.5000000596046448 4.499999523162842 C 0.22385764122009277 4.499999523162842 0 4.723857402801514 0 5 C 0 5.276142120361328 0.22385767102241516 5.5 0.5000000596046448 5.5 L 4.5 5.5 L 4.5 9.5 C 4.5 9.776142120361328 4.723857402801514 10 5 10 C 5.276142597198486 10 5.5 9.776142120361328 5.5 9.5 L 5.5 5.500000476837158 L 9.5 5.500000476837158 C 9.776142120361328 5.500000476837158 10 5.276142597198486 10 5 C 10 4.723857879638672 9.776142120361328 4.5 9.5 4.5 L 5.5 4.5 L 5.5 0.5 C 5.5 0.22385764122009277 5.276142597198486 0 5 0 Z"
              />
            </svg>
          </AddButton>
        </Container>
      </Positioner>
    </TiptapFloatingMenu>
  );
}

const Positioner = styled.div`
  position: absolute;
  top: -12px;
  left: -80px;
`;

const Container = styled.div`
  display: flex;
`;

const AddButton = styled.button`
  outline: none;
  border: none;
  text-align: center;
  border-radius: 4px;
  background-color: transparent;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
