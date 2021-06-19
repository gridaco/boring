import React from "react";

import { HYPERLINK } from "../utils/constants";

interface Props {
  onToggle?: (v?) => void;
  onClick?: (e?) => void;
  style: string;
  active?: boolean;
  icon?: string;
  label?: string | JSX.Element | object;
  description: string;
}

export default class StyleButton extends React.Component<Props> {
  onToggle;
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      const { onToggle, onClick, style } = this.props;

      if (onClick) {
        onClick(e);
      }

      if (style) {
        e.preventDefault();
        onToggle(style);
      }
    };
  }

  render() {
    if (this.props.style === HYPERLINK) {
      return null;
    }
    let className = "md-RichEditor-styleButton";
    if (this.props.active) {
      className += " md-RichEditor-activeButton";
    }
    className += ` md-RichEditor-styleButton-${this.props.style.toLowerCase()}`;
    return (
      <span
        className={`${className} hint--top`}
        onMouseDown={this.onToggle}
        aria-label={this.props.description}
      >
        {this.props.icon ? (
          <i className={`fa fa-${this.props.icon}`} />
        ) : (
          this.props.label
        )}
      </span>
    );
  }
}
