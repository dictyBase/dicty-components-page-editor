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
  type: types.tableWrap,
  children: [
    {
      type: types.table,
      row,
      col,
      children: Array(row)
        .fill(" ")
        .map(() => getEmptyTableRow(col)),
    },
    {
      type: types.paragraph,
      children: [{ text: "" }],
    },
  ],
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

const insertTableColumn = (editor: Editor) => {
  const currentCell = Editor.above(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === types.tableCell,
  })

  if (currentCell) {
    const currentTable = Editor.above(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === types.table,
    })
    if (currentTable === undefined) {
      return
    }

    const [, cellPath] = currentCell
    const [tableNode, tablePath] = currentTable

    // get next item in path where new cell should be located
    const nextCellPath = Path.next(cellPath)
    // get copy of next cell path to change index later
    const newCellPath = nextCellPath.slice()
    // find path position to enter new cell
    const replacePathPos = newCellPath.length - 2
    // get index of current row using this path position
    const currentRowIndex = newCellPath[replacePathPos]

    if (!SlateElement.isElement(tableNode)) {
      return
    }

    // loop over table node and insert empty cells at given path
    tableNode.children.forEach(
      // @ts-ignore <-- used because we don't need the first val here
      (_, index: number) => {
        // replace path position in new cell path with the current index
        newCellPath[replacePathPos] = index
        // insert an empty table cell at this position
        Transforms.insertNodes(editor, getEmptyTableCell(), {
          at: newCellPath,
          select: index === currentRowIndex,
        })
      },
    )
    // update col attribute for table node
    Transforms.setNodes(
      editor,
      { col: Number(tableNode.col) + 1 },
      {
        at: tablePath,
      },
    )
  }
}

const deleteTable = (editor: Editor) => {
  const tableMatch = Editor.above(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === types.table,
  })

  if (tableMatch) {
    Transforms.removeNodes(editor, {
      at: tableMatch[1],
    })
  }
}

export { insertTable, insertTableRow, insertTableColumn, deleteTable }
