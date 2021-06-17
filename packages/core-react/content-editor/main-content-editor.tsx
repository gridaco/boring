//
import React, { useEffect, useRef, useState } from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import Draft, { EditorState, AtomicBlockUtils } from "draft-js";
import Embed from "@boring-ui/embed";
import { extendedBlockRenderMap } from "../blocks";
import { inlineToolbarPlugin, InlineToolbar } from "../inline-toolbar";
import { keyBindingFn, handleKeyCommand } from "../key-maps";

/**
 * demo text used for development. shall not be referenced on production.
 */
const DEV_INITIAL_CONTENT_TEXT_ONELINE =
  "In this editor a toolbar shows up once you select part of the text …";

const plugins = [inlineToolbarPlugin];

export function MainBodyContentEditor() {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    createEditorStateWithText("")
  );

  useEffect(() => {
    // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
    setEditorState(createEditorStateWithText(DEV_INITIAL_CONTENT_TEXT_ONELINE));
  }, []);

  const editor = useRef<Editor | null>(null);

  const focus = () => {
    editor.current?.focus();
  };

  const onChange = (value: EditorState): void => {
    setEditorState(value);
  };

  const handleclick = () => {
    console.log(editorState);
    insertBlock();
  };

  const insertBlock = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "TEST",
      "MUTABLE",
      { a: "b" }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  return (
    <>
      <div onClick={focus}>
        <Editor
          blockRenderMap={extendedBlockRenderMap}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
          blockRendererFn={blocksRenderHandler}
          plugins={plugins}
          ref={editor}
        />
      </div>
      <InlineToolbar />
    </>
  );
}

function blocksRenderHandler(contentBlock: Draft.ContentBlock) {
  const type = contentBlock.getType();
  console.log("type", type);
  if (type === "atomic") {
    console.log(contentBlock);
    return {
      component: MediaComponent,
      editable: false,
      props: {
        foo: "bar",
      },
    };
  }
}

function MediaComponent() {
  return <Embed url="https://www.youtube.com/watch?v=RIZjZFoDhRc" />;
}
