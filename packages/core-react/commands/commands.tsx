import Command from "./command";
import { Editor, Range, ReactRenderer } from "@tiptap/react";
import { CommandsList } from "./command-list";
import tippy from "tippy.js";

interface _P {
  editor: Editor;
  range: Range;
}

export const Commands = (editor: () => Editor) =>
  Command.configure({
    suggestion: {
      items: (query) => {
        return [
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
            title: "bold",
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setMark("bold").run();
            },
          },
          {
            title: "italic",
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setMark("italic").run();
            },
          },
        ]
          .filter((item) =>
            item.title.toLowerCase().startsWith(query.toLowerCase())
          )
          .slice(0, 10);
      },
      render: () => {
        let component;
        let popup;

        return {
          onStart: (props) => {
            console.log("editor", editor());
            // ?
            component = new ReactRenderer(
              CommandsList as React.FunctionComponent,
              {
                editor: editor(),
                props: props,
              }
            );

            popup = tippy("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start",
            });
          },
          onUpdate(props) {
            component.updateProps(props);

            popup[0].setProps({
              getReferenceClientRect: props.clientRect,
            });
          },
          onKeyDown(props) {
            return component.ref?.onKeyDown(props);
          },
          onExit() {
            popup[0].destroy();
            component.destroy();
          },
        };
      },
    },
  });
