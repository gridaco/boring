import React from "react";
import styled from "@emotion/styled";

export function BoringBlockSuggestionItemOnBubbleMenu({
  label,
  helptext,
  preview,
  onClick,
  selected,
}: {
  selected?: boolean;
  label: string;
  helptext?: string;
  preview?: JSX.Element;
  onClick: () => void;
}) {
  return (
    <Container onClick={onClick} data-selected={selected}>
      {preview && <PreviewContainer>{preview}</PreviewContainer>}
      <TextContainer>
        <Label>{label}</Label>
        {helptext && <Helptext>{helptext}</Helptext>}
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px 16px;
  &[data-selected="true"],
  :hover {
    background-color: rgba(0, 0, 0, 0.05);
    /* #efefef; */
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: none;
  border: solid 1px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 10px;
  box-sizing: border-box;
`;

const Label = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  text-align: left;
`;

const Helptext = styled.span`
  color: rgba(0, 0, 0, 0.5);
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  text-align: left;
`;
