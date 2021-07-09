import { Editor } from "slate";
declare const getParentNode: (editor: Editor) => import("../types/editor").CustomEditor | import("../types/editor").CustomElement | import("../types/editor").CustomText | undefined;
export default getParentNode;
