import { BoringTitle } from "./title.model";
import { BoringContent } from "./content.model";

export interface BoringDocumentTemplateConstraint {
  /**
   * id of the template
   * **/
  id: string;
  constraint: "unconstrained" | "constrained";
}

export class BoringDocument {
  title: BoringTitle;
  content: BoringContent;
  template?: BoringDocumentTemplateConstraint;

  constructor({
    title,
    content,
  }: {
    title?: BoringTitle;
    content: BoringContent;
  }) {
    (this.title = title), (this.content = content);
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
