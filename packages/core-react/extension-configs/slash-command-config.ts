import { Commands, getSuggestionItems, renderItems } from "../slash-commands";

export const SlashCommandConfig = ({
  onUploadFile,
}: {
  onUploadFile: (file: File) => Promise<string | false>;
}) =>
  Commands.configure({
    suggestion: {
      items: (args) => getSuggestionItems({ ...args, onUploadFile }),
      render: renderItems,
    },
  });
