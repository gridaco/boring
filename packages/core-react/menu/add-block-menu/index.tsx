import React, { useEffect, useRef } from "react";
import { BlockList as AddBlockMenuBody } from "./block-list";
import { Editor } from "@tiptap/react";
import getSuggestionItems from "./items";

export function AddBlockMenu({ editor }: { editor: Editor }) {
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
        }}
        items={getSuggestionItems({ editor })}
      />
    </div>
  );
}

export { AddBlockMenuBody };
