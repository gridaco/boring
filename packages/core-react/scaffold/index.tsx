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

export type OnContentChange = (content: string, transaction?) => void;

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

  onContentChange?: OnContentChange;
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
  const [title, setTitle] = useState<string>(initializer.loaded?.title?.raw);
  const [content, setContent] = useState<string>(
    initializer.loaded?.content?.raw
  );

  useEffect(() => {
    if (initializer.shouldload) {
      initializer.shouldload.then((d) => {
        if (d) {
          setTitle(d.title.raw);
          setContent(d.content.raw);
        } else {
          setTitle("ERR");
          setContent("<h3>404 page not found</h3>");
        }
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
      editorProps: {
        handleDrop: function (view, event: DragEvent, slice, moved) {
          if (!moved && event.dataTransfer && event.dataTransfer.files) {
            // if dropping external files
            // the addImage function checks the files are an image upload, and returns the url
            console.log("file dropped", event.dataTransfer);
            addImage(event.dataTransfer.files[0]).then((url) => {
              // this inserts the image with src url into the editor at the position of the drop
              const { schema } = view.state;
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });
              const node = schema.nodes.image.create({ src: url });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              return view.dispatch(transaction);
            });
            return true; // drop is handled don't do anything else
          }
          return false; // not handled as wasn't dragging a file so use default behaviour
        },
        // TODO: when pos = 0, < or ^ key pressed, move to title
        // handleKeyPress: function (view, event) {
        //   return true;
        // },
      },
      onUpdate: ({ editor, transaction }) => {
        const content = editor.getHTML();
        _oncontentchange(content, transaction);
      },
    },
    [content]
  );

  const addImage = async (d) => {
    return "https://grida.co/";
  };

  const focustocontent = () => {
    editor?.chain().focus().run();
  };

  const _ontitlereturnhit = () => {
    focustocontent();
  };

  const _ontitlechange = (t: string) => {
    onTitleChange?.(t);
  };

  const _oncontentchange = (c: string, transaction?) => {
    service.updateContent(c);
    //
    onContentChange?.(c, transaction);
  };

  return (
    <EditorWrap fullWidth={fullWidth}>
      {/* <button onClick={handleclick}>insert</button> */}
      <Title onChange={_ontitlechange} onReturn={_ontitlereturnhit}>
        {title}
      </Title>
      <TitleAndEditorSeparator />
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
      title: initial?.title,
      content: initial?.content,
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

const TitleAndEditorSeparator = styled.div`
  height: 32px;
`;

const EditorWrap = styled.div<{
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 160px ${(p) => (p.fullWidth ? "140px" : "200px")};
`;
