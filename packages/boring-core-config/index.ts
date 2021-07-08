export interface AutosaveOption {
  /**
   * autosave trigger interval in seconds (not ms)
   */
  interval: number | (() => number);
  dosave: boolean | (() => boolean) | ((prev, curr) => boolean);
}

export const defaults = <EditorConfig>{
  contentAutosave: {
    interval: 3.5,
    dosave: true,
  },
};

export interface EditorConfig {
  contentAutosave: AutosaveOption;
}
