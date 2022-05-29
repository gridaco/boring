import React, { useState, useEffect, useCallback } from "react";
import css from "@emotion/css";
import { NodeViewWrapper } from "@tiptap/react";
import { Node, mergeAttributes, Editor } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { getHeadingsFrom } from "../table-of-contents";

export const TableOfContents = Node.create({
  name: "table-of-contents",

  group: "block",

  atom: true,

  parseHTML() {
    return [
      {
        tag: "toc",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["toc", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TocNode);
  },

  addGlobalAttributes() {
    return [
      {
        types: ["heading"],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
});

const TocNode = ({ editor }: { editor: Editor }) => {
  const [items, setItems] = useState([]);

  const handleUpdate = useCallback(() => {
    setItems(getHeadingsFrom(editor));
  }, [editor]);

  useEffect(handleUpdate, []);

  useEffect(() => {
    if (!editor) {
      return null;
    }

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  return (
    <NodeViewWrapper css={style}>
      <ul className="list">
        {items.map((item, index) => (
          <li key={index} className={`item item--${item.level}`}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </NodeViewWrapper>
  );
};

const style = css`
  background: rgba(black, 0.1);
  border-radius: 0.5rem;
  opacity: 0.75;
  padding: 0.75rem;

  list {
    list-style: none;
    padding: 0;

    &::before {
      content: "Table of Contents";
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.025rem;
      opacity: 0.5;
      text-transform: uppercase;
    }
  }

  &item {
    a:hover {
      opacity: 0.5;
    }

    &--3 {
      padding-left: 1rem;
    }

    &--4 {
      padding-left: 2rem;
    }

    &--5 {
      padding-left: 3rem;
    }

    &--6 {
      padding-left: 4rem;
    }
  }
`;
