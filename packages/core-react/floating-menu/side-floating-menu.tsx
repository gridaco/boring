import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FloatingMenu as TiptapFloatingMenu, Editor } from "@tiptap/react";
import {
  useFloating,
  offset,
  useInteractions,
  useDismiss,
  autoUpdate,
} from "@floating-ui/react-dom-interactions";
import { AddBlockMenu } from "../menu";

export function SideFloatingMenu({
  editor,
  onUploadFile,
}: {
  editor: Editor;
  onUploadFile;
}) {
  const rectref = useRef<HTMLDivElement>();
  const [addMenuShown, setAddMenuShown] = useState(false);
  const { x, y, reference, floating, context } = useFloating({
    middleware: [offset({ mainAxis: 4, crossAxis: 40 })],
    strategy: "absolute",
    open: addMenuShown,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context, {
      enabled: true,
      escapeKey: true,
      referencePointerDown: true,
      outsidePointerDown: true,
    }),
  ]);

  const showAddMenu = () => setAddMenuShown(true);
  const hideAddMenu = () => setAddMenuShown(false);

  useEffect(() => {
    setAddMenuShown(false);
  }, [editor.state.selection.anchor]);

  // dismiss manager
  useEffect(() => {
    const hideonclickoutside = (event: MouseEvent) => {
      if (rectref.current && !rectref.current.contains(event.target as Node)) {
        hideAddMenu();
      }
    };

    const hideonkeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hideAddMenu();
      }
    };
    if (addMenuShown) {
      document.addEventListener("mousedown", hideonclickoutside);
      document.addEventListener("keydown", hideonkeydown);
    }
    return () => {
      document.removeEventListener("mousedown", hideonclickoutside);
      document.removeEventListener("keydown", hideonkeydown);
    };
  }, [addMenuShown]);

  return (
    <>
      <TiptapFloatingMenu
        editor={editor}
        tippyOptions={{
          zIndex: 3,
          offset: [0, -40],
        }}
      >
        <div ref={rectref}>
          <div
            ref={floating}
            {...getFloatingProps()}
            style={{
              zIndex: 3,
              position: "absolute",
              display: addMenuShown ? "block" : "none",
              left: x,
              top: y,
            }}
          >
            {addMenuShown && (
              <AddBlockMenu
                editor={editor}
                onUploadFile={onUploadFile}
                onHide={hideAddMenu}
              />
            )}
          </div>
        </div>
        <Container>
          <AddButton
            ref={reference}
            {...getReferenceProps()}
            onClick={showAddMenu}
          >
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
      </TiptapFloatingMenu>
    </>
  );
}

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
