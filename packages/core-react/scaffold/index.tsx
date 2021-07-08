//
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { Title } from "../title";
import { Node } from "@tiptap/core";
import { MainBodyContentEditor } from "../content-editor";
import { BoringContent, BoringDocument } from "@boring.so/document-model";
import { EditorConfig, defaults as DefaultConfig } from "@boring.so/config";
import { Editor, useEditor, EditorContent } from "@tiptap/react";
import { default_extensions } from "./scaffold-extensions";

export type InitialDocumentProp =
  | {
      title?: string;
      content?: string;
    }
  | BoringDocument;

interface ScaffoldProps {
  /**
   * defaults to false
   */
  fullWidth?: boolean;

  /**
   * boring in-content extended node blocks configuration
   */
  extensions?: Node<unknown | any>[];
  contentmode?: "html" | "json";

  // region document model
  initial?: InitialDocumentProp;
  onTitleChange?: (title: string) => void;

  onContentChange?: (content: string) => void;
  // endregion document model

  config?: EditorConfig;
}

export function Scaffold({
  initial,
  fullWidth,
  onTitleChange,
  onContentChange,
  extensions,
  contentmode = "html",
  config = DefaultConfig,
}: ScaffoldProps) {
  // region doc init
  let _title: string;
  let _content: string | BoringContent;
  if (initial instanceof BoringDocument) {
    _title = initial.title.raw; // add icon handling
    _content = initial.content;
  } else {
    _title = initial.title;
    _content = initial.content;
  }
  // endregion doc init

  const editor = useEditor({
    extensions: [...default_extensions, ...extensions],
    content: _makecontent(_content),
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      _oncontentchange(content);
    },
  });

  const focustocontent = () => {
    editor?.chain().focus().run();
  };

  // const [shortcutOpen, setShortcutOpen] = useState<boolean>(false);

  const _ontitlereturnhit = () => {
    focustocontent();
  };

  const _ontitlechange = (t: string) => {
    onTitleChange?.(t);
  };

  const _oncontentchange = (c: string) => {
    onContentChange?.(c);
  };

  return (
    <EditorWrap fullWidth={fullWidth}>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title onChange={_ontitlechange} onReturn={_ontitlereturnhit}>
        {_title}
      </Title>
      <MainBodyContentEditor editor={editor} />
    </EditorWrap>
  );
}

function _makecontent(raw: string | BoringContent): string {
  if (typeof raw == "string") {
    return raw;
  }
  return raw.raw;
}

const EditorWrap = styled.div<{
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 160px ${(p) => (p.fullWidth ? "140px" : "200px")};
`;
