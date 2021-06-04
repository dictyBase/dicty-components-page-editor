import React, { MouseEvent } from "react"
import { Editor, Transforms } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import useStyles from "../../styles/buttons"
import { isBlockActive } from "../../utils/blocks"

const toggleAlign = (editor: Editor, align: string) => {
  const isActive = isBlockActive(editor, "align", align)

  Transforms.setNodes(editor, {
    align: isActive ? "left" : align,
  })
}

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
    active: isBlockActive(editor, "align", align),
  }
  const classes = useStyles(props)

  // when button is clicked, toggle the block within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleAlign(editor, align)
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
