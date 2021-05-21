import { Editor } from "slate"
import { types } from "../constants/types"

const ListHotkeys = {
  TAB: "Tab",
  ENTER: "Enter",
  BACKSPACE: "Backspace",
}

const onKeyDownList = (event: React.KeyboardEvent, editor: Editor) => {
  if (Object.values(ListHotkeys).includes(event.key)) {
    // look for list item match
    const match = Editor.above(editor, {
      match: (n) => n.type === types.listItem,
    })

    if (!match) {
      return
    }

    // match is an array with [block, path]
    const [, path] = match
    const text = Editor.string(editor, path)

    if (event.key === ListHotkeys.TAB) {
      event.preventDefault()
      if (event.shiftKey) {
        console.log("hit shift key")
        // move indent to left
      } else {
        console.log("tab, no shift, got path ", path)
        if (path[path.length - 1] !== 0) {
          // move indent to right unless it is the very first line
          console.log("path is not zero")
        }
      }
    }

    if (event.key === ListHotkeys.ENTER) {
      event.preventDefault()
      if (!text) {
        console.log("enter key, no text")
        // move up
      } else {
        console.log("enter key, text is", text)
        // add new
      }
    }

    if (event.key === ListHotkeys.BACKSPACE) {
      // if in list without text, remove the indent
      if (!text) {
        event.preventDefault()
        console.log("backspace key, no text")
        // move up
      }
    }
  }
}

export default onKeyDownList
