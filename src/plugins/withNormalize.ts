import { Editor, Element, Transforms } from "slate"
import { types } from "../constants/types"

const withNormalize = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (element) => {
    const [node, path] = element
    // make sure a paragraph follows every divider so cursor can always be
    // placed after a divider
    const divider = Element.isElement(node) && node.type === "divider"
    const image = Element.isElement(node) && node.type === "image"
    if (divider || image) {
      Transforms.insertNodes(editor, {
        type: types.paragraph,
        children: [{ text: "" }],
      })
    }

    return normalizeNode([node, path])
  }

  return editor
}

export default withNormalize
