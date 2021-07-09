import React from "react"
import { Editor, Element as SlateElement, Transforms, Range, Node } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import LinkDialog from "../dialogs/LinkDialog"
import useLinks from "../../hooks/useLinks"
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
  const [match] = Array.from(Editor.nodes(editor, linkNodeOptions))
  return !!match
}

// getLinkSelection gets the current text and URL for the user's current selection.
const getLinkSelection = (editor: Editor) => {
  const { selection } = editor
  let prevURL,
    selectedText = ""
  // if there is a current selection then pull the text and URL from it
  // and update state accordingly
  if (selection && !Range.isCollapsed(selection)) {
    selectedText = Editor.string(editor, selection)
    const [linkNode] = Array.from(Editor.nodes(editor, linkNodeOptions))
    if (linkNode && SlateElement.isElement(linkNode[0])) {
      prevURL = linkNode[0].url as string
    }
  }
  return {
    url: prevURL as string,
    text: selectedText,
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
  const { link, setLink, linkDialogOpen, setLinkDialogOpen, handleAddLink } =
    useLinks()
  const props = {
    active: isLinkActive(editor),
  }
  const classes = useStyles(props)

  const handleMouseDown = () => {
    const link = getLinkSelection(editor)
    setLink(link)
    setLinkDialogOpen(true)
  }

  // if the user has clicked away without adding the link then we don't need to do anything with their data
  const handleClose = () => setLinkDialogOpen(false)

  return (
    <React.Fragment>
      <Tooltip title="link">
        <IconButton
          className={classes.button}
          size="small"
          aria-label="link"
          onMouseDown={handleMouseDown}>
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

export default LinkButton
