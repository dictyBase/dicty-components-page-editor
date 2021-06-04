import { Editor, Transforms, Element as SlateElement } from "slate"
import { indentItem, undentItem } from "../plugins/withLists"
import { types } from "../constants/types"

/**
 * isBlockActive determines if the current text selection contains an active block
 */
const isBlockActive = (editor: Editor, property: string, value: string) => {
  // Editor.nodes returns a generator that iterates through all of the editor's
  // nodes. We are looking for matches for the selected format.
  // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/node.ts#L467
  const nodeGenerator = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n[property] === value,
  })
  // run the generator to find the nearest match
  const node = nodeGenerator.next()
  // if it finds a match then return true to indicate the block is currently
  // active
  while (!node.done) {
    return true
  }
  // if it doesn't find a match, then the generator has yielded its last value
  // meaning that it did not find a match for this block type
  return false
}

/**
 * toggleBlock will set the appropriate nodes for the given selection
 */
const toggleBlock = (editor: Editor, format: string) => {
  if (format === types.indentDecrease) {
    undentItem(editor)
  }
  if (format === types.indentIncrease) {
    indentItem(editor)
  }

  // first find if the selected block is currently active
  const isActive = isBlockActive(editor, "type", format)

  // setNodes is used to set properties at the currently selected element.
  // If the block is active, then we want to toggle it back to the default
  // paragraph type. If the block is not active, we toggle the type to match it.
  Transforms.setNodes(editor, {
    type: isActive ? types.paragraph : format,
  })
}

export { isBlockActive, toggleBlock }
