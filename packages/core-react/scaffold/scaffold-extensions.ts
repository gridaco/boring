import {
  PlaceholderConfig,
  // CodeblockConfig,
  // BlockQuoteConfig,
  UnderlineConfig,
  SlashCommandConfig,
} from "../extension-configs";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Iframe from "../blocks/iframe-block";
import Video from "../blocks/video-block";
import TrailingNode from "../blocks/trailing-node";
import _StarterKit from "@tiptap/starter-kit";

const StarterKit = _StarterKit.configure({
  gapcursor: false,
});

interface ExtensionsProps {
  onUploadFile: (file: File) => Promise<string | false>;
}

export const default_extensions = (props: ExtensionsProps) => [
  TrailingNode,
  Image,
  Iframe,
  Video,
  SlashCommandConfig(props),
  StarterKit,
  PlaceholderConfig,
  UnderlineConfig,

  // included in starter kit
  // CodeblockConfig,
  // BlockQuoteConfig,
  Link,
];
