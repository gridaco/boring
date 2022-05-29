import type { Editor } from "@tiptap/core";

/**
 * get headings and update the id if required.
 * @param editor
 * @returns
 */
export function getHeadingsFrom(editor: Editor) {
  const headings = [];
  const transaction = editor.state.tr;

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === "heading") {
      const id = `heading-i${headings.length + 1}`;

      if (node.attrs.id !== id) {
        transaction.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          id,
        });
      }

      headings.push({
        level: node.attrs.level,
        text: node.textContent,
        id,
      });
    }
  });

  transaction.setMeta("addToHistory", false);
  transaction.setMeta("preventUpdate", true);

  editor.view.dispatch(transaction);
  return headings;
}
