import React from "react";
import { EditorCommand } from "@draft-js-plugins/editor";
import Draft, { DraftHandleValue, EditorState, Modifier } from "draft-js";

export function keyBindingFn(e: React.KeyboardEvent<Element>) {
  if (e.key === "/") {
    return "show-boring-shortcut-menu";
  }
  if (e.key === "Enter") {
    return "split-block";
  }

  // This wasn't the delete key, so we return Draft's default command for this key
  return Draft.getDefaultKeyBinding(e);
}

export function handleKeyCommand(
  command: EditorCommand,
  editorState: EditorState,
  setEditorState: React.Dispatch<React.SetStateAction<Draft.EditorState>>
): DraftHandleValue {
  switch (command) {
    case "show-boring-shortcut-menu":
      return "handled";
    case "split-block":
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const textWithEntity = Modifier.splitBlock(currentContent, selection);
      setEditorState(
        EditorState.push(editorState, textWithEntity, "split-block")
      );
      return "handled";
  }

  // We do this by telling Draft we haven't handled it.
  return "not-handled";
}
