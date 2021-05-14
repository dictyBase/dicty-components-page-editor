import { Editor } from "slate"
import { types } from "../constants/types"

const withMedia = (editor: Editor) => {
  const { isVoid } = editor

  // make sure every image type is void
  editor.isVoid = (element) => {
    if (element.type === types.image || element.type === types.video) {
      return true
    }
    return isVoid(element)
  }

  return editor
}

export default withMedia
