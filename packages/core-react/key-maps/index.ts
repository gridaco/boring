import React from "react";
import { EditorCommand } from "@draft-js-plugins/editor";
import Draft, { DraftHandleValue } from "draft-js";

export function keyBindingFn(e: React.KeyboardEvent<Element>) {
  if (e.key === "/") {
    return "show-boring-shortcut-menu";
  }

  // This wasn't the delete key, so we return Draft's default command for this key
  return Draft.getDefaultKeyBinding(e);
}

export function handleKeyCommand(command: EditorCommand): DraftHandleValue {
  if (command === "show-boring-shortcut-menu") {
    // todo
    return "handled";
  }

  // We do this by telling Draft we haven't handled it.
  return "not-handled";
}
