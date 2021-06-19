import React from "react";

export function keyBindingFn(e: React.KeyboardEvent<Element>) {
  if (e.key === "/") {
    return "show-boring-shortcut-menu";
  }
  if (e.key === "Enter") {
    return "split-block";
  }
}

export function handleKeyCommand(command: string) {
  switch (command) {
    case "show-boring-shortcut-menu":
      return "handled";
    case "split-block":
      // const currentContent = editorState.getCurrentContent();
      // const selection = editorState.getSelection();
      // const textWithEntity = Modifier.splitBlock(currentContent, selection);
      // setEditorState(
      //   EditorState.push(editorState, textWithEntity, "split-block")
      // );
      return "handled";
  }

  // We do this by telling Draft we haven't handled it.
  return "not-handled";
}
