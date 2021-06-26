import { BoringTitle } from "./title.model";
import { BoringContent } from "./content.model";

export class BoringDocument {
  title: BoringTitle;
  content: BoringContent;
}

export class EmptyDocument extends BoringDocument {}
