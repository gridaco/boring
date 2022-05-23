import React from "react";
import styled from "@emotion/styled";

export function BoringBubbleLinkInput() {
  return (
    <Container>
      <InputAsInput type="text" placeholder="Pase link" autoFocus />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 10px;
  box-shadow: 0px 9px 24px 0px rgba(15, 15, 15, 0.2),
    0px 3px 3px 6px rgba(15, 15, 15, 0.1),
    0px 6px 1px 1px rgba(15, 15, 15, 0.05);
  border: solid 1px rgb(237, 237, 236);
  border-radius: 4px;
  min-height: 100vh;
  background-color: white;
  box-sizing: border-box;
  padding: 18px 20px;
`;

const InputAsInput = styled.input`
  background-color: rgba(0, 0, 0, 0.02);
  border: solid 3px rgba(35, 77, 255, 0.3);
  border-radius: 2px;
  padding: 4px 8px;
  box-sizing: border-box;
  font-size: 20px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  text-align: start;
  align-self: stretch;
  flex-shrink: 0;

  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
    font-family: Inter, sans-serif;
    font-weight: 500;
  }
`;
