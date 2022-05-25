import React, { useEffect, useRef } from "react";
import { BlockList as AddBlockMenuBody } from "./block-list";
import { Editor } from "@tiptap/react";
import getSuggestionItems from "./items";

export function AddBlockMenu({
  editor,
  onUploadFile,
  onHide,
}: {
  editor: Editor;
  onUploadFile: (file: File) => Promise<string | false>;
  onHide: () => void;
}) {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    // focus to this element on mount
    ref.current?.focus();
  }, [ref]);

  useEffect(() => {
    const block = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    document.addEventListener("keydown", block);
    return () => {
      document.removeEventListener("keydown", block);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 350,
        width: "max-content",
      }}
    >
      {/* @ts-ignore */}
      <AddBlockMenuBody
        command={(c) => {
          c.command({
            editor,
            range: [
              editor.view.state.selection.from,
              editor.view.state.selection.to,
            ],
          });
          onHide();
        }}
        items={getSuggestionItems({ editor, onUploadFile })}
      />
    </div>
  );
}

export { AddBlockMenuBody };
