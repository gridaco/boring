import {
  PlaceholderConfig,
  CodeblockConfig,
  BlockQuoteConfig,
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
  CodeblockConfig,
  BlockQuoteConfig,
  Link,
];
