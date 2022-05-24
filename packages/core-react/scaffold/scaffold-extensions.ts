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

export const default_extensions = [
  Image,
  Iframe,
  Video,
  SlashCommandConfig,
  StarterKit,
  PlaceholderConfig,
  UnderlineConfig,
  CodeblockConfig,
  BlockQuoteConfig,
  Link,
];
