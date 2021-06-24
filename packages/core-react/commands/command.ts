import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export default Extension.create({
  name: "slash-command-suggestion",

  defaultOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      command: ({ editor, range, props }) => {
        props.command({ editor, range });
      },
    },
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        //@ts-ignore
        ...this.options.suggestion,
      }),
    ];
  },
});
