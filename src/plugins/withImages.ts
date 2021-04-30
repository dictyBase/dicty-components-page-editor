import { Editor } from "slate"
import { types } from "../constants/types"

const withImages = (editor: Editor) => {
  const { isVoid } = editor

  // make sure every image type is void
  editor.isVoid = (element) => {
    return element.type === types.image ? true : isVoid(element)
  }

  return editor
}

export default withImages
