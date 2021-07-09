import { Editor } from "slate";
/**
 * withLists modifies the logic for inserting a line break inside lists.
 */
declare const withLists: (editor: Editor) => import("../types/editor").CustomEditor;
declare const indentItem: (editor: Editor) => void;
declare const undentItem: (editor: Editor) => void;
export { undentItem, indentItem };
export default withLists;
