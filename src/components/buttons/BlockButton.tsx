import React, { MouseEvent } from "react"
import { Editor, Transforms, Element as SlateElement } from "slate"
import { useSlate, ReactEditor } from "slate-react"
import IconButton from "@material-ui/core/IconButton"

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

/**
 * isBlockActive determines if the current text selection contains an active block
 */
const isBlockActive = (editor: ReactEditor, format: string) => {
  // Editor.nodes returns a generator that iterates through all of the editor's
  // nodes. We are looking for matches for the selected format.
  // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/node.ts#L467
  const nodeGenerator = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })
  // run the generator to find the nearest match
  const node = nodeGenerator.next()
  // if it finds a match then return true to indicate the block is currently
  // active
  while (!node.done) {
    return true
  }
  // if it doesn't find a match, then the generator has yielded its last value
  // meaning that it did not find a match for this block type
  return false
}

/**
 * toggleBlock will set the appropriate nodes for the given selection
 */
const toggleBlock = (editor: ReactEditor, format: string) => {
  // first find if the selected block is currently active
  const isActive = isBlockActive(editor, format)

  // setNodes is used to set properties at the currently selected element.
  // If the block is active, then we want to toggle it back to the default
  // paragraph type. If the block is not active, we toggle the type to match it.
  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format,
  })
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

  // when button is clicked, toggle the block within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleBlock(editor, format)
  }

  return (
    <IconButton
      size="small"
      aria-label={`${format}-button`}
      onClick={handleClick}>
      {icon}
    </IconButton>
  )
}

export default BlockButton
