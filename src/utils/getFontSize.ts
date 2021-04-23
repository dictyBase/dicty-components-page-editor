import { Editor } from "slate"
import getParentNode from "./getParentNode"
import { types } from "../constants/types"

/**
 * getFontSize is a helper function so any text nodes inside a header
 * element node can inherit the header font size
 */
const getFontSize = (editor: Editor, fontSize: string) => {
  const node = getParentNode(editor)
  // if the parent node is a header then its text children should inherit its size
  if (
    node?.type === types.h1 ||
    node?.type === types.h2 ||
    node?.type === types.h3
  ) {
    return "inherit"
  }
  return fontSize
}

export default getFontSize
