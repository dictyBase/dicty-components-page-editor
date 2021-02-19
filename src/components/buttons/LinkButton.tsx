import React, { MouseEvent } from "react"
import { Editor, Transforms, Range, Node, Element as SlateElement } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import { types } from "../../constants/types"

const nodeOptions = {
  match: (n: Node) =>
    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
}

const isLinkActive = (editor: Editor) => {
  // get the first match for the link type
  const [link] = Editor.nodes(editor, nodeOptions)
  // return boolean representation of match
  return !!link
}

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, nodeOptions)
}

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  const link = {
    type: types.link,
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    // if there isn't a range selected, insert the link as the text as well
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: "end" })
  }
}

const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url)
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
