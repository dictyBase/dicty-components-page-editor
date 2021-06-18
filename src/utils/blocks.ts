import { Editor, Transforms, Element as SlateElement } from "slate"
import { indentItem, undentItem } from "../plugins/withLists"
import { insertTable, insertTableColumn, insertTableRow } from "./tables"
import { types } from "../constants/types"

/**
 * isBlockActive determines if the current text selection contains an active block
 */
const isBlockActive = (editor: Editor, property: string, value: string) => {
  // convert nodes iterator to array and get first result
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[property] === value,
    }),
  )
  // return boolean to indicate if match was found
  return !!match
}

/**
 * toggleBlock will set the appropriate nodes for the given selection
 */
const toggleBlock = (editor: Editor, format: string) => {
  if (format === types.indentDecrease) {
    undentItem(editor)
    return
  }
  if (format === types.indentIncrease) {
    indentItem(editor)
    return
  }

  if (format === types.table) {
    insertTable(editor)
    return
  }

  if (format === types.tableRow) {
    insertTableRow(editor)
    return
  }

  if (format === types.tableColumn) {
    insertTableColumn(editor)
    return
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
