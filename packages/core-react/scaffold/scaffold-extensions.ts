import {
  PlaceholderConfig,
  CodeblockConfig,
  BlockQuoteConfig,
  UnderlineConfig,
  SlashCommandConfig,
} from "../extension-configs";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Iframe from "../blocks/iframe-block";
import Video from "../blocks/video-block";
import TrailingNode from "../blocks/trailing-node";

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
  CodeblockConfig,
  BlockQuoteConfig,
  Link,
];
