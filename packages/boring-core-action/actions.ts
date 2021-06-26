type TextContent = string;
type RawContent = string;
type CodeContent = RawContent;

type BlockCreationActionType =
  | typeof add_any_block
  //
  | typeof add_code_block
  | HeadingBlockCreationActionType
  | typeof add_paragraph_block;

export interface IAddBlockAction<T = RawContent> {
  type: BlockCreationActionType;
  content: T;
}

const add_any_block = "add-any-block";
export interface AddAnyBlockAction<T = RawContent> extends IAddBlockAction<T> {
  type: typeof add_any_block;
}

const add_code_block = "add-code-block";
export interface AddCodeBlock extends IAddBlockAction {
  type: typeof add_code_block;
  content: CodeContent;
}

export type HeadingBlockCreationActionType =
  | typeof add_heading_block
  | typeof add_heading1_block
  | typeof add_heading2_block
  | typeof add_heading3_block
  | typeof add_heading4_block
  | typeof add_heading5_block
  | typeof add_heading6_block;

const add_heading_block = "add-heading-block";
const add_heading1_block = "add-heading1-block";
const add_heading2_block = "add-heading2-block";
const add_heading3_block = "add-heading3-block";
const add_heading4_block = "add-heading4-block";
const add_heading5_block = "add-heading5-block";
const add_heading6_block = "add-heading6-block";

export interface IAddHeadingBlockAction extends IAddBlockAction {
  type: HeadingBlockCreationActionType;
}
export interface AddHeadingBlock extends IAddHeadingBlockAction {
  type: typeof add_heading_block;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
export interface AddHeading1Block extends IAddHeadingBlockAction {
  type: typeof add_heading1_block;
}
export interface AddHeading2Block extends IAddHeadingBlockAction {
  type: typeof add_heading2_block;
}
export interface AddHeading3Block extends IAddHeadingBlockAction {
  type: typeof add_heading3_block;
}
export interface AddHeading4Block extends IAddHeadingBlockAction {
  type: typeof add_heading4_block;
}
export interface AddHeading5Block extends IAddHeadingBlockAction {
  type: typeof add_heading5_block;
}
export interface AddHeading6Block extends IAddHeadingBlockAction {
  type: typeof add_heading6_block;
}

//

const add_paragraph_block = "add-paragraph-block";
export interface AddParagraphBlock extends IAddBlockAction {
  type: typeof add_paragraph_block;
}
