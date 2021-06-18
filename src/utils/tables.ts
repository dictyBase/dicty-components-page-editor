import { Editor, Element as SlateElement, Transforms } from "slate"
import { isBlockActive } from "./blocks"
import { types } from "../constants/types"

const sampleRowData = {
  type: types.tableRow,
  children: [
    {
      type: types.tableCell,
      children: [{ text: "" }],
    },
    {
      type: types.tableCell,
      children: [{ text: "" }],
    },
  ],
}

const insertTable = (editor: Editor) => {
  if (!isBlockActive(editor, "type", types.table)) {
    Transforms.insertNodes(editor, {
      type: types.table,
      children: [sampleRowData, sampleRowData],
    })
  }
}

const insertTableRow = (editor: Editor) => {
  const currentRow = Editor.above(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === types.tableRow,
  })

  if (currentRow) {
    Transforms.insertNodes(editor, {
      type: types.tableRow,
      children: [
        {
          type: types.tableCell,
          children: [{ text: "" }],
        },
      ],
    })
  }
}

export { insertTable, insertTableRow }
