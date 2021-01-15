import React, { MouseEvent } from "react"
import { Editor, Transforms, Element as SlateElement } from "slate"
import { useSlate, ReactEditor } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import { BlockFormat } from "../../types"

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
const isBlockActive = (editor: ReactEditor, format: BlockFormat) => {
  // Editor.nodes returns a generator that iterates through all of the editor's
  // nodes. We are looking for matches for the selected format.
  // https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/interfaces/node.ts#L467
  const nodeGenerator = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  // run the generator to find the nearest match
  // then return true if this is the last value
  const node = nodeGenerator.next()
  while (!node.done) {
    return true
  }
  return false
}

/**
 * toggleBlock will set the appropriate nodes for the given selection
 */
const toggleBlock = (editor: ReactEditor, format: BlockFormat) => {
  // first find if the selected block is currently active
  const isActive = isBlockActive(editor, format)

  // Transforms provides helper functions to interact with the document.
  // setNodes is used to set properties at the specified location.
  // Here we are setting the type as paragraph if the block is active for the
  // given format, otherwise we set it as the format.
  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : format,
  })
}

type Props = {
  /** Type of block */
  format: BlockFormat
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * BlockButton displays a button with associated click logic for toggling a block.
 */
const BlockButton = ({ format, icon }: Props) => {
  const editor = useSlate()

  // when button is clicked, toggle the block within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleBlock(editor, format)
  }

  return (
    <IconButton size="small" onClick={handleClick}>
      {icon}
    </IconButton>
  )
}

export default BlockButton
