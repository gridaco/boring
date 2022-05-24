import Placeholder from "@tiptap/extension-placeholder";

export const PlaceholderConfig = Placeholder.configure({
  showOnlyCurrent: true,
  placeholder: ({ node, editor, hasAnchor }) => {
    const headingPlaceholders = {
      1: "Heading 1",
      2: "Heading 2",
      3: "Heading 3",
    };

    if (node.type.name === "heading") {
      return headingPlaceholders[node.attrs.level];
    }

    if (node.type.name === "paragraph") {
      return "Type '/' for commands";
    }
  },
});
