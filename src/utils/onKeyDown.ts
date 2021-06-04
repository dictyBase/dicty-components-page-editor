import { Editor } from "slate"
import { indentItem, undentItem } from "../plugins/withLists"

const onKeyDown = (event: React.KeyboardEvent, editor: Editor) => {
  if (event.key === "Tab") {
    event.preventDefault()
    if (event.shiftKey) {
      undentItem(editor)
    } else {
      indentItem(editor)
    }
  }
}

export default onKeyDown
