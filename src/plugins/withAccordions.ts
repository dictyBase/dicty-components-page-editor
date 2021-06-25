import { Editor, Element as SlateElement, Transforms } from "slate"
import { types } from "../constants/types"

// withAccordions removes an accordion if the user deletes backward
// directly below it
const withAccordions = (editor: Editor) => {
  const { deleteBackward } = editor

  editor.deleteBackward = (...args) => {
    const ancestor = Editor.above(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === types.accordionWrap,
    })
    if (ancestor !== undefined) {
      Transforms.removeNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === types.accordionWrap,
      })
    }
    deleteBackward(...args)
  }

  return editor
}

export default withAccordions
