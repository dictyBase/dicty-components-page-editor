import { Editor, Element, Node, Point, Range, Transforms } from "slate"
import { types } from "../constants/types"

// helper function to check for ul/ol match
const parentListMatch = (n: Node) =>
  (!Editor.isEditor(n) &&
    Element.isElement(n) &&
    n.type === types.orderedList) ||
  (!Editor.isEditor(n) &&
    Element.isElement(n) &&
    n.type === types.unorderedList)

// helper function to check for li match
const listItemMatch = (n: Node) =>
  !Editor.isEditor(n) && Element.isElement(n) && n.type === types.listItem

// helper function to get matching ul/ol node
const findMatchingList = (editor: Editor) => {
  const [listMatch] = Array.from(
    Editor.nodes(editor, {
      match: (n) => parentListMatch(n),
    }),
  )
  return listMatch
}

// helper function to get matching li node
const findMatchingListItem = (editor: Editor) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      match: (n) => listItemMatch(n),
    }),
  )
  return match
}

const setParagraphNode = (editor: Editor) => {
  Transforms.setNodes(
    editor,
    { type: types.paragraph },
    {
      match: (n) => listItemMatch(n),
    },
  )
}

// helper function called when user escapes out of list
const liftNodes = (editor: Editor) => {
  // check for new parent
  const listMatch = findMatchingList(editor)
  // verify there is an active list to lift the nodes
  if (listMatch) {
    // lift the list item node to next parent
    Transforms.liftNodes(editor, {
      match: (n) => listItemMatch(n),
    })
  }
}

const handleLists = (editor: Editor, callback: () => void) => {
  const { selection } = editor

  // check that there is a current selection without highlight
  if (selection && Range.isCollapsed(selection)) {
    // find the closest list item element
    const [match] = Array.from(
      Editor.nodes(editor, {
        match: (n) =>
          listItemMatch(n) &&
          n.children &&
          n.children[0] &&
          (!n.children[0].text || n.children[0].text === ""),
      }),
    )

    // check that there was a match
    if (match) {
      const [, path] = match
      const start = Editor.start(editor, path)

      // if the selection is at the beginning of the list item
      if (Point.equals(selection.anchor, start)) {
        // lift the list item to the next parent
        liftNodes(editor)
        // check for the new parent
        const listMatch = findMatchingList(editor)
        // if it is no longer within a ul/ol, turn into normal paragraph
        if (!listMatch) {
          setParagraphNode(editor)
        }
        return
      }
    }
  }

  callback()
}

/**
 * withLists modifies the logic for inserting a line break inside lists.
 */
const withLists = (editor: Editor) => {
  const { insertBreak, deleteBackward } = editor

  editor.insertBreak = () => {
    handleLists(editor, insertBreak)
  }

  editor.deleteBackward = (...args) => {
    handleLists(editor, () => deleteBackward(...args))
  }

  return editor
}

const indentItem = (editor: Editor) => {
  const { selection } = editor

  // check that there is a current selection without highlight
  if (selection && Range.isCollapsed(selection)) {
    const match = findMatchingListItem(editor)

    if (match) {
      const [listMatch] = Array.from(
        Editor.nodes(editor, {
          mode: "lowest",
          match: (n) => parentListMatch(n),
        }),
      )

      if (listMatch) {
        let depth = listMatch[1].length
        if (depth <= 5 && Element.isElement(listMatch[0])) {
          Transforms.wrapNodes(editor, {
            type: listMatch[0].type,
            children: [],
          })
        }
      }
    } else {
      // if the user is hitting tab and not inside a list, insert spaces
      editor.insertText("    ")
    }
  }
}

const undentItem = (editor: Editor) => {
  const { selection } = editor

  if (selection && Range.isCollapsed(selection)) {
    const match = findMatchingListItem(editor)

    if (match) {
      liftNodes(editor)
      const listMatch = findMatchingList(editor)

      // if it is no longer within an active list, turn into paragraph
      if (!listMatch) {
        setParagraphNode(editor)
      }
    }
  }
}

export { undentItem, indentItem }
export default withLists
