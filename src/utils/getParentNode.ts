import { Editor, Path, Node } from "slate"

// getLineSpacing is a helper function to get the parent node above the current selection.
const getLineSpacing = (editor: Editor) => {
  if (!editor.selection) {
    return
  }

  // need to get the parent path in order to get the parent node above this selection
  const currentPath = editor.selection.anchor.path
  const parentPath = Path.parent(currentPath)
  const node = Node.get(editor, parentPath)

  return node
}

export default getLineSpacing
