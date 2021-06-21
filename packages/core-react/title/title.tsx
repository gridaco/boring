import React from "react";
import styled from "@emotion/styled";

interface TitleProps {
  children: string;

  /**
   * placeholder of title. - @todo - not implemented
   */
  placeholder?: string;

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

      // disable line break
      e.preventDefault();
    }
  };
  return (
    <_Wrap>
      <TitleText onKeyDown={onKeyDown} contentEditable>
        {props.children}
      </TitleText>
    </_Wrap>
  );
}

const _Wrap = styled.div`
  max-width: 100%;

  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
`;
const TitleText = styled.h1``;
