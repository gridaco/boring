import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Node } from "@tiptap/core";
import { Editor, useEditor, EditorContent } from "@tiptap/react";

// region block components

// endregion block components
import { DEFAULT_THEME_FONT_FAMILY } from "../theme";
import { InlineToolbar } from "../inline-toolbar";
import { SideFloatingMenu } from "../floating-menu";
import { BoringContent } from "@boring.so/document-model";

interface MainBodyContentEditorProps {
  editor: Editor;

  /**
   * initial height of interactive area. defaults to 200px.
   */
  initialHeight?: string;

  readonly: boolean;

  onUploadFile: (file: File) => Promise<string | false>;
}

export function MainBodyContentEditor({
  initialHeight,
  editor,
  readonly,
  onUploadFile,
}: MainBodyContentEditorProps) {
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
    <MainContentEditorRootWrapper>
      {/* <MenuBar editor={editor} /> */}
      <InlineToolbar editor={editor} />
      {/* <CommandsConfig /> */}
      {editor && (
        <SideFloatingMenu onUploadFile={onUploadFile} editor={editor} />
      )}
      <TouchArea initialHeight={initialHeight} onClick={onTouchAreaClick}>
        <EditorContentInstance readOnly={readonly} editor={editor} />
      </TouchArea>
    </MainContentEditorRootWrapper>
  );
}

const TouchArea = styled.div<{
  initialHeight?: string;
}>`
  cursor: text;
  width: 100%;
  min-height: ${(p) => p.initialHeight ?? "200px"};
  padding-bottom: 120px;
`;

const MainContentEditorRootWrapper = styled.div`
  /* disable outline for contenteditable */
  [contenteditable] {
    outline: 0px solid transparent;
  }

  min-height: 400px;
`;

const EditorContentInstance = styled(EditorContent)`
  /* font */
  .ProseMirror {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      color: rgba(0, 0, 0, 0.87);
      font-family: ${DEFAULT_THEME_FONT_FAMILY};
      line-height: 110%;
    }

    h1,
    h2,
    h3 {
      line-height: 180%;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 20px;
    }

    /* p only */
    p {
      font-size: 16px;
      line-height: 150%;
    }

    img {
      border-radius: 2px;
      width: 100%;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    video {
      width: 100%;
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    img,
    video {
      margin-bottom: 4px;
      &.ProseMirror-selectednode {
        outline: 2px solid rgba(0, 0, 0, 0.2);
        cursor: grab;
      }
      background-color: rgba(0, 0, 0, 0.2);
    }

    iframe {
      width: 100%;
      height: 400px;
    }

    hr {
      outline: none;
      border: none;
      border-bottom: solid 1px rgba(0, 0, 0, 0.12);
    }
  }

  /* placeholder's style - https://www.tiptap.dev/api/extensions/placeholder/#placeholder*/
  .ProseMirror p.is-editor-empty:first-of-type::before {
    content: attr(data-placeholder);
    float: left;
    color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    height: 0;
  }

  /* ================================================================ */
  /* region placeholder */
  /* Placeholder (only at the top) */
  .ProseMirror .is-editor-empty:first-of-type::before {
    content: attr(data-placeholder);
    float: left;
    color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    height: 0;
  }

  /* Placeholder (on every new line) */
  .ProseMirror .is-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: rgba(0, 0, 0, 0.3);
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
