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
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 4C8.72386 4 8.5 4.22386 8.5 4.5V8.5H4.5C4.22386 8.5 4 8.72386 4 9C4 9.27614 4.22386 9.5 4.5 9.5H8.5V13.5C8.5 13.7761 8.72386 14 9 14C9.27614 14 9.5 13.7761 9.5 13.5V9.5H13.5C13.7761 9.5 14 9.27614 14 9C14 8.72386 13.7761 8.5 13.5 8.5H9.5V4.5C9.5 4.22386 9.27614 4 9 4Z"
                fill="black"
                fillOpacity="0.5"
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
  left: -60px;
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
