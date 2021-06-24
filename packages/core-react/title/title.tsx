import React from "react";
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
  onReturn: () => void;
}

const DEFAULT_PLACEHOLDER_TEXT = "Untitled";
export function Title(props: TitleProps) {
  const onKeyDown = (e) => {
    // 13 = return key
    if (e.keyCode === 13) {
      props.onReturn();

      // disable line break
      e.preventDefault();
    }
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
        onKeyDown={onKeyDown}
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
