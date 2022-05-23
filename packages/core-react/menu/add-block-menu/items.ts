import { Editor } from "@tiptap/react";
import type { BoringBlockIconType } from "./icons";
export interface CommandItem {
  title: string;
  subtitle?: string;
  icon?: BoringBlockIconType;
  command: ({ editor, range }: { editor: Editor; range }) => void;
}

const getSuggestionItems = ({
  editor,
  query = "",
}: {
  editor: Editor;
  query?: string;
}): CommandItem[] => {
  // [(enable this to disable slash commands on revisited slashes.)]
  // const d = JSON.stringify(editor.getJSON());
  // const lastd = sessionStorage.getItem("last-content");
  // sessionStorage.setItem("last-content", d);
  // if (d.length < (lastd?.length ?? 0) || lastd === d) {
  //   // if removed or same - it means "/" is not typed.
  //   // somehow the d is not beign updated with '/' value
  //   // this may not work when removing and re inserting the same value - '/'
  //   // fix: save the data on every change, compare that with this. (somewhre else)
  //   return [];
  // }

  return [
    <CommandItem>{
      title: "H1",
      icon: "h1",
      subtitle: "Big section heading",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    <CommandItem>{
      title: "H2",
      icon: "h2",
      subtitle: "Medium section heading",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    <CommandItem>{
      title: "H3",
      icon: "h3",
      subtitle: "Smaller section heading",
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    // <CommandItem>{
    //   title: "Text",
    //   icon: "text",
    //   subtitle: "Paragraph text",
    //   command: ({ editor, range }) => {
    //     editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    //   },
    // },
    <CommandItem>{
      title: "Image",
      icon: "image",
      subtitle: "Put an image from url or via upload",
      command: ({ editor, range }) => {
        // TODO:
        console.log("call some function from parent");
        // editor.chain().focus().deleteRange(range).setNode("paragraph").run();
      },
    },
    <CommandItem>{
      title: "Video",
      icon: "video",
      subtitle: "Embed a Youtube or Vimeo video",
      command: ({ editor, range }) => {
        // TODO:
        console.log("call some function from parent");
        const url = window.prompt("URL");
        if (url) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setIframe({ src: url })
            .run();
        }
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query?.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
