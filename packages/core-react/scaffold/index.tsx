import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { Title, TitleProps } from "../title";
import { Node } from "@tiptap/core";
import { MainBodyContentEditor } from "../content-editor";
import type { EditorView } from "prosemirror-view";
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
import {
  get_youtube_video_id,
  make_youtube_video_embed_url,
} from "../embeding-utils";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

export type InitialDocumentProp =
  | {
      title?: string;
      content?: string;
    }
  | BoringDocument
  | BoringDocumentId;

export type OnContentChange = (content: string, transaction?) => void;

export interface ScaffoldProps {
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

  onTriggerSave?: () => void;

  config?: EditorConfig;

  readonly?: boolean;

  fileUploader?: (file: File) => Promise<string | false>;

  titleStyle?: TitleProps["style"];
  collaboration?: {
    enabled: boolean;
  };
}

export function Scaffold({
  initial,
  fullWidth,
  onTitleChange,
  onContentChange,
  extensions,
  contentmode = "html",
  config = DefaultConfig,
  readonly = false,
  onTriggerSave,
  fileUploader,
  titleStyle,
  collaboration,
  ...props
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
          setTitle("");
          setContent("");
        }
      });
    }
  }, [initializer.id]);

  // endregion doc init

  // store
  const service = new BoringDocumentStore(id);

  // region collaboration
  // A new Y document
  const ydoc = useMemo(
    () => (collaboration?.enabled ? new Y.Doc() : null),
    [id, collaboration?.enabled]
  );
  // Registered with a WebRTC provider
  const provider = useMemo(
    () =>
      collaboration?.enabled
        ? new WebrtcProvider("boring.grida.co" + id, ydoc)
        : null,
    [id, ydoc, collaboration?.enabled]
  );
  // endregion collaboration

  const finalcontent = _makecontent(content);
  const editor = useEditor(
    {
      extensions: [
        ...default_extensions({
          onUploadFile: fileUploader,
        }),
        ...extensions,
        // region collaboration extensions
        ...(collaboration?.enabled
          ? [
              Collaboration.configure({
                document: ydoc,
              }),
              CollaborationCursor.configure({
                provider: provider,
                user: {
                  name: "Editor",
                  color: randomCursorColor(),
                },
              }),
            ]
          : []),
        // endregion collaboration extensions
      ] as any,
      content: finalcontent,
      // onTransaction: ({ editor, transaction }) => {
      //   // editor.state.selection.anchor;
      //   // editor.view.posAtDOM()
      // },
      editorProps: {
        handlePaste: (view, event: ClipboardEvent, slice) => {
          console.log("pasted", event, slice, view);
          const text = event.clipboardData.getData("Text");
          if (text) {
            // parse
            const id = get_youtube_video_id(text);
            if (id) {
              addIframe(make_youtube_video_embed_url(id));
              return true;
            }
          }
          return false;
        },
        handleDrop: function (view, event: DragEvent, slice, moved) {
          if (!moved && event.dataTransfer && event.dataTransfer.files) {
            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });
            // if dropping external files
            // the addImage function checks the files are an image upload, and returns the url
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
              const file = event.dataTransfer.files.item(i);
              fileUploader?.(file).then((url) => {
                if (url) {
                  if (file.type.includes("image")) {
                    return addImage(
                      // @ts-ignore
                      view,
                      url,
                      coordinates.pos
                    );
                  }

                  if (file.type.includes("video")) {
                    return addVideo(
                      // @ts-ignore
                      view,
                      url,
                      coordinates.pos
                    );
                  }
                } else {
                  console.error("cannot upload file", event);
                  return false;
                }
              });
            }
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

  const addIframe = (url: string) => {
    if (url) {
      editor?.chain().focus().setIframe({ src: url }).run();
    }
  };

  // this inserts the image with src url into the editor at the position of the drop
  const addImage = (view: EditorView<any>, url: string, pos: number) => {
    const { schema } = view.state;
    const node = schema.nodes.image.create({ src: url });
    const transaction = view.state.tr.insert(pos, node);
    return view.dispatch(transaction);
  };

  const addVideo = (view: EditorView<any>, url: string, pos: number) => {
    const { schema } = view.state;
    const node = schema.nodes.video.create({ src: url });
    const transaction = view.state.tr.insert(pos, node);
    return view.dispatch(transaction);
  };

  const focustocontent = () => {
    editor?.chain().focus().run();
  };

  const focustotop = () => {
    editor?.chain().focus("start").run();
  };

  const _ontitlereturnhit = () => {
    focustotop();
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
    <EditorWrap
      fullWidth={fullWidth}
      onKeyDown={(e) => {
        // if cmd + s ignore.
        if (e.metaKey && e.key === "s") {
          e.preventDefault();
          e.stopPropagation();
          onTriggerSave?.();
        }
      }}
    >
      {/* <button onClick={handleclick}>insert</button> */}
      <Title
        onChange={_ontitlechange}
        onReturn={_ontitlereturnhit}
        style={titleStyle}
      >
        {title}
      </Title>
      <TitleAndEditorSeparator />
      <MainBodyContentEditor
        editor={editor}
        readonly={readonly}
        onUploadFile={fileUploader}
      />
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

function randomCursorColor() {
  const colors = [
    "#f783ac",
    "#f7b7c4",
    "#f7d6a7",
    "#f7c7a7",
    "#f7b7a7",
    "#f7a7a7",
    "#f7a7b7",
    "#f7a7c7",
    "#f7a7d6",
    "#f7a7e6",
    "#f7a7f6",
    "#f7a7ff",
    "#f7d6ff",
    "#f7c6ff",
    "#f7b6ff",
    "#f7a6ff",
    "#f796ff",
    "#f7a6f7",
    "#f7a6e7",
    "#f7a6d7",
    "#f7a6c7",
    "#f7a6b7",
    "#f7a6a7",
    "#f7a6a7",
    "#f7a7a7",
    "#f7b7a7",
    "#f7c7a7",
    "#f7d6a7",
    "#f7e6a7",
    "#f7f6a7",
    "#ffa7a7",
    "#ffa7b7",
    "#ffa7c7",
    "#ffa7d7",
    "#ffa7e7",
    "#ffa7f7",
    "#ffa7ff",
    "#ffd6ff",
    "#ffc6ff",
    "#ffb6ff",
    "#ffa6ff",
    "#ff96ff",
    "#ffa6f7",
    "#ffa6e7",
    "#ffa6d7",
    "#ffa6c7",
    "#ffa6b7",
    "#ffa6a7",
    "#ffa6a7",
    "#ffa7a7",
    "#ffb7a7",
    "#ffc7a7",
    "#ffd6a7",
    "#ffe6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const TitleAndEditorSeparator = styled.div`
  height: 32px;
`;

const EditorWrap = styled.div<{
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  max-width: 1080px;
  height: 100%;
  margin: auto;
  padding: 160px ${(p) => (p.fullWidth ? "20px" : "80px")};

  @media (max-width: 600px) {
    padding: 120px 20px;
  }
`;
