import styled from "@emotion/styled";

export function Title(props: { children: string }) {
  return <TitleText contentEditable>{props.children}</TitleText>;
}

const TitleText = styled.h1`
  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
`;
