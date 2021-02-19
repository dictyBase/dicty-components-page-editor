import React, { MouseEvent } from "react"
import { Editor, Transforms, Range, Element as SlateElement } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import { types } from "../../constants/types"

const isLinkActive = (editor: Editor) => {
  const nodeGenerator = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
  })
  const node = nodeGenerator.next()
  while (!node.done) {
    return true
  }
  return false
}

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
  })
}

const insertLink = (editor: Editor, url: string) => {
  if (!editor.selection) {
    return
  }
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const isCollapsed = editor.selection && Range.isCollapsed(editor.selection)
  const link = {
    type: types.link,
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: "end" })
  }
}

type Props = {
  /** Icon to display in button */
  icon: JSX.Element
}

/**
 * LinkButton is a button specifically for adding links.
 */
const LinkButton = ({ icon }: Props) => {
  const editor = useSlate()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const url = window.prompt("Enter the URL of the link:")
    if (!url) return
    insertLink(editor, url)
  }

  return (
    <IconButton size="small" aria-label="link-button" onClick={handleClick}>
      {icon}
    </IconButton>
  )
}

export default LinkButton
