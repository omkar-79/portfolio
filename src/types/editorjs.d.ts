/** EditorJS block output format */
export interface EditorJSBlock {
  type: string;
  data: Record<string, unknown>;
  id?: string;
}

/** EditorJS save/output data structure */
export interface EditorJSOutput {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}
