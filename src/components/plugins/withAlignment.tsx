import { Editor, Transforms } from "slate"

const withAlignment = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (match) => {
    const [node, path] = match
    // every node needs a standard alignment of 'left'
    if (!node.alignment) {
      Transforms.setNodes(editor, { alignment: "left" }, { at: path })
      return
    }
    normalizeNode(match)
  }

  return editor
}

export default withAlignment
