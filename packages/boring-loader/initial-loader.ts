import { BoringDocument, EmptyDocument } from "@boring.so/document-model";
export class DocumentInitial {
  title: string;
}

export class StaticDocumentInitial extends DocumentInitial {}

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
