import { Editor } from "slate";
/**
 * isBlockActive determines if the current text selection contains an active block
 */
declare const isBlockActive: (editor: Editor, property: string, value: string) => boolean;
/**
 * toggleBlock will set the appropriate nodes for the given selection
 */
declare const toggleBlock: (editor: Editor, format: string) => void;
export { isBlockActive, toggleBlock };
