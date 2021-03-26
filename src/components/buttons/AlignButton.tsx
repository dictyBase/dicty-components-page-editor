import React, { MouseEvent } from "react"
import { Transforms } from "slate"
import { useSlate, ReactEditor } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import isBlockActive from "../../utils/isBlockActive"

const toggleAlign = (editor: ReactEditor, align: string) => {
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

  // when button is clicked, toggle the block within the editor
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleAlign(editor, align)
  }

  return (
    <IconButton
      size="small"
      aria-label={`align-${align}`}
      onClick={handleClick}>
      {icon}
    </IconButton>
  )
}

export default AlignButton
