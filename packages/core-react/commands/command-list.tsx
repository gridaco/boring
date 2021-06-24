import React, { useState } from "react";
import styled from "@emotion/styled";

interface CommandItem {
  title: string;
}

export function CommandsList(props: {
  command: (cmd: CommandItem) => void;
  items: CommandItem[];
}) {
  const { items, command } = props;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  function upHandler() {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  }

  function downHandler() {
    setSelectedIndex((selectedIndex + 1) % items.length);
  }

  function enterHandler() {
    selectItem(selectedIndex);
  }

  function selectItem(index) {
    const item = items[index];

    if (item) {
      command(item);
    }
  }

  function onKeyDown(event) {
    if (event.key === "ArrowUp") {
      upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      downHandler();
      return true;
    }

    if (event.key === "Enter") {
      enterHandler();
      return true;
    }

    return false;
  }

  return (
    <ItemsHolder onKeyDown={onKeyDown}>
      {items.map((item, index) => {
        return (
          <Item
            isSelected={index === selectedIndex}
            key={index}
            onClick={() => {
              selectItem(index);
            }}
          >
            {item.title}
          </Item>
        );
      })}
    </ItemsHolder>
  );
}

const ItemsHolder = styled.div`
  position: relative;
  border-radius: 0.25rem;
  background: white;
  color: rgba(black, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

interface ItemProp {
  isSelected: boolean;
}

const Item = styled.button<ItemProp>`
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.2rem 0.5rem;

  &.is-selected,
  &:hover {
    color: #a975ff;
    background: rgba(#a975ff, 0.1);
  }
`;
