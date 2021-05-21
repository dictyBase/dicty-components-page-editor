import { Editor, Transforms } from "slate"
import CustomEditor from "./CustomEditor"
import { types } from "../constants/types"

const listTypes = [types.orderedList, types.unorderedList]

// listItemMatch checks if the ancestor above is a list item
const listItemMatch = (editor: Editor) => {
  return Editor.above(editor, {
    match: (n) => n.type === types.listItem,
  })
}

/**
 * withLists modifies the logic for inserting a line break inside lists.
 */
const withLists = (editor: Editor) => {
  const { insertBreak } = editor

  editor.insertBreak = () => {
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

    // this plugin only applies custom logic to active lists
    if (isActiveOrderedList || isActiveUnorderedList) {
      const match = listItemMatch(editor)

      if (match) {
        const [, path] = match
        const text = Editor.string(editor, path)

        // if the current selection's text is empty, unwrap the list node and add
        // an empty paragraph instead
        if (text === "") {
          Transforms.unwrapNodes(editor, {
            match: (n) => listTypes.includes(n.type as string),
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

  return editor
}

export default withLists
