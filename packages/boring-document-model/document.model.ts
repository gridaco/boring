import {
  BoringTitle,
  BoringTitleLike,
  boringTitleLikeAsBoringTitle,
} from "./title.model";
import {
  BoringContent,
  BoringContentLike,
  boringContentLikeAsBoringContent,
} from "./content.model";
import { nanoid } from "nanoid";
export interface BoringDocumentTemplateConstraint {
  /**
   * id of the template
   * **/
  id: string;
  constraint: "unconstrained" | "constrained";
}

export type BoringDocumentId = string;

export function autoid(): string {
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
    title?: BoringTitleLike;
    content: BoringContentLike;
  }) {
    (this.title = boringTitleLikeAsBoringTitle(title)),
      (this.content = boringContentLikeAsBoringContent(content)),
      (this.id = id);
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
