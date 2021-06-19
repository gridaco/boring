import styled from "@emotion/styled";
import React from "react";
import { EditorBlock } from "draft-js";

export default (props: any) => (
  <Cite>
    <EditorBlock {...props} />
  </Cite>
);

const Cite = styled.cite`
  display: block;
  margin: 0;

  &::before {
    content: "\2013";
    color: #999;
    float: left;
    font-weight: bold;
    display: inline;
    margin-right: 10px;
  }
`;
