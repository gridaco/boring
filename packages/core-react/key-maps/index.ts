import React from "react";
import { EditorCommand } from "@draft-js-plugins/editor";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import Draft, { DraftHandleValue } from "draft-js";

export function keyBindingFn(e: React.KeyboardEvent<Element>) {
  if (e.key === "/") {
    return "show-boring-shortcut-menu";
  }

  if (KeyBindingUtil.hasCommandModifier(e) && e.which === 75) {
    if (e.shiftKey) {
      return KEY_COMMANDS.unlink();
    }
    return KEY_COMMANDS.showLinkInput();
  }
  if (e.altKey === true && !e.ctrlKey) {
    if (e.shiftKey === true) {
      switch (e.which) {
        // Alt + Shift + A
        // case 65: return addNewBlock();
        default:
          return getDefaultKeyBinding(e);
      }
    }
    switch (e.which) {
      // 1
      case 49:
        return KEY_COMMANDS.changeType("ordered-list-item");
      // @
      case 50:
        return KEY_COMMANDS.showLinkInput();
      // #
      case 51:
        return KEY_COMMANDS.changeType("header-three");
      // *
      case 56:
        return KEY_COMMANDS.changeType("unordered-list-item");
      // <
      case 188:
        return KEY_COMMANDS.changeType("caption");
      // // -
      // case 189: return 'changetype:caption';
      // >
      case 190:
        return KEY_COMMANDS.changeType("unstyled");
      // "
      case 222:
        return KEY_COMMANDS.changeType("blockquote");
      default:
        return getDefaultKeyBinding(e);
    }
  }
  // if (e.keyCode === 46 && !e.ctrlKey) {
  //   return KEY_COMMANDS.deleteBlock();
  // }
  return getDefaultKeyBinding(e);
}

export function handleKeyCommand(command: EditorCommand): DraftHandleValue {
  if (command === "show-boring-shortcut-menu") {
    // todo
    return "handled";
  }

  // We do this by telling Draft we haven't handled it.
  return "not-handled";
}

export const KEY_COMMANDS = {
  addNewBlock: () => "add-new-block",
  changeType: (type = "") => `changetype:${type}`,
  showLinkInput: () => "showlinkinput",
  unlink: () => "unlink",
  toggleInline: (type = "") => `toggleinline:${type}`,
  deleteBlock: () => "delete-block",
};
