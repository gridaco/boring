//
import React from "react";
import { Editor } from "../editor-instance";

export function Scaffold() {
  return (
    <Editor
      tools={{}}
      data={{
        blocks: [],
      }}
    ></Editor>
  );
}
