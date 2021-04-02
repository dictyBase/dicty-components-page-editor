import React from "react"
import { Editor, Transforms, Range, Node } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import LinkDialog from "../dialogs/LinkDialog"
import { types } from "../../constants/types"
import { Link } from "../../types/link"

// this is necessary to maintain editor selection when link dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

// this config looks for a match of the link type
const nodeOptions = {
  match: (n: Node) => n.type === types.link,
}

// use the nodes generator function to find a match for an active link
const isLinkActive = (editor: Editor) => {
  const nodeGenerator = Editor.nodes(editor, nodeOptions)
  const node = nodeGenerator.next()
  while (!node.done) {
    return true
  }
  return false
}

// unwrap the link from the current selection
const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, nodeOptions)
}

/**
 * upsertLink updates or adds a new link. If there is no selection,
 * it adds a new link with the provided text. Otherwise it will wrap the
 * selection with a link node using the user's link and text.
 */
const upsertLink = (editor: Editor, link: Link) => {
  const { url, text } = link
  // check if there is an existing link first then unwrap it
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }
  const linkData = {
    type: types.link,
    url,
    children: [{ text: text }],
  }
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  if (isCollapsed) {
    Transforms.insertNodes(editor, linkData)
  } else {
    Transforms.wrapNodes(editor, linkData, { split: true })
    Editor.insertText(editor, text)
    Transforms.collapse(editor, { edge: "end" })
  }
}

// handleToolbarButtonClick updates the url/text state based on the user's current
// selection. If there is text selected, it gets the text and its link if it exists,
// otherwise it sets both as empty strings. It also opens the link dialog.
const handleToolbarButtonClick = (
  editor: Editor,
  setLink: (arg0: Link) => void,
  setLinkDialogOpen: (arg0: boolean) => void,
) => {
  const { selection } = editor
  // if there is a current selection then pull the text and URL from it
  // and update state accordingly
  if (selection && !Range.isCollapsed(selection)) {
    let prevURL = ""
    const selectedText = Editor.string(editor, selection)
    const linkNode = Editor.above(editor, nodeOptions)
    if (linkNode) {
      prevURL = linkNode[0].url as string
    }
    setLink({
      url: prevURL,
      text: selectedText,
    })
  } else {
    setLink({
      url: "",
      text: "",
    })
  }
  setLinkDialogOpen(true)
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
  const [linkDialogOpen, setLinkDialogOpen] = React.useState(false)
  const [link, setLink] = React.useState({
    url: "",
    text: "",
  })

  const handleAddLink = () => {
    upsertLink(editor, link)
    setLinkDialogOpen(false)
  }

  // if the user has clicked away without adding the link then we don't need to do anything with their data
  const handleClose = () => setLinkDialogOpen(false)

  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="link-button"
        onClick={() =>
          handleToolbarButtonClick(editor, setLink, setLinkDialogOpen)
        }>
        {icon}
      </IconButton>
      <LinkDialog
        handleAddLink={handleAddLink}
        handleClose={handleClose}
        linkDialogOpen={linkDialogOpen}
        link={link}
        setLink={setLink}
      />
    </React.Fragment>
  )
}

export { upsertLink }
export default LinkButton
