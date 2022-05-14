import { Editor } from "@tiptap/react";

const getSuggestionItems = ({
  editor,
  query,
}: {
  editor: Editor;
  query: string;
}) => {
  const d = JSON.stringify(editor.getJSON());

  const lastd = sessionStorage.getItem("last-content");
  sessionStorage.setItem("last-content", d);
  if (d.length < lastd.length || lastd === d) {
    // if removed or same - it means "/" is not typed.
    // somehow the d is not beign updated with '/' value
    // this may not work when removing and re inserting the same value - '/'
    // fix: save the data on every change, compare that with this. (somewhre else)
    return [];
  }

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
    {
      title: "image",
      command: ({ editor, range }) => {
        console.log("call some function from parent");
        editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
