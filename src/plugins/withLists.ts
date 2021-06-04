import { Editor, Element, Point, Range, Transforms } from "slate"
import { types } from "../constants/types"
import { isBlockActive } from "../utils/blocks"

const listTypes = [types.orderedList, types.unorderedList]

// listItemMatch checks if the ancestor above is a list item
const listItemMatch = (editor: Editor) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === types.listItem,
    }),
  )
  return match
}

const isActiveList = (editor: Editor) => {
  const isActiveOrderedList = isBlockActive(editor, "type", types.orderedList)
  const isActiveUnorderedList = isBlockActive(
    editor,
    "type",
    types.unorderedList,
  )

  return isActiveOrderedList || isActiveUnorderedList
}

const liftNodes = (editor: Editor) => {
  // verify there is an active list to lift the nodes
  if (isActiveList(editor)) {
    Transforms.liftNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === types.listItem,
    })
  }
}

const handleInsertBreak = (editor: Editor, insertBreak: () => void) => {
  // this plugin only applies custom logic to active lists
  if (isActiveList(editor)) {
    const match = listItemMatch(editor)

    if (match) {
      const [, path] = match
      const text = Editor.string(editor, path)

      // if the current selection's text is empty, unwrap the list node and add
      // an empty paragraph instead
      if (text === "") {
        Transforms.unwrapNodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            listTypes.includes(n.type as string),
          // split is needed to unwrap this selection from the list type
          split: true,
        })
        Transforms.setNodes(editor, {
          type: types.paragraph,
        })
      } else {
        insertBreak()
      }
    }
  } else {
    // if not a list, just insert break as normal
    insertBreak()
  }
}

const handleListEscaping = (editor: Editor) => {
  const { selection } = editor

  // check that there is a current selection without highlight
  if (selection && Range.isCollapsed(selection)) {
    const match = listItemMatch(editor)

    if (match) {
      const [, path] = match
      const text = Editor.string(editor, path)
      const start = Editor.start(editor, path)

      if (text === "") {
        // verify the start of the selection and the anchor are equal
        if (Point.equals(selection.anchor, start)) {
          undentItem(editor)
        }
      }
    }
  }
}

/**
 * withLists modifies the logic for inserting a line break inside lists.
 */
const withLists = (editor: Editor) => {
  const { insertBreak, deleteBackward } = editor

  editor.insertBreak = () => {
    handleInsertBreak(editor, insertBreak)
  }

  editor.deleteBackward = (...args) => {
    handleListEscaping(editor)
    deleteBackward(...args)
  }

  return editor
}

const indentItem = (editor: Editor) => {
  const { selection } = editor

  // check that there is a current selection without highlight
  if (selection && Range.isCollapsed(selection)) {
    const match = listItemMatch(editor)

    if (match) {
      const [listMatch] = Array.from(
        Editor.nodes(editor, {
          mode: "lowest",
          match: (n) =>
            (!Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === types.orderedList) ||
            (!Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === types.unorderedList),
        }),
      )

      if (listMatch) {
        let depth = listMatch[1].length
        if (depth <= 5) {
          if (Element.isElement(listMatch[0])) {
            Transforms.wrapNodes(editor, {
              type: listMatch[0].type,
              children: [],
            })
          }
        }
      }
    } else {
      editor.insertText("    ")
    }
  }
}

const undentItem = (editor: Editor) => {
  const { selection } = editor

  // check that there is a current selection without highlight
  if (selection && Range.isCollapsed(selection)) {
    const match = listItemMatch(editor)

    if (match) {
      // 'lift' the list-item to the next parent
      liftNodes(editor)
      // check for the new parent
      const isActive = isActiveList(editor)
      // if it is no longer within an active list, turn into paragraph
      if (!isActive) {
        Transforms.setNodes(
          editor,
          { type: "paragraph" },
          {
            match: (n) =>
              !Editor.isEditor(n) &&
              Element.isElement(n) &&
              n.type === types.listItem,
          },
        )
      }
    }
  }
}

export { undentItem, indentItem }
export default withLists
