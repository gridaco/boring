import {
  PlaceholderConfig,
  CodeblockConfig,
  BlockQuoteConfig,
} from "../extension-configs";
import StarterKit from "@tiptap/starter-kit";
import { SlashCommands } from "../commands/commands";

export const default_extensions = [
  SlashCommands,
  StarterKit,
  PlaceholderConfig,
  CodeblockConfig,
  BlockQuoteConfig,
];
