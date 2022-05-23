import React, { Component } from "react";
import type { Editor } from "@tiptap/react";
import { BoringBlockSuggestionItemOnBubbleMenu } from "./block-item";
import styled from "@emotion/styled";

interface CommandItem {
  title: string;
  icon?: string;
  command: ({ editor, range }: { editor: Editor; range }) => void;
}

export class BlockList extends Component<{
  items: CommandItem[];
  command?: (c: CommandItem) => void;
}> {
  state = {
    selectedIndex: 0,
  };

  items: [];
  off: boolean;

  constructor(props) {
    super(props);
    this.items = props.items;
    this.off = this.items.length === 0;
  }

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (this.off) {
      return false;
    }

    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command?.(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <>
        {items.length ? (
          <ItemsContainer>
            {items.map((item, index) => {
              return (
                <BoringBlockSuggestionItemOnBubbleMenu
                  selected={index === this.state.selectedIndex}
                  key={index}
                  label={item.title}
                  onClick={() => this.selectItem(index)}
                />
              );
            })}
          </ItemsContainer>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const ItemsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: stretch;
  flex: none;
  box-shadow: 0px 9px 24px 0px rgba(15, 15, 15, 0.2),
    0px 3px 3px 6px rgba(15, 15, 15, 0.1),
    0px 6px 1px 1px rgba(15, 15, 15, 0.05);
  border: solid 1px rgb(237, 237, 236);
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
  padding: 0px 8px;
`;
