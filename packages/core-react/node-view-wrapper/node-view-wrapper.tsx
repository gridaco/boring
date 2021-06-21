import { NodeViewWrapper as _NodeViewWrapper } from "@tiptap/react";

export function NodeViewWrapper(props: {
  children: JSX.Element | JSX.Element[];

  /**
   * noninteractive is set to false by default, which means interactive by default. this will prevent parent's onclick event.
   */
  noninteractive?: boolean;
}) {
  const eventcallback = !props.noninteractive
    ? (event) => {
        event.stopPropagation();
      }
    : undefined;
  return (
    <_NodeViewWrapper>
      <div onClick={eventcallback}>{props.children}</div>
    </_NodeViewWrapper>
  );
}
