import { Editor, Element, Transforms } from "slate"
import { types } from "../constants/types"

const withNormalize = (editor: Editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (element) => {
    const [node, path] = element
    // make sure a paragraph follows every divider so cursor can always be
    // placed after a divider
    if (Element.isElement(node) && node.type === "divider") {
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
