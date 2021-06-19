import Command from "./command";
import { Editor, Range } from "@tiptap/react";

interface _P {
  editor: Editor;
  range: Range;
}

export const Commands = Command.configure({
  suggestion: {
    items: (query: string) => {
      return [
        {
          title: "H1",
          command: (p: _P) => {
            p.editor
              .chain()
              .focus()
              .deleteRange(p.range)
              .setNode("heading", { level: 1 })
              .run();
          },
        },
        {
          title: "H2",
          command: (p: _P) => {
            p.editor
              .chain()
              .focus()
              .deleteRange(p.range)
              .setNode("heading", { level: 2 })
              .run();
          },
        },
        {
          title: "bold",
          command: (p: _P) => {
            p.editor.chain().focus().deleteRange(p.range).setMark("bold").run();
          },
        },
        {
          title: "italic",
          command: (p: _P) => {
            p.editor
              .chain()
              .focus()
              .deleteRange(p.range)
              .setMark("italic")
              .run();
          },
        },
      ]
        .filter((item) =>
          item.title.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 10);
    },
  },
});
