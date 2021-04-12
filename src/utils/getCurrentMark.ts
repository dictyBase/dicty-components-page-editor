import { Editor } from "slate"

// get the current mark for a given selection
const getCurrentMark = (editor: Editor, mark: string) => {
  const marks = Editor.marks(editor)
  if (marks && marks[mark]) {
    return marks[mark]
  }
}

export default getCurrentMark
