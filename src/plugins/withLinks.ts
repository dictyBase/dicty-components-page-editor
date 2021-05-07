import { Editor } from "slate"
import { types } from "../constants/types"

const withLinks = (editor: Editor) => {
  const { isInline } = editor

  // make sure every link type is rendered as inline
  // NOTE: if a node is inline then it automatically adds children with { text: "" }
  // https://docs.slatejs.org/concepts/02-nodes
  editor.isInline = (element) => {
    if (element.type === types.link) {
      return true
    }
    return isInline(editor)
  }

  return editor
}

export default withLinks
