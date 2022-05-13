import { Commands, getSuggestionItems, renderItems } from "../commands";

export const SlashCommandConfig = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});
