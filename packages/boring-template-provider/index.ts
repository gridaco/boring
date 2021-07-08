import { BoringContent, BoringTitleLike } from "@boring.so/document-model";
import { DocumentInitial, StaticDocumentInitial } from "@boring.so/loader";
import Handlebars from "handlebars";

export class TemplateProvider {
  register() {} // todo
}

export interface ITemplateSource {
  default?: string;
  template: string;
}

export interface ITemplatePropSource<T> {
  default?: T;
  props: T;
}

export class UnconstrainedTemplate<Prop> extends DocumentInitial {
  title: BoringTitleLike;
  content: BoringContent;
  templateTitleSource: ITemplateSource;
  templateContentSource: ITemplateSource;
  templateProps: ITemplatePropSource<Prop>;

  constructor({
    templateTitleSource,
    templateContentSource,
    templateProps,
  }: {
    templateTitleSource: ITemplateSource;
    templateContentSource: ITemplateSource;
    templateProps: ITemplatePropSource<Prop>;
  }) {
    super({
      title: templateTitleSource.default,
      content: templateContentSource.default,
    });

    this.templateTitleSource = templateTitleSource;
    this.templateContentSource = templateContentSource;
    this.templateProps = templateProps;
  }

  /**
   * render template with props
   */
  render(): StaticDocumentInitial {
    const _title_c = Handlebars.compile(this.templateTitleSource.template);
    const _content_c = Handlebars.compile(this.templateContentSource.template);
    const _title = _title_c(this.templateProps.props);
    const _content = _content_c(this.templateProps.props);
    return new StaticDocumentInitial({
      title: _title,
      content: _content,
    });
  }
}
