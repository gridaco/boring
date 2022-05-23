import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "@emotion/styled";

export function BoringBubbleLinkInput({
  defaultValue,
  onChange,
  onSubmit,
}: {
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (url: string) => void;
}) {
  // TODO: add url validation
  const ref = useRef<HTMLInputElement>();
  const [value, setValue] = useState(defaultValue);

  useLayoutEffect(() => {
    console.log(ref);
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <Container>
      <InputAsInput
        ref={ref}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit?.(value);
          }
        }}
        value={value}
        defaultValue={defaultValue}
        type="text"
        placeholder="Pase link"
        autoFocus
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border: solid 1px rgb(237, 237, 236);
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  padding: 18px 20px;
`;

const InputAsInput = styled.input`
  color: rgba(0, 0, 0, 0.87);
  background-color: rgba(0, 0, 0, 0.02);
  border: solid 3px rgba(35, 77, 255, 0.3);
  border-radius: 2px;
  padding: 4px 8px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  text-align: start;
  align-self: stretch;
  flex-shrink: 0;

  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-family: Inter, sans-serif;
    font-weight: 500;
  }
`;
