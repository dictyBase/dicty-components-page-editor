import { Editor } from "slate"
import { types } from "../constants/types"

const ListHotkeys = {
  TAB: "Tab",
  ENTER: "Enter",
  BACKSPACE: "Backspace",
}

const listItemMatch = (editor: Editor) => {
  return Editor.above(editor, {
    match: (n) => n.type === types.listItem,
  })
}

const onKeyDownList = (event: React.KeyboardEvent, editor: Editor) => {
  if (Object.values(ListHotkeys).includes(event.key)) {
    // look for list item match
    const match = listItemMatch(editor)

    if (!match) {
      return
    }

    // match is an array with [block, path]
    const [, path] = match
    const text = Editor.string(editor, path)

    if (event.key === ListHotkeys.TAB) {
      event.preventDefault()
      /**
       * Scenario #1:
       * User hits shift+tab, wanting to move indent left.
       * - this should only work if a nested list
       * - if not nested and at path zero, do nothing
       *
       * Scenario #2:
       * User hits tab, wanting to move indent right.
       * - should continue moving right for each press until reaching the end
       */

      if (event.shiftKey) {
        console.log("hit shift key, need to move indent up")
      } else {
        console.log("tab, need to move indent down")
      }
    }

    if (event.key === ListHotkeys.ENTER) {
      // event.preventDefault()

      /**
       * Scenario #1:
       * User hits enter to go to next list item
       *
       * Scenario #2:
       * User hits enter from empty list item to break out of list
       */
      if (!text) {
        event.preventDefault()
        editor.insertBreak()
      } else {
        console.log("scenario #1 -- got text - ", text)
      }
    }

    if (event.key === ListHotkeys.BACKSPACE) {
      // if in list without text, remove the indent
      if (!text) {
        event.preventDefault()
        // backspace key with no text = user wants out of list
      }
    }
  }
}

export default onKeyDownList
