import { BoringTitle } from "./title.model";
import { BoringContent } from "./content.model";
import { nanoid } from "nanoid";
export interface BoringDocumentTemplateConstraint {
  /**
   * id of the template
   * **/
  id: string;
  constraint: "unconstrained" | "constrained";
}

export type BoringDocumentId = string;

function autoid(): string {
  return nanoid();
}
export class BoringDocument {
  id: BoringDocumentId;
  title: BoringTitle;
  content: BoringContent;
  template?: BoringDocumentTemplateConstraint;

  constructor({
    title,
    content,
    id = autoid(),
  }: {
    id?: BoringDocumentId;
    title?: BoringTitle;
    content: BoringContent;
  }) {
    (this.title = title), (this.content = content), (this.id = id);
  }
}

export class EmptyDocument extends BoringDocument {
  constructor() {
    super({
      title: undefined,
      content: undefined,
    });
  }
}
