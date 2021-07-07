import { BoringContent, BoringTitleLike } from "@boring.so/document-model";
import { DocumentInitial, StaticDocumentInitial } from "@boring.so/loader";

export class TemplateProvider {
  register() {} // todo
}

export class UnconstrainedTemplate<Prop> extends DocumentInitial {
  title: BoringTitleLike;
  content: BoringContent;
  defaultProps: object = {};
  props: object;

  constructor() {
    super({
      title: undefined,
      content: undefined,
    });
  }

  /**
   * render template with props
   */
  render(): StaticDocumentInitial {
    return new StaticDocumentInitial({
      title: this.title,
      content: this.content,
    });
  }
}
