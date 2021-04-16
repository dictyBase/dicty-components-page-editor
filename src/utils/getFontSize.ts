import { Editor, Path, Node } from "slate"
import { types } from "../constants/types"

/**
 * getFontSize is a helper function so any text nodes inside a header
 * element node can inherit the header font size
 */
const getFontSize = (editor: Editor, fontSize: string) => {
  if (!editor.selection) {
    return fontSize
  }

  // need to get the parent path in order to get the parent node above this selection
  const currentPath = editor.selection.anchor.path
  const parentPath = Path.parent(currentPath)
  const node = Node.get(editor, parentPath)
  // if the parent node is a header then its text children should inherit its size
  if (
    node.type === types.h1 ||
    node.type === types.h2 ||
    node.type === types.h3
  ) {
    return "inherit"
  }
  return fontSize
}

export default getFontSize
