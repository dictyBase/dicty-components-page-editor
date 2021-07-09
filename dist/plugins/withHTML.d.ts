import { Editor } from "slate";
/**
 * withHTML parses HTML content and converts to Slate JSON
 */
declare const withHTML: (editor: Editor) => import("../types/editor").CustomEditor;
export default withHTML;
