import React, { MouseEvent } from "react"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { toggleBlock, isBlockActive } from "../../utils/blocks"
import { toggleList } from "../../utils/lists"
import useStyles from "../../styles/buttons"
import { types } from "../../constants/types"

/**
 * PROCESS:
 *
 * 1. User clicks button
 * 2. Use generator function to find any matching nodes for that block type.
 * 3. If there are no matches then we do not mark that block as active.
 * 4. If the block is not active, then we set the nodes to match that format type.
 * 5. If there is a match, we mark that block as active for the first matching node.
 * 6. If the block is active, then we set the nodes back to the default type of
 *    'paragraph'.
 */

const lists = [types.orderedList, types.unorderedList, types.listItem]

type Props = {
  /** Type of block (i.e. "h1") */
  format: string
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * BlockButton displays a button with associated click logic for toggling a
 * block.
 */
const BlockButton = ({ format, icon }: Props) => {
  const editor = useSlate()
  const props = {
    active: isBlockActive(editor, "type", format),
  }
  const classes = useStyles(props)

  // when button is clicked, toggle the block within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const isList = lists.includes(format)
    if (isList) {
      toggleList(editor, format)
    } else {
      toggleBlock(editor, format)
    }
  }

  return (
    <Tooltip title={format}>
      <IconButton
        className={classes.button}
        size="small"
        aria-label={`${format}-button`}
        onClick={handleClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default BlockButton
