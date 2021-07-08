import {
  BoringContent,
  BoringContentLike,
  boringContentLikeAsBoringContent,
  BoringDocument,
  BoringTitleLike,
  EmptyDocument,
} from "@boring.so/document-model";
export class DocumentInitial {
  title: BoringTitleLike;
  content: BoringContent;

  constructor({
    title,
    content,
  }: {
    title: BoringTitleLike;
    content: BoringContentLike;
  }) {
    this.title = title;
    this.content = boringContentLikeAsBoringContent(content);
  }
}

export class StaticDocumentInitial extends DocumentInitial {
  constructor({
    title,
    content,
  }: {
    title: BoringTitleLike;
    content: BoringContentLike;
  }) {
    super({
      title: title,
      content: content,
    });
  }
}

export class TemplateInitial extends DocumentInitial {
  template: string | (() => string);
  props: Map<string, string | number | object>;
}

export function initialize(initial?: DocumentInitial): BoringDocument {
  if (initial) {
    if (initial instanceof StaticDocumentInitial) {
    }
    if (initial instanceof TemplateInitial) {
    }
    /**
     * EXECUTION ORDER MATTERS - DocumentInitial is a parent class, needs to be placed at last.
     */
    if (initial instanceof DocumentInitial) {
    }
  }
  return new EmptyDocument();
}
