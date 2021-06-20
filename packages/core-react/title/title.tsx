import React from "react";
import styled from "@emotion/styled";

interface TitleProps {
  children: string;

  /**
   * title is only allowed to be single line. when enter key hit, it should be handled.
   */
  onReturn: () => void;
}

export function Title(props: TitleProps) {
  const onKeyDown = (e) => {
    // 13 = return key
    if (e.keyCode === 13) {
      props.onReturn();
      return false;
    }
  };
  return (
    <TitleText onKeyDown={onKeyDown} contentEditable>
      {props.children}
    </TitleText>
  );
}

const TitleText = styled.h1`
  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
`;
