//
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Title } from "../title";
import { Node } from "@tiptap/core";
import { MainBodyContentEditor } from "../content-editor";
import {
  BoringContent,
  BoringDocument,
  BoringDocumentId,
  autoid,
} from "@boring.so/document-model";
import { EditorConfig, defaults as DefaultConfig } from "@boring.so/config";
import { Editor, useEditor, EditorContent } from "@tiptap/react";
import { default_extensions } from "./scaffold-extensions";
import { BoringDocumentStore } from "@boring.so/store";

export type InitialDocumentProp =
  | {
      title?: string;
      content?: string;
    }
  | BoringDocument
  | BoringDocumentId;

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
  const initializer = handleDocumentInitialization(initial);
  const id = initializer.id;
  const [title, setTitle] = useState<string>(initializer.loaded?.title.raw);
  const [content, setContent] = useState<string>(
    initializer.loaded?.content.raw
  );

  useEffect(() => {
    if (initializer.shouldload) {
      initializer.shouldload.then((d) => {
        setTitle(d.title.raw);
        // content update
        setContent(d.content.raw);
        // content update
      });
    }
  }, [initializer.id]);

  // endregion doc init

  // store
  const service = new BoringDocumentStore(id);

  const finalcontent = _makecontent(content);
  const editor = useEditor(
    {
      extensions: [...default_extensions, ...extensions],
      content: finalcontent,
      onUpdate: ({ editor }) => {
        const content = editor.getHTML();
        _oncontentchange(content);
      },
    },
    [content]
  );

  const focustocontent = () => {
    editor?.chain().focus().run();
  };

  const _ontitlereturnhit = () => {
    focustocontent();
  };

  const _ontitlechange = (t: string) => {
    onTitleChange?.(t);
  };

  const _oncontentchange = (c: string) => {
    service.updateContent(c);
    //
    onContentChange?.(c);
  };

  return (
    <EditorWrap fullWidth={fullWidth}>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title onChange={_ontitlechange} onReturn={_ontitlereturnhit}>
        {title}
      </Title>
      <MainBodyContentEditor editor={editor} />
    </EditorWrap>
  );
}

function handleDocumentInitialization(initial: InitialDocumentProp): {
  id: BoringDocumentId;
  loaded?: BoringDocument;
  shouldload?: Promise<BoringDocument>;
} {
  if (initial instanceof BoringDocument) {
    return {
      id: initial.id,
      loaded: initial,
    };
  } else if (typeof initial == "string") {
    // fetch document
    return {
      id: initial,
      shouldload: new BoringDocumentStore(initial).get(),
    };
  } else {
    const _newly = new BoringDocument({
      title: initial.title,
      content: initial.content,
    });
    return {
      id: _newly.id,
      loaded: _newly,
    };
  }
}

function _makecontent(raw: string | BoringContent): string {
  if (raw) {
    if (typeof raw == "string") {
      return raw;
    }
    return raw.raw;
  }
}

const EditorWrap = styled.div<{
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 160px ${(p) => (p.fullWidth ? "140px" : "200px")};
`;
