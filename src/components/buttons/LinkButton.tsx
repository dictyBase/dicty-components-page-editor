import React from "react"
import { Editor, Transforms, Range, Node, Element as SlateElement } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import { types } from "../../constants/types"

// this config looks for a match of the link type
const nodeOptions = {
  match: (n: Node) =>
    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
}

const isLinkActive = (editor: Editor) => {
  const nodeGenerator = Editor.nodes(editor, nodeOptions)
  // run the generator to find the nearest match
  const node = nodeGenerator.next()
  // if it finds a match then return true to indicate the link is currently active
  while (!node.done) {
    return true
  }
  // if it doesn't find a match, then the generator has yielded its last value
  // meaning that it did not find a match for this type
  return false
}

// unwrap the link from the current selection
const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, nodeOptions)
}

// wrapLink has all of the logic for wrapping a given selection with
// an inline link node
const wrapLink = (editor: Editor, url: string) => {
  // first, if the selection is already a link then we want to unwrap it;
  // this prevents nested links
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }
  // add variable to determine if the given selection is collapsed;
  // this means that the user does not have any text actively selected
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)

  // define the link data structure
  // if it is collapsed then we add the url as the text portion of the link
  const link = {
    type: types.link,
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    // if there isn't a range selected, insert a new node
    Transforms.insertNodes(editor, link)
  } else {
    // otherwise wrap the node with the link data
    // split is necessary to only wrap the selection and not the entire block
    Transforms.wrapNodes(editor, link, { split: true })
    // and collapse the selection to the end of the node
    Transforms.collapse(editor, { edge: "end" })
  }
}

const insertLink = (editor: Editor, url: string) => {
  // only insert a link if there is a selection in the editor
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const getLinkURL = (editor: Editor) => {
  let prevURL = ""
  // get the link node above the currently selected text
  const linkNode = Editor.above(editor, nodeOptions)
  // This returns an array with the first element being the actual Slate content.
  // If there is an existing link node then we want to get the URL to display
  // in the prompt.
  if (linkNode) {
    prevURL = linkNode[0].url as string
  }
  const url = window.prompt("Enter the URL of the link:", prevURL)
  // If the user does not enter a URL then we verify there is a link node at the
  // current selection and unwrap the link.
  if (!url) {
    linkNode && editor.selection && unwrapLink(editor)
    return
  }
  // return the user's entered URL
  return url
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const url = getLinkURL(editor)
    // only insert a link if the user actually enters a URL
    if (url) {
      insertLink(editor, url)
    }
  }

  return (
    <React.Fragment>
      <IconButton size="small" aria-label="link-button" onClick={handleClick}>
        {icon}
      </IconButton>
    </React.Fragment>
  )
}

export default LinkButton
