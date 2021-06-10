import Draft, { DraftHandleValue } from "draft-js";

export function keyBindingFn(e) {
  if (e.key === "/") {
    return "show-boring-shortcut-menu";
  }

  // This wasn't the delete key, so we return Draft's default command for this key
  return Draft.getDefaultKeyBinding(e);
}

export function handleKeyCommand(command): DraftHandleValue {
  if (command === "show-boring-shortcut-menu") {
    // todo
    return "handled";
  }

  // We do this by telling Draft we haven't handled it.
  return "not-handled";
}
