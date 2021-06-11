import React, { MouseEvent } from "react"
import { Editor } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { CustomEditor } from "../../types/editor"
import useStyles from "../../styles/buttons"

/**
 * isMarkActive determines if the current text selection contains an
 * active mark
 */
const isMarkActive = (editor: CustomEditor, format: string) => {
  // get a list of marks from the selected text
  const marks = Editor.marks(editor)

  // if there are marks for specified format then the mark is active
  if (marks && marks[format]) {
    return true
  } else {
    return false
  }
}

/**
 * toggleMark will either remove or add a mark to the given text selection
 */
const toggleMark = (editor: CustomEditor, format: string) => {
  // first find if the selection's mark is currently active
  const isActive = isMarkActive(editor, format)

  // we either want to add or remove a mark based on whether it is currently active
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

type Props = {
  /** Type of mark (i.e. "bold") */
  format: string
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * MarkButton displays a button with associated click logic for toggling a mark.
 */
const MarkButton = ({ format, icon }: Props) => {
  const editor = useSlate()
  const props = {
    active: isMarkActive(editor, format),
  }
  const classes = useStyles(props)

  // when button is clicked, toggle the mark within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleMark(editor, format)
  }

  return (
    <Tooltip title={format}>
      <IconButton
        className={classes.button}
        size="small"
        aria-label={`${format}`}
        onClick={handleClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default MarkButton
