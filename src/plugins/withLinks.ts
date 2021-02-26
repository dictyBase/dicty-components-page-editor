import { Editor } from "slate"
import { types } from "../constants/types"

const withLinks = (editor: Editor) => {
  const { isInline } = editor

  // make sure every link type is rendered as inline
  editor.isInline = (element) => {
    if (element.type === types.link) {
      return true
    }
    return isInline(editor)
  }

  return editor
}

export default withLinks
