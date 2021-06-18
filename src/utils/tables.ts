import { Editor, Element as SlateElement, Path, Transforms } from "slate"
import { isBlockActive } from "./blocks"
import { types } from "../constants/types"

const getEmptyTableCell = () => ({
  type: types.tableCell,
  children: [
    {
      type: types.paragraph,
      children: [{ text: " " }],
    },
  ],
})

const getEmptyTableRow = (count: number) => ({
  type: types.tableRow,
  children: Array(count)
    .fill("")
    .map(() => getEmptyTableCell()),
})

const getEmptyTable = (row: number, col: number) => ({
  type: types.table,
  row,
  col,
  children: Array(row)
    .fill(" ")
    .map(() => getEmptyTableRow(col)),
})

const insertTable = (editor: Editor) => {
  if (!isBlockActive(editor, "type", types.table)) {
    Transforms.insertNodes(editor, getEmptyTable(1, 2))
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
    const [, rowPath] = currentRow
    const [tableNode, tablePath] = Editor.parent(editor, rowPath)
    if (!SlateElement.isElement(tableNode)) {
      return
    }

    const col = tableNode.col as number
    const row = tableNode.row as number

    Transforms.insertNodes(editor, getEmptyTableRow(col), {
      at: Path.next(rowPath),
    })

    Transforms.setNodes(editor, { row: row + 1 }, { at: tablePath })
  }
}

export { insertTable, insertTableRow }
