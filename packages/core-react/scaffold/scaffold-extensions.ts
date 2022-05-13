import {
  PlaceholderConfig,
  CodeblockConfig,
  BlockQuoteConfig,
  UnderlineConfig,
} from "../extension-configs";
import StarterKit from "@tiptap/starter-kit";
import { SlashCommands } from "../commands/commands";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
export const default_extensions = [
  Image,
  SlashCommands,
  StarterKit,
  PlaceholderConfig,
  UnderlineConfig,
  CodeblockConfig,
  BlockQuoteConfig,
  Link,
];
