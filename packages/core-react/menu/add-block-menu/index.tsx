import React from "react";
import { BlockList as AddBlockMenuBody } from "./block-list";
import { Editor } from "@tiptap/react";
import Iframe from "../../blocks/iframe-block"; /* for typings */

export function AddBlockMenu({ editor }: { editor: Editor }) {
  return (
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
      items={[
        {
          title: "H1",
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("heading", { level: 1 })
              .run();
          },
        },
        {
          title: "H2",
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("heading", { level: 2 })
              .run();
          },
        },
        {
          title: "Paragraph",
          command: ({ editor, range }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setNode("paragraph")
              .run();
          },
        },
        {
          title: "Embed",
          command: ({ editor, range }) => {
            const url = window.prompt("URL");
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .setIframe({ src: url })
              .run();
          },
        },
      ]}
    />
  );
}

export { AddBlockMenuBody };
