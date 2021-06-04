import React from "react"
import { Editor, Transforms, Range, Node } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import LinkDialog from "../dialogs/LinkDialog"
import CustomEditor from "../../plugins/CustomEditor"
import { Link } from "../../types/link"
import { types } from "../../constants/types"
import useStyles from "../../styles/buttons"

// this is necessary to maintain editor selection when link dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

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
      match: (n: Node) => n.type === types.link,
    })
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
  const props = {
    active: CustomEditor.isLinkActive(editor),
  }
  const classes = useStyles(props)

  const handleAddLink = () => {
    CustomEditor.upsertLink(editor, link)
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

export default LinkButton
