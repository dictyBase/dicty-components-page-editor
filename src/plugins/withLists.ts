import { Editor, Point, Range, Transforms } from "slate"
import CustomEditor from "./CustomEditor"
import { types } from "../constants/types"
import getParentNode from "../utils/getParentNode"

const listTypes = [types.orderedList, types.unorderedList]

// listItemMatch checks if the ancestor above is a list item
const listItemMatch = (editor: Editor) => {
  return Editor.above(editor, {
    match: (n) => n.type === types.listItem,
  })
}

const isActiveList = (editor: Editor) => {
  const isActiveOrderedList = CustomEditor.isBlockActive(
    editor,
    "type",
    types.orderedList,
  )
  const isActiveUnorderedList = CustomEditor.isBlockActive(
    editor,
    "type",
    types.unorderedList,
  )

  return isActiveOrderedList || isActiveUnorderedList
}

const liftNodes = (editor: Editor) => {
  // verify there is an active list to lift the nodes
  if (isActiveList(editor)) {
    Transforms.liftNodes(editor, { match: (n) => n.type === types.listItem })
  }
}

/**
 * withLists modifies the logic for inserting a line break inside lists.
 */
const withLists = (editor: Editor) => {
  const { insertBreak, deleteBackward } = editor

  editor.insertBreak = () => {
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
            match: (n) => listTypes.includes(n.type as string),
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

  editor.deleteBackward = (...args) => {
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
    deleteBackward(...args)
  }

  return editor
}

const indentItem = (editor: Editor) => {
  const { selection } = editor

  // check that there is a current selection without highlight
  if (selection && Range.isCollapsed(selection)) {
    const match = getParentNode(editor)
    if (match) {
      let listMatch = []
      for (const [node, path] of Editor.nodes(editor, {
        mode: "lowest",
        match: (n) =>
          n.type === types.orderedList || n.type === types.unorderedList,
      })) {
        listMatch.push(node, path)
      }
      if (listMatch.length > 0) {
        let depth = listMatch[1].length as number
        // limit maximum indents to five
        if (depth <= 5) {
          Transforms.wrapNodes(editor, {
            // @ts-ignore
            type: listMatch[0].type,
            children: [],
          })
        }
      }
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
          { match: (n) => n.type === types.listItem },
        )
      }
    }
  }
}

export { undentItem, indentItem }
export default withLists
