import React, { useState } from "react";
import styled from "@emotion/styled";

interface CommandItem {
  title: string;
}

interface Props {
  items: CommandItem[];
  command: (cmd: CommandItem) => void;
}

interface State {
  //
  selectedIndex: number;
}

export class CommandsList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  upHandler() {
    const previndex =
      (this.state.selectedIndex + this.props.items.length - 1) %
      this.props.items.length;
    this.setState({
      selectedIndex: previndex,
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
      this.props.command(item);
    }
  }

  onKeyDown(event) {
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

  render() {
    const { items } = this.props;
    return (
      <ItemsHolder onKeyDown={this.onKeyDown}>
        {items.map((item, index) => {
          return (
            <Item
              className={
                index === this.state.selectedIndex ? "is-selected" : undefined
              }
              key={index}
              onClick={() => {
                this.selectItem(index);
              }}
            >
              {item.title}
            </Item>
          );
        })}
      </ItemsHolder>
    );
  }
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

const Item = styled.button`
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
