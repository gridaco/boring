import React from "react";
import styled from "@emotion/styled";
import { Editor, BubbleMenu } from "@tiptap/react";

export function Menu(props: { editor: Editor | null }) {
  const { editor } = props;
  return (
    <>
      {editor && (
        <MenuWrapper
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </Button>
        </MenuWrapper>
      )}
    </>
  );
}

// https://www.tiptap.dev/examples/menus
const MenuWrapper = styled(BubbleMenu)`
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  opacity: 0.6;

  &:hover,
  &.is-active {
    opacity: 1;
  }
`;
