import React from "react";
import styled from "@emotion/styled";
import { EditorBlock } from "draft-js";
import { updateDataOfBlock } from "../model";

interface Props {
  block?: any;
  blockProps?: any;
}

export default class TodoBlock extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    const { block, blockProps } = this.props;
    const { setEditorState, getEditorState } = blockProps;
    const data = block.getData();
    const checked = data.has("checked") && data.get("checked") === true;
    const newData = data.set("checked", !checked);
    setEditorState(updateDataOfBlock(getEditorState(), block, newData));
  }

  render() {
    const data = this.props.block.getData();
    const checked = data.get("checked") === true;
    return (
      <ToboBlock>
        <div className={checked ? "block-todo-completed" : ""}>
          <span contentEditable={false}>
            <input
              type="checkbox"
              checked={checked}
              onChange={this.updateData}
            />
          </span>
          <EditorBlock {...this.props} />
        </div>
      </ToboBlock>
    );
  }
}

const ToboBlock = styled.div`
  input[type="checkbox"] {
    cursor: pointer;
    float: left;
    position: relative;
    top: 4px;
    left: -4px;
  }

  .public-DraftStyleDefault-block {
    margin-left: 18px;
  }

  .md-block-todo-completed {
    color: #949494;
    text-decoration: line-through;
  }
`;
