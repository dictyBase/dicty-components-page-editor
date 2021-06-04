import React, { MouseEvent } from "react"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import CustomEditor from "../../plugins/CustomEditor"
import useStyles from "../../styles/buttons"

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
  /** Text alignment property */
  align: string
}

/**
 * AlignButton displays a button with associated logic for adding the "align"
 * attribute.
 */
const AlignButton = ({ icon, align }: Props) => {
  const editor = useSlate()
  const props = {
    active: CustomEditor.isBlockActive(editor, "align", align),
  }
  const classes = useStyles(props)

  // when button is clicked, toggle the block within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    CustomEditor.toggleAlign(editor, align)
  }

  return (
    <Tooltip title={align}>
      <IconButton
        className={classes.button}
        size="small"
        aria-label={`align-${align}`}
        onClick={handleClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default AlignButton
