import { BoringTitle } from "./title.model";
import { BoringContent } from "./content.model";

export class BoringDocument {
  title: BoringTitle;
  content: BoringContent;

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
