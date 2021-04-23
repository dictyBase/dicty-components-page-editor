import { Editor, Path, Node } from "slate"

/**
 * getLineSpacing is a helper function that finds the line spacing for the currently
 * selected node.
 */
const getLineSpacing = (editor: Editor) => {
  if (!editor.selection) {
    return "1.5"
  }

  // need to get the parent path in order to get the parent node above this selection
  const currentPath = editor.selection.anchor.path
  const parentPath = Path.parent(currentPath)
  const node = Node.get(editor, parentPath)

  return node.lineSpacing || "1.5"
}

export default getLineSpacing
