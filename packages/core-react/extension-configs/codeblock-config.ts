import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
/* load all highlight.js languages */ import lowlight from "lowlight";

export const CodeblockConfig = CodeBlockLowlight.configure({
  lowlight,
});
