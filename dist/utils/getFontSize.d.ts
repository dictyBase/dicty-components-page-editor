import { Editor } from "slate";
/**
 * getFontSize is a helper function so any text nodes inside a header
 * element node can inherit the header font size
 */
declare const getFontSize: (editor: Editor, fontSize: string) => string;
export default getFontSize;
