import { Editor } from "slate"

// adds additional check so an inherited font size displays the default "1rem"
// in the dropdown menu
const getMarkValue = (value: string) => {
  if (value === "inherit") {
    return "1rem"
  }
  return value
}

// get the current mark for a given selection
const getCurrentMark = (editor: Editor, mark: string) => {
  const marks = Editor.marks(editor)
  if (!marks || !marks[mark]) {
    return
  }
  return getMarkValue(marks[mark])
}

export default getCurrentMark
