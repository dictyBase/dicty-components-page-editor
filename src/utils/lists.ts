import { Editor, Element as SlateElement, Transforms } from "slate"
import { isBlockActive } from "./blocks"
import { types } from "../constants/types"

/**
 * toggleList toggles the given selection as a list type.
 */
const toggleList = (editor: Editor, format: string) => {
  // first find if the selected block is currently active
  const isActive = isBlockActive(editor, "type", format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    split: true,
  })

  const type = isActive ? types.paragraph : types.listItem

  Transforms.setNodes(editor, {
    type: type,
  })

  if (!isActive) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export { toggleList }
