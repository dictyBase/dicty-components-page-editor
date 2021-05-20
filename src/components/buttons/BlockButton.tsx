import React, { MouseEvent } from "react"
import { Transforms } from "slate"
import { useSlate, ReactEditor } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import isBlockActive from "../../utils/isBlockActive"
import useStyles from "../../styles/buttons"
import { types } from "../../constants/types"

/**
 * PROCESS:
 *
 * 1. User clicks button
 * 2. We run generator function to find any matching nodes for that block type.
 * 3. If there are no matches (value == undefined) then the generator is done
 *    and we do not mark that block as active.
 * 4. If the block is not active, then we set the nodes to match that format type.
 * 5. If the generator does find a match, we mark that block as active for the
 *    first matching node.
 * 6. If the block is active, then we set the nodes back to the default type of
 *    'paragraph'.
 */

const lists = [types.orderedList, types.unorderedList]

/**
 * toggleBlock will set the appropriate nodes for the given selection
 */
const toggleBlock = (editor: ReactEditor, format: string) => {
  // first find if the selected block is currently active
  const isActive = isBlockActive(editor, "type", format)
  const isList = lists.includes(format)

  let type = format
  if (isActive) {
    type = types.paragraph
  }
  if (isList) {
    type = types.listItem
  }

  // setNodes is used to set properties at the currently selected element.
  // If the block is active, then we want to toggle it back to the default
  // paragraph type. If the block is not active, we toggle the type to match it.
  Transforms.setNodes(editor, {
    type: type,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

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
    toggleBlock(editor, format)
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
