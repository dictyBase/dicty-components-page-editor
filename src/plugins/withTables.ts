import { Editor, Range, Point, Element as SlateElement } from "slate"
import { types } from "../constants/types"

const withTables = (editor: Editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor

  editor.deleteBackward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === types.tableCell,
        }),
      )

      if (cell) {
        const [, cellPath] = cell
        const start = Editor.start(editor, cellPath)

        if (Point.equals(selection.anchor, start)) {
          return
        }
      }
    }

    deleteBackward(unit)
  }

  editor.deleteForward = (unit) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === types.tableCell,
        }),
      )

      if (cell) {
        const [, cellPath] = cell
        const end = Editor.end(editor, cellPath)

        if (Point.equals(selection.anchor, end)) {
          return
        }
      }
    }

    deleteForward(unit)
  }

  editor.insertBreak = () => {
    const { selection } = editor

    if (selection) {
      const [table] = Array.from(
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === types.table,
        }),
      )

      if (table) {
        return
      }
    }

    insertBreak()
  }

  return editor
}

export default withTables
