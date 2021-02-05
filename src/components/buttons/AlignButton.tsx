import React, { MouseEvent } from "react"
import { Editor, Transforms, Element as SlateElement } from "slate"
import { useSlate, ReactEditor } from "slate-react"
import IconButton from "@material-ui/core/IconButton"

const isAlignActive = (editor: ReactEditor, align: string) => {
  const nodeGenerator = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.align === align,
  })

  // run the generator to find the nearest match
  // then return true if this is the last value
  const node = nodeGenerator.next()
  while (!node.done) {
    return true
  }
  return false
}

const toggleAlign = (editor: ReactEditor, align: string) => {
  const isActive = isAlignActive(editor, align)

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
