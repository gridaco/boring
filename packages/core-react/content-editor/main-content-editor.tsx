import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "../menu-bar";
import { Menu } from "../menu";

export function MainBodyContentEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <>
      <MenuBar editor={editor} />
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
