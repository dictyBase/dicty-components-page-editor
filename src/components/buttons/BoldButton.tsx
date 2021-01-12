import React, { MouseEvent } from "react"
import { Editor } from "slate"
import { useSlate, ReactEditor } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import FormatBoldIcon from "@material-ui/icons/FormatBold"

// make this a MarkButton component with more generic functions

const isBoldMarkActive = (editor: ReactEditor) => {
  // gets a list of marks on the text on the given selection
  const marks = Editor.marks(editor)

  // if there are bold marks then the bold mark is active
  return marks ? marks["bold"] === true : false
}

const toggleBoldMark = (editor: ReactEditor) => {
  // first find if the selection's mark is currently active
  const isActive = isBoldMarkActive(editor)

  if (isActive) {
    Editor.removeMark(editor, "bold")
  } else {
    Editor.addMark(editor, "bold", true)
  }
  console.log(Editor.marks(editor))
}

const BoldButton = () => {
  const editor = useSlate()

  // when bold button is clicked, toggle the mark
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleBoldMark(editor)
  }

  return (
    <IconButton size="small" onClick={handleClick}>
      <FormatBoldIcon />
    </IconButton>
  )
}

export default BoldButton
