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
export const default_extensions = [
  Image,
  SlashCommandConfig,
  StarterKit,
  PlaceholderConfig,
  UnderlineConfig,
  CodeblockConfig,
  BlockQuoteConfig,
  Link,
];
