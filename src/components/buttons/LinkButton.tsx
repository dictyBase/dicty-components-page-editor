import React from "react"
import { Transforms } from "slate"
import { useSlate } from "slate-react"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import LinkDialog from "../dialogs/LinkDialog"
import useLinks from "../../hooks/useLinks"
import { isLinkActive, getLinkSelection } from "../../utils/links"
import useStyles from "../../styles/buttons"

// this is necessary to maintain editor selection when link dialog appears;
// the deselect method unsets the editor selection
Transforms.deselect = () => {}

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
