import React from "react"
import { Editor, Element as SlateElement, Transforms, Range, Node } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import LinkDialog from "../dialogs/LinkDialog"
import { Link } from "../../types/link"
import { types } from "../../constants/types"
import useStyles from "../../styles/buttons"

// this is necessary to maintain editor selection when link dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

// look for a match of the link type
const linkNodeOptions = {
  match: (n: Node) =>
    !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === types.link,
}

const isLinkActive = (editor: Editor) => {
  const nodeGenerator = Editor.nodes(editor, linkNodeOptions)
  const node = nodeGenerator.next()
  while (!node.done) {
    return true
  }
  return false
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
    Transforms.unwrapNodes(editor, linkNodeOptions)
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
    const linkNode = Editor.above(editor, {
      match: (n: Node) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === types.link,
    })
    if (linkNode && SlateElement.isElement(linkNode[0])) {
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
  const props = {
    active: isLinkActive(editor),
  }
  const classes = useStyles(props)

  const handleAddLink = () => {
    upsertLink(editor, link)
    setLinkDialogOpen(false)
  }

  // if the user has clicked away without adding the link then we don't need to do anything with their data
  const handleClose = () => setLinkDialogOpen(false)

  return (
    <React.Fragment>
      <Tooltip title="link">
        <IconButton
          className={classes.button}
          size="small"
          aria-label="link-button"
          onClick={() =>
            handleToolbarButtonClick(editor, setLink, setLinkDialogOpen)
          }>
          {icon}
        </IconButton>
      </Tooltip>
      <LinkDialog
        handleAddClick={handleAddLink}
        handleClose={handleClose}
        dialogOpen={linkDialogOpen}
        link={link}
        setLink={setLink}
      />
    </React.Fragment>
  )
}

export { upsertLink }
export default LinkButton
