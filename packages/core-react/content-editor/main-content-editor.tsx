import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Node } from "@tiptap/core";
import { Editor, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// region block components

// endregion block components
import { DEFAULT_THEME_FONT_FAMILY } from "../theme";
import { Menu } from "../menu";
import {
  PlaceholderConfig,
  CodeblockConfig,
  BlockQuoteConfig,
} from "./configs";

interface MainBodyContentEditorProps {
  /**
   * initial height of interactive area. defaults to 200px.
   */
  initialHeight?: string;
  initialContent?: string;
  extensions?: Node[];
}

export function MainBodyContentEditor(props: MainBodyContentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceholderConfig,
      CodeblockConfig,
      BlockQuoteConfig,

      ...(props.extensions ?? []),
    ],
    content: props.initialContent,
  });

  const focus = () => {
    editor?.chain().focus().run();
  };

  /**
   * this is for focusing to content editor when padding safe area is clicked. (usually bottom of the editor)
   */
  const onTouchAreaClick = () => {
    focus();
  };

  return (
    <RootWrapper>
      {/* <MenuBar editor={editor} /> */}
      <Menu editor={editor} />
      {/* <CommandsConfig /> */}

      <TouchArea initialHeight={props.initialHeight} onClick={onTouchAreaClick}>
        <EditorContentInstance editor={editor} />
      </TouchArea>
    </RootWrapper>
  );
}

const TouchArea = styled.div<{
  initialHeight?: string;
}>`
  cursor: text;
  min-height: ${(p) => p.initialHeight ?? "200px"};
  padding-bottom: 120px;
`;

const RootWrapper = styled.div`
  max-width: 50vw; // fixme
  /* disable outline for contenteditable */
  [contenteditable] {
    outline: 0px solid transparent;
  }
`;

const EditorContentInstance = styled(EditorContent)`
  /* font */
  .ProseMirror {
    h1,
    h2,
    h3,
    p {
      color: #222222;
      font-family: ${DEFAULT_THEME_FONT_FAMILY};
      line-height: 110%;
    }

    h1,
    h2,
    h3 {
      line-height: 180%;
    }

    /* p only */
    p {
      line-height: 150%;
    }
  }

  /* placeholder's style - https://www.tiptap.dev/api/extensions/placeholder/#placeholder*/
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }

  /* ================================================================ */
  /* region placeholder */
  /* Placeholder (only at the top) */
  .ProseMirror .is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }

  /* Placeholder (on every new line) */
  .ProseMirror .is-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: #ced4da;
    pointer-events: none;
    height: 0;
  }
  /* endregion placeholder */
  /* ================================================================ */

  .ProseMirror {
    /* ================================================================ */
    /* codeblock - https://www.tiptap.dev/api/nodes/code-block-lowlight */
    /*  */
    pre {
      background: #5c5c5c;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }

      .hljs-comment,
      .hljs-quote {
        color: #616161;
      }

      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f98181;
      }

      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #fbbc88;
      }

      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #b9f18d;
      }

      .hljs-title,
      .hljs-section {
        color: #faf594;
      }

      .hljs-keyword,
      .hljs-selector-tag {
        color: #70cff8;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: 700;
      }
    }
    /* ================================================================ */
    /* ================================================================ */

    /* ================================================================ */
    /* blockquote - https://www.tiptap.dev/api/nodes/blockquote */
    /* FIXME - not border-left working */
    blockquote {
      padding-left: 1rem;
      border-left: 2px solid #b0b0b0;
    }
    /* ================================================================ */
    /* ================================================================ */
  }
`;
