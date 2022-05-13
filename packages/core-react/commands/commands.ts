import Commands from "./command";
import { Editor, Extension, Range, ReactRenderer } from "@tiptap/react";
import { CommandsList } from "./command-list";
import tippy from "tippy.js";

export const SlashCommands = Extension.create({
  defaultOptions: {
    commands: [
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
    ],
  },

  addExtensions() {
    const extensions = [
      Commands.configure({
        suggestion: {
          items: (query) => {
            // @ts-ignore
            return this.options.commands
              .filter((item) => item.title.toLowerCase().startsWith(query))
              .slice(0, 10);
          },
          render: () => {
            let component;
            let popup;

            return {
              onStart(props) {
                component = new ReactRenderer(CommandsList as any, {
                  editor: props.editor,
                  props: props,
                });

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
                return (component.ref as CommandsList).onKeyDown(props.event);
              },
              onExit() {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
    ];
    return extensions;
  },
});
