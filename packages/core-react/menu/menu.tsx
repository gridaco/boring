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
  background-color: #e6e6e6;
  padding: 0.2rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 4px #a2a2a22b;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: #343434;
  font-weight: 500;
  padding: 0.2rem 0.6rem;
  opacity: 0.6;

  &:hover,
  &.is-active {
    opacity: 1;
  }

  font-size: medium;
`;
