import React, { useRef } from "react";
import styled from "@emotion/styled";
import TextareaAutoresize from "react-textarea-autosize";
import { DEFAULT_THEME_FONT_FAMILY } from "../theme";

export interface TitleProps {
  children: string | undefined;

  /**
   * placeholder of title. - @todo - not implemented
   */
  placeholder?: string;
  noplaceholder?: boolean;

  style?: {
    /**
     * @default start
     */
    textAlign?: React.CSSProperties["textAlign"];
    /**
     * @default 48px
     */
    fontSize?: React.CSSProperties["fontSize"];
    fontFamily?: React.CSSProperties["fontFamily"];
    /**
     * @default bold
     */
    fontWeight?: React.CSSProperties["fontWeight"];
  };

  /**
   * title is only allowed to be single line. when enter key hit, it should be handled.
   */
  onReturn?: () => void;
  onChange?: (title: string) => void;
}

const DEFAULT_PLACEHOLDER_TEXT = "Untitled";
export function Title(props: TitleProps) {
  const fieldref = useRef<HTMLTextAreaElement>();

  const shouldReturn = (e) => {
    // about arrow keycodes - https://stackoverflow.com/a/5597114/5463235
    // 13 = return key
    // 40 = down key
    // 39 = right key
    const isNewLineEnter = e.keyCode === 13;
    const isDownKeyPress = e.keyCode === 40;
    const isCursorEnd =
      fieldref.current?.selectionEnd === fieldref.current?.value.length;
    const isCursorMoveRightOnEnd = e.keyCode === 39 && isCursorEnd;
    const isCursorMoveDownOnEnd = isDownKeyPress && isCursorEnd;

    if (isNewLineEnter || isCursorMoveDownOnEnd || isCursorMoveRightOnEnd) {
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
        textAlign={props.style?.textAlign}
        fontSize={props.style?.fontSize}
        fontFamily={props.style?.fontFamily}
        fontWeight={props.style?.fontWeight}
        defaultValue={props.children}
        onChange={onchange}
        onKeyDown={onkeydown}
        ref={fieldref}
      ></TitleText>
    </_Wrap>
  );
}

const _Wrap = styled.div`
  max-width: 100%;
`;

const TitleText = styled(TextareaAutoresize)<{
  textAlign?: React.CSSProperties["textAlign"];
  fontSize?: React.CSSProperties["fontSize"];
  fontFamily?: React.CSSProperties["fontFamily"];
  fontWeight?: React.CSSProperties["fontWeight"];
}>`
  border: none;
  background: transparent;
  user-select: none;
  width: 100%;
  resize: none;
  text-align: ${(props) => props.textAlign ?? "start"};
  font-size: ${(props) => props.fontSize ?? "48px"};
  font-weight: ${(props) => props.fontWeight ?? "bold"};
  font-family: ${(props) => props.fontFamily ?? DEFAULT_THEME_FONT_FAMILY};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.12);
  }
`;
