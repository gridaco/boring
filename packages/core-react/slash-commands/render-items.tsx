import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { AddBlockMenuBody } from "../menu/add-block-menu";

const renderItems = () => {
  let component;
  let popup;
  let hidden = false;

  return {
    onStart: (props) => {
      component = new ReactRenderer(AddBlockMenuBody, {
        props,
        editor: props.editor,
      });

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props) {
      component.updateProps(props);

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },
    onKeyDown(props) {
      if (props.event.key === "Escape") {
        popup[0].hide();
        hidden = true;

        return true;
      }

      if (hidden) {
        return false;
      }

      return component.ref?.onKeyDown(props);
    },
    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};

export default renderItems;
