import { BoringContent, BoringTitleLike } from "@boring.so/document-model";

export class TemplateProvider {
  register() {} // todo
}

export class Template<Prop> {
  title: BoringTitleLike;
  content: BoringContent;
  defaultProps: object = {};
  props: object;

  /**
   * render template with props
   */
  render(): string {
    return "";
  }
}
