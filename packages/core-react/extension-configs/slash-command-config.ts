import { Commands, getSuggestionItems, renderItems } from "../slash-commands";

export const SlashCommandConfig = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});