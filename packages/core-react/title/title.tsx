import React, { useRef } from "react";
import styled from "@emotion/styled";
import { DEFAULT_THEME_FONT_FAMILY } from "../theme";

interface TitleProps {
  children: string | undefined;

  /**
   * placeholder of title. - @todo - not implemented
   */
  placeholder?: string;
  noplaceholder?: boolean;

  /**
   * title is only allowed to be single line. when enter key hit, it should be handled.
   */
  onReturn?: () => void;
  onChange?: (title: string) => void;
}

const DEFAULT_PLACEHOLDER_TEXT = "Untitled";
export function Title(props: TitleProps) {
  const fieldref = useRef<HTMLInputElement>();

  const shouldReturn = (e) => {
    // about arrow keycodes - https://stackoverflow.com/a/5597114/5463235
    // 13 = return key
    // 40 = down key
    // 39 = right key
    const isNewLineEnter = e.keyCode === 13;
    const isDownKeyPress = e.keyCode === 40;
    const isCursorMoveRightOnEnd =
      e.keyCode === 39 &&
      fieldref.current?.selectionEnd === fieldref.current?.value.length;
    if (isNewLineEnter || isDownKeyPress || isCursorMoveRightOnEnd) {
      props.onReturn?.();

      // disable line break
      e.preventDefault();
    }
  };

  const onkeydown = (e) => {
    shouldReturn(e);
  };

  const onchange = (e) => {
    const title = e.target.value;
    props.onChange?.(title);
  };

  return (
    <_Wrap>
      <TitleText
        placeholder={
          props.noplaceholder
            ? undefined
            : props.placeholder ?? DEFAULT_PLACEHOLDER_TEXT
        }
        defaultValue={props.children}
        onChange={onchange}
        onKeyDown={onkeydown}
        ref={fieldref}
        contentEditable
      ></TitleText>
    </_Wrap>
  );
}

const _Wrap = styled.div`
  max-width: 100%;
`;
const TitleText = styled.input`
  border: none;
  user-select: none;
  :focus {
    outline: none;
  }

  ::placeholder {
    color: #e1e1e1;
  }
  font-size: 48px;
  font-weight: bold;
  font-family: ${DEFAULT_THEME_FONT_FAMILY};
`;
